const fs = require('fs');
const {
    MessageEmbed,
    Client,
    Collection,
    Intents
} = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');


const Enmap = require('enmap')

const client = new Client({
    
    intents: ['GUILD_MESSAGES', 'GUILD_INTEGRATIONS', 'GUILDS', 'GUILD_MEMBERS','GUILD_VOICE_STATES','GUILD_MESSAGE_REACTIONS'],
    
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const oauth = require('./oauthData.js');
console.log(oauth)
client.oauth = oauth
console.log(client.oauth)
const { Player } = require('discord-player');
const config = require('./config.json');
client.player = new Player(client);
client.config = require('./config/bot');
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.config = config;

    client.commands = new Collection();
Object.assign(client, Enmap.multi(["setup", "moderation", "vip", "points"]));

client.embedMention = new MessageEmbed()
    .setTitle("❌ **Mention a member or specify an ID.**")
    .setColor('ff0000');
client.embedReason = new MessageEmbed()
    .setTitle("❌ **Please specify a reason for this actions**")
    .setColor('ff0000');
client.embedNoConfig = new MessageEmbed()
    .setTitle("❌ **This server never ran a setup before.**")
    .setColor('ff0000');
client.embedPerm = new MessageEmbed()
    .setTitle("❌ **You do not possess the permisions to do that.**")
    .setColor('ff0000');
client.embedNoRole = new MessageEmbed()
    .setTitle('❌ Wrong role name/id provided')
    .setColor('ff0000');

//!client.moderation.has(guildID, `punishments.${userID}.numberOfPunishment`)) {

client.addPunishment = async function (guildID, userID, action, reason, duration, author) {

    if (client.moderation.has(guildID) && client.moderation.has(guildID, `Count`)) {
        let ID = parseInt(client.moderation.get(guildID, 'Count')) + 1;
        const data2 = client.moderation.get(guildID)
        client.moderation.set(guildID, {
            ...data2,
            Count: ID
        })


        client.moderation.set(guildID, {

            Command: action,
            Reason: reason,
            author: author,
            banTime: Date.now(),
            PunishmentID: `${ID}`,
            Duration: duration


        }, `punishments.${userID}.X${ID}`)
    } else {
        const data = client.moderation.get(guildID)
        client.moderation.set(guildID, {
            ...data,
            Count: '1'
        })
        client.moderation.set(guildID, {
            Command: action,
            Reason: reason,
            author: author,
            banTime: Date.now(),
            PunishmentID: `1`,
            Duration: duration


        }, `punishments.${userID}.X1`)
    }

}
client.getPunishment = async function (guildID, userID, array, iterable) {
    let userInfractions = await client.moderation.get(guildID, `punishments.${userID}`)
    let namesArray = []
    let number = 0
    // console.log(Object.entries(userInfractions))
    for (const infraction of Object.keys(userInfractions)) {
        namesArray.push(infraction)
    }
    while (namesArray.length >= 1) {
        number++
        array.push(client.moderation.get(guildID, `punishments.${userID}.${namesArray[0]}.Command`))
        array.push(client.moderation.get(guildID, `punishments.${userID}.${namesArray[0]}.Reason`))
        array.push(client.moderation.get(guildID, `punishments.${userID}.${namesArray[0]}.author`))
        array.push(client.moderation.get(guildID, `punishments.${userID}.${namesArray[0]}.banTime`))
        array.push(client.moderation.get(guildID, `punishments.${userID}.${namesArray[0]}.PunishmentID`))
        array.push(client.moderation.get(guildID, `punishments.${userID}.${namesArray[0]}.Duration`))


        namesArray.shift()
    }


    iterable.push(number)

}
client.getOnePunishment = async function (guildID, userID, array, sanctionID) {

    array.push(client.moderation.get(guildID, `punishments.${userID}.X${sanctionID}.Command`))
    array.push(client.moderation.get(guildID, `punishments.${userID}.X${sanctionID}.Reason`))
    array.push(client.moderation.get(guildID, `punishments.${userID}.X${sanctionID}.author`))
    array.push(client.moderation.get(guildID, `punishments.${userID}.X${sanctionID}.banTime`))
    array.push(client.moderation.get(guildID, `punishments.${userID}.X${sanctionID}.PunishmentID`))
    array.push(client.moderation.get(guildID, `punishments.${userID}.X${sanctionID}.Duration`))

}



//                              //
//              EVENT           //
//                              // 








let slashCommands = []
client.slashCommands = new Collection();
const slashCommandFiles = fs.readdirSync('./slash').filter(file => file.endsWith('.js'));

for (const file of slashCommandFiles) {
	const command = require(`./slash/${file}`);
    slashCommands.push(command.data.toJSON())
	client.slashCommands.set(command.data.name,command);
}

const rest = new REST({ version: '9' }).setToken(config.token);
(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands('799015338527817758','634038035264176138'),
			{ body: slashCommands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();







fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(async file => {

        if (!file.endsWith(".js")) return;

        const event = await require(`./events/${file}`);

        let eventName = file.split(".")[0];

        client.on(eventName, event.bind(null, client));
    });
});
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));
for (const file of player) {
    console.log(`Loading discord-player event ${file}`);
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};





const commandFolders = fs.readdirSync('./commands').filter(folder => folder);

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {

        const command = require(`./commands/${folder}/${file}`)
        console.log(`[${folder}]Loaded module ${file}`)
        client.commands.set(command.name, command);
    }
}

client.on('warn', (e) => console.log(e));



process.on('unhandledRejection', error => {
    console.log(error.stack);
});

client.login(config.token);
