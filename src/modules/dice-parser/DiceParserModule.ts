import Module from "../../module/Module";
import * as config from "../../resources/config.json"
import {Client, Message} from "discord.js";
import {DiceRoller, DiscordRollRenderer} from "dice-roller-parser";

export default class DiceParserModule implements Module {
    client: Client|null = null
    renderer = new DiscordRollRenderer();
    diceRoller = new DiceRoller();

    attach(client: Client): void {
        this.client = client
        client.on("messageCreate", this.listener)
    }

    detach(client: Client): void {
        client.off("messageCreate", this.listener)
    }

    isEnabled(): boolean {
        return !!config && !!config.diceParser && config.diceParser.enabled;
    }

    listener = async (msg: Message) => await this.parseRoll(this.client!!, msg)

    parseRoll = async (client: Client, msg: Message) => {
        if(!msg.content.startsWith("$roll")) return;
        const content = msg.content.replace("$roll", "").trim()

        try {
            const rollObject = this.diceRoller.roll(content);
            await msg.reply(this.renderer.render(rollObject))
        } catch (e) {
            await msg.reply("https://help.roll20.net/hc/en-us/articles/360037773133-Dice-Reference#DiceReference-TypesOfDice")
        }
    }


}