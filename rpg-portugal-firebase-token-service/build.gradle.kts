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
    // internal deps
    implementation(project(":rpg-portugal-core"))
    implementation(project(":rpg-portugal-configuration"))
    implementation(project(":rpg-portugal-jobs"))
    implementation(project(":rpg-portugal-logging"))
    implementation(project(":rpg-portugal-firebase"))
    // TODO: setup Ktor (investigate if a module such as 'rpg-portugal-web' is needed
}