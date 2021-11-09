package org.rpgportugal.orthanc.configuration

import org.rpgportugal.configuration.ConfigFile
import org.rpgportugal.configuration.JsonConfiguration
import org.rpgportugal.configuration.exception.ConfigurationLoadingException
import org.rpgportugal.jobs.JobInfo

object Configuration {
    private val json = JsonConfiguration

    @Throws(ConfigurationLoadingException::class)
    fun loadDiscordToken(filename: String = "discord.json"): String =
        ConfigFile.sensitive(filename).let { json.load<DiscordJsonConfiguration>(it).token }

    @Throws(ConfigurationLoadingException::class)
    fun loadSpamCatcher(filename: String = "spam-catcher.json"): SpamCatcherJsonConfig =
        json.load(filename)

    @Throws(ConfigurationLoadingException::class)
    fun loadJobInfo(filename: String = "jobs.json"): List<JobInfo> =
        json.load<JobsJsonConfiguration>(filename).jobs
}

data class DiscordJsonConfiguration(val token: String)
data class JobsJsonConfiguration(val jobs: List<JobInfo>)
data class SpamCatcherJsonConfig(val trapChannelIds: List<Long>, val ignoreRoleIds: List<Long>, val linkPattern: String)