package org.rpgportugal.orthanc

import discord4j.core.DiscordClient
import discord4j.core.GatewayDiscordClient
import discord4j.core.event.domain.message.MessageCreateEvent
import discord4j.gateway.intent.IntentSet
import kotlinx.collections.immutable.persistentHashMapOf
import org.rpgportugal.jobs.JobType
import org.rpgportugal.jobs.Scheduling
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

val token = Configuration.loadDiscordToken()
val jobs = Configuration.loadJobInfo()

class JobRegistry(client: GatewayDiscordClient) {
    private val jobTypes: Map<String, JobType> = persistentHashMapOf(
        "send-message" to SendMessageJob(client)::execute,
        "remove-roles" to RemoveRolesJob(client)::execute
    )

    fun get(jobType: String): JobType? =
        jobTypes[jobType]
}

fun main() {
    val client = logInAsAdmin(token)
    client.handle<MessageCreateEvent> { println(it.message) }

    val registry = JobRegistry(client)
    jobs.forEach {
        println("Scheduling ${it.type} job $it")
        Scheduling.schedule(it, registry::get)
    }

    client.onDisconnect().block()
}