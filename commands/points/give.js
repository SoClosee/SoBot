const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'give',
    async execute(message, args, client) {
  // Limited to guild owner - adjust to your own preference!
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("You don't have enough permissions (ADMINISTRATOR)!");

  const user = message.mentions.users.first() || client.users.cache.get(args[0]);
  if(!user) return message.reply("You need to mention someone, or to give their ID.");

  const pointsToAdd = parseInt(args[1], 10);
  if(!pointsToAdd) return message.reply("You didn't give me an xp amount to add.");
  if(pointsToAdd <= 0) return message.reply('You can\'t add a negative amount of xp or equal to 0, use \`setxp\`')
  
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
  client.points.math(key, "+", pointsToAdd, "points");
  const curLevel = Math.floor(0.1 * Math.sqrt(client.points.get(key, "points")));
  let data = client.points.get(key)
  client.points.set(key, {...data, level: curLevel})

  message.channel.send(`${user.tag} received ${pointsToAdd} points and now possess ${client.points.get(key, "points")} points.`);

        }
    }
  
  
  
