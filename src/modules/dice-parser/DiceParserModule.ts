import {Message} from "discord.js";
import {DiceRoller, DiscordRollRenderer} from "dice-roller-parser";
import CommandModule from "../../module/CommandModule";

export default class DiceParserModule extends CommandModule {
    private renderer = new DiscordRollRenderer();
    private diceRoller = new DiceRoller();

    getConfigName(): string {
        return "diceParserConfig.json";
    }

    isEnabled(): boolean {
        return !!this.config && !!this.config.enabled;
    }

    async commandLogic(msg: Message, cleanMsg: string) {
        try {
            const rollObject = this.diceRoller.roll(cleanMsg);
            await msg.reply(this.renderer.render(rollObject))
        } catch (e) {
            await msg.reply("https://help.roll20.net/hc/en-us/articles/360037773133-Dice-Reference#DiceReference-TypesOfDice")
        }
    }

}