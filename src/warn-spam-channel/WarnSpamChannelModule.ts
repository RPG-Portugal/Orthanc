import Module from "../module/Module";
import {Client, Snowflake, TextChannel} from "discord.js";
import * as config from "../resources/config.json"
import schedule, {Job} from "node-schedule";

export default class WarnSpamChannelModule implements Module {
    job: Job|null = null

    attach(client: Client): void {
        this.job = schedule.scheduleJob(config.warnSpamChannel.cron, async () => {
            await this.startWarnSpamChannelJob(client, config.warnSpamChannel.spamCatcherChannelId);
        })
    }

    detach(client: Client): void {
        if ( !!this.job ) {
            this.job.cancel()
            this.job = null
        }
    }

    isEnabled(): boolean {
        return !!config && !!config.warnSpamChannel && !!config.warnSpamChannel.spamCatcherChannelId;
    }

    startWarnSpamChannelJob = async (client: Client, channelId: Snowflake) => {
        const channel = await client.channels.fetch(channelId);
        const message = "**NÃO ESCREVAM NESTE CANAL** Escrita neste canal resulta num soft ban! Isto é um canal anti-bots, mutem o canal por favor!";
        await (channel as TextChannel)?.send(message);
    }
}