const { MessageEmbed } = require('discord.js');
const {
    cooldown
} = require('../../config.json');
module.exports = {
    name: 'help',
    cooldown: cooldown,
    description: "commande help ? ",
    async execute(message, args, client) {
       message.channel.send(new MessageEmbed()
    .setDescription('🔥 Here\'s a list of every commands')
    .setFooter(client.config.bot_name, client.user.displayAvatarURL())
     .setTitle('List of commands')
     .setTimestamp()
     .addField('\u200b',`**ban**\n\`!ban @member reason\`\n\n**unban**\n\`!unban memberID\`\n\n**tempban**\n\`!tempban @member duration reason\`\n\n**mute**\n\`!mute @member reason\`\n\n**tempmute**\n\`!tempmute @member duration reason\`\n\n**unmute**\n\`!unmute @member\`\n\n**addvip**\n\`!addvip @member time (1d, 1min, 45min)\`\n\n**give**\n\`!give @member numberOfPoints\`\n\n**setxp**\n\`!setxp @member xpAmmount\`` ,true)
     .addField('\u200b',`**kick**\n\`!kick @member reason\`\n\n**warn**\n\`!warn @member reason\`\n\n**removecase**\n\`!removecase @member id | all\`\n\n**punishments**\n\`!punishments @member\`\n\n**removecase**\n\`!removecase @member sanctionID\`\n\n**caseinfo**\n\`!caseinfo @member sanctionID\`\n\n**setup**\n\`!setup\`\n\n**points (to show your points)**\n\`!points\`\n\n**leaderboard**\n\`!leaderboard\`\n\n**cleanup (to clean old users' points)**\n\`!cleanup\``, true)
       )

        }
    }
