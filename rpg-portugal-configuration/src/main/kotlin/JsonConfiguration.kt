package org.rpgportugal.configuration


import com.fasterxml.jackson.databind.json.JsonMapper
import com.fasterxml.jackson.module.kotlin.KotlinFeature
import com.fasterxml.jackson.module.kotlin.KotlinModule
import com.fasterxml.jackson.module.kotlin.jacksonMapperBuilder
import org.rpgportugal.configuration.exception.ConfigurationLoadingException
import java.io.InputStream
import kotlin.jvm.Throws

class JsonConfiguration (vararg mds: com.fasterxml.jackson.databind.Module) : Configuration()  {
    private val mapper: JsonMapper =
        jacksonMapperBuilder()
            .addModule(
                KotlinModule.Builder()
                    .withReflectionCacheSize(512)
                    .configure(KotlinFeature.NullToEmptyCollection, false)
                    .configure(KotlinFeature.NullToEmptyMap, false)
                    .configure(KotlinFeature.NullIsSameAsDefault, false)
                    .configure(KotlinFeature.SingletonSupport, true)
                    .configure(KotlinFeature.StrictNullChecks, false)
                    .build()
            )
            .addModules(*mds)
            .build()

    fun <T> readValue(filename: String, inputStream: InputStream, cls: Class<T>): T =
        try {
            mapper.readValue(inputStream, cls)
        } catch (e: Exception) {
            throw ConfigurationLoadingException(filename, "Failed to deserialize resource", e)
        }

    @Throws(ConfigurationLoadingException::class)
    inline fun <reified T> load(filename: String): T =
        load (filename) { readValue(filename, it, T::class.java) }

}