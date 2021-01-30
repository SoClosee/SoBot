const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'serverinfo',
    description: "server info ? ",
    async execute(message, args, client) {
    //Guild Region
    if (message.guild.region === "brazil") message.guild.region = "Brazil :flag_br:";
    if (message.guild.region === "europe") message.guild.region = "Europe :flag_eu:";
    if (message.guild.region === "hongkong") message.guild.region = "Hong Kong :flag_hk:";
    if (message.guild.region === "india") message.guild.region = "India :flag_in:";
    if (message.guild.region === "japan") message.guild.region = "Japan :flag_jp:";
    if (message.guild.region === "russia") message.guild.region = "Russia :flag_ru:";
    if (message.guild.region === "singapore") message.guild.region = "Singapour :flag_sg:";
    if (message.guild.region === "south africa") message.guild.region = "South Africa :flag_za:";
    if (message.guild.region === "sydney") message.guild.region = "Sydney :flag_au:";
    if (message.guild.region === "us-central") message.guild.region = "US Central :flag_us:";
    if (message.guild.region === "us-east") message.guild.region = "US East :flag_us:";
    if (message.guild.region === "us-south") message.guild.region = "US South :flag_us:";
    if (message.guild.region === "us-west") message.guild.region = "US West :flag_us:";
    //Guild Verification Level
if (message.guild.verificationLevel === "NONE") message.guild.verificationLevel = "None";
    if (message.guild.verificationLevel === "LOW") message.guild.verificationLevel = "Low";
    if (message.guild.verificationLevel === "MEDIUM") message.guild.verificationLevel = "Medium";
    if (message.guild.verificationLevel === "HIGH") message.guild.verificationLevel = "High";
    if (message.guild.verificationLevel === "VERY_HIGH") message.guild.verificationLevel = "Very High";
    //Others
    const role = message.guild.roles.cache.first(20).join(", ")
    const role2 = message.guild.roles.cache.array().join(", ")
    const RoleAmount = message.guild.roles.cache.size - 20
    //Something else
   await message.guild.members.fetch()
    const dnd = message.guild.members.cache.filter(user => user.presence.status == "dnd").size
    const idle = message.guild.members.cache.filter(user => user.presence.status == "idle").size
    const online = message.guild.members.cache.filter(user => user.presence.status == "online").size
    const offline = message.guild.members.cache.filter(user => user.presence.status == "offline").size
    const streaming = message.guild.members.cache.filter(user => user.presence.status == "streaming").size
    const txt = message.guild.channels.cache.filter(channel => channel.type == "text").size
    const voice = message.guild.channels.cache.filter(channel => channel.type == "voice").size
    const category = message.guild.channels.cache.filter(channel => channel.type == "category").size
    const bots = message.guild.members.cache.filter(m => m.user.bot).size
    //Create the embed
    let Embed = new MessageEmbed()
    .setTitle(`${message.guild.name} info`)
    .setThumbnail(`${message.guild.iconURL({size: 2048, dynamic: true, format: "png"})}`)
    .addField("Server's name:", `${message.guild.name}`, true)
    .addField("Server's owner:", `${client.users.cache.get(message.guild.owner.id).tag}`, true)
    .addField("Members:", `👤 Total: ${message.guild.members.cache.size}\n:robot: Bots: ${bots}`, true)
    .addField("Member list:", `
    🔴 Do not disturb: ${dnd}
    🟡 AFK ${idle}
    🟢 Online: ${online}
    ⚪ Offline: ${offline}
    🟣 Streaming: ${streaming}
    `, true)
    .setColor("ORANGE")
    .addField("Server region:", `${message.guild.region}`, true)
    .addField("Server creation:", message.guild.createdAt)
    .addField("Server's ID", `${message.guild.id}`, true)
    .addField("Total boosts:", `${message.guild.premiumSubscriptionCount}`, true)
    .addField("Boost Level:", `${message.guild.premiumTier}`, true)
    .addField("Emojis'total:", `${message.guild.emojis.cache.size}`, true)
    .addField("Channels:", `
    Total: ${message.guild.channels.cache.size}
    #️⃣ Texte: ${txt}
    🔊 Vocal: ${voice}
    Catégories: ${category}
    `, true)
    .addField("Verification level:", `${message.guild.verificationLevel}`, true)
    if(message.guild.roles.cache.size < 20){
        Embed.addField(`[${message.guild.roles.cache.size}] roles' total:`, role2)
    }else{
        Embed.addField(`[${message.guild.roles.cache.size}] roles' total :`, role + `... et ${RoleAmount} autres!`)
    }
    Embed.setFooter("Server info", message.guild.iconURL({dynamic: true}))
    Embed.setTimestamp()
    message.channel.send(Embed);
}
    }
