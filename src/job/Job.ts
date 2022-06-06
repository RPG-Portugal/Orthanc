import {Client, Snowflake, TextChannel} from "discord.js";

export async function startWarnSpamChannelJob(client: Client, channelId: Snowflake) {
    const channel = await client.channels.fetch(channelId);
    const message = "**NÃO ESCREVAM NESTE CANAL** Escrita neste canal resulta num soft ban! Isto é um canal anti-bots, mutem o canal por favor!";
    setInterval(
        async () => await (channel as TextChannel)?.send(message),
        120000
    );
}