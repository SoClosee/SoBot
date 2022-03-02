const { MessageEmbed } = require('discord.js')
const { cooldown } = require('../../config.json')
module.exports = {
    name: 'cleanup',
    async execute(message, args, client) {
      if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply({content:"You don't have enough permissions (ADMINISTRATOR)!"});
        const filtered = client.points.filter( p => p.guild === message.guild.id );


    const rightNow = new Date();
    const toRemove = filtered.filter(data => {
      return !message.guild.members.has(data.user) || rightNow - 2592000000 > data.lastSeen;
    });

    toRemove.forEach(data => {
      client.points.delete(`${message.guild.id}-${data.user}`);
    });

        message.channel.send({content:`I cleaned ${toRemove.size} old users's pockets.`});
    }
}





