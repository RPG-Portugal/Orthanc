import org.junit.jupiter.api.Test
import org.rpgportugal.logging.*

class LoggerInCompanionObject : Logging {

    fun log(s: String) {
        logger().info(s)
        log.info("With log val: $s")
    }
}

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