import {Client} from "discord.js";
import Injector from "../dependency/Injector";

export default interface Module {
    injector: Injector
    client: Client
    config: any
    init: () => void
    attach: () => void
    detach: () => void
    isEnabled: () => boolean

    setClient: (client: Client) => void
    setInjector: (injector: Injector) => void
}


