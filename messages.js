const { ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');


const ticketmenu = new ActionRowBuilder()
    .addComponents(
        new SelectMenuBuilder()
            .setCustomId('tickets')
            .setPlaceholder('Selecteer een category over uw Ask!')
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions([
                {
                    label: 'Choose a name',
                    description: 'Choose a lore',
                    emoji: {
                        name: '❓',
                    },
                    value: 'AGV'
                },
                {
                    label: 'Choose a name',
                    description: 'Choose a lore',
                    emoji: {
                        name: '💰',
                    },
                    value: 'BUG'
                },
                {
                    label: 'Choose a name',
                    description: 'Choose a lore',
                    emoji: {
                        name: '📄',
                        },
                    value: 'PRP'
                },
                {
                    label: 'Choose a name',
                    description: 'Choose a lore',
                    emoji: {
                        name: '📄',
                        },
                    value: 'SOL'
                },
                {
                    label: 'Choose a name',
                    description: 'Choose a lore',
                    emoji: {
                        name: '📄',
                        },
                    value: 'UBN'
                },
            ])
    )

const avModal = new ModalBuilder()
    .setCustomId('avModal')
    .setTitle('Request ticket opening.');

const avName = new TextInputBuilder()
    .setCustomId('avName')
    .setLabel("What is your name?")
    .setStyle(TextInputStyle.Short);

const avAsk = new TextInputBuilder()
    .setCustomId('avAsk')
    .setLabel("Describe your question/problem")
    .setStyle(TextInputStyle.Paragraph);

const avRow1 = new ActionRowBuilder()
    .addComponents(avName);

const avRow2 = new ActionRowBuilder()
    .addComponents(avAsk);

avModal.addComponents(avRow1, avRow2);

const unModal = new ModalBuilder()
    .setCustomId('unModal')
    .setTitle('Request ticket opening.');

const unName = new TextInputBuilder()
    .setCustomId('unName')
    .setLabel("What is your name?")
    .setStyle(TextInputStyle.Short);

const unWhy = new TextInputBuilder()
    .setCustomId('unWhy')
    .setLabel("Why should you get unban,")
    .setStyle(TextInputStyle.Paragraph);

const unRow1 = new ActionRowBuilder()
    .addComponents(unName);

const unRow2 = new ActionRowBuilder()
    .addComponents(unWhy);

unModal.addComponents(unRow1, unRow2);

const rpModal = new ModalBuilder()
    .setCustomId('rpModal')
    .setTitle('Open Player Report ticket.');

const rpName = new TextInputBuilder()
    .setCustomId('rpName')
    .setLabel("What's your name?")
    .setStyle(TextInputStyle.Short);

const rpPlayer = new TextInputBuilder()
    .setCustomId('rpPlayer')
    .setLabel("Purchase failed?")
    .setStyle(TextInputStyle.Short);

const rpReason = new TextInputBuilder()
    .setCustomId('rpReason')
    .setLabel("Purchase failed")
    .setStyle(TextInputStyle.Paragraph);

const rpRow1 = new ActionRowBuilder()
    .addComponents(rpName);

const rpRow2 = new ActionRowBuilder()
    .addComponents(rpPlayer);
    
const rpRow3 = new ActionRowBuilder()
    .addComponents(rpReason);

rpModal.addComponents(rpRow1, rpRow2, rpRow3);

const bugModal = new ModalBuilder()
    .setCustomId('bugModal')
    .setTitle('Open bug report ticket.');

const bugName = new TextInputBuilder()
    .setCustomId('bugName')
    .setLabel("What is your ingame name?")
    .setStyle(TextInputStyle.Short);

const bugWrong = new TextInputBuilder()
    .setCustomId('bugWrong')
    .setLabel("Purchase failed")
    .setStyle(TextInputStyle.Paragraph);

const bugRow1 = new ActionRowBuilder()
    .addComponents(bugName);

const bugRow2 = new ActionRowBuilder()
    .addComponents(bugWrong);

bugModal.addComponents(bugRow1, bugRow2);

const solliModal = new ModalBuilder()
    .setCustomId('solliModal')
    .setTitle('Open application ticket.');

const solliName = new TextInputBuilder()
    .setCustomId('solliName')
    .setLabel("What is your full name?")
    .setStyle(TextInputStyle.Short);

const solliWhy = new TextInputBuilder()
    .setCustomId('solliWhy')
    .setLabel("What do you want to apply for & why?")
    .setStyle(TextInputStyle.Paragraph);

const solliErvaring = new TextInputBuilder()
    .setCustomId('solliErvaring')
    .setLabel("What is your experience with this position?")
    .setStyle(TextInputStyle.Paragraph);

const solliRow1 = new ActionRowBuilder()
    .addComponents(solliName);

const solliRow2 = new ActionRowBuilder()
    .addComponents(solliWhy);

const solliRow3 = new ActionRowBuilder()
    .addComponents(solliErvaring);

solliModal.addComponents(solliRow1, solliRow2, solliRow3);


module.exports = {
    ticketmenu,
    solliModal,
    bugModal,
    rpModal,
    avModal,
    unModal
}