const { MessageEmbed } = require('discord.js');
const {
    cooldown
} = require('../../config.json');
module.exports = {
    name: 'help',
    cooldown: cooldown,
    description: "commande help ? ",
    async execute(message, args, client) {
       let musicEmbed = new MessageEmbed()
    .setDescription('🔥 Here\'s a list of every commands')
    .setFooter(client.config.bot_name, client.user.displayAvatarURL())
     .setTitle('List of commands (music)')
     .setTimestamp()
     .addField('\u200b',`**play**\n\`!play musicName\`\n\n**skip**\n\`!skip\`\n\n**volume**\n\`!volume 1-100\`\n\n**nowplaying**\n\`!nowplaying\`\n\n**search**\n\`!search musicName\`\n\n**filter (to add filters to a music)**\n\`!filter filterName\`` ,true)
     .addField('\u200b',`**pause**\n\`!pause\`\n\n**resume**\n\`!resume\`\n\n**queue (shows the queue)**\n\`!queue\`\n\n**loop**\n\`!loop\`\n\n**clear-queue**\n\`!clear-queue\`\n\n**w-filters (shows filters when a music is playing**\n\`!w-filters\``, true)
       
       let miscEmbed = new MessageEmbed()
       .setDescription('🔥 Here\'s a list of every commands')
       .setFooter(client.config.bot_name, client.user.displayAvatarURL())
        .setTitle('List of commands (miscellaneous)')
        .setTimestamp()
        .addField('\u200b',`**addvip**\n\`!addvip @member time (1d, 1min, 45min)\`\n\n**give**\n\`!give @member numberOfPoints\`\n\n**setxp**\n\`!setxp @member xpAmmount\`\n\n**setstatus**\n\`!setstatus status\`\n\n**trump(gif)**\n\`!trump\`\n\n**furycat(gif)**\n\`!furycat\`\n\n**rip(gif)**\n\`!rip\`\n\n**christmas(gif)**\n\`!chirstmas\`` ,true)
        .addField('\u200b',`**setup**\n\`!setup\`\n\n**points (to show your points)**\n\`!points\`\n\n**leaderboard**\n\`!leaderboard\`\n\n**cleanup (to clean old users' points)**\n\`!cleanup\`\n\n**furydog(gif)**\n\`!furydog\`\n\n**flycat(gif)**\n\`!flycat\`\n\n**fuckoff(gif)**\n\`!fuckoff\``, true)
          

         let moderationEmbed = new MessageEmbed()
          .setDescription('🔥 Here\'s a list of every commands')
          .setFooter(client.config.bot_name, client.user.displayAvatarURL())
           .setTitle('List of commands (moderation)')
           .setTimestamp()
           .addField('\u200b',`**ban**\n\`!ban @member reason\`\n\n**unban**\n\`!unban memberID\`\n\n**tempban**\n\`!tempban @member duration reason\`\n\n**mute**\n\`!mute @member reason\`\n\n**tempmute**\n\`!tempmute @member duration reason\`\n\n**unmute**\n\`!unmute @member\`\n\n**clear**\n\`!clear numberOfMessages\`` ,true)
           .addField('\u200b',`**kick**\n\`!kick @member reason\`\n\n**warn**\n\`!warn @member reason\`\n\n**removecase**\n\`!removecase @member id | all\`\n\n**punishments**\n\`!punishments @member\`\n\n**removecase**\n\`!removecase @member sanctionID\`\n\n**caseinfo**\n\`!caseinfo @member sanctionID\``, true)
             
      let embeds = [musicEmbed,miscEmbed,moderationEmbed]

       message.channel.send(embeds[0]).then(message => {
           
          
         
           message.react('➡️') && message.react('▶️')
           const collector = message.createReactionCollector(
               
               (reaction, user) => ['⬅️', '➡️', '▶️', '◀️'].includes(reaction.emoji.name) && user.id === author.id,
             
               { time: 60000 }
           )

           let currentIndex = 0
           collector.on('collect', reaction => {
        
               message.reactions.removeAll().then(async () => {
                 
                   if (reaction.emoji.name === '⬅️') {
                       currentIndex -= 1
                       message.edit(embeds[currentIndex])
                   } else if (reaction.emoji.name === '➡️') {
                        currentIndex += 1
                        message.edit(embeds[currentIndex])
                       } else if (reaction.emoji.name === '▶️') {
                       currentIndex = 2
                       message.edit(embeds[currentIndex])
                       } else if (reaction.emoji.name === '◀️')
                       currentIndex = 0
                       message.edit(embeds[currentIndex])
               

                   if (currentIndex !== 0) await message.react('◀️') && message.react('⬅️')
                
                   if (currentIndex + 1 < 2) await message.react('➡️') && message.react('▶️')
               })
           })
       })
   

       
        }
    }
