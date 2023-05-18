const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials } = require('discord.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildPresences, 
        GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates
	],
	Partials: [
		Partials.Channel,
		Partials.Message
	]
});

const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest')
const fs = require("fs");

const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

const config = require('./config.json');
const rest = new REST({ version: '9' }).setToken(config.bot.token);

client.commands = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection();
const slashCommands = []; 

client.distube = new DisTube(client, {
	leaveOnStop: false,
	emitNewSongOnly: true,
	emitAddSongWhenCreatingQueue: false,
	emitAddListWhenCreatingQueue: false,
	plugins: [
	  new SpotifyPlugin({
		emitEventsAfterFetching: true
	  }),
	  new SoundCloudPlugin(),
	  new YtDlpPlugin()
	]
});

fs.readdirSync('./events/').filter((file) => file.endsWith('.js')).forEach((event) => {
    require(`./events/${event}`)(client);
})

fs.readdirSync('./commands/').forEach(async dir => {
	const files = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));

	for(const file of files) {
		const slashCommand = require(`./commands/${dir}/${file}`);
		slashCommands.push({
			name: slashCommand.name,
			description: slashCommand.description,
			options: slashCommand.options ? slashCommand.options : null,
			perms: slashCommand.default_member_permissions ? PermissionsBitField.resolve(slashCommand.default_member_permissions).toString() : null
		});
		if(slashCommand.name) {
			client.slashCommands.set(slashCommand.name, slashCommand)
        };
    }
});


(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(config.bot.clientid, config.guildid),
			{ body: slashCommands }
		);
	} catch (error) {
	    console.log(error);
	}
})();



module.exports = client;

client.login(config.bot.token).then(() => {
    console.log(`Discord bot logged in under the name ${client.user.tag}!`);
}).catch(err => {
    console.log(err);
});
