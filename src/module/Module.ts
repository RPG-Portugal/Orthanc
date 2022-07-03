import {Client} from "discord.js";
import Injector from "../dependency/Injector";

export default interface Module {
    injector: Injector
    client: Client
    config: any

    autoInit(client: Client, injector: Injector): void

    init(): Promise<void>
    attach(): void
    detach() : void
    isEnabled() : boolean
}


