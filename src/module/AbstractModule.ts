import Module from "./Module";
import {Client} from "discord.js";
import Injector from "../dependency/Injector";

export default abstract class AbstractModule implements Module {
    client!: Client
    injector!: Injector

    abstract attach(): void;
    abstract detach(): void;
    abstract isEnabled(): boolean;
    abstract init(): Promise<void>;

    autoInit(client: Client, injector: Injector) {
        this.client = client;
        this.injector = injector;
    }
}