import {Client, Snowflake, TextChannel} from "discord.js";
import schedule, {Job} from "node-schedule";
import AbstractModule from "../../module/AbstractModule";

export default class WarnSpamChannelModule extends AbstractModule {
    private job!: Job | null;
    private config!: any;

    async init(): Promise<void> {
        this.config = await this.injector.loadResource("config.json");
    }

    attach(): void {
        this.job = schedule.scheduleJob(this.config.warnSpamChannel.cron, async () => {
            await this.startWarnSpamChannelJob(this.client, this.config.warnSpamChannel.spamCatcherChannelId);
        })
    }

    detach(): void {
        if (!!this.job) {
            this.job.cancel()
            this.job = null
        }
    }

    isEnabled(): boolean {
        return !!this.config && !!this.config.warnSpamChannel && !!this.config.warnSpamChannel.spamCatcherChannelId;
    }

    startWarnSpamChannelJob = async (client: Client, channelId: Snowflake) => {
        const channel = await client.channels.fetch(channelId);
        const message = "**NÃO ESCREVAM NESTE CANAL** Escrita neste canal resulta num soft ban! Isto é um canal anti-bots, mutem o canal por favor!";
        await (channel as TextChannel)?.send(message);
    }
}