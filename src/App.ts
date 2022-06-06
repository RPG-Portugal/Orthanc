import {Client, ClientOptions, Message, ThreadChannel} from "discord.js";
import schedule from "node-schedule";
import {awardZest, logUnarchivedThreads, spamCatcher} from "./event/Event"
import {cleanRolesFromAllMembers, startWarnSpamChannelJob} from "./job/Job";
import * as config from "./resources/config.json"

async function main() {
    const client = new Client(config.clientOptions as ClientOptions);
    await client.login(config.token);

    client.on(
        "threadUpdate",
        (oldThread: ThreadChannel, newThread: ThreadChannel) => logUnarchivedThreads(client, oldThread, newThread)
    );

    client.on("messageCreate", (msg: Message) => spamCatcher(client, msg));

    schedule.scheduleJob(config.cleanRolesJob.cron, async () => {
        await cleanRolesFromAllMembers(client, config.guildId, config.cleanRolesJob.roles);
    });

    schedule.scheduleJob(config.warnSpamChannel.cron, async () => {
        await startWarnSpamChannelJob(client, config.warnSpamChannel.spamCatcherChannelId);
    })

    client.on("messageReactionAdd", async (reaction,user) => {
        await awardZest(reaction, user, config.zestAwards.threshold, config.zestAwards.emoteName, config.zestAwards.roleId);
    })

}

main().catch(reason => console.log(reason));
