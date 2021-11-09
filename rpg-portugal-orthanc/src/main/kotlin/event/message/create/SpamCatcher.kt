package org.rpgportugal.orthanc.event.message.create

import discord4j.core.event.domain.message.MessageCreateEvent

object SpamCatcher {
    val linkRegex = Regex("", setOf(RegexOption.IGNORE_CASE))

    fun handlerEvent(event: MessageCreateEvent) {

    }
}