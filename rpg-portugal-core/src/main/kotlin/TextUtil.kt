package org.rpgportugal.core

object TextUtil {
    fun replaceText(text: String, replacers: Map<String,String>): String =
        replacers.entries.fold(text) { acc, (key, value) ->
            acc.replace(key, value, true)
        }
    fun key(str: String): String = ":$str"
}