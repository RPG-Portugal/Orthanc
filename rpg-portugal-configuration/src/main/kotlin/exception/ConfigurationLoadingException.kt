package org.rpgportugal.configuration.exception

import org.rpgportugal.core.error.ErrorCode
import org.rpgportugal.core.error.RpgPortugalException

class ConfigurationLoadingException(resourceName: String, message: String, cause: Throwable? = null)
    : RpgPortugalException("Failed to load resource $resourceName: $message", ErrorCode.ConfigurationLoadingError, cause)