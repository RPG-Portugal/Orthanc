package org.rpgportugal.orthanc.event.message.create

import discord4j.common.util.Snowflake
import discord4j.core.GatewayDiscordClient
import discord4j.core.event.domain.message.MessageCreateEvent
import discord4j.core.spec.BanQuerySpec
import org.rpgportugal.core.TextUtil
import org.rpgportugal.logging.Logging
import org.rpgportugal.logging.log
import org.rpgportugal.orthanc.configuration.Configuration
import org.rpgportugal.orthanc.util.Discord4JUtils.sendMessageToChannel
import org.rpgportugal.orthanc.util.Discord4JUtils.sendPrivateMessage
import org.rpgportugal.orthanc.util.Discord4JUtils.softBan
import org.rpgportugal.orthanc.util.Discord4JUtils.toSnowflakeMap
import org.rpgportugal.orthanc.util.Discord4JUtils.toSnowflakeSet

class SpamCatcher(
    private val regex: Regex,
    private val trapToWarnChannelMappings: Map<Snowflake, Snowflake>,
    private val ignoreRoleIds: Set<Snowflake>,
    private val messageToSend: String) : Logging {

    companion object {
        const val MEMBER_NAME_KEY          = ":name"
        const val MEMBER_MENTION_KEY       = ":mention"
        const val MESSAGE_CONTENT_KEY      = ":content"
        const val MESSAGE_CONTENT_LINK_KEY = ":link"
        const val CHANNEL_ID_KEY           = ":channelId"

        fun fromConfiguration() : SpamCatcher {
            val configuration = Configuration.loadSpamCatcher()
            val linkRegex = Regex(configuration.linkPattern, setOf(RegexOption.IGNORE_CASE))
            val ignoreRoleIds = configuration.ignoreRoleIds.toSnowflakeSet()
            val trapChannelIds = configuration.trapWarnChannelPairs.toSnowflakeMap()
            val messageTemplate = configuration.messageToSend

            return SpamCatcher(linkRegex, trapChannelIds, ignoreRoleIds, messageTemplate)
        }

    }

    fun handle(client: GatewayDiscordClient, event: MessageCreateEvent) {
        val message = event.message
        val channelId = message.channelId
        val content = message.content

        if(message.author.isPresent) {
            val author = message.author.get()
            val warnChannelId = trapToWarnChannelMappings[channelId]

            if(!author.isBot && warnChannelId != null) {
                val guild = event.guild.block()
                val name = "${author.username}#${author.discriminator}"
                log.info("User $name is trapped")
                message.delete().subscribe {
                    log.info("Message $content deleted from $name")
                }

                regex.find(content)?.value?.let { link ->
                    message.authorAsMember.subscribe { member ->
                        val memberName = member.displayName
                        val memberMention = member.mention
                        val memberId = author.id

                        member.sendPrivateMessage(messageToSend) {
                            log.info("send private message:\n\n'$messageToSend'\n\nto: '$memberMention'")
                        }

                        client.sendMessageToChannel(warnChannelId, "User $memberMention was banned for sending spam link `$link` in `$content`") {
                            log.info("Sent message to warn channel:\n\n$messageToSend'\n\nto: '$memberMention'")
                        }

                        guild?.let { guild ->
                            val memberRolesOnIgnoreList = ignoreRoleIds.intersect(member.roleIds)
                            if(memberRolesOnIgnoreList.isEmpty()) {
                                log.info("soft banning $memberName for spamming...")
                                val banQuerySpec =
                                    BanQuerySpec.builder()
                                        .deleteMessageDays(1)
                                        .reason("Possible compromised account [Spam]")
                                        .build()

                                guild.softBan(memberId, banQuerySpec) {
                                    log.info("$memberName was soft banned")
                                }
                            } else {
                                log.info("member $memberName was on 'role ignore list' and will not be banned")
                            }
                        }

                    }
                }
            }
        }
    }
}