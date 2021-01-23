const { MessageEmbed } = require('discord.js');
const timestring = require('timestring');
const {
    cooldown
} = require('../../config.json');
module.exports = {
    name: 'tempban',
    description: "Ban temporairement un utilisateur. (!tempban user temps raison)",
    cooldown: cooldown,
    async execute(message, args, client) {
        let embed = new MessageEmbed().setTimestamp();
        if (message.member.hasPermission('BAN_MEMBERS') || message.author.id === '480692379913945099') {
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            let argsCheck = args
            if (!user) {
                message.channel.send(client.embedMention)
                return;
            }
            if (!argsCheck[1]) return message.channel.send(embed.setTitle('❌ Please speficy a duration (1day, 1hour, 1minute...)').setFooter('').setColor("ff0000"))
            if (!argsCheck[2]) {
                message.channel.send(client.embedReason)
                return;
            }
            try {
                timestring(argsCheck[1])
            } catch {
                message.channel.send(embed.setTitle('❌ Please specify a valid duration \n❌ (1day, 1hour, 1minute...)').setFooter('').setColor('ff0000'))
            }
            let bReason = argsCheck.slice(2).join(' ')
            let banTime = argsCheck.slice(1, 2).join('')
            await client.moderation.set(`${message.guild.id}`, {
                banauthor: `${message.author.username}`,
                reason: `${bReason}`,
                banTime: Date.now(),
                banDuration: timestring(argsCheck[1])
            },
                `tempbannedUsers.${user.id}`)
            if (user.bannable) {
                await message.channel.send(`User banned with the reason: ${bReason}`)
                try {
                    await user.send(embed.setFooter(`${client.config.bot_name} • Executed by ${message.author.username}`)
                        .setTimestamp()
                        .setAuthor(`${message.author.tag}`, message.author.avatarURL())
                        .setTitle(`Temp ban: ${banTime}`)
                        .addField("User:", `${user.user.tag}`, true)
                        .addField("ID:", `${user.id}`, true)
                        .addField("Reason", `${bReason}`, true)
                        .setColor('ff3f06')
                        .addField("Author:", `${message.author.username}`, true).setTimestamp())
                } catch {
                    console.log("The user has his dm's locked")
                }
                console.log(`Tempbanned ${user.displayName}: ${bReason} => ${banTime}`)
                client.addPunishment(message.guild.id, user.id, 'Ban', `${bReason}`, `Temp: ${banTime}`, `${message.author.username}`)
                if (client.setup.has(message.guild.id) && client.setup.has(message.guild.id, 'modlogChannelID')) {
                    client.channels.fetch(client.setup.get(message.guild.id, 'modlogChannelID')).then((channel) => {
                        let embedLog = new MessageEmbed()
                        channel.send(embedLog
                            .setAuthor(`${message.author.tag}`, message.author.avatarURL())
                            .setTimestamp()
                            .setFooter(`Sanction n°${client.moderation.get(message.guild.id, 'Count')}`, client.user.displayAvatarURL())
                            .setDescription(`**Type** => Temporary ban: ${banTime}\n**User** => ${user.user.tag}\n**Reason** => ${bReason}`)
                            .setColor('ORANGE')

                        )
                    }
                    )

                }
                await user.ban()
            } else {
                message.channel.send(embed.setTitle('❌ I can\'t ban this user, please check my permissions').setColor('ff0000'))
            }
        }
    }
}