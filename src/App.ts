import RoleCleanerModule from "./modules/role-cleaner/RoleCleanerModule";
import RoleAwardModule from "./modules/role-awarding/RoleAwardModule";
import WarnSpamChannelModule from "./modules/warn-spam-channel/WarnSpamChannelModule";
import ThreadUpdateModule from "./modules/thread-update/ThreadUpdateModule";
import SpamCatcherModule from "./modules/spam-catcher/SpamCatcherModule";
import DiceParserModule from "./modules/dice-parser/DiceParserModule";
import InjectorFactory from "./dependency/InjectorFactory";

async function main() {
    const injector = InjectorFactory.create();
    const client = await injector.createDiscordClient();
    const moduleEngine = await injector.initializeModuleEngine(client);

    await moduleEngine.addModule(new RoleCleanerModule())
    await moduleEngine.addModule(new RoleAwardModule())
    await moduleEngine.addModule(new WarnSpamChannelModule())
    await moduleEngine.addModule(new ThreadUpdateModule())
    await moduleEngine.addModule(new SpamCatcherModule())
    await moduleEngine.addModule(new DiceParserModule())
    await moduleEngine.attach()

}

main().catch(reason => console.log(reason));
