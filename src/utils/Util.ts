import {Client, Message, Snowflake, TextChannel, ChannelType} from "discord.js";


async function getWarnChannel(client: Client, warnChannelId: Snowflake) : Promise<TextChannel | null> {
    const chan = await client.channels.fetch(warnChannelId)
    if (chan?.type == ChannelType.GuildText) {
        return chan as TextChannel;
    } else {
        return null;
    }
}

export default async function log(client: Client, message: string, warnChannelId: Snowflake): Promise<Message | undefined> {
    console.log(message);
    const chan = await getWarnChannel(client, warnChannelId);
    return chan?.send(message);
}
