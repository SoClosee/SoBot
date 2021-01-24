const {
    cooldown
} = require('../../config.json');
const {MessageEmbed} = require('discord.js');
const parseDuration = require('parse-duration')
const humanizeDuration = require('humanize-duration')
module.exports = {
    name: 'tempmute',
    description: 'Mute temporairement un membre',
    cooldown: cooldown,
    guildOnly: true,
    async execute(message, args, client) {
        // la commande commence ici
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(client.embedPerm)

        if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send('I don\'t have enough permissions. Permission needed: \"MANAGE_ROLES\"')

        const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!member) return message.channel.send('Please mention a member or provide the ID of this member.')

        if (member.id === message.guild.ownerID) return message.channel.send('You can\'t mute the server owner.')

        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID)
            return message.channel.send('You can\'t mute this member (his role is higher)')
        if (!member.manageable) return message.channel.send('I can\'t mute this member, please check my perms.')

        const duration = await parseDuration(args[1])
        const humanized = humanizeDuration(duration)
        console.log(duration + '           ' + humanized)
        if (!duration) return message.channel.send('Please provide a valid duration')
        const reason = args.slice(2).join(' ') || 'No reason.'
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')

        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    permissions: 0
                }
            })
            member.roles.add(muteRole)
            message.channel.send(`\`${member.user.tag}\` has been temporarily muted by \`${message.author.tag}\`\nraison: ${reason}\nduration: ${humanizeDuration(duration)}`)
            client.addPunishment(message.guild.id, member.id, 'Mute', `${reason}`, `Temp (${humanized})`, `${message.author.username}`)

            await client.moderation.set(`${message.guild.id}`, {
                    muteauthor: `${message.author.username}`,
                    reason: `${reason}`,
                    muteTime: Date.now(),
                    muteDuration: duration
                },
                `tempMutedUsers.${member.id}`)



            if (client.setup.has(message.guild.id) && client.setup.has(message.guild.id, 'modlogChannelID')) {
                client.channels.fetch(client.setup.get(message.guild.id, 'modlogChannelID')).then((channel) => {
                    let embedLog = new MessageEmbed()
                    channel.send(embedLog
                        .setAuthor(`${message.author.tag}`, message.author.avatarURL())
                        .setTimestamp()
                        .setFooter(`Sanction n°${client.moderation.get(message.guild.id, 'Count')}`, client.user.displayAvatarURL())
                        .setDescription(`**Type** => Temp mute (${humanized})\n**User** => ${member.user.tag}\n**Reason** => ${reason}`)
                        .setColor('ORANGE')

                    )
                })

            }
        } else {
            if (member.roles.cache.some(role => role.name == 'Muted')) return message.channel.send('This member already possess the Muted role.')
            member.roles.add(muteRole)
            message.channel.send(`\`${member.user.tag}\` has been temporarily muted by \`${message.author.tag}\`\nraison: ${reason}\nduration: ${humanizeDuration(duration)}`)
            client.addPunishment(message.guild.id, member.id, 'Mute', `${reason}`, `Temp (${humanized})`, `${message.author.username}`)

            await client.moderation.set(`${message.guild.id}`, {
                    muteauthor: `${message.author.username}`,
                    reason: `${reason}`,
                    muteTime: Date.now(),
                    muteDuration: duration
                },
                `tempMutedUsers.${member.id}`)



            if (client.setup.has(message.guild.id) && client.setup.has(message.guild.id, 'modlogChannelID')) {
                client.channels.fetch(client.setup.get(message.guild.id, 'modlogChannelID')).then((channel) => {
                    let embedLog = new MessageEmbed()
                    channel.send(embedLog
                        .setAuthor(`${message.author.tag}`, message.author.avatarURL())
                        .setTimestamp()
                        .setFooter(`Sanction n°${client.moderation.get(message.guild.id, 'Count')}`, client.user.displayAvatarURL())
                        .setDescription(`**Type** => Temp mute (${humanized})\n**User** => ${member.user.tag}\n**Reason** => ${reason}`)
                        .setColor('ORANGE')

                    )
                })

            }
        }




        // la commande finit ici
    },
};