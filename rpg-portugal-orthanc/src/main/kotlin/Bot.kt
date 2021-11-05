package org.rpgportugal.orthanc

import discord4j.core.DiscordClient
import discord4j.core.GatewayDiscordClient
import discord4j.core.event.domain.message.MessageCreateEvent
import discord4j.gateway.intent.IntentSet
import org.rpgportugal.orthanc.configuration.Configuration
import org.rpgportugal.orthanc.event.Event.handle
import org.rpgportugal.orthanc.exception.BotInitializationException

fun logInAsAdmin(token: String): GatewayDiscordClient {
    return DiscordClient.create(token)
        .gateway()
        .setEnabledIntents(IntentSet.all())
        .login()
        .block() ?: throw BotInitializationException("Discord client is `null` on log in.")
}

val botConfiguration = Configuration.loadBotConfiguration()

val sendMessageJobsConfiguration = Configuration.loadSendMessageJobs()
// val removeRolesJobsConfiguration = Configuration.loadRemoveRollsJobs()

fun main() {
    val client = logInAsAdmin(botConfiguration.discord.token)
    client.handle<MessageCreateEvent> { println(it.message) }
    client.onDisconnect().block()
}