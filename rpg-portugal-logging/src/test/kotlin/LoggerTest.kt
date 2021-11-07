import org.junit.jupiter.api.Test

internal class LoggerTest {

    @org.junit.jupiter.api.BeforeEach
    fun setUp() {
    }

    @org.junit.jupiter.api.AfterEach
    fun tearDown() {
    }

    @Test
    internal fun loggerCreation() {
        LoggerInCompanionObject().log("This is a test")
    }
}