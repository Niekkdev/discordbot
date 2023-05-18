const { EmbedBuilder } = require('discord.js');
const config = require('../../config.json');


module.exports = {
	name: 'clear',
	description: "Delete x number of messages.",
    perms: ['ManageMessages'],
    options: [
        {
            name: 'amount',
            description: 'The number of messages you want to delete!',
            type: 4,
            required: true,
        }
    ],


	run: async (client, interaction) => {
        try {
            const user = interaction.user;
            const amount = interaction.options.getInteger('aantal');

            await interaction.channel.bulkDelete(amount, true).then((messages) => {
                interaction.reply({ content: `\`${messages.size}\` Berichten verwijderd!`, ephemeral: true });
            });

        } catch (error) {
            console.error(error);
            return interaction.reply({ content: `Sorry, something went wrong.... Please try again!\nDoes this happen often? Please contact Niek#0391!`, ephemeral: true });
        }
	}
};
