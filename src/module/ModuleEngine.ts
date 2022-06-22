import Module from "./Module";
import {Client} from "discord.js";
import Injector from "../dependency/Injector";

export default class ModuleEngine {
    private modules: Array<Module> = []

    private readonly client: Client;
    private readonly injector: Injector;

    constructor(client: Client, injector: Injector) {
        this.client = client;
        this.injector = injector;
    }

    async start() : Promise<ModuleEngine> {
        for (const module of this.modules) {
            const name = module.constructor.name;

            console.log(`Initializing module: ${name}...`);
            module.autoInit(this.client, this.injector);

            console.log(`Initializing module dependencies: ${name}...`);
            await module.init();

            console.log(`Checking if module ${name} is active...`);
            if(module.isEnabled()) {
                console.log(`Attaching module: ${name}...`);
                await this.attachModule(module);
            } else {
                console.log(`Module ${name} is disabled`);
            }
        }
        return this;
    }

    addModule(module:Module) : ModuleEngine {
        this.modules.push(module)
        return this;
    }

    removeModule(module:Module) : ModuleEngine {
        this.modules = this.modules.filter(m => m != module)
        return this;
    }

    async attachModule(module: Module){
        module.attach()
    }

    async detach(){
        for (let module of this.modules) {
            module.detach()
        }
    }
    async detachModule(module: Module){
        module.detach()
    }
}