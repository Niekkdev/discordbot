const { EmbedBuilder } = require('discord.js');
const config = require('../../config.json');


module.exports = {
	name: 'embed',
	description: "Place a message in an embed!",
    perms: ['ManageMessages'],
    options: [
        {
            name: 'Channel',
            description: 'Channel you want to announce it in',
            type: 7,
            required: true,
        },
        {
            name: 'title',
            description: 'The title of the message.',
            type: 3,
            required: true,
        },
        {
            name: 'message',
            description: 'The message you want The message you want to send.',
            type: 3,
            required: true,
        }
    ],


	run: async (client, interaction) => {
        try {
            const user = interaction.user;
        
            const channel = interaction.options.getChannel('kanaal');
            const title = interaction.options.getString('title');
            const message = interaction.options.getString('bericht');

            let embed = new EmbedBuilder()
                .setTitle(`${title}`)
                .setDescription(message)
                .setColor(config.bot.color)
                .setThumbnail(interaction.guild.iconURL({ size: 4096, dynamic: true }))
                .setFooter({ text: `Your name`, iconURL: `${user.displayAvatarURL({ size: 4096, dynamic: true })}`})
                .setTimestamp()

            channel.send({ embeds: [embed]});

            interaction.reply({
                content: "Message sent!",
                ephemeral: true,
            });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: `Sorry, something went wrong.... Please try again!\nDoes this happen often? Please contact Niek#0391!`, ephemeral: true });
        }
	}
};
