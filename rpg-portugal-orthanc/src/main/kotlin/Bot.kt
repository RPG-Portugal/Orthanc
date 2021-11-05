package org.rpgportugal.orthanc

import discord4j.core.DiscordClient
import discord4j.core.GatewayDiscordClient
import discord4j.core.event.domain.message.MessageCreateEvent
import discord4j.gateway.intent.IntentSet
import org.rpgportugal.jobs.Job
import org.rpgportugal.orthanc.configuration.Configuration
import org.rpgportugal.orthanc.event.Event.handle
import org.rpgportugal.orthanc.exception.BotInitializationException
import org.rpgportugal.orthanc.jobs.RemoveRolesJob
import org.rpgportugal.orthanc.jobs.SendMessageJob

fun logInAsAdmin(token: String): GatewayDiscordClient {
    return DiscordClient.create(token)
        .gateway()
        .setEnabledIntents(IntentSet.all())
        .login()
        .block() ?: throw BotInitializationException("Discord client is `null` on log in.")
}

val botConfiguration = Configuration.loadBotConfiguration()

val sendMessageJobsConfiguration = Configuration.loadSendMessageJobs()
val removeRolesJobsConfiguration = Configuration.loadRemoveRollsJobs()

fun main() {
    val client = logInAsAdmin(botConfiguration.discord.token)
    client.handle<MessageCreateEvent> { println(it.message) }

    val sendMessageJob = SendMessageJob(client)::run
    sendMessageJobsConfiguration.jobs.forEach {
        println("Scheduling 'SendMessageJob' job $it")
        Job.schedule(it.info, it.args) { args ->
            println("Running 'SendMessageJob' job")
            sendMessageJob(args)
        }
    }

    val removeRolesJob = RemoveRolesJob(client)::run
    removeRolesJobsConfiguration.jobs.forEach {
        println("Scheduling 'RemoveRolesJob' job $it...")
        Job.schedule(it.info, it.args) { args ->
            println("Running 'RemoveRolesJob' job...")
            removeRolesJob(args)
        }
    }

    client.onDisconnect().block()
}