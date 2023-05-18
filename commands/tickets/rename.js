const { EmbedBuilder } = require('discord.js');
const config = require('../../config.json');


module.exports = {
	name: 'rename',
	description: "Rename a ticket",
    perms: ['ManageMessages'],
    options: [
        {
            name: 'name',
            description: 'The name in which you want to change the ticket name',
            type: 3,
            required: true,
        }
    ],


	run: async (client, interaction) => {
        try {
            const user = interaction.user;
            const name = interaction.options.getString('name');

            if(interaction.channel.parentId != config.ticket.category) {
                return interaction.reply({ content: `You can only do this in a ticket!`, ephemeral: true});
            }

            interaction.channel.setName(name);

            let embed = new EmbedBuilder()
                .setTitle(`Name changed!`)
                .setDescription('The name of the ticket has been changed to `' + name + '`!')
                .setColor(config.bot.color)
                .setThumbnail(interaction.guild.iconURL({ size: 4096, dynamic: true }))
                .setFooter({ text: `Your name`, iconURL: `${user.displayAvatarURL({ size: 4096, dynamic: true })}`})
                .setTimestamp()

            interaction.reply({embeds: [embed]});
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: `Sorry, something went wrong.... Please try again!\nDoes this happen often? Please contact Niek#0391!`, ephemeral: true });
        }
	}
};
