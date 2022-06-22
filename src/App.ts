import RoleCleanerModule from "./modules/role-cleaner/RoleCleanerModule";
import RoleAwardModule from "./modules/role-awarding/RoleAwardModule";
import WarnSpamChannelModule from "./modules/warn-spam-channel/WarnSpamChannelModule";
import ThreadUpdateModule from "./modules/thread-update/ThreadUpdateModule";
import SpamCatcherModule from "./modules/spam-catcher/SpamCatcherModule";
import DiceParserModule from "./modules/dice-parser/DiceParserModule";
import InjectorFactory from "./dependency/InjectorFactory";

async function main() {
    const injector = InjectorFactory.create();
    const client = await injector.createLoggedClient();
    const moduleEngine = injector.initializeModuleEngine(client);

    await moduleEngine
        .addModule(new RoleCleanerModule())
        .addModule(new RoleAwardModule())
        .addModule(new WarnSpamChannelModule())
        .addModule(new ThreadUpdateModule())
        .addModule(new SpamCatcherModule())
        .addModule(new DiceParserModule())
        .start()

}

main().catch(reason => console.log(reason));
