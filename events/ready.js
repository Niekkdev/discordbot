const config = require('../config.json');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } =require('discord.js')
const { ticketmenu } = require("../messages")
module.exports = (client) => {
    client.on("ready", () => {
        client.user.setActivity("Your name", { type: 0 });
        client.user.setStatus('online');

        let channel = client.channels.cache.get(config.ticket.panelchannel);
        let dcstat = client.channels.cache.get(config.channels.dcstats);
        let guild = client.guilds.cache.get(config.guildid);

        setInterval(() => {
            dcstat.setName(`👋 │ Members: ${guild.memberCount}`)
        }, 10000);

        let embed = new EmbedBuilder()
            .setTitle(`🎫| Create a ticket`)
            .setDescription('Your text')
            .setColor(config.bot.color)
            .setThumbnail(guild.iconURL({ size: 4096, dynamic: true }))
            .setFooter({ text: `Your name`, iconURL: guild.iconURL({ size: 4096, dynamic: true })})
        
        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('ticket')
					.setLabel('🎟️')
					.setStyle(ButtonStyle.Primary),
			);
    
        //channel.send({ embeds: [embed], components: [ticketmenu] });
    });
};