import {Client, Message, TextChannel} from "discord.js";

const { warnChannelId } = require("../resources/config.json");



async function getWarnChannel(client: Client) : Promise<TextChannel | null> {
    const chan = await client.channels.fetch(warnChannelId)
    if (chan?.isText) {
        return chan as TextChannel;
    } else {
        return null;
    }
}

export default async function log(client: Client, message: string): Promise<Message | undefined> {
    console.log(message);
    const chan = await getWarnChannel(client);
    return chan?.send(message);
}
