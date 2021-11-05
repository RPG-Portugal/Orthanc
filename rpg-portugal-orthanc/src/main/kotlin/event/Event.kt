package org.rpgportugal.orthanc.event

import discord4j.core.GatewayDiscordClient
import discord4j.core.event.domain.Event
import kotlin.reflect.KClass

typealias RegisterEvent = (GatewayDiscordClient) -> Unit

object Event {
    infix fun <E: Event> KClass<E>.subscribe(handler: (E) -> Unit) : RegisterEvent =
        { it.on(this.java).subscribe(handler) }

}

