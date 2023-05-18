const config = require('../../config.json');

module.exports = {
	name: 'shop',
	description: "Get the shop from the server!",
    perms: [],
    options: [],
	run: async (client, interaction) => {
        try {
            interaction.reply({content: "Our shop is: `" + config.infoCommands.shop + "`."})
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: `Sorry, something went wrong.... Please try again!\nDoes this happen often? Please contact Niek#0391!`, ephemeral: true });
        }
	}
};
