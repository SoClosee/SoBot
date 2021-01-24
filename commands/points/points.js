const { MessageEmbed } = require('discord.js')
const { cooldown } = require('../../config.json')
module.exports = {
    name: 'points',
    async execute(message, args, client) {
        const key = `${message.guild.id}-${message.author.id}`;
        return message.channel.send(`You currently have ${client.points.get(key, "points")} points, and you are level ${client.points.get(key, "level")}!`);
      
        }
    }

