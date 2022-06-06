import {ThreadChannel, Message, Client, TextChannel, BanOptions} from "discord.js";

const { spamCatcherChannelId, linkRegex, warnChannelId } = require("../resources/config.json");

const linkRegExp = new RegExp(linkRegex)

async function getWarnChannel(client: Client) : Promise<TextChannel | null> {
    const chan = await client.channels.fetch(warnChannelId)
    if (chan?.isText) {
        return chan as TextChannel;
    } else {
        return null;
    }
}

async function log(client: Client, message: string): Promise<Message | undefined> {
    const chan = await getWarnChannel(client);
    return chan?.send(message);
}

export async function logUnarchivedThreads(client: Client, oldThread: ThreadChannel, newThread: ThreadChannel) {
    if (oldThread.archived && !newThread.archived) {
        const message = `Thread <#${newThread.id}> was unarchived.`;
        console.log(message);
        await log(client, message);
    }
}

export async function spamCatcher(client: Client, message: Message) {
    const author = message.author;
    const guild = message.guild;

    if (guild == null) {
        console.log("Guild is null.");
        return;
    }

    if (author == null || author.bot) {
        console.log("Author missing or is bot.");
        return;
    }

    const id = author.id;

    if (author.bot) {
        console.log("Author is bot.");
        return;
    }

    if (message.channelId != spamCatcherChannelId) {
        console.log("Message is not on spam catcher channel.");
        return;
    } else {
        console.log("Deleting message...");
        await message.delete();
    }

    const regExpArr = linkRegExp.exec(message.content);
    if (regExpArr == null || regExpArr.length == 0) {
        console.log("Message does not contains link.");
        return;
    }

    const links = regExpArr.join(", ");
    const logMessage = `Soft banning ${author} for spamming links: ${links}.`

    console.log(logMessage);
    await log(client, logMessage);

    const banOptions: BanOptions = {
        days: 1,
        reason: "Sent link on spamming channel."
    }

    await guild.members.ban(id, banOptions);
    await guild.members.unban(id);
}