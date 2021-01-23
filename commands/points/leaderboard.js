const {
  MessageEmbed
} = require('discord.js')
const {
  cooldown
} = require('../../config.json')
module.exports = {
  name: 'leaderboard',
  async execute(message, args, client) {
    const filtered = client.points.filter(p => p.guild === message.guild.id).array();
    const sorted = filtered.sort((a, b) => b.points - a.points);
    const top10 = sorted.splice(0, 10);
    const embed = new MessageEmbed()
      .setTitle("🏆 Leaderboard 🏆")
      .setAuthor(client.user.username, message.guild.iconURL())
      .setDescription(" Top10 most active members")
      .setColor('ORANGE');
    for (const data of top10) {
      try {
        embed.addField(client.users.cache.get(data.user).tag, `${data.points} points (level ${data.level})`);
      } catch {
        embed.addField(`<@${data.user}>`, `${data.points} points (level ${data.level})`);
      }
    }
    return message.channel.send({
      embed
    });
  }
}