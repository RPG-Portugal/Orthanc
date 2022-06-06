//TODO: Use a configuration interface instead of it being of type Any
interface CleanRolesJob {
    cron: string,
    roles: Array<string>
}

interface ClientOptions {
    intents: Array<string>
}

export interface OrthancConfig {
    token: string,
    guildId: string,
    linkRegex: string,
    warnChannelId: string,
    clientOptions: ClientOptions,
    cleanRolesJob: CleanRolesJob
}