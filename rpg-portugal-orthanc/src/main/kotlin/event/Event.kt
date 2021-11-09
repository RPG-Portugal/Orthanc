package org.rpgportugal.orthanc.event

import discord4j.core.GatewayDiscordClient
import discord4j.core.event.domain.Event
import reactor.core.Disposable

object Event {
    inline infix fun <reified E: Event> GatewayDiscordClient.handle(crossinline handler: (E) -> Unit): Disposable =
        on(E::class.java).subscribe { handler(it) }
}

typealias Handler<E> = (GatewayDiscordClient, E) -> Unit

