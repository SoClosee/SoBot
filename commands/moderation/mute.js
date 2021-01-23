const {cooldown} = require('../../config.json');
const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'mute',
    description: 'Mute temporairement un membre',
    cooldown: cooldown,
    guildOnly: true,
   async execute(message, args, client) {
        // la commande commence ici
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(client.embedPerm)

        if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send('I don\'t have enough permissions. Permission needed: \"MANAGE_ROLES\"')

        const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!member) return message.channel.send('Please mention a member or provide the ID of this member.')

        if (member.id === message.guild.ownerID) return message.channel.send('You can\'t mute the server owner.')

        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) 
            return message.channel.send('You can\'t mute this member (his role is higher)')
        if (!member.manageable) return message.channel.send('I can\'t mute this member, please check my perms.')

        const reason = args.slice(1).join(' ') || 'No reason.'
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
        
        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    permissions: 0
                }
            })
         await   member.roles.add(muteRole)
            client.addPunishment(message.guild.id, member.id, 'Mute', `${reason}`, 'Permanent', `${message.author.username}`)
        if (client.setup.has(message.guild.id) && client.setup.has(message.guild.id, 'modlogChannelID')) {
            client.channels.fetch(client.setup.get(message.guild.id, 'modlogChannelID')).then((channel) => {
                let embedLog = new MessageEmbed()
                channel.send(embedLog
                    .setAuthor(`${message.author.tag}`, message.author.avatarURL())
                    .setTimestamp()
                    .setFooter(`Sanction n°${client.moderation.get(message.guild.id, 'Count')}`, client.user.displayAvatarURL())
                    .setDescription(`**Type** => Mute\n**User** => ${member.user.tag}\n**Reason** => ${reason}`)
                    .setColor('ORANGE')

                )
            })

        }
            message.channel.send(`\`${member.user.tag}\` has been muted by \`${message.author.tag}\`\n\nraison: ${reason}\n**Note:** A \`Muted\` role has been created. You may remove speak permissions for this role on the channels you want.`)
        }
        else {
            if(member.roles.cache.some(role => role.name == 'Muted')) return message.channel.send('This member already possesses the Muted role.')
            await member.roles.add(muteRole)
            client.addPunishment(message.guild.id, member.id, 'Mute', `${reason}`, 'Permanent', `${message.author.username}`)
            if (client.setup.has(message.guild.id) && client.setup.has(message.guild.id, 'modlogChannelID')) {
                client.channels.fetch(client.setup.get(message.guild.id, 'modlogChannelID')).then((channel) => {
                    let embedLog = new MessageEmbed()
                    channel.send(embedLog
                        .setAuthor(`${message.author.tag}`, message.author.avatarURL())
                        .setTimestamp()
                        .setFooter(`Sanction n°${client.moderation.get(message.guild.id, 'Count')}`, client.user.displayAvatarURL())
                        .setDescription(`**Type** => Mute\n**User** => ${member.user.tag}\n**Reason** => ${reason}`)
                        .setColor('ORANGE')

                    )
                })

            }
            message.channel.send(`\`${member.user.tag}\` has been muted by \`${message.author.tag}\`\n\nReason: ${reason}`)
        }




        // la commande finit ici
    },
};