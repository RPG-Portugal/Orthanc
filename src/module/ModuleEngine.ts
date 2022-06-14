import Module from "./Module";
import {Client} from "discord.js";

export default class ModuleEngine {
    modules: Array<Module> = []
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    addModule(module:Module){
        this.modules.push(module)
    }
    removeModule(module:Module){
        this.modules = this.modules.filter(m => m != module)
    }

    attach(){
        for (let module of this.modules) {
            if(module.isEnabled()) {
                console.log("Attaching module: " + module.constructor.name)
                module.attach(this.client)
            }
        }
    }
    attachModule(module: Module){
        module.attach(this.client)
    }
    detach(){
        for (let module of this.modules) {
            module.detach(this.client)
        }
    }
    detachModule(module: Module){
        module.detach(this.client)
    }
}