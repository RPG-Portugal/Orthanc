import {Client, Message} from "discord.js";
import {DiceRoller, DiscordRollRenderer} from "dice-roller-parser";
import AbstractModule from "../../module/AbstractModule";

export default class DiceParserModule extends AbstractModule {
    private config!: any;

    private renderer = new DiscordRollRenderer();
    private diceRoller = new DiceRoller();

    async init() {
        this.config = await this.injector.loadResource("config.json");
    }

    attach(): void {
        this.client.on("messageCreate", this.listener)
    }

    detach(): void {
        this.client.off("messageCreate", this.listener)
    }

    isEnabled(): boolean {
        return !!this.config && !!this.config.diceParser && !!this.config.diceParser.enabled;
    }

    private listener = async (msg: Message) => await this.parseRoll(this.client!!, msg)

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