package org.rpgportugal.firebase.exception

import org.rpgportugal.core.error.ErrorCode
import org.rpgportugal.core.error.RpgPortugalException

class FirebaseApiException constructor(message: String, code: ErrorCode, cause: Throwable? = null)
    : RpgPortugalException("Firebase Api Error: $message", code, cause)