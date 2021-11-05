package org.rpgportugal.orthanc.jobs

import discord4j.core.GatewayDiscordClient

interface OrthancJob<TArgs> {
    val client: GatewayDiscordClient
    fun run(args: TArgs)
}