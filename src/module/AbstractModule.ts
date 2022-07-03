import Module from "./Module";
import {Client} from "discord.js";
import Injector from "../dependency/Injector";

export default abstract class AbstractModule implements Module {
    client!: Client
    injector!: Injector
    config!: any;

    abstract attach(): void;
    abstract detach(): void;
    abstract isEnabled(): boolean;

    autoInit(client: Client, injector: Injector) {
        this.client = client;
        this.injector = injector;
    }

    async loadConfig(): Promise<void> {
        console.log(`Loading config ${this.getConfigName()}`)
        this.config = this.injector.loadResource<any>(this.getConfigName());
    }

    getConfigName(): string {
        return "config.json";
    }

    async init() {
         await this.loadConfig()
    }

}