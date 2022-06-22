import Injector from "../Injector";
import {Client, ClientOptions} from "discord.js";
import ModuleEngine from "../../module/ModuleEngine";
import * as env from "../../resources/env.json";

export default class InjectorImpl implements Injector {
    initializeModuleEngine = async (client: Client) : Promise<ModuleEngine> => {
        return new ModuleEngine(client, this);
    }

    createDiscordClient = async () => {
        const clientOptions = await this.loadConfiguration<ClientOptions>("clientOptions.json");
        const client = new Client(clientOptions);
        await client.login(env.token);
        return client;
    }


    loadConfiguration = async <T>(fileName: String) => {
        return require(`../../resources/${env.resourceRoot}/${fileName}`) as T;
    }

}