import * as env from "../resources/env.json"
import Injector from "./Injector";

export default {
    create: (): Injector => {
        console.log(`Loading injector: ${env.injectorClass}`)
        return new (require(`./impl/${env.injectorClass}`).default);
    }
}