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

    if (message.channelId != spamCatcherChannelId) {
        console.log("Message is not spam channel.");
        return;
    }

    if (!linkRegExp.test(message.content)) {
        console.log("Message does not contains link.");
        return;
    }

    console.log(`Banning member ${author.username}.`);
    const id = author.id;
    
    await log(client, `Soft banning ${message.author} for spamming link.`);

    const banOptions: BanOptions = {
        days: 1,
        reason: "Sent link on spamming channel."
    }

    await guild.members.ban(id, banOptions);
    await guild.members.unban(id);
}