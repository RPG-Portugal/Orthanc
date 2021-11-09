package org.rpgportugal.orthanc.jobs

import discord4j.core.GatewayDiscordClient
import org.rpgportugal.logging.Logging

interface OrthancJob : Logging {
    val client: GatewayDiscordClient
    fun execute(args: Map<String, Any>)
    fun <T> Map<String,Any>.getArg(name: String, mapper: (Any) -> T): T? =
        (this[name])?.let(mapper)
}