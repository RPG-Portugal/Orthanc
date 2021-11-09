package org.rpgportugal.orthanc.configuration

import org.rpgportugal.configuration.JsonConfiguration
import org.rpgportugal.configuration.exception.ConfigurationLoadingException
import org.rpgportugal.jobs.JobInfo

object Configuration {
    private val json = JsonConfiguration

    @Throws(ConfigurationLoadingException::class)
    fun loadDiscordToken(filename: String = "sensitive/discord.json"): String =
        json.load<DiscordJsonConfiguration>(filename).token

    @Throws(ConfigurationLoadingException::class)
    fun loadJobInfo(filename: String = "jobs.json"): List<JobInfo> =
        json.load<JobsJsonConfiguration>(filename).jobs
}

data class DiscordJsonConfiguration(val token: String)
data class JobsJsonConfiguration(val jobs: List<JobInfo>)