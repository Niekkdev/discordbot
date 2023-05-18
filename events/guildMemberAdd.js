const { EmbedBuilder } = require("discord.js");
const config = require('../config.json');

module.exports = (client) => {
    client.on('guildMemberAdd', async member => {
        const channel = client.channels.cache.get(config.channels.welcome);

        let embed = new EmbedBuilder()
        .setTitle(member.guild.name)
        .setColor(config.bot.color)
        .setThumbnail(member.guild.iconURL({ size: 4096, dynamic: true }))
        .setFooter({text: `All rights reserved`})
        .setTimestamp()
        .setDescription(`Welcome <@${member.user.id}> (Your text) <#channel id> (Your text) <#channel id>.\n\nThere are now **${member.guild.memberCount}** members in our discord!\n`);
        channel.send({ embeds: [embed]});

        let newrol = member.guild.roles.cache.find(r => r.id === config.roles.new);
        member.roles.add(newrol)
    });
};