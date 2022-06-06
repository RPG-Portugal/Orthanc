import {Client, Message, ThreadChannel} from "discord.js";
import { logUnarchivedThreads, spamCatcher } from "./event/Event"
import { startWarnSpamChannelJob } from "./job/Job";

const { token, warnChannelId, clientOptions , spamCatcherChannelId} = require("./resources/config.json");

async function main() {
    const client = new Client(clientOptions);
    await client.login(token);

    client.on(
        "threadUpdate",
        (oldThread: ThreadChannel, newThread: ThreadChannel) => logUnarchivedThreads(client, oldThread, newThread)
    );

    client.on("messageCreate", (msg: Message) => spamCatcher(client, msg));

    await startWarnSpamChannelJob(client, spamCatcherChannelId);

}

main().catch(reason => console.log(reason));
