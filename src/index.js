// Require the necessary discord.js classes
require("dotenv").config()
const { Client, Collection, GatewayIntentBits, InteractionType, ActivityType } = require("discord.js");
const fs = require('fs')

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMembers]})
client.commands = new Collection()

// When the client is ready, run this code (only once)

const commandFiles =  fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'))
const eventFiles =  fs.readdirSync('./src/events').filter(file => file.endsWith('.js'))

commandFiles.forEach(commandFile => {
	const command = require(`./commands/${commandFile}`)
	client.commands.set(command.data.name, command)
})

eventFiles.forEach(eventFile => {
    const event = require(`./events/${eventFile}`)
    client.on(event.name, (...args) => event.execute(...args))
})

client.once("ready", () => {
	console.log(`Ready! Logged in as ${client.user.tag}! I'm on ${client.guilds.cache.size} guild(s)!`)
    client.user.setActivity({name:'Boomunity', type: ActivityType.Playing})
})

client.on('interactionCreate', async (interaction) => {
    if(interaction.type !== InteractionType.ApplicationCommand) return

    const command = client.commands.get(interaction.commandName)

    if(command) {

        try {
            await command.execute(interaction)
        } catch(error) {
            console.error(error)

            if(interaction.deferrd || interaction.replied) {
                interaction.editReply('Es ist ein Fehler beim ausführen aufgetreten!')
            }else {
                interaction.reply('Es ist ein Fehler beim ausführen aufgetreten!')
            }
        }
    }
})

// Login to Discord with your client's token
client.login(process.env.DISCORD_BOT_TOKEN)