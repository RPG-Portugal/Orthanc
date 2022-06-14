import {Client} from "discord.js";

export default interface Module {
    attach: (client: Client) => void
    detach: (client: Client) => void
    isEnabled: () => boolean
}


