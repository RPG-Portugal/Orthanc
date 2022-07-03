import {MessageReaction, PartialMessageReaction, PartialUser, User} from "discord.js";
import AbstractModule from "../../module/AbstractModule";

export default class RoleAwardModule extends AbstractModule {
    private config!: any;

    async init(): Promise<void> {
        this.config = await this.injector.loadResource<any>("config.json");
    }

    attach(): void {
        this.client.on("messageReactionAdd", this.listener)
    }

    detach(): void {
        this.client.off("messageReactionAdd", this.listener)
    }

    isEnabled(): boolean {
        return !!this.config && !!this.config.enabled;
    }

    listener = async (reaction: MessageReaction|PartialMessageReaction,user : User|PartialUser) => {
        await this.awardZest(reaction, user, this.config.zestAwards.threshold, this.config.zestAwards.emoteName, this.config.zestAwards.roleId, this.config.zestAwards.superiorRoleId);
    }

    getConfigName(): string {
        return "roleAwardingConfig.json";
    }

    awardZest = async (reaction: MessageReaction|PartialMessageReaction,
                                 user: User|PartialUser,
                                 threshold: number,
                                 emoteName: string,
                                 roleId: string,
                                 superiorRoleId: string) => {
        //Fail conditions
        if(!roleId || !emoteName) return;
        if(user.bot) return;
        if(reaction.emoji.name != emoteName) return; // Emoji not right
        if((reaction.count || 0) < threshold) return; // Not enough reactions
        if(reaction.message.createdAt.getTime() < (Date.now() - 24*60*60*1000)) return; // More than 24h ago

        let zestyRole = await reaction.message.guild?.roles.fetch(roleId);
        if(!zestyRole) return;

        let roleUpgradeConfirmed = false
        reaction.message.member?.roles.cache.forEach((authorRole) => {
            if (!!authorRole && authorRole.position > zestyRole!!.position) {
                roleUpgradeConfirmed = true;
            }
        })
        if(roleUpgradeConfirmed) {
            console.dir(`Awarding superior role to ${reaction.message.member?.user.username}`);
            zestyRole = await reaction.message.guild?.roles.fetch(superiorRoleId);
            if (!zestyRole) return;
        } else {
            console.dir(`Awarding normal role to ${reaction.message.member?.user.username}`);
        }

        await reaction.message.member?.roles.add(zestyRole);
    }

}