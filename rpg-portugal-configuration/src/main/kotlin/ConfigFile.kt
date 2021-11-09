package org.rpgportugal.configuration

object ConfigFile {
    fun sensitive(filename: String): String =
        "sensitive/$filename"
}