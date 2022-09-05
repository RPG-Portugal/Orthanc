import {Client, Role} from "discord.js";
import schedule, {Job} from "node-schedule";
import AbstractModule from "../../module/AbstractModule";

export default class RoleCleanerModule extends AbstractModule {
    private job: Job | null = null;

    attach():void {
        const cronExpr = this.config.cleanRolesJob.cron;
        this.job = schedule.scheduleJob(cronExpr, async () => {
            const guildId = this.config.guildId;
            const roles = this.config.cleanRolesJob.roles;
            await this.cleanRolesFromAllMembers(this.client, guildId, roles);
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
        console.log("Fetching roles to clean...")

        const guild = await client.guilds.fetch(guildId);
        console.log("Guild=", guild)

        await guild.members.fetch();

        const roles : Array<Role> = [];
        for (const rId of roleIds) {
            console.log("RoleId=", rId)

            const role = await guild?.roles.fetch(rId);
            console.log("Role=", role);
            if (!!role){
                roles.push(role);
            }
        }
        console.log("Role cleanup phase...")

        roles.forEach(role => {
            console.log("Cleaning role: ", role);
            role?.members?.map((v) => v).forEach((member, index) => {
                console.log(`Cleaning role for member ${index}: ${member.displayName}`);
                const delay = index * 500;
                setTimeout( () => {
                    console.log(`Removing role ${role.name} from ${member.displayName}`);
                    member.roles.remove(role)
                }, delay)
            })
        })
    }

}