import {Client, ClientOptions} from "discord.js";
import * as config from "./resources/config.json"
import ModuleEngine from "./module/ModuleEngine";
import RoleCleanerModule from "./role-cleaner/RoleCleanerModule";
import RoleAwardModule from "./role-awarding/RoleAwardModule";
import WarnSpamChannelModule from "./warn-spam-channel/WarnSpamChannelModule";
import ThreadUpdateModule from "./thread-update/ThreadUpdateModule";
import SpamCatcherModule from "./spam-catcher/SpamCatcherModule";

async function main() {
    const client = new Client(config.clientOptions as ClientOptions);
    await client.login(config.token);

    const moduleEngine = new ModuleEngine(client);
    moduleEngine.addModule(new RoleCleanerModule())
    moduleEngine.addModule(new RoleAwardModule())
    moduleEngine.addModule(new WarnSpamChannelModule())
    moduleEngine.addModule(new ThreadUpdateModule())
    moduleEngine.addModule(new SpamCatcherModule())
    moduleEngine.attach()

}

main().catch(reason => console.log(reason));
