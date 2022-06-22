import Module from "./Module";
import {Client} from "discord.js";
import Injector from "../dependency/Injector";

export default class ModuleEngine {
    modules: Array<Module> = []
    client: Client;
    injector: Injector;

    constructor(client: Client, injector: Injector) {
        this.client = client;
        this.injector = injector;
    }

    async addModule(module:Module){
        module.setClient(this.client)
        module.setInjector(this.injector)
        await module.init()
        this.modules.push(module)
    }

    async removeModule(module:Module){
        this.modules = this.modules.filter(m => m != module)
    }

    async attach(){
        for (let module of this.modules) {
            if(module.isEnabled()) {
                console.log("Attaching module: " + module.constructor.name)
                module.attach()
            } else {
                console.log("Module is disabled")
                console.dir(module.config)
            }
        }
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