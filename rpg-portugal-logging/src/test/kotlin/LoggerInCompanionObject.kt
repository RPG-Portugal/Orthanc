class LoggerInCompanionObject {
    companion object {
        @Suppress("JAVA_CLASS_ON_COMPANION")
        @JvmStatic
        private val logger = getLogger(javaClass.enclosingClass)
    }

    fun log(s: String) {
        logger.slf4jLogger.info(s)
    }
}