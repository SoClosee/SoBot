const { SlashCommandBuilder } = require('@discordjs/builders');
const { Modal, MessageActionRow, TextInputComponent, MessageEmbed, MessageButton } = require('discord.js')
module.exports = {
    name: 'buy',
    data: new SlashCommandBuilder()
        .setName('buy')
        .setDescription('Make an offer!'),
    async execute(interaction, client) {
        interaction.showModal(new Modal({
            title: 'Buy form', custom_id: 'buyModal', components: [
                new MessageActionRow().setComponents([new TextInputComponent().setLabel('Product name').setStyle('SHORT').setMinLength(5).setMaxLength(50).setCustomId('name').setRequired()]),
                new MessageActionRow().setComponents([new TextInputComponent().setMinLength(2).setMaxLength(40).setLabel('Budget').setStyle('SHORT').setCustomId('price').setRequired()]),
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
                .setColor('#00ff00')
                .setFooter({ text: 'Buy offer' })
                .setTimestamp()
                .addFields([
                    { name: 'Budget', value: data.price, inline: true },
                    { name: 'Payment Methods', value: data.payment, inline: true }

                ]);
            if (data.link && !data.link.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)) return submit.reply('Please enter a valid url (http /https / discord)')

            data.link ? client.channels.cache.get(client.config.buyChan).send({
                embeds: [embed],
                components: [
                    new MessageActionRow().setComponents([new MessageButton().setURL(data.link).setLabel('Click!').setStyle('LINK')])
                ]
            }) : client.channels.cache.get(client.config.buyChan).send({ embeds: [embed] })

            submit.reply('Your message has been posted',{ephemeral: true);
            return;
        }
        catch (err) {
            console.log(err)
            interaction.followUp('Timeout / Problem occured', {ephemeral: true})
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
