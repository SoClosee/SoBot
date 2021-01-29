const {
    MessageEmbed
} = require('discord.js')

module.exports = client => {

    console.log(`Connecté en tant que ${client.user.tag}`)







    setInterval(() => {
        client.guilds.cache.map(async guild => { //loop through each guild

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
                                        channel.send(embedLog
                                            .setTimestamp()
                                            .setFooter(`[AutoUnban]`, client.user.displayAvatarURL())
                                            .setDescription(`**Type** => Unban \n**User** => ${id}\n**Reason** => Automatic unban`)
                                            .setColor('GREEN')

                                        )
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
                              let vipUser =  await guild.members.fetch(id)
                                console.log(`[AutoUnvip] User ${id} is no longer vip.`)
                                vipUser.roles.remove('802224235295539251')
                                client.vip.delete(guild.id, id)
                                if (client.setup.has(guild.id) && client.setup.has(guild.id, 'modlogChannelID')) {
                                    client.channels.fetch(client.setup.get(guild.id, 'modlogChannelID')).then((channel) => {


                                        let embedLog = new MessageEmbed()
                                        channel.send(embedLog
                                            .setTimestamp()
                                            .setFooter(`[AutoUnvip]`, client.user.displayAvatarURL())
                                            .setDescription(`**Type** => VIP Removing \n**User** => ${id}\n**Reason** => Automatic removal`)
                                            .setColor('GREEN')

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
                                    channel.send(embedLog
                                        .setTimestamp()
                                        .setFooter(`[AutoUnmute]`, client.user.displayAvatarURL())
                                        .setDescription(`**Type** => Unmute \n**User** => ${user.user.tag}\n**Reason** => Automatic unmute`)
                                        .setColor('GREEN')

                                    )
                                })

                            }
                        } catch (error) {
                            console.log(`[AutoUnmute] Failed to unban ${id}, reason: ${error}`)
                        }
                    }
                }

            } else {
                return
            }
        })




    }, 300000);

    client.user.setActivity(client.setup.get(status), {
        type: 'WATCHING'
    });



}
