import Module from "../module/Module";
import {Client, Role} from "discord.js";
import * as config from "../resources/config.json"
import schedule, {Job} from "node-schedule";

export default class RoleCleanerModule implements Module {

    job: Job|null = null

    attach = (client: Client ) => {
        this.job = schedule.scheduleJob(config.cleanRolesJob.cron, async () => {
            await this.cleanRolesFromAllMembers(client, config.guildId, config.cleanRolesJob.roles);
        });
    };

    detach(client: Client): void {
        if ( !!this.job ) {
            this.job.cancel()
            this.job = null
        }
    }

    isEnabled(): boolean {
        return !!config && !!config.cleanRolesJob && config.cleanRolesJob.enabled;
    }

    cleanRolesFromAllMembers = async (client: Client, guildId: string, roleIds: Array<string>) => {
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

}