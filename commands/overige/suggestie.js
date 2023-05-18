const config = require('../../config.json');
const { EmbedBuilder } = require('discord.js')

module.exports = {
	name: 'suggest',
	description: "Post your suggestion in our suggestion channel",
    perms: [],
    options: [
        {
            name: 'suggestion',
            description: 'Try to describe your suggestion as clearly as possible.',
            type: 3,
            required: true,
        }
    ],
	run: async (client, interaction) => {
        try {
            let channel = client.channels.cache.get(config.channels.suggestie);
            let suggest = interaction.options.getString('suggestion')

            let embedje = new EmbedBuilder()
            .setTitle(`✅ Your name — suggestion`)
            .setDescription(`\`${suggest}\``)
            .setColor(config.bot.color)
            .setThumbnail(`${interaction.user.displayAvatarURL({ size: 4096, dynamic: true })}`)
            .setFooter({ text: `Idea of: ${interaction.user.username}`, iconURL: interaction.guild.iconURL({ size: 4096, dynamic: true}) })
            .setTimestamp()

            channel.send({ embeds: [embedje]}).then(idee => {
                idee.react('⬆️');
                idee.react('⬇️');
            });
            
            interaction.reply({ content: "Thank you for sending your suggestion!", ephemeral: true});

        } catch (error) {
            console.error(error);
            return interaction.reply({ content: `Sorry, something went wrong.... Please try again!\nDoes this happen often? Please contact Niek#0391!`, ephemeral: true });
        }
	}
};
