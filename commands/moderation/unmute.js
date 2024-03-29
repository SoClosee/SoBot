const {
    MessageEmbed
} = require('discord.js');
const {
    cooldown
} = require('../../config.json');
module.exports = {
    name: 'unmute',
    description: 'Unmute un membre',
    cooldown: cooldown,
    async execute(message, args, client) {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send({content:'You do not have enough permissions to run this command.'})

        if(!message.guild.me.permissions.has('MANAGE_ROLES')) return message.channel.send({content:'I don\'t have enough permissions. Permission needed: \"MANAGE_ROLES\"'})
        const memberToUnmute = await message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!memberToUnmute) return message.channel.send({content:'Please mention a member, or provide a member ID.'})

        if (memberToUnmute.id === message.guild.ownerID) return message.channel.send({content:'You cannot affect the server owner.'})

        if (message.member.roles.highest.comparePositionTo(memberToUnmute.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send({content:"You can't mute this user, He has more permissions than you."})

        


        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!memberToUnmute.manageable) return message.channel.send({content:'❌Failed to unmute this user. Please check my permissions.'});
        if (!muteRole) message.channel.send({content:"I can't seem to find a \"Muted\" role. I won't be able to mute this user."});
       
            if (!memberToUnmute.roles.cache.some(role => role.name == 'Muted')) return message.channel.send({content:'This user isn\'t muted.'});
           
            memberToUnmute.roles.remove(muteRole);
            message.channel.send({content:`\`${memberToUnmute.user.tag}\` has been unmuted by \`${message.author.tag}\``});
            if (client.setup.has(message.guild.id) && client.setup.has(message.guild.id, 'modlogChannelID')) {
                client.channels.fetch(client.setup.get(message.guild.id, 'modlogChannelID')).then((channel) => {
                    let embedLog = new MessageEmbed()
                    channel.send(embedLog
                        .setAuthor({name:`${message.author.tag}`,iconURL: message.author.avatarURL()})
                        .setTimestamp()
                        .setFooter({text: `Sanction n°${client.moderation.get(message.guild.id, 'Count')}`,iconURL: client.user.displayAvatarURL()})
                        .setDescription(`**Type** => Unmute\n**User** => ${memberToUnmute.user.tag}`)
                        .setColor('GREEN')

                    )
                })

            }
        }  
};