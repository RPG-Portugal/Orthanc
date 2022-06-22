import Module from "./Module";
import {Client} from "discord.js";
import Injector from "../dependency/Injector";

export default abstract class AbstractModule implements Module{

    client!: Client
    injector!: Injector
    config: any

    abstract attach(): void;
    abstract detach(): void;

    abstract isEnabled(): boolean;

    setClient(client: Client): void {
        this.client = client;
    }

    setInjector(injector: Injector): void {
        this.injector = injector;
    }

    async init() {
        this.config = await this.injector.loadConfiguration("config.json")
    }

}