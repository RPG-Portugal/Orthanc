import {Client, ThreadChannel} from "discord.js";
import log from "../../utils/Util";
import AbstractModule from "../../module/AbstractModule";

export default class ThreadUpdateModule extends AbstractModule {

    attach(): void {
        this.client.on("threadUpdate", this.listener )
    }

    detach(): void {
        this.client.off("threadUpdate", this.listener)
    }

    isEnabled(): boolean {
        return !!this.config && !!this.config.threadUpdate && this.config.threadUpdate.enabled;
    }

    listener = async (oldThread: ThreadChannel, newThread: ThreadChannel) =>
        this.logUnarchivedThreads(this.client!!, oldThread, newThread)


    logUnarchivedThreads = async (client: Client, oldThread: ThreadChannel, newThread: ThreadChannel) => {
        console.log(`Analyzing thread: ${newThread.name} (${newThread.id})...`);
        if (oldThread.archived && !newThread.archived) {
            await log(client, `Thread <#${newThread.id}> was unarchived.`, this.config.warnChannelId);
            console.log("Thread unarchived.");
        }
    }

}