import {Client, Message, ThreadChannel} from "discord.js";
import schedule from "node-schedule";
import { logUnarchivedThreads, spamCatcher } from "./event/Event"
import {cleanRolesFromAllMembers, startWarnSpamChannelJob} from "./job/Job";
const { token, warnChannelId, clientOptions ,guildId, cleanRolesJob, warnSpamChannel} = require("./resources/config.json");

async function main() {
    const client = new Client(clientOptions);
    await client.login(token);

    client.on(
        "threadUpdate",
        (oldThread: ThreadChannel, newThread: ThreadChannel) => logUnarchivedThreads(client, oldThread, newThread)
    );

    client.on("messageCreate", (msg: Message) => spamCatcher(client, msg));

    schedule.scheduleJob(cleanRolesJob.cron, async () => {
        await cleanRolesFromAllMembers(client, guildId, cleanRolesJob.roles);
    });

    schedule.scheduleJob(warnSpamChannel.cron, async () => {
        await startWarnSpamChannelJob(client, warnSpamChannel.spamCatcherChannelId);
    })


}

main().catch(reason => console.log(reason));
