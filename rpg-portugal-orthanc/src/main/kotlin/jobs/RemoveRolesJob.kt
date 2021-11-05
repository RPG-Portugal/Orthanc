package org.rpgportugal.orthanc.jobs

import discord4j.core.GatewayDiscordClient
import org.rpgportugal.orthanc.configuration.RemoveRolesArgs

class RemoveRolesJob(override val client: GatewayDiscordClient) : OrthancJob<RemoveRolesArgs> {

    override fun run(args: RemoveRolesArgs) {
        client.getGuildMembers(args.guildId).subscribe { member ->
            val intersection = args.roles.intersect(member.roleIds)
            val removedRolesCount = intersection.size
            val name = member.displayName
            intersection.forEach(member::removeRole)
            // TODO: replace with logging
            println("Removed $removedRolesCount roles from '$name'")
        }
    }
}