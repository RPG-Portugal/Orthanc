import {Client, ClientOptions} from "discord.js";
import * as config from "./resources/config.json"
import ModuleEngine from "./module/ModuleEngine";
import RoleCleanerModule from "./modules/role-cleaner/RoleCleanerModule";
import RoleAwardModule from "./modules/role-awarding/RoleAwardModule";
import WarnSpamChannelModule from "./modules/warn-spam-channel/WarnSpamChannelModule";
import ThreadUpdateModule from "./modules/thread-update/ThreadUpdateModule";
import SpamCatcherModule from "./modules/spam-catcher/SpamCatcherModule";
import DiceParserModule from "./modules/dice-parser/DiceParserModule";

async function main() {
    const client = new Client(config.clientOptions as ClientOptions);
    await client.login(config.token);

    const moduleEngine = new ModuleEngine(client);
    moduleEngine.addModule(new RoleCleanerModule())
    moduleEngine.addModule(new RoleAwardModule())
    moduleEngine.addModule(new WarnSpamChannelModule())
    moduleEngine.addModule(new ThreadUpdateModule())
    moduleEngine.addModule(new SpamCatcherModule())
    moduleEngine.addModule(new DiceParserModule())
    moduleEngine.attach()

}

main().catch(reason => console.log(reason));
