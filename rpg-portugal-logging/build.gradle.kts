
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
    api("org.slf4j:slf4j-api:1.7.+")
    api("org.slf4j:slf4j-log4j12:1.7.+")

    testImplementation("org.junit.jupiter:junit-jupiter-api:5.3.1")
    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine:5.3.1")
    testCompileOnly ("org.junit.jupiter:junit-jupiter:5.6.0")
}

tasks.test {
    useJUnitPlatform()
}