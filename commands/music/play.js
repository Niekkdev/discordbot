const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'play',
	description: "Play music.",
	cooldown: 9000,
	perms: [],
    options: [
        {
            name: 'number',
            description: 'The song you want to play',
            type: 3,
            required: true,
        },
    ],
	run: async (client, interaction) => {

        if (!interaction.member.voice.channel) {
            let embed = new EmbedBuilder()
            .setTitle("You must be in a voice channel!")
            .setColor('RED')
            .setTimestamp()
            return interaction.reply({ embeds: [embed]})
        }

        let member = interaction.guild.members.cache.find(member => member.id === interaction.user.id);
        let song = interaction.options.getString('number')
        client.distube.play(member.voice.channel, song, { 
            volume: 1.0, 
            textChannel: interaction.channel, 
            member: member,
            metadata: {
                interaction: interaction
            } 
        });
                
	}
};