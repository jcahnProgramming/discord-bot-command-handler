class SlashCommands {
    constructor(client) {
        this._client = client
    }

    async getCommands(guildId) {
        //Guild-Based -- registers as soon as bot is started
        //Global-Based -- takes up to 1hr to register globally

        let commands

        if (guildId) {
            const guild = await this._client.guilds.fetch(guildId)
            commands = guild.commands

        } else {
            commands = this._client.application.commands
        }

        await commands.fetch()

        return commands
    }

    async create(name, description, options, guildId) {
        const commands = await this.getCommands(guildId)

        const existingCommand = commands.cache.find((cmd) => cmd.name === name)
        if (existingCommand) {
            //TODO: update this slash command
            console.log(`Ignoring command "${name}" because it already exists`)
            return
        }

        await commands.create({
            name,
            description,
            options,
        })
    }
}

module.exports = SlashCommands