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
    // internal deps
    implementation(project(":rpg-portugal-core"))
    implementation(project(":rpg-portugal-configuration"))
    implementation(project(":rpg-portugal-jobs"))
    implementation(project(":rpg-portugal-logging"))
    // kotlin extensions
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.5.2")
    implementation("org.jetbrains.kotlinx:kotlinx-collections-immutable:0.3.4")
    implementation("io.arrow-kt:arrow-core:1.0.1")
    // DI
    implementation("com.google.dagger:dagger:2.40")
    annotationProcessor("com.google.dagger:dagger-compiler:2.40")
    // discord
    implementation("com.discord4j:discord4j-core:3.2.0")
}