package org.rpgportugal.orthanc.serialization.deserializer

import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import discord4j.common.util.Snowflake
import java.io.IOException

class SnowflakeDeserializer : StdDeserializer<Snowflake>(Snowflake::class.java) {
    override fun deserialize(p: JsonParser?, ctxt: DeserializationContext?): Snowflake? {
        val value: Long? = p?.readValueAs(Long::class.java)
        return if(value != null) {
            Snowflake.of(value)
        } else {
            throw IOException("Failed Snowflake deserializaton as value was null")
        }
    }
}