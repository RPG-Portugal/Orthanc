import Module from "../module/Module";
import * as config from "../resources/config.json"
import {Client, ThreadChannel} from "discord.js";
import log from "../event/Event";

export default class ThreadUpdateModule implements Module {
    client : Client|null = null

    attach(client: Client): void {
        this.client = client;
        client.on("threadUpdate", this.listener )
    }

    detach(client: Client): void {
        client.off("threadUpdate", this.listener)
    }

    isEnabled(): boolean {
        return !!config && !!config.threadUpdate && config.threadUpdate.enabled;
    }

    listener = async (oldThread: ThreadChannel, newThread: ThreadChannel) =>
        await this.logUnarchivedThreads(this.client!!, oldThread, newThread)


    logUnarchivedThreads = async (client: Client, oldThread: ThreadChannel, newThread: ThreadChannel) => {
        console.log(`Analyzing thread: ${newThread.name} (${newThread.id})...`);
        if (oldThread.archived && !newThread.archived) {
            await log(client, `Thread <#${newThread.id}> was unarchived.`);
            console.log("Thread unarchived.");
        }
    }

}