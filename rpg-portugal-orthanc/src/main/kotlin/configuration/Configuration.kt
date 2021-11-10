package org.rpgportugal.orthanc.configuration

import org.rpgportugal.configuration.ConfigFile
import org.rpgportugal.configuration.JsonConfiguration
import org.rpgportugal.configuration.exception.ConfigurationLoadingException
import org.rpgportugal.jobs.JobInfo

object Configuration {
    private val json = JsonConfiguration

    @Throws(ConfigurationLoadingException::class)
    fun loadDiscordToken(filename: String = "discord.json"): String =
        ConfigFile.sensitive(filename).let { json.load<DiscordClientJsonConfiguration>(it).token }

    @Throws(ConfigurationLoadingException::class)
    fun loadSpamCatcher(filename: String = "spam-catcher.json"): SpamCatcherJsonConfig =
        json.load(filename)

    @Throws(ConfigurationLoadingException::class)
    fun loadJobInfo(filename: String = "jobs.json"): List<JobInfo> =
        json.load<JobsJsonConfiguration>(filename).jobs
}