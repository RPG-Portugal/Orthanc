package org.rpgportugal.orthanc.util

import discord4j.common.util.Snowflake
import discord4j.core.GatewayDiscordClient
import discord4j.core.`object`.entity.Member
import discord4j.core.spec.BanQuerySpec
import kotlinx.collections.immutable.PersistentMap
import kotlinx.collections.immutable.PersistentSet
import kotlinx.collections.immutable.toPersistentHashSet

object Discord4JUtils {
    fun <T : Collection<Long>> T.toSnowflakeSet(): PersistentSet<Snowflake> =
        this.map(Snowflake::of).toPersistentHashSet()


    fun <T : Map<Long, Long>> T.toSnowflakeMap(): Map<Snowflake, Snowflake> =
        this.map { entry ->
            Snowflake.of(entry.key) to Snowflake.of(entry.value)
        }
        .toMap()

    fun Member.softBan(banQuerySpec: BanQuerySpec = BanQuerySpec.create(), callback: Runnable? = null) {
        ban(banQuerySpec).subscribe {
            unban().subscribe {
                callback?.run()
            }
        }
    }

    fun Member.sendPrivateMessage(message: String, callback: Runnable? = null) {
        privateChannel.subscribe {
            it.createMessage(message).subscribe {
                callback?.run()
            }
        }
    }

    fun GatewayDiscordClient.sendMessageToChannel(channelId: Snowflake, message: String, callback: Runnable?){
        getChannelById(channelId).subscribe {
            it.restChannel.createMessage(
                message
            ).subscribe {
                callback?.run()
            }
        }
    }
}