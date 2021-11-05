package org.rpgportugal.configuration

import org.rpgportugal.configuration.exception.ConfigurationLoadingException
import java.nio.charset.Charset
import java.nio.charset.StandardCharsets
import kotlin.jvm.Throws

object TextConfiguration : Configuration() {

    @Throws(ConfigurationLoadingException::class)
    fun load(filename: String, charset: Charset = StandardCharsets.UTF_8) : String =
        load(filename) { String(it.readAllBytes(), charset) }
}