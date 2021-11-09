package org.rpgportugal.configuration

import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.gson.LongSerializationPolicy
import com.google.gson.ToNumberStrategy
import com.google.gson.reflect.TypeToken
import com.google.gson.stream.JsonReader
import org.rpgportugal.configuration.exception.ConfigurationLoadingException
import java.io.InputStream
import java.io.InputStreamReader

object JsonConfiguration : Configuration()  {

    private val gson =
        GsonBuilder()
            .setObjectToNumberStrategy { it.nextLong() }
            .setPrettyPrinting()
            .create();

    fun <T> readValue(filename: String, inputStream: InputStream, cls: Class<T>): T =
        try {
            val t = TypeToken.get(cls).type
            val reader = JsonReader(InputStreamReader(inputStream))
            gson.fromJson(reader, t)
        } catch (e: Exception) {
            throw ConfigurationLoadingException(filename, "Failed to deserialize resource", e)
        }

    @Throws(ConfigurationLoadingException::class)
    inline fun <reified T> load(filename: String): T {
        val cls = T::class.java
        return load(filename) {
            readValue(filename, it, cls)
        }
    }
}