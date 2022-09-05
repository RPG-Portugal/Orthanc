import {Client, Role} from "discord.js";
import schedule, {Job} from "node-schedule";
import AbstractModule from "../../module/AbstractModule";

export default class RoleCleanerModule extends AbstractModule {
    private job: Job | null = null;

    attach():void {
        console.log("Hello, I've been attached.")
        this.job = schedule.scheduleJob(this.config.cleanRolesJob.cron, async () => {
            console.log("Hello, I've run.")
            await this.cleanRolesFromAllMembers(this.client, this.config.guildId, this.config.cleanRolesJob.roles);
        });
    }

    detach(): void {
        if (!!this.job) {
            this.job.cancel()
            this.job = null
        }
    }

    isEnabled(): boolean {
        return !!this.config && !!this.config.cleanRolesJob && !!this.config.cleanRolesJob.enabled;
    }

    cleanRolesFromAllMembers = async (client: Client, guildId: string, roleIds: Array<string>) => {
        console.log("Starting role cleanup")
        const guild = await client.guilds.fetch(guildId);
        await guild?.members.fetch();
        const roles : Array<Role> = [];
        for (const rId of roleIds) {
            console.log("Parsing "+rId)
            console.log("guild", guild)
            const role = await guild?.roles.fetch(rId);
            console.log("role?",role);
            if (!!role){
                roles.push(role);
            }
        }
        console.log("Phase 2")
        roles.forEach( role => {
            let i = 0;
            console.log("Iterating "+role);
            role?.members?.forEach( (member, index) => {
                console.log("Iterating m: "+member.nickname + " == " + index);
                i++;
                setTimeout( () => {
                    console.log(`Removing role ${role.name} from ${member.nickname}`);
                    member.roles.remove(role)
                }, i*500)
            })
        })
    }

}