import {Client, Role, Snowflake, TextChannel} from "discord.js";

export async function startWarnSpamChannelJob(client: Client, channelId: Snowflake) {
    const channel = await client.channels.fetch(channelId);
    const message = "**NÃO ESCREVAM NESTE CANAL** Escrita neste canal resulta num soft ban! Isto é um canal anti-bots, mutem o canal por favor!";
    await (channel as TextChannel)?.send(message);
}

export async function cleanRolesFromAllMembers(client: Client, guildId: string, roleIds: Array<string>){
    console.log("Starting role cleanup")
    const guild = await client.guilds.cache.get(guildId);
    await guild?.members.fetch();
    const roles : Array<Role> = [];
    for (const rId of roleIds) {
        const role = await guild?.roles.fetch(rId);
        if (!!role){
            roles.push(role);
        }
    }

    roles.forEach( role => {
        let i = 0;
        role?.members?.forEach( (member, index) => {
            i++;
             setTimeout( () => {
                 console.log(`Removing role ${role.name} from ${member.nickname}`);
                 member.roles.remove(role)
             }, i*500)
        })
    })
}