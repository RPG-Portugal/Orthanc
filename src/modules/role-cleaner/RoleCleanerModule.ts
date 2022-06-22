import {Client, Role} from "discord.js";
import schedule, {Job} from "node-schedule";
import AbstractModule from "../../module/AbstractModule";

export default class RoleCleanerModule extends AbstractModule {
    job: Job|null = null

    attach():void {
        this.job = schedule.scheduleJob(this.config.cleanRolesJob.cron, async () => {
            await this.cleanRolesFromAllMembers(this.client, this.config.guildId, this.config.cleanRolesJob.roles);
        });
    };

    detach(): void {
        if ( !!this.job ) {
            this.job.cancel()
            this.job = null
        }
    }

    isEnabled(): boolean {
        return !!this.config && !!this.config.cleanRolesJob && this.config.cleanRolesJob.enabled;
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