const { EmbedBuilder, PermissionsBitField, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { bugModal, avModal, rpModal, solliModal, unModal, ticketmenu} = require('../messages')
const { createTicket, db } = require('../functions')
const config = require('../config.json');

module.exports = (client) => {
    client.on('interactionCreate', async interaction => {
        const slashCommand = client.slashCommands.get(interaction.commandName);
        if(!slashCommand) return client.slashCommands.delete(interaction.commandName);
        try {
            if(slashCommand.perms) {
                if(!interaction.memberPermissions.has(PermissionsBitField.resolve(slashCommand.perms || []))) {
                    const noPerms = new EmbedBuilder()
                    .setDescription(`🚫 │ You do not have access to this command!`)
                    .setColor('Red')
                    return interaction.reply({ embeds: [noPerms], ephemeral: true })
                }
            }
            await slashCommand.run(client, interaction);
        } catch (error) {
            console.log(error);
        }
    });

    client.on('interactionCreate', async interaction => {
        if (interaction.isSelectMenu()) {
    
            if (interaction.customId === 'tickets') {
                if(!interaction.values.length < 1) {
                    if(interaction.values.includes("SOL")) {
                        await interaction.showModal(solliModal);
                        await interaction.editReply({ components: [ticketmenu] });
                    }
                    if(interaction.values.includes("BUG")) {
                        await interaction.showModal(bugModal);
                        await interaction.editReply({ components: [ticketmenu] });
                    }
                    if(interaction.values.includes("AGV")) {
                        await interaction.showModal(avModal);
                        await interaction.editReply({ components: [ticketmenu] });
                    }
                    if(interaction.values.includes("PRP")) {
                        await interaction.showModal(rpModal);
                        await interaction.editReply({ components: [ticketmenu] });
                    }
                    if(interaction.values.includes("UBN")) {
                        await interaction.showModal(unModal);
                        await interaction.editReply({ components: [ticketmenu] });
                    }
                }
            }
        }
        if (interaction.isModalSubmit()) {
            switch(interaction.customId) {
                case 'solliModal':
                    createTicket(interaction, "Your ticket name");
                    break;
                case 'avModal':
                    createTicket(interaction, "Your ticket name");
                    break;
                case 'rpModal':
                    createTicket(interaction, "Your ticket name");
                    break;
                case 'bugModal':
                    createTicket(interaction, "Your ticket name");
                    break;
                case 'unModal':
                    createTicket(interaction, "Your ticket name");
                    break;
            }
        }
    });

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('closeticket')
                .setLabel('Close Ticket')
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId('openticket')
                .setLabel('Reopen Ticket')
                .setStyle(ButtonStyle.Primary),
        );
        
    client.on('interactionCreate', async interaction => {
        if (interaction.isButton()) {
            if (interaction.customId === 'ticket') {
                if(interaction.channel.parentId != config.ticket.category) {
                    return interaction.reply({ content: `You can only do this in a ticket!`, ephemeral: true});
                }
                interaction.channel.lockPermissions()
                interaction.reply({ components: [row]});
            };
            if (interaction.customId === 'openticket') {
                if(interaction.channel.parentId != config.ticket.category) {
                    return interaction.reply({ content: `You can only do this in a ticket!`, ephemeral: true});
                }
                interaction.channel.permissionOverwrites.edit(interaction.channel.topic, { ViewChannel: true });
                return interaction.reply({ content: "<@" + interaction.channel.topic + "> your ticket has been reopened by <@" + interaction.user.id + ">"});
            };

            if (interaction.customId === 'closeticket') {
                if(interaction.channel.parentId != config.ticket.category) {
                    return interaction.reply({ content: `You can only do this in a ticket!`, ephemeral: true});
                }
                return interaction.channel.delete();
            };

        }
    });
};