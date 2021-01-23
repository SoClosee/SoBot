const { MessageEmbed } = require('discord.js');
const {
    cooldown
} = require('../../config.json');
const timestring = require('timestring');
module.exports = {
    name: 'addvip',
    cooldown: cooldown,
    description: "Command to add vip to a user.",
    async execute(message, args, client) {
        
       if(!['480692379913945099', '633792445146202112'].includes(message.author.id)) return;
       let member = await message.mentions.members.first()
    
       if (!args[1]) return message.channel.send(new MessageEmbed().setTitle('❌ Please speficy a duration (1day, 1hour, 1minute...)').setFooter('').setColor("ff0000"));
       if(!member) {
           try{
            member = await message.guild.members.fetch(args[0])
            
           
           }
           catch{
               return message.channel.send('Wrong ID / mention provided.')
           }
       }
       let vipTime = timestring(args[1])
       if(!message.guild.roles.cache.has('802224235295539251')) return message.channel.send('I can\'t seem to find the vip role.');
       let role = message.guild.roles.cache.get('802224235295539251');
       member.roles.add(role)
       if(!client.vip.has(message.guild.id) || !client.vip.has(message.guild.id, member.id)){
           client.vip.set(message.guild.id, {'status': 'active','vipTime':vipTime, 'timeAtTheAdd': Date.now()},member.id)
           return message.channel.send(`Successfully added VIP to ${member.user.tag} for ${args[1]}`)
       }
       let vipOfMember = client.vip.get(message.guild.id, `${member.id}.vipTime`)
       let vipToAdd = vipTime + vipOfMember
       client.vip.set(message.guild.id,{'status': 'active', 'vipTime': vipToAdd, 'timeAtTheAdd': Date.now()},member.id)
       return message.channel.send(`Successfully added VIP to ${member.user.tag} for ${args[1]}`)
        



        }
    }