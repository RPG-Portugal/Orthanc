import AbstractModule from "./AbstractModule";
import {Message} from "discord.js";


export default abstract class CommandModule extends AbstractModule {
    attach(): void {
        this.client.on("messageCreate", this.listener)
    }

    detach(): void {
        this.client.off("messageCreate", this.listener)
    }

    getCommandPrefix(): string {
        return !!this.config && !!this.config.prefix ? this.config.prefix : "$";
    }

    getCommandName(): string {
        return !!this.config && !!this.config.command ? this.config.command : "";
    }

    private listener = async (msg: Message) => {
        let cleanMsg = msg.content.trim();
        const combinedCommand = `${this.getCommandPrefix()}${this.getCommandName()}`;
        if(!!this.getCommandPrefix()
            && !!this.getCommandName()
            && cleanMsg.toLowerCase().startsWith(combinedCommand)){
            cleanMsg = cleanMsg.substring(combinedCommand.length).trim()
            await this.commandLogic(msg, cleanMsg)
        }
    }

    abstract commandLogic(msg: Message, cleanMsg: string) : Promise<void>
}