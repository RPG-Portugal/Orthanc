package org.rpgportugal.core.error

open class RpgPortugalException(message: String, val code: ErrorCode, cause: Throwable? = null)
    : Exception(message, cause)
