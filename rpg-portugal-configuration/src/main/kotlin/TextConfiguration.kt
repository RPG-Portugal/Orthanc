package org.rpgportugal.configuration

import org.rpgportugal.configuration.exception.ConfigurationLoadingException
import java.io.InputStream
import java.nio.charset.Charset
import java.nio.charset.StandardCharsets
import kotlin.jvm.Throws

object TextConfiguration : Configuration() {

    private fun parse(inputStream: InputStream, charset: Charset = StandardCharsets.UTF_8): String =
        String(inputStream.readAllBytes(), charset)

    @Throws(ConfigurationLoadingException::class)
    fun load(filename: String, charset: Charset = StandardCharsets.UTF_8) : String =
        load(filename) { parse(it, charset) }
}