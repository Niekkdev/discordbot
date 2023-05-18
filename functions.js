const { PermissionsBitField, ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require("./config.json");
const mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    port: 'no port',
    user: 'no user',
    password: 'no password',
    database: 'no database name',
    multipleStatements: true
});

db.connect(
    function(err) {
        if (err) {
            console.error('DB: Error:' + err.stack);
            return;
        }
        db.query('SELECT 1', function (error) {
        if (error) throw error;
        console.log("DB: Connection succeeded!");
    })
    console.log('DB: Connect ID: ' + db.threadId);
});

async function createTicket(interaction, type) {
    let embed;
    switch(type) {
        case "Sollicitatie":
            embed = new EmbedBuilder()
                .setTitle(`Sollicitatie van ${interaction.user.username}`)
                .setDescription('*Information entered in the creation form*\n\n**Name:**\n`' + interaction.fields.getTextInputValue('solliName') + '`\n**Function:**\n`' + interaction.fields.getTextInputValue('solliWhy') + '`\n**Experience:**\n`' + interaction.fields.getTextInputValue('solliExperience') + '`\n')
                .setColor(config.bot.color)
                .setThumbnail(interaction.guild.iconURL({ size: 4096, dynamic: true }))
                .setFooter({ text: `Type a name`, iconURL: `${interaction.user.displayAvatarURL({ size: 4096, dynamic: true })}`})
                .setTimestamp()
            break;
        case "Overige":
            embed = new EmbedBuilder()
                .setTitle(`Question of ${interaction.user.username}`)
                .setDescription('*Information entered in the creation form*\n\n**Name:**\n`' + interaction.fields.getTextInputValue('avName') + '`\n**Problem/Question:**\n`' + interaction.fields.getTextInputValue('avQuestion') + '`\n')
                .setColor(config.bot.color)
                .setThumbnail(interaction.guild.iconURL({ size: 4096, dynamic: true }))
                .setFooter({ text: `Type a name`, iconURL: `${interaction.user.displayAvatarURL({ size: 4096, dynamic: true })}`})
                .setTimestamp()
            break;
        case "Player Report":
            embed = new EmbedBuilder()
                .setTitle(`Question of ${interaction.user.username}`)
                .setDescription('*Information entered in the creation form*\n\n**Your name:**\n`' + interaction.fields.getTextInputValue('rpName') + '`\n**Player in Question:**\n`' + interaction.fields.getTextInputValue('rpPlayer') + '`\n**Reason?**\n`' + interaction.fields.getTextInputValue("rpReason") + '`\n')
                .setColor(config.bot.color)
                .setThumbnail(interaction.guild.iconURL({ size: 4096, dynamic: true }))
                .setFooter({ text: `Type a name`, iconURL: `${interaction.user.displayAvatarURL({ size: 4096, dynamic: true })}`})
                .setTimestamp()
            break;
        case "Bug Report":
            embed = new EmbedBuilder()
                .setTitle(`Question of ${interaction.user.username}`)
                .setDescription('*Information entered in the creation form*\n\n**Name:**\n`' + interaction.fields.getTextInputValue('bugName') + '`\n**Bug:**\n`' + interaction.fields.getTextInputValue('bugWrong') + '`\n')
                .setColor(config.bot.color)
                .setThumbnail(interaction.guild.iconURL({ size: 4096, dynamic: true }))
                .setFooter({ text: `Type a name`, iconURL: `${interaction.user.displayAvatarURL({ size: 4096, dynamic: true })}`})
                .setTimestamp()
            break;
        case "Unban Aanvraag":
            embed = new EmbedBuilder()
                .setTitle(`Question of ${interaction.user.username}`)
                .setDescription('*Information entered in the creation form*\n\n**Name:**\n`' + interaction.fields.getTextInputValue('unName') + '`\n**Why?:**\n`' + interaction.fields.getTextInputValue('unWhy') + '`\n')
                .setColor(config.bot.color)
                .setThumbnail(interaction.guild.iconURL({ size: 4096, dynamic: true }))
                .setFooter({ text: `Type a name`, iconURL: `${interaction.user.displayAvatarURL({ size: 4096, dynamic: true })}`})
                .setTimestamp()
            break;
        default:
            break;
    }

    interaction.guild.channels.create({
        name: `ticket-${interaction.user.username}`,
        topic: `${interaction.user.id}`,
        type: ChannelType.GuildText,
        parent: config.ticket.category,
        permissionOverwrites: [{
            id: interaction.user.id,
            allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory],
          },
          {
            id: config.roles.support,
            allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory],
          },
          {
            id: interaction.guild.roles.everyone,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
        ],
      }).then(async c => {
        interaction.reply({content: `Your ticket has been created! <#${c.id}>`, ephemeral: true});
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('ticket')
                .setLabel('Close Ticket')
                .setStyle(ButtonStyle.Danger),
        );
        c.send({ content: `<@` + interaction.user.id + `> one of us <@&` + config.roles.support + `> will help you as soon as possible!`, components: [row], embeds: [embed]});
    });
};


module.exports = {
    createTicket,
    db
}
