package org.rpgportugal.orthanc.jobs

import discord4j.core.GatewayDiscordClient
import org.rpgportugal.orthanc.configuration.SendMessageArgs

class SendMessageJob(override val client: GatewayDiscordClient) : OrthancJob<SendMessageArgs> {

    override fun run(args: SendMessageArgs) {
        val channelId = args.channelId
        val message = args.message

        client.getChannelById(channelId).subscribe { channel ->
            channel.restChannel.createMessage(message).subscribe {
                // TODO: replace with logging
                println("Sent '$message' to channel '$channelId'")
            }
        }
    }
}