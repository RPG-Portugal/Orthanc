import org.slf4j.LoggerFactory

fun getLogger(clazz: Class<*>) : Logger = Logger(LoggerFactory.getLogger(clazz))
fun getLogger(clazzName: String) : Logger = Logger(LoggerFactory.getLogger(clazzName))