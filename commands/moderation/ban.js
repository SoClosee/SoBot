const {
    MessageEmbed
} = require('discord.js')

const embedbl = new MessageEmbed().setColor('00ff00');

const {
    cooldown
} = require('../../config.json');
module.exports = {
    name: 'ban',
    description: "Ban un utilisateur de façon définitive (!ban user raison)",
    cooldown: cooldown,
    async execute(message, args, client) {
        if (message.member.hasPermission('BAN_MEMBERS') || message.author.id === '480692379913945099') {
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
            let bReason = argsCheck.slice(1).join(' ')
            await client.setup.set(`${message.guild.id}`, {
                    banauthor: `${message.author.username}`,
                    reason: `${bReason}`,
                    banTime: Date.now(),
                    banstatus: '1'
                },
                `bannedUsers.${user.id}`)
            if (user.bannable) {
                await message.channel.send(embedbl
                    .setTitle(`✅ User banned.`).setColor('ff0000'))

                try {
                    await user.send(embedbl.addField(`You have been permanently banned from ${message.guild.name}`, '\u200b', true).addField(`\`reason:\` ${bReason}\``, `author:\` ${message.author.username}`, true))
                } catch {}
                console.log(`Banned ${user.displayName}: ${bReason}`)
                client.addPunishment(message.guild.id, user.id, 'Ban', `${bReason}`, 'Permanent', `${message.author.username}`)
                if (client.setup.has(message.guild.id) && client.setup.has(message.guild.id, 'modlogChannelID')) {
                    client.channels.fetch(client.setup.get(message.guild.id, 'modlogChannelID')).then((channel) => {
                        let embedLog = new MessageEmbed()
                        channel.send(embedLog
                            .setAuthor(`${message.author.tag}`, message.author.avatarURL())
                            .setTimestamp()
                            .setFooter(`Sanction n°${client.setup.get(message.guild.id, 'Count')}`, client.user.displayAvatarURL())
                            .setDescription(`**Type** => Permanent ban\n**User** => ${user.user.tag}\n**Reason** => ${bReason}`)
                            .setColor('ORANGE')

                        )
                    })

                }
                await user.ban()

            } else {
                message.channel.send(embed.setTitle('❌Ban failed, check my perms').setColor('ff0000'))
            }

        } else message.channel.send(client.embedPerm)
    }
}
//const d = new Date( timestamp)
//date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();