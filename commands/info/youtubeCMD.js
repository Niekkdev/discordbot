const config = require('../../config.json');

module.exports = {
	name: 'youtube',
	description: "Get the youtube channel from our server.",
    perms: [],
    options: [],
	run: async (client, interaction) => {
        try {
            interaction.reply({content: "Our YouTube channel is: `" + config.infoCommands.youtube + "`."})
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: `Sorry, something went wrong.... Please try again!\nDoes this happen often? Please contact Niek#0391!`, ephemeral: true });
        }
	}
};
