package org.rpgportugal.firebase

import com.google.auth.oauth2.GoogleCredentials
import org.rpgportugal.configuration.Configuration
import org.rpgportugal.configuration.exception.ConfigurationLoadingException
import kotlin.jvm.Throws

object GoogleCredentialsConfiguration :  Configuration() {

    @Throws(ConfigurationLoadingException::class)
    fun load(filepath: String): GoogleCredentials =
        load(filepath, GoogleCredentials::fromStream)

}