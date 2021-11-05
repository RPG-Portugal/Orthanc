package org.rpgportugal.orthanc.configuration

import com.fasterxml.jackson.databind.module.SimpleModule
import discord4j.common.util.Snowflake
import org.rpgportugal.configuration.JsonConfiguration
import org.rpgportugal.configuration.exception.ConfigurationLoadingException
import org.rpgportugal.jobs.JobInfo
import org.rpgportugal.orthanc.serialization.deserializer.SnowflakeDeserializer
import kotlin.jvm.Throws

object Configuration {
    private val orthancModule =
        SimpleModule()
            .addDeserializer(Snowflake::class.java, SnowflakeDeserializer())

    private val json = JsonConfiguration(orthancModule)

    @Throws(ConfigurationLoadingException::class)
    fun loadBotConfiguration(filename: String = "bot.json"): BotJsonConfiguration =
        json.load(filename)

    @Throws(ConfigurationLoadingException::class)
    fun loadSendMessageJobs(filename: String = "jobs/send-message-jobs.json"): JobsJsonConfiguration<SendMessageArgs> =
        json.load(filename)

    @Throws(ConfigurationLoadingException::class)
    fun loadRemoveRollsJobs(filename: String = "jobs/remove-roles-jobs.json"): JobsJsonConfiguration<RemoveRolesArgs> =
        json.load(filename)

}

data class DiscordJsonConfiguration(val token: String)
data class BotJsonConfiguration(
    val discord: DiscordJsonConfiguration,
)

data class JobsJsonConfiguration<T>(val jobs: Array<JobJsonConfiguration<T>>)
data class JobJsonConfiguration<T>(val info: JobInfo, val args: T)

data class SendMessageArgs(val message: String, val channelId: Snowflake)
data class RemoveRolesArgs(val guildId: Snowflake, val roles: Set<Snowflake>)