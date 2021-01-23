const { MessageEmbed } = require('discord.js');
const {
    cooldown
} = require('../../config.json');
module.exports = {
    name: 'removecase',
    description: "Retire une sanction à un utilisateur (!removecase user ID)",
    cooldown: cooldown,
    async execute(message, args, client) {
        if ((message.member.hasPermission('BAN_MEMBERS') || message.member.hasPermission('KICK_MEMBERS')) || message.author.id === '480692379913945099') {
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            embed = new MessageEmbed().setColor('ff0000').setFooter(`${client.config.bot_name} • Executed by ${message.author.username}`).setTimestamp();
            if (!user) {
                message.channel.send(client.embedMention)
                return;
            }
            if(! (client.moderation.has(message.guild.id) && client.moderation.has(message.guild.id, 'punishments'))) return message.channel.send('This user doen\'t have any sanction.')
            
            const punishments = Object.keys(client.moderation.get(message.guild.id, `punishments.${user.id}`))
            let checksIfThereIsOnlyOnePunishment = [];
            for (punishment of punishments)
                checksIfThereIsOnlyOnePunishment.push(1);
            if (!args[1])
                return message.channel.send(embed.setTitle('❌ Please specify a sanction ID'))
                else if (args[1] == "-all"){
                    client.moderation.delete(message.guild.id, `punishments.${user.id}`)
               return message.channel.send(embed.setColor('00ff00').setTitle(`Every sanction have been deleted, this user is now sanction-free.`))
                }
            if (!client.moderation.has(message.guild.id, `punishments.${user.id}.X${args[1]}`)) return message.channel.send(embed.setTitle('❌ Failed to find that sanction.'))
            if (checksIfThereIsOnlyOnePunishment.length == 1) {
                client.moderation.delete(message.guild.id, `punishments.${user.id}`)
               return message.channel.send(embed.setColor('00ff00').setTitle(`Sanction n°${args[1]} has been deleted, this user is now sanction-free.`))
            } else {
                client.moderation.delete(message.guild.id, `punishments.${user.id}.X${args[1]}`)
               return message.channel.send(embed.setColor('00ff00').setTitle(`Sanction n°${args[1]} has been deleted (${punishments.length - 1} remaining).`))
            }
        }

    }
}