plugins {
    kotlin("jvm") version "1.5.31"
}

group = "org.rpgportugal"
version = "0.1.0"

repositories {
    mavenCentral()
}

dependencies {
    implementation(kotlin("stdlib"))
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.13.0")
    implementation(project(":rpg-portugal-core"))
}