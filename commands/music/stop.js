const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: 'stop',
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
            return interaction.reply({ embeds: [embed]})
        }

        client.distube.stop(interaction)
        
	}
};