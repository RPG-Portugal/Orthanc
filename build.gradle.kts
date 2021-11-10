plugins {
    kotlin("jvm") version "1.5.31" apply false
    id("com.github.johnrengelman.shadow") version "7.0.0" apply false
}

group = "org.rpgportugal"
version = "0.1.0"

subprojects {
    tasks.withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile> {
        kotlinOptions {
            jvmTarget = "16"
        }
    }
    val subprojectName = name.replaceFirst("rpg-portugal", "rpgpt")
    tasks.withType<com.github.jengelman.gradle.plugins.shadow.tasks.ShadowJar> {
        archiveFileName.set("$subprojectName.jar")
    }
}