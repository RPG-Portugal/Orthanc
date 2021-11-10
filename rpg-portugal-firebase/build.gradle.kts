plugins {
    kotlin("jvm")
}

group = "org.rpgportugal"
version = "0.1.0"

repositories {
    mavenCentral()
}

dependencies {
    implementation(kotlin("stdlib"))

    // Internal Dependencies
    implementation(project(":rpg-portugal-core"))
    implementation(project(":rpg-portugal-configuration"))

    // firebase
    implementation("com.google.firebase:firebase-admin:8.1.0")
}