const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../../config.json');

module.exports = {
	name: 'close',
	description: "Close the ticket",
    perms: ['ManageMessages'],
    options: [],
	run: async (client, interaction) => {
        try {
            const user = interaction.user;
            const name = interaction.options.getString('name');

            if(interaction.channel.parentId != config.ticket.category) {
                return interaction.reply({ content: `You can only do this in a ticket!`, ephemeral: true});
            }

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('ticket')
                        .setLabel('Close Ticket')
                        .setStyle(ButtonStyle.Danger),
                );

            return interaction.channel.send({context: "Do you really want to close the ticket?", components: [row]})
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: `Sorry, something went wrong.... Please try again!\nDoes this happen often? Please contact Niek#0391!`, ephemeral: true });
        }
	}
};
