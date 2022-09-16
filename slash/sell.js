const { SlashCommandBuilder } = require('@discordjs/builders');
const { Modal, MessageActionRow, TextInputComponent, MessageEmbed, MessageButton } = require('discord.js')
module.exports = {
    name: 'sell',
    data: new SlashCommandBuilder()
        .setName('sell')
        .setDescription('Make an offer!'),
    async execute(interaction, client) {
        interaction.showModal(new Modal({
            title: 'Sell form', custom_id: 'sellModal', components: [
                new MessageActionRow().setComponents([new TextInputComponent().setLabel('Product name').setStyle('SHORT').setMinLength(5).setMaxLength(30).setCustomId('name').setRequired()]),
                new MessageActionRow().setComponents([new TextInputComponent().setMinLength(2).setMaxLength(40).setLabel('Wanted price').setStyle('SHORT').setCustomId('price').setRequired()]),
                new MessageActionRow().setComponents([new TextInputComponent().setMinLength(5).setMaxLength(70).setLabel('Payment method(s)').setStyle('SHORT').setCustomId('payment').setRequired()]),
                new MessageActionRow().setComponents([new TextInputComponent().setMinLength(15).setMaxLength(300).setLabel('Description of the product').setStyle('PARAGRAPH').setCustomId('description').setRequired()]),
                new MessageActionRow().setComponents([new TextInputComponent().setMinLength(5).setMaxLength(250).setLabel('Link').setStyle('SHORT').setCustomId('link')])

            ]
        })
        )
        try {
            const submit = await interaction.awaitModalSubmit({ time: 600000 });
            let data = {}
            for (actionRow of submit.toJSON().components) {

                data[actionRow.components[0].customId] = actionRow.components[0].value
            }

            let embed = new MessageEmbed()
                .setTitle(data.name)
                .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.avatarURL() })
                .setDescription(data.description)
                .setColor('#0078d7')
                .setFooter({ text: 'Sell offer' })
                .setTimestamp()
                .addFields([
                    { name: 'Price', value: data.price, inline: true },
                    { name: 'Payment Methods', value: data.payment, inline: true }

                ])
            if (data.link && !data.link.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)) return submit.reply({content: 'Please enter a valid url (http / https / discord)', ephemeral: true})
            let chan = interaction.guild.id === "634038035264176138" ? client.config.sellChan : client.config.sellChan2;
            data.link ? client.channels.cache.get(chan).send({
                embeds: [embed],
                components: [
                    new MessageActionRow().setComponents([new MessageButton().setURL(data.link).setLabel('Click!').setStyle('LINK')])
                ]
            }) : client.channels.cache.get(chan).send({ embeds: [embed] })
            submit.reply({content: 'Your message has been posted', ephemeral: true});
            return;
        }
        catch (err) {
            console.log(err)
            interaction.followUp({content:'Timeout / Problem occured',ephemeral: true})
        }


    },
};
/*
{

                type: "ACTION_ROW",
                custom_id: 'actionrooow',
                components: [{
                    type: "TEXT_INPUT",
                    label: "Nothing",
                    style: "PARAGRAPH",
                    custom_id: "buyyy"
                }
                ]
            }
            */
