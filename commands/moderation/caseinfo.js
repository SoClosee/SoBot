const { MessageEmbed } = require('discord.js');
const {
    cooldown
} = require('../../config.json');
module.exports = {
    name: 'caseinfo',
    description: "Affiche les informations à propos d'une sanction (!caseinfo user ID)",
    cooldown, cooldown,
    async execute(message, args, client) {
        if ((message.member.hasPermission('BAN_MEMBERS') || message.member.hasPermission('KICK_MEMBERS')) || message.author.id === '480692379913945099') {
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!user) {
                message.channel.send(client.embedMention)
                return;
            }
                embed = new MessageEmbed().setColor('00ff00').setFooter(`${client.config.bot_name} • Executé par ${message.author.username}`).setTimestamp();
                const caseID = parseInt(args[1])
                console.log(caseID)
                if (client.moderation.has(message.guild.id) && !client.moderation.has(message.guild.id, `punishments.${user.id}.X${caseID}`) || (!client.moderation.has(message.guild.id) && !client.moderation.has(message.guild.id, `punishments.${user.id}.X${caseID}`))) return message.channel.send(embed.setColor('ff0000').setTitle("❌Failed to find that sanction\nVerify the ID (number) of the sanction."))
                let InfractionsArray = [];
               await client.getOnePunishment(message.guild.id,user.id,InfractionsArray,caseID)
               const d = new Date(InfractionsArray[3])
                    d.setTime( d.getTime() - new Date().getTimezoneOffset()*60*1000 );
                    date = `${d.getHours()}:${ d.getMinutes()}, ${d.toLocaleDateString()}`
               embed.setDescription(`**Sanction n°**${InfractionsArray[4]} => ${user.user.tag}\n**${InfractionsArray[0]} by:** ${InfractionsArray[2]}\n**Reason:** ${InfractionsArray[1]}\n**Date:** ${date}, expires on \`${InfractionsArray[5]}\``) 
            message.channel.send(embed.setColor('ORANGE'))
            }

        }
    }