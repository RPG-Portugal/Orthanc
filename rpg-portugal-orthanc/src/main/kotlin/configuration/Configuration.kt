package org.rpgportugal.orthanc.configuration

import org.rpgportugal.configuration.JsonConfiguration
import org.rpgportugal.configuration.exception.ConfigurationLoadingException
import org.rpgportugal.jobs.JobInfo

object Configuration {
    private val json = JsonConfiguration

    @Throws(ConfigurationLoadingException::class)
    fun loadBotConfiguration(filename: String = "bot.json"): BotJsonConfiguration =
        json.load(filename)

    @Throws(ConfigurationLoadingException::class)
    fun loadJobInfo(filename: String = "jobs.json"): List<JobInfo> =
        json.load<JobsJsonConfiguration>(filename).jobs
}

data class DiscordJsonConfiguration(val token: String)
data class BotJsonConfiguration(val discord: DiscordJsonConfiguration)
data class JobsJsonConfiguration(val jobs: List<JobInfo>)