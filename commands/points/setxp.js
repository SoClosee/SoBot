const { MessageEmbed } = require('discord.js')
const {cooldown} = require('../../config.json');
module.exports = {
    name: 'setxp',
    description: 'Replaces the amount of xp a user has.',
    usage: '[@member xp]',
    aliases: [''],
    example: 'setxp @member xp',
    args: false,
    cooldown: cooldown,
    guildOnly: true,
    async execute(message, args, client) {
  // Limited to guild owner - adjust to your own preference!
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("You don't have enough permissions (ADMINISTRATOR)!");

  const user = message.mentions.users.first() || client.users.cache.get(args[0]);
  if(!user) return message.reply("You need to mention someone, or to give their ID.");

  const pointsToSet = parseInt(args[1], 10);
  if(!pointsToSet) return message.reply("You didn't give me an xp amount to add.");
  if(pointsToSet < 0) return message.reply('You can\'t set a negative amount of xp.')
  
  const key = `${message.guild.id}-${user.id}`;

  // Ensure there is a points entry for this user.
  client.points.ensure(key, {
    user: user.id,
    guild: message.guild.id,
    points: 0,
    level: 1,
    lastSeen: new Date()
  });
  
  // Add the points to the enmap for this user.
  const curLevel = Math.floor(0.1 * Math.sqrt(client.points.get(key, "points")));
  let data = client.points.get(key)
  client.points.set(key, {...data, points: pointsToSet, level: curLevel})
 

  message.channel.send(`The xp of  ${user.tag} has been set to ${client.points.get(key, "points")} points.`);

        }
    }
  
  
  
