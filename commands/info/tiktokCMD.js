const config = require('../../config.json');

module.exports = {
	name: 'tiktok',
	description: "Get our tiktok from the server.",
    perms: [],
    options: [],
	run: async (client, interaction) => {
        try {
            interaction.reply({content: "Our tiktok is: `" + config.infoCommands.tiktok + "`."})
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: `Sorry, something went wrong.... Please try again!\nDoes this happen often? Please contact Niek#0391!`, ephemeral: true });
        }
	}
};
