import Injector from "../Injector";
import { Client, ClientOptions } from "discord.js";
import ModuleEngine from "../../module/ModuleEngine";
import * as env from "../../resources/env.json";

export default class InjectorImpl implements Injector {

    initializeModuleEngine(client: Client) : ModuleEngine {
        return new ModuleEngine(client, this);
    }

    async createAndLoginClient() : Promise<Client> {
        const clientOptions = this.loadResource<ClientOptions>("clientOptions.json");
        console.log(`client options: ${clientOptions}`)
        
        const client = new Client(clientOptions);
        await client.login(env.token);
        return client;
    }


    loadResource<T>(fileName: String): T {
        return require(`../../resources/${env.resourceRoot}/${fileName}`) as T;
    }

}