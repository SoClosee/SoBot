const {
    MessageEmbed
} = require('discord.js')

const embedbl = new MessageEmbed()
    .setColor('00ff00')
    const {
        cooldown
    } = require('../../config.json');
module.exports = {
    name: 'kick',
    description: "Ban un utilisateur de façon définitive (!ban user raison)",
    cooldown: cooldown,
    async execute(message, args, client) {
        if (message.member.hasPermission('BAN_MEMBERS') || message.author.id === '480692379913945099') {
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            let argsCheck = args
            if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send('❌ Missing permisisons ( KICK_MEMBERS )')
            if (!user) {
                message.channel.send(client.embedMention)
                return;

            }
            if (!argsCheck[1]) {
                message.channel.send(client.embedReason)
                return;
            }
            let kReason = argsCheck.slice(1).join(' ')

            if (user.kickable) {
               

                try {
                    await user.send(embedbl.addField(`You have been kicked from ${message.guild.name}`, '\u200b', true).addField(`\`reason:\` ${kReason}\``, `author:\` ${message.author.username}`, true))
                } catch {}
                console.log(`Kicked ${user.displayName}: ${kReason}`)
                client.addPunishment(message.guild.id, user.id, 'Kick', `${kReason}`, 'Revoked', `${message.author.username}`)
                if (client.setup.has(message.guild.id) && client.setup.has(message.guild.id, 'modlogChannelID')) {
                    client.channels.fetch(client.setup.get(message.guild.id, 'modlogChannelID')).then((channel) => {
                        let embedLog = new MessageEmbed()
                        channel.send(embedLog
                            .setAuthor(`${message.author.tag}`, message.author.avatarURL())
                            .setTimestamp()
                            .setFooter(`Sanction n°${client.moderation.get(message.guild.id, 'Count')}`, client.user.displayAvatarURL())
                            .setDescription(`**Type** => Kick\n**User** => ${user.user.tag}\n**Reason** => ${kReason}`)
                            .setColor('ORANGE')

                        )
                    })

                }
                await user.kick(kReason + '  [bot]')
                await message.channel.send(`User kicked with the reason: ${kReason}`)

            } else {
                message.channel.send('❌ Kick failed, check the position of my role.')
            }

        } else message.channel.send(client.embedPerm)
    }
}
//const d = new Date( timestamp)
//date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();