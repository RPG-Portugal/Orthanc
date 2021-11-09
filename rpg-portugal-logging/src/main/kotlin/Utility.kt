package org.rpgportugal.logging

import org.slf4j.Logger
import org.slf4j.LoggerFactory

interface Logging

fun getLogger(clazz: Class<*>) : Logger = LoggerFactory.getLogger(clazz)
fun getLogger(name: String) : Logger = LoggerFactory.getLogger(name)

inline fun <reified T : Logging> T.logger(): Logger = getLogger(T::class.java)
inline val <reified T : Logging> T.log : Logger
    get() = getLogger(T::class.java)