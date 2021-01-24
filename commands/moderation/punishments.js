const {
    MessageEmbed
} = require('discord.js');
const {
    cooldown
} = require('../../config.json');
module.exports = {
    name: 'punishments',
    description: "Affiche toutes les sanctions d'un utilisateur (!punishments user)",
    cooldown: cooldown,
    async execute(message, args, client) {
        let embed = new MessageEmbed().setFooter(`${client.config.bot_name} • Executed by ${message.author.username}`).setTimestamp();
        if (message.member.hasPermission('KICK_MEMBERS') || message.author.id === '480692379913945099') {
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            embedNoPunishments = new MessageEmbed().setTitle('No sanctions').setColor('ff0000').setFooter(`${client.config.bot_name} • Executed by ${message.author.tag}`);
            if (!user) {
                message.channel.send(client.embedMention)
                return;
            }
            try {
                await client.moderation.has(message.guild.id, `punishments.${user.id}`)
            } catch {

                return message.channel.send(embedNoPunishments);
            }
            let numberOfInfractions = []
            let InfractionsArray = [];
            if (!client.moderation.has(message.guild.id, `punishments.${user.id}`)) {
                return message.channel.send(embedNoPunishments);
            } else {

                await client.getPunishment(message.guild.id, user.id, InfractionsArray, numberOfInfractions)
              
                for (let i = 0; i < numberOfInfractions; i++) {
                    const d = new Date(InfractionsArray[3])
                    d.setTime(d.getTime() - new Date().getTimezoneOffset() * 60 * 1000);
                    date = `${d.getHours()}:${ d.getMinutes()}, ${d.toLocaleDateString()}`

                    embed.addField('--------------', `**Sanction n°**${InfractionsArray[4]} => ${user.user.tag}\n**${InfractionsArray[0]} by:** ${InfractionsArray[2]}\n**Reason:** ${InfractionsArray[1]}\n**Date:** ${date}, expires on \`${InfractionsArray[5]}\``)
                    //     embed.addField(`**---------------------------------- => ${InfractionsArray[0]} **`,`**Raison:** ${InfractionsArray[1]}\n\n**ID de sanction:** ${InfractionsArray[4]}\n\n**Auteur:** ${InfractionsArray[2]}\n\n**Date de la sanction:** ${date}\n\n**Durée de la sanction:** ${InfractionsArray[5]}`)
                    InfractionsArray.splice(0, 6)
                }


            }

            await message.channel.send(embed.setColor('ORANGE').setAuthor(`${user.displayName}       List of sanctions`, user.user.avatarURL()))


        } else {
            message.channel.send(client.embedPerm)
        }
    }
}