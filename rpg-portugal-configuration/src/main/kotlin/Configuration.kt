package org.rpgportugal.configuration

import org.rpgportugal.configuration.exception.ConfigurationLoadingException
import java.io.InputStream
import kotlin.jvm.Throws


abstract class Configuration {
    companion object {
        private val loader: ClassLoader = Thread.currentThread().contextClassLoader
    }

    @Throws(ConfigurationLoadingException::class)
    fun <T> load(filename: String, mapper: (InputStream) -> T): T  {
        return loader.getResourceAsStream(filename).use {
            if(it == null) {
                throw ConfigurationLoadingException(filename, "Resource is null, check path")
            } else {
                mapper(it)
            }
        }
    }
}