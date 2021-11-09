package org.rpgportugal.firebase

import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.firebase.auth.FirebaseAuth
import org.rpgportugal.configuration.ConfigFile
import org.rpgportugal.configuration.exception.ConfigurationLoadingException
import org.rpgportugal.core.error.ErrorCode
import org.rpgportugal.firebase.exception.FirebaseApiException
import java.util.concurrent.Future

class FirebaseApi private constructor(private val firebaseApp: FirebaseApp) {
    private val auth = firebaseApp.getAuthInstance()

    fun tryCreateCustomToken(userId: String): Result<String> =
        try {
            auth.createCustomToken(userId).let { Result.success(it) }
        } catch (t: Throwable) {
            FirebaseApiException("Failed to create custom token", ErrorCode.FailedToCreateFirebaseCustomToken, t).let {
                Result.failure(it)
            }
        }

    // TODO: finish securing
    private fun createCustomTokenAsync(userId: String): Future<String> =
        auth.createCustomTokenAsync(userId)

    companion object {

        @Throws(ConfigurationLoadingException::class)
        fun fromConfigurationFile(projectId: String, filepath: String): FirebaseApi {
            val app = initFirebaseApp(projectId, filepath)
            return FirebaseApi(app)
        }

        @Throws(ConfigurationLoadingException::class)
        private fun initFirebaseApp(projectId: String, filepath: String): FirebaseApp {
            try {
                return ConfigFile.sensitive(filepath).let {
                    GoogleCredentialsConfiguration.load(it)
                }.let {
                    FirebaseOptions.builder().setCredentials(it).setProjectId(projectId).build()
                }.let(FirebaseApp::initializeApp)
            } catch (e: Throwable) {
                throw ConfigurationLoadingException(
                    filepath,
                    "An error occurred whilst initializing the firebase app",
                    e
                )
            }
        }

        private fun FirebaseApp.getAuthInstance(): FirebaseAuth =
            FirebaseAuth.getInstance(this)
    }
}