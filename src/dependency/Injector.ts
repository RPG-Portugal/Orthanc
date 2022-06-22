import {Client} from "discord.js";
import ModuleEngine from "../module/ModuleEngine";

export default interface Injector {
    loadResource<T>(fileName: String): T
    initializeModuleEngine(client: Client): ModuleEngine
    createLoggedClient(): Promise<Client>
}
