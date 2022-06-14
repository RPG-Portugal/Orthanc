import {Client, ClientOptions, Message, ThreadChannel} from "discord.js";
import schedule from "node-schedule";
import {awardZest, logUnarchivedThreads, spamCatcher} from "./event/Event"
import { startWarnSpamChannelJob} from "./job/Job";
import * as config from "./resources/config.json"
import ModuleEngine from "./module/ModuleEngine";
import RoleCleanerModule from "./role-cleaner/RoleCleanerModule";

async function main() {
    const client = new Client(config.clientOptions as ClientOptions);
    await client.login(config.token);

    /*
    client.on(
        "threadUpdate",
        async (oldThread: ThreadChannel, newThread: ThreadChannel) =>
            await logUnarchivedThreads(client, oldThread, newThread)
    );

    client.on("messageCreate",  async (msg: Message) => await spamCatcher(client, msg));

    schedule.scheduleJob(config.warnSpamChannel.cron, async () => {
        await startWarnSpamChannelJob(client, config.warnSpamChannel.spamCatcherChannelId);
    })

    client.on("messageReactionAdd", async (reaction,user) => {
        await awardZest(reaction, user, config.zestAwards.threshold, config.zestAwards.emoteName, config.zestAwards.roleId);
    })
    */

    const moduleEngine = new ModuleEngine(client);
    moduleEngine.addModule(new RoleCleanerModule())
    moduleEngine.attach()

}

main().catch(reason => console.log(reason));
