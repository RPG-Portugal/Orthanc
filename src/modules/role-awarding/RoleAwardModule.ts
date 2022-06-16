import Module from "../../module/Module";
import * as config from "../../resources/config.json"
import {Client, MessageReaction, PartialMessageReaction, PartialUser, User} from "discord.js";

export default class RoleAwardModule implements Module {
    attach(client: Client): void {
        client.on("messageReactionAdd", this.listener)
    }

    detach(client: Client): void {
        client.off("messageReactionAdd", this.listener)
    }

    isEnabled(): boolean {
        return !!config && !!config.zestAwards &&config.zestAwards.enabled;
    }

    listener = async (reaction: MessageReaction|PartialMessageReaction,user : User|PartialUser) => {
        await this.awardZest(reaction, user, config.zestAwards.threshold, config.zestAwards.emoteName, config.zestAwards.roleId);
    }

    awardZest = async (reaction: MessageReaction|PartialMessageReaction,
                                    user: User|PartialUser,
                                    threshold: number,
                                    emoteName: string,
                                    roleId: string) => {
        //Fail conditions
        if(!roleId || !emoteName) return;
        if(user.bot) return;
        if(reaction.emoji.name != emoteName) return; // Emoji not right
        if((reaction.count || 0) < threshold) return; // Not enough reactions
        if(reaction.message.createdAt.getTime() < (Date.now() - 24*60*60*1000)) return; // More than 24h ago

        const zestyRole = await reaction.message.guild?.roles.fetch(roleId);
        if(!zestyRole) return;

        await reaction.message.member?.roles.add(zestyRole);
    }

}