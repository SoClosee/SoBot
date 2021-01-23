
const { MessageEmbed } = require('discord.js')


module.exports = {
  name: 'unban',
  description: "Unban un utilisateur (!unban userID)",
  async execute(message, args, client) {
    if (message.member.hasPermission('BAN_MEMBERS') || message.author.id === '480692379913945099') {
      let embed = new MessageEmbed().setFooter(`${client.config.bot_name} • Executed by ${message.author.username}`).setTimestamp().setColor('ff0000');
      let user = args[0]
      if (user.startsWith('<@!')) return message.channel.send(embed.setTitle("Do not mention users. Please provide their ID"))
      tempOrPerm = []
     
        try {
       await  message.guild.members.unban(user).then(user => console.log(`Unbanned ${user.username} from ${message.guild.name}`))
          await message.channel.send(embed.setTitle("User unbanned.").setColor('00ff00'))
          if (client.setup.has(message.guild.id) && client.setup.has(message.guild.id, 'modlogChannelID')) {
            client.channels.fetch(client.setup.get(message.guild.id, 'modlogChannelID')).then((channel) => {
                let embedLog = new MessageEmbed()
                channel.send(embedLog
                    .setAuthor(`${message.author.tag}`, message.author.avatarURL())
                    .setTimestamp()
                    .setFooter(`Sanction n°${client.moderation.get(message.guild.id, 'Count')}`, client.user.displayAvatarURL())
                    .setDescription(`**Type** => Unban\n**User** => ${user}\n**Reason** => Unbanned by ${message.author.tag}`)
                    .setColor('00ff00'))

            }
            )
          }
        if(client.moderation.has(message.guild.id, 'tempbannedUsers') && client.moderation.has(message.guild.id, 'tempbannedUsers.' + user))
          client.moderation.delete(message.guild.id, `tempbannedUsers.${user}`)
          else if(client.moderation.has(message.guild.id, 'bannedUsers') && client.moderation.has(message.guild.id, 'bannedUsers.' + user))
          client.moderation.delete(message.guild.id, 'bannedUsers.' + user)
          else return;
        } catch(error){
          console.log(error)
          message.channel.send(embed.setTitle("This user is not banned, or this ID is invalid"))
        }
      
 
    
    } else {
      message.channel.send(client.embedPerm)
    }

  }
}
