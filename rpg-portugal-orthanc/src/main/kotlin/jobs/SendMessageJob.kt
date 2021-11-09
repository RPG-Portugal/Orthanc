package org.rpgportugal.orthanc.jobs

import org.rpgportugal.logging.*
import discord4j.common.util.Snowflake
import discord4j.core.GatewayDiscordClient

class SendMessageJob(override val client: GatewayDiscordClient) : OrthancJob {

    companion object {
        const val CHANNEL_ID: String = "channelId"
        const val MESSAGE: String = "message"
    }

    override fun execute(args: Map<String, Any>) {
        val channelIdArg = args.getArg(CHANNEL_ID) { Snowflake.of(it as Long) }
        val messageArg = args.getArg(MESSAGE) { it as String }

        channelIdArg?.let { channelId ->
            messageArg?.let { message ->
                client.getChannelById(channelId).subscribe { channel ->
                    channel.restChannel.createMessage(message).subscribe {
                        // TODO: replace with logging
                        println("Sent '$message' to channel '$channelId'")
                    }
                }
            }
        }


    }
}