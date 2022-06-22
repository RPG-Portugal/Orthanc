import {BanOptions, Client, Message} from "discord.js";
import log from "../../utils/Util";
import AbstractModule from "../../module/AbstractModule";

export default class SpamCatcherModule extends AbstractModule {
    private config!: any;
    private linkRegExp!: RegExp;

    async init() {
        this.config = await this.injector.loadResource<any>("config.json");
        this.linkRegExp = new RegExp(this.config.warnSpamChannel.linkRegex);
    }

    attach(): void {
        this.client.on("messageCreate", this.listener)
    }

    detach(): void {
        this.client.off("messageCreate", this.listener)
    }

    isEnabled(): boolean {
        return !!this.config && !!this.config.warnSpamChannel && !!this.config.warnSpamChannel.spamCatcherChannelId;
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

        if (message.channelId != this.config.warnSpamChannel.spamCatcherChannelId) {
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
        await log(client, `Soft banning ${author} for spamming links: ${links}.`, this.config.warnChannelId);

        const banOptions: BanOptions = {
            days: 1,
            reason: "Sent link on spamming channel."
        }

        await guild.members.ban(id, banOptions);
        await guild.members.unban(id);
    }


}