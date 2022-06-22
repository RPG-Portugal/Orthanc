import {Client} from "discord.js";
import Injector from "../dependency/Injector";

export default interface Module {
    injector: Injector
    client: Client

    autoInit(client: Client, injector: Injector): void

    init(): Promise<void>
    attach(): void
    detach() : void
    isEnabled() : boolean
}


