const {Collection, MessageEmbed} = require('discord.js');
const cooldowns = new Collection();
const now = Date.now();
module.exports = async (client, message) => {

    if (!message.guild || !message.guild.me.hasPermission('SEND_MESSAGES') || message.author.bot) return;
    if (!message.author.bot && client.setup.has(message.guild.id) && client.setup.has(message.guild.id, 'activexp') && client.setup.get(message.guild.id, 'activexp') == 1) {
        const key = `${message.guild.id}-${message.author.id}`;

        client.points.ensure(key, {
            user: message.author.id,
            guild: message.guild.id,
            points: 0,
            level: 0,
            lastSeen: new Date(),
            rank: 0
        });

        // Increment the points and save them.
        client.points.inc(key, "points");

        // Calculate the user's current level
        const curLevel = Math.floor(0.1 * Math.sqrt(client.points.get(key, "points")));
        if (client.points.get(key, "level") < curLevel) {

            client.points.set(key, curLevel, "level");
        }
        let data = client.points.get(key)
        client.points.set(key, {
            ...data,
            level: curLevel
        })
        // Act upon level up by sending a message and updating the user's level in enmap.

        console.log(`${message.author.tag} has ${client.points.get(key, "points")} xp points and is level ${curLevel}`)
        if (client.setup.has(message.guild.id, 'rankroles')) {
            if (curLevel >= 5) {
                let rank = Math.floor(curLevel / 5 - 1)
                if(rank > client.setup.get(message.guild.id, 'rankroles').length) return;
                if (!message.member.roles.cache.has(client.setup.get(message.guild.id, 'rankroles')[rank]));
                if (curLevel >= 5 && curLevel < 10)
                    message.member.roles.add(client.setup.get(message.guild.id, 'rankroles')[rank])
                else {
                    message.member.roles.add(client.setup.get(message.guild.id, 'rankroles')[rank])
                    message.member.roles.remove(client.setup.get(message.guild.id, 'rankroles')[rank - 1])
                }



            }





        }
    }
    if (!client.setup.has(message.guild.id)) client.setup.set(message.guild.id, {
        guild: message.guild.id,
        prefix: '!'
    }) 
    const prefix = await client.setup.get(message.guild.id, 'prefix') 
    if (!message.content.startsWith(prefix)) return;
    if(client.setup.has(message.guild.id, 'authorizedChannels')) {
        if(!message.member.hasPermission('ADMINISTRATOR')){
       let authorizedChannels = await client.setup.get(message.guild.id, 'authorizedChannels')
        if(!message.channel.id.includes(authorizedChannels)){
            let list = [];
            for(channel of authorizedChannels){
                let fetchedChan = await message.guild.channels.cache.get(channel)
                list.push(fetchedChan.name)
            }
            let authChannelEmbed = await new MessageEmbed().setTitle('Unauthorized action').setDescription('I can only be used in this/theses channel(s) :')
            for(chan of list){
                authChannelEmbed.addField(chan, '\u200b')
            }
          return await message.channel.send(authChannelEmbed).then(chan => chan.delete({timeout: 5000}));
        } 

    }
    }
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
    }

    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            message.delete()
            const embed = new MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`❌ **Please avoid spamming commands,** (wait ${timeLeft.toFixed(1)} seconds)`)
            return message.channel.send({
                embed
            })

        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


    try {
        command.execute(message, args, client);
        console.log(`${message.guild} || ${message.author.tag} || command => '${command.name}'`)
    } catch (err) {
        console.log(err)
        //      message.channel.send(`❌ **Ooops!** Une erreur s'est produite lors de l'exécution de cette commande.\nLe problème a été signalé.`);
        message.channel.send(`⚠ Please try again later. The issue has been reported to the bot author.`).setFooter('Author : siimon#3519');
    }

}