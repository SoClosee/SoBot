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
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have enough permissions to run this command.')

        if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send('I don\'t have enough permissions. Permission needed: \"MANAGE_ROLES\"')
        const memberToUnmute = await message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!memberToUnmute) return message.channel.send('Please mention a member, or provide a member ID.')

        if (memberToUnmute.id === message.guild.ownerID) return message.channel.send('You cannot affect the server owner.')

        if (message.member.roles.highest.comparePositionTo(memberToUnmute.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send("You can't mute this user, He has more permissions than you.")

        


        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!memberToUnmute.manageable) return message.channel.send('❌Failed to unmute this user. Please check my permissions.');
        if (!muteRole) message.channel.send("I can't seem to find a \"Muted\" role. I won't be able to mute this user.");
       
            if (!memberToUnmute.roles.cache.some(role => role.name == 'Muted')) return message.channel.send('This user isn\'t muted.');
           
            memberToUnmute.roles.remove(muteRole);
            message.channel.send(`\`${memberToUnmute.user.tag}\` has been unmuted by \`${message.author.tag}\``);
            if (client.setup.has(message.guild.id) && client.setup.has(message.guild.id, 'modlogChannelID')) {
                client.channels.fetch(client.setup.get(message.guild.id, 'modlogChannelID')).then((channel) => {
                    let embedLog = new MessageEmbed()
                    channel.send(embedLog
                        .setAuthor(`${message.author.tag}`, message.author.avatarURL())
                        .setTimestamp()
                        .setFooter(`Sanction n°${client.moderation.get(message.guild.id, 'Count')}`, client.user.displayAvatarURL())
                        .setDescription(`**Type** => Unmute\n**User** => ${memberToUnmute.user.tag}`)
                        .setColor('GREEN')

                    )
                })

            }
        }  
};