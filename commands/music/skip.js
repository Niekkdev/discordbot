const { EmbedBuilder, Embed } = require("discord.js");

module.exports = {
	name: 'skip',
	description: "Play music.",
	cooldown: 9000,
	perms: [],
    options: [],
	run: async (client, interaction) => {
        let queue = client.distube.getQueue(interaction);
        if(queue == null) {
            let embed = new EmbedBuilder()
            .setTitle("The queue is empty!")
            .setColor('RED')
            .setTimestamp()
            return interaction.reply({ embeds: [embed]});
        }

        client.distube.skip(interaction);
        let sucEmbed = new EmbedBuilder()
        .setTitle('⏩ Music — Skipped')
        .setDescription('The song is skipped, The next song is started!')
        .setColor(config.bot.color)
        .setTimestamp();
        return interaction.reply({ embeds: [sucEmbed]});

        
	}
};