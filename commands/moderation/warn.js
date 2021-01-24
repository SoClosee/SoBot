
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'warn',
    description: "Avertis un utilisateur (requiert la permission KICK_MEMBERS)",
    async execute(message, args, client) {
        if (message.member.hasPermission('KICK_MEMBERS') || message.author.id === '480692379913945099') {
          
            let embed = new MessageEmbed()
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            let argsCheck = args
            if (!user) {
                message.channel.send(client.embedMention)
                return;

            }
            if (!argsCheck[1]) {
                message.channel.send(client.embedReason)
                return;
            }
            let wReason = argsCheck.slice(1).join(' ')
            if (!client.moderation.has(message.guild.id, `warnedUsers.${user.id}.warnNumber`)) {
                await client.moderation.set(`${message.guild.id}`, {
                    author: `${message.author.username}`,
                    reason: `${wReason}`,
                    warnTime: Date.now(),
                    warnNumber: '1'
                }
                    , `warnedUsers.${user.id}`)

                    await message.channel.send("Warned user with reason: " + wReason +'.')
                console.log(`Warned ${user.displayName}: ${wReason}`)
                client.addPunishment(message.guild.id, user.id, 'Warning', `${wReason}`, 'Permanent', `${message.author.username}`)
                if (client.setup.has(message.guild.id) && client.setup.has(message.guild.id, 'modlogChannelID')) {
                    client.channels.fetch(client.setup.get(message.guild.id, 'modlogChannelID')).then((channel) => {
                        let embedLog = new MessageEmbed()
                        channel.send(embedLog
                            .setAuthor(`${message.author.tag}`, message.author.avatarURL())
                            .setTimestamp()
                            .setFooter(`Sanction n°${client.moderation.get(message.guild.id, 'Count')}`, client.user.displayAvatarURL())
                            .setDescription(`**Type** => Warning\n**User** => ${user.user.tag}\n**Reason** => ${wReason}`)
                            .setColor('ORANGE')

                        )
                    }
                    )

                }
            } else {
                const data = await client.moderation.get(message.guild.id, `warnedUsers.${user.id}`)
                await client.moderation.set(`${message.guild.id}`, {
                    ...data,
                    author: `${message.author.username}`,
                    reason: `${wReason}`,
                    warnTime: Date.now()
                }
                    , `warnedUsers.${user.id}`)
                const NumberOfWarns = Object.values(client.moderation.get(message.guild.id, `punishments.${user.id}`))
                let numberToIterate = 0;
                for (things of NumberOfWarns) {
                    let valuesOfAllPunishments = Object.values(things)
                    if (valuesOfAllPunishments.includes('Warning')) numberToIterate++

                }

                await message.channel.send("Warned user with reason: " + wReason +'.')
                console.log(`Warned ${user.displayName}: ${wReason}`)
                client.addPunishment(message.guild.id, user.id, 'Warning', `${wReason}`, 'Permanent', `${message.author.username}`)
                if (client.setup.has(message.guild.id) && client.setup.has(message.guild.id, 'modlogChannelID')) {
                    client.channels.fetch(client.setup.get(message.guild.id, 'modlogChannelID')).then((channel) => {
                        let embedLog = new MessageEmbed()
                        channel.send(embedLog
                            .setAuthor(`${message.author.tag}`, message.author.avatarURL())
                            .setTimestamp()
                            .setFooter(`Sanction n°${client.moderation.get(message.guild.id, 'Count')}`, client.user.displayAvatarURL())
                            .setDescription(`**Type** => Warning\n**User** => ${user.user.tag}\n**Reason** => ${wReason}`)
                            .setColor('ORANGE')

                        )
                    }
                    )

                }
               
            }
        } else {
            message.channel.send(client.embedPerm)
        }
    }
}
//const d = new Date( timestamp)
//date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();