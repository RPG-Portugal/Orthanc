package org.rpgportugal.configuration.exception

class ConfigurationLoadingException(resourceName: String, message: String, cause: Throwable?)
    : Exception("Failed to load resource $resourceName: $message", cause) {

    constructor(resourceName: String, message: String) : this(resourceName, message, null)
}