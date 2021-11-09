package org.rpgportugal.orthanc.event.message.create

import discord4j.common.util.Snowflake
import discord4j.core.GatewayDiscordClient
import discord4j.core.event.domain.message.MessageCreateEvent
import kotlinx.collections.immutable.PersistentSet
import org.rpgportugal.logging.*
import org.rpgportugal.orthanc.configuration.Configuration
import org.rpgportugal.orthanc.event.Handler
import org.rpgportugal.orthanc.util.Discord4JUtils.toSnowflakeSet

class SpamCatcher private constructor(
    private val regex: Regex,
    private val trapChannelIds: PersistentSet<Snowflake>,
    private val ignoreRoleIds: PersistentSet<Snowflake>) : Logging {

    companion object {
        private val CONFIGURATION = Configuration.loadSpamCatcher()

        private val LINK_REGEX = Regex(CONFIGURATION.linkPattern, setOf(RegexOption.IGNORE_CASE))
        private val IGNORE_ROLE_IDS = CONFIGURATION.ignoreRoleIds.toSnowflakeSet()
        private val TRAP_CHANNEL_IDS = CONFIGURATION.trapChannelIds.toSnowflakeSet()

        fun create(regex: Regex = LINK_REGEX,
                   trapChannelIds: PersistentSet<Snowflake> = TRAP_CHANNEL_IDS,
                   ignoreRoleIds: PersistentSet<Snowflake> = IGNORE_ROLE_IDS) : Handler<MessageCreateEvent> {
            val catcher = SpamCatcher()
            return { client, event ->  catcher.catch(client, event) }
        }

    }

    data class SpamInfo(val username: String,
                        val discriminator: String,
                        val link: String,
                        val message: String,
                        val channel: Snowflake)

    private constructor() : this(LINK_REGEX, TRAP_CHANNEL_IDS, IGNORE_ROLE_IDS)

    fun catch(client: GatewayDiscordClient, event: MessageCreateEvent) {
        val message = event.message
        val channelId = message.channelId
        val content = message.content

        if(message.author.isPresent) {
            val author = message.author.get()
            val isTrapped = !author.isBot && trapChannelIds.contains(channelId)
            if(isTrapped) {
                regex.find(content)?.value?.let { link ->
                    val spamInfo = SpamInfo(
                        author.username,
                        author.discriminator,
                        link,
                        content,
                        channelId)

                    log.info("$spamInfo")

                }
            }
        }
    }
}