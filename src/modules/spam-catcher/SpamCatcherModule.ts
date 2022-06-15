import Module from "../../module/Module";
import {BanOptions, Client, Message} from "discord.js";
import * as config from "../../resources/config.json";
import log from "../../event/Event";

export default class SpamCatcherModule implements Module {
    client : Client|null = null
    linkRegExp = new RegExp(config.warnSpamChannel.linkRegex)

    attach(client: Client): void {
        this.client = client;
        client.on("messageCreate", this.listener )
    }

    detach(client: Client): void {
        client.off("messageCreate", this.listener)
    }

    isEnabled(): boolean {
        return !!config && !!config.warnSpamChannel && !!config.warnSpamChannel.spamCatcherChannelId;
    }

    listener = async (msg: Message) => await this.spamCatcher(this.client!!, msg)

    spamCatcher = async (client: Client, message: Message) => {
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

        if (message.channelId != config.warnSpamChannel.spamCatcherChannelId) {
            console.log("Message is not on spam catcher channel.");
            return;
        } else {
            console.log("Deleting message...");
            await message.delete();
        }

        const regExpArr = this.linkRegExp.exec(message.content);
        if (regExpArr == null || regExpArr.length == 0) {
            console.log("Message does not contains link.");
            return;
        }

        const links = regExpArr.join(", ");
        await log(client, `Soft banning ${author} for spamming links: ${links}.`);

        const banOptions: BanOptions = {
            days: 1,
            reason: "Sent link on spamming channel."
        }

        await guild.members.ban(id, banOptions);
        await guild.members.unban(id);
    }


}