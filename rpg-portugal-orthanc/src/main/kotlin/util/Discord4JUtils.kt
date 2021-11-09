package org.rpgportugal.orthanc.util

import discord4j.common.util.Snowflake
import kotlinx.collections.immutable.PersistentSet
import kotlinx.collections.immutable.toPersistentHashSet

object Discord4JUtils {
    fun <T : Collection<Long>> T.toSnowflakeSet(): PersistentSet<Snowflake> =
        this.map(Snowflake::of).toPersistentHashSet()
}