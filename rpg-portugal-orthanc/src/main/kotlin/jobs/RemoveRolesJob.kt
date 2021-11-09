package org.rpgportugal.orthanc.jobs

import org.rpgportugal.logging.*
import discord4j.common.util.Snowflake
import discord4j.core.GatewayDiscordClient

class RemoveRolesJob(override val client: GatewayDiscordClient) : OrthancJob {
    companion object {
        const val GUILD_ID: String = "guildId"
        const val ROLE_IDS: String = "roleIds"
    }

    override fun execute(args: Map<String, Any>) {
        val guildIdArgs = args.getArg(GUILD_ID) { Snowflake.of(it as Long) }
        val roleIdsArgs =
            args.getArg(ROLE_IDS) {
                (it as List<*>).stream().map{ snowflake -> Snowflake.of(snowflake as Long) }.toList().toSet()
            }

        guildIdArgs?.let { guildId ->
            roleIdsArgs?.let { roleIds ->
                client.getGuildMembers(guildId).subscribe { member ->
                    val intersection = roleIds.intersect(member.roleIds)
                    val removedRolesCount = intersection.size
                    val name = member.displayName
                    if(intersection.isNotEmpty()) {
                        intersection.forEach {
                            member.removeRole(it).subscribe {
                                if(log.isDebugEnabled) {
                                    log.debug("role $it removed from $member")
                                }
                            }
                        }
                        log.info("Removed $removedRolesCount roles from '$name'")
                    }
                }
            }
        }
    }
}