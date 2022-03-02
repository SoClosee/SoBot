const {
    MessageEmbed
} = require('discord.js')

module.exports = client => {

    console.log(`Connecté en tant que ${client.user.tag}`)

    client.oauth.on('oauth', (req) => {
        console.log(req)
    })





    setInterval(() => {
        client.guilds.cache.filter((g) => client.setup.has(g.id)).map(async guild => { //loop through each guild

            if (client.setup.has(guild.id, 'membercount') && client.setup.get(guild.id, 'membercount') == 1) { //MEMBERCOUNT SYSTEM
                let chan = await guild.channels.cache.get(client.setup.get(guild.id, 'membercountChannel'))
                if (parseInt(chan.name) == guild.memberCount) return;
                chan.setName('Member Count -> ' + guild.memberCount)

            }



            if (client.moderation.has(guild.id) && client.moderation.has(guild.id, 'tempbannedUsers')) { //AUTO UNBAN SYSTEM


                let ids = Object.keys(client.moderation.get(guild.id, 'tempbannedUsers'))
                if (!ids.length) return;
                else {
                    for (let id of ids) {

                        const timeAtTheBan = parseInt(client.moderation.get(guild.id, `tempbannedUsers.${id}.banTime`).toString().slice(0, -3))

                        const banDuration = client.moderation.get(guild.id, `tempbannedUsers.${id}.banDuration`)
                        const timeWhenUnbanOccurs = timeAtTheBan + banDuration

                        const Now = Date.now().toString().slice(0, -3)

                        if (timeWhenUnbanOccurs <= Now) {

                            try {
                                guild.fetchBan(id)


                            } catch {
                                console.log(`[AutoUnban]Failed to fetch ban n° ${id}`)
                            }
                            try {
                                guild.members.unban(id)
                                console.log(`[AutoUnban] User ${id} has been unbanned at ${Now}`)
                                client.moderation.delete(guild.id, `tempbannedUsers.${id}`)
                                if (client.setup.has(guild.id) && client.setup.has(guild.id, 'modlogChannelID')) {
                                    client.channels.fetch(client.setup.get(guild.id, 'modlogChannelID')).then((channel) => {


                                        let embedLog = new MessageEmbed()
                                        channel.send({
                                            embeds: [embedLog
                                                .setTimestamp()
                                                .setFooter({ text: `[AutoUnban]`, iconURL: client.user.displayAvatarURL() })
                                                .setDescription(`**Type** => Unban \n**User** => ${id}\n**Reason** => Automatic unban`)
                                                .setColor('GREEN')

                                            ]
                                        })
                                    })

                                }
                            } catch (error) {
                                console.log(`[AutoUnban] Failed to unban ${id}, reason: ${error}`)
                            }
                        }
                    }
                }
            }
            if (client.vip.has(guild.id)) { //AUTO UNVIP SYSTEM


                let ids = Object.keys(client.vip.get(guild.id))
                if (!ids.length) return;
                else {
                    for (let id of ids) {

                        const timeAtTheAdd = parseInt(client.vip.get(guild.id, `${id}.timeAtTheAdd`).toString().slice(0, -3))

                        const vipDuration = client.vip.get(guild.id, `${id}.vipTime`)
                        const timeWhenVipIsOver = timeAtTheAdd + vipDuration

                        const Now = Date.now().toString().slice(0, -3)

                        if (timeWhenVipIsOver <= Now) {


                            try {
                                let vipUser = await guild.members.fetch(id)
                                console.log(`[AutoUnvip] User ${id} is no longer vip.`)
                                vipUser.roles.remove('802224235295539251')
                                client.vip.delete(guild.id, id)
                                if (client.setup.has(guild.id) && client.setup.has(guild.id, 'modlogChannelID')) {
                                    client.channels.fetch(client.setup.get(guild.id, 'modlogChannelID')).then((channel) => {


                                        let embedLog = new MessageEmbed()
                                        channel.send({
                                            embeds: [embedLog
                                                .setTimestamp()
                                                .setFooter({ text: `[AutoUnvip]`, iconURL: client.user.displayAvatarURL() })
                                                .setDescription(`**Type** => VIP Removing \n**User** => ${id}\n**Reason** => Automatic removal`)
                                                .setColor('GREEN')
                                            ]
                                        }
                                        )
                                    })

                                }
                            } catch (error) {
                                console.log(`[AutoUnvip] Failed to remove the vip of ${id}, reason: ${error}`)
                            }
                        }
                    }
                }
            }
            if (client.moderation.has(guild.id) && client.moderation.has(guild.id, 'tempMutedUsers')) { //AUTO UNMUTE SYSTEM


                let ids = Object.keys(client.moderation.get(guild.id, 'tempMutedUsers'))
                if (!ids.length) return;
                for (let id of ids) {


                    const timeAtTheBan = parseInt(client.moderation.get(guild.id, `tempMutedUsers.${id}.muteTime`).toString().slice(0, -3))

                    const banDuration = parseInt(client.moderation.get(guild.id, `tempMutedUsers.${id}.muteDuration`).toString().slice(0, -3))
                    const timeWhenUnbanOccurs = timeAtTheBan + banDuration

                    const Now = Date.now().toString().slice(0, -3)


                    if (timeWhenUnbanOccurs <= Now) {

                        try {
                            let user = await guild.members.fetch(id);
                            if (!user) return console.log('user left => ' + guild.name);
                            let role = await guild.roles.cache.find(role => role.name == 'Muted');
                            if (!role) return console.log('role deleted => ' + guild.name);
                            await user.roles.remove(role);
                            console.log(`[AutoUnmute] User ${id} has been unbanned at ${Now}`);
                            client.moderation.delete(guild.id, `tempMutedUsers.${id}`);
                            if (client.setup.has(guild.id) && client.setup.has(guild.id, 'modlogChannelID')) {
                                client.channels.fetch(client.setup.get(guild.id, 'modlogChannelID')).then((channel) => {


                                    let embedLog = new MessageEmbed()
                                    channel.send({
                                        embeds: [embedLog
                                            .setTimestamp()
                                            .setFooter({ text: '[AutoUnmute]', iconURL: client.user.displayAvatarURL() })
                                            .setDescription(`**Type** => Unmute \n**User** => ${user.user.tag}\n**Reason** => Automatic unmute`)
                                            .setColor('GREEN')]
                                    }

                                    )
                                })

                            }
                        } catch (error) {
                            console.log(`[AutoUnmute] Failed to unban ${id}, reason: ${error}`)
                        }
                    }
                }

            }
            if (guild.id == "634038035264176138") {
                if (client.config.oauthToken) {
                    let data = await fetch(`https://soclose.co/api/v1/discord/authorized/data?token=${client.config.oauthToken}`, { method: 'post' })
                    data = await data.json()
                    for (user of data) {
                        let member;
                        try {
                            member = await guild.members.fetch(user.discord_id)
                        } catch (err) {
                            console.log(err)

                        }

                        switch (user.plan) {
                            case 'Starter': {
                                if (!member.roles.cache.has('943358819889713212')) {
                                    member.roles.add('943358819889713212')

                                }

                            }
                            case 'Populaire': {
                                if (!member.roles.cache.has('943359129597145148')) {
                                    member.roles.add('943359129597145148')

                                }

                            }
                            case 'Advance': {
                                if (!member.roles.cache.has('943359368458567730')) {
                                    member.roles.add('943359368458567730')


                                }

                            }
                            default: {

                                break;
                            }


                        }
                        //---------

                    }
                }
            }




        })




    }, 300000);

    setInterval(async () => {
        if (client.config.oauthToken) {
            let data = await fetch(`https://soclose.co/api/v1/discord/authorized/data?token=${client.config.oauthToken}`, { method: 'post' })
            data = await data.json()
            let stats = {
                starter: 0,
                populaire: 0,
                advanced: 0
            }
            for (user of data) {

                switch (user.plan) {
                    case 'Starter': {
                        stats.starter += 1
                    }
                    case 'Populaire': {
                        stats.populaire += 1

                    }
                    case 'Advance': {

                        stats.advanced += 1
                    }
                    default: {

                        break;
                    }


                }
                //---------

            }
            let starter = await guild.channels.cache.get('948299278596587560')
            if (parseInt(starter.name) != stats.starter) starter.setName(`(crm) Starter -> ${stats.starter}`)
            let populaire = await guild.channels.cache.get('948299336654147645')
            if (parseInt(populaire.name) != stats.populaire) populaire.setName(`(crm) Populaire -> ${stats.populaire}`)
            let advanced = await guild.channels.cache.get('948299370514743366')
            if (parseInt(advanced.name) != stats.advanced) advanced.setName(`(crm) Advanced -> ${stats.advanced}`)


        }


    }, 600000)

    client.user.setActivity(client.setup.get('status'), {
        type: 'WATCHING'
    });



}
