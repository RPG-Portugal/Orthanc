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
    implementation("com.coreoz:wisp:2.2.1")
    implementation("com.cronutils:cron-utils:9.1.5")
}