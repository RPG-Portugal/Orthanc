import {Client} from "discord.js";
import ModuleEngine from "../module/ModuleEngine";

export default interface Injector {
    loadConfiguration: <T>(fileName: String) => Promise<T>
    initializeModuleEngine: (client: Client ) => Promise<ModuleEngine>
    createDiscordClient: () => Promise<Client>
}
