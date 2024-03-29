const {
    MessageEmbed
} = require('discord.js')
module.exports = {
    name: 'setup',
    description: "Setup for some systems ?",
    async execute(message, args, client) {
        if (message.member.permissions.has('MANAGE_GUILD') || message.author.id === '480692379913945099') {
            let embed = new MessageEmbed()
                .setColor('00ff00')
                .setFooter({text:`${client.config.bot_name} • Executed by ${message.author.username}`})
                .setTimestamp()
            let setupEmbed = new MessageEmbed()
            message.channel.send({embeds:[
                setupEmbed
                .setAuthor({name:`${message.member.displayName} • Systems list`,iconURL: message.author.avatarURL()})
                .addField('Select a system to setup:', `\`📙 modlog\` => Set a channel for logging moderation actions\n\n\`👋 joinrole\` => Select a role to assign for every new members.\n\n\`🎭 reactionrole\` => Select a message, a role, and a reaction. A role will be added to every member who react.\n\n\`⚗️ xp\` => Choose to enable or not the point system.\n\n\`🏆 rankrole\` => Choose a list of roles that will be added each 5 level a user pass.\n\n\`⏲️ membercount\` => Choose weither to enable or disable the member count channel.\n\n\`✅ channels\` => Choose a list of channels where commands will be allowed (this blacklists every other channels + admins are not affected).`)
                .setColor('2c2f33')
                .setFooter({text:`${client.config.bot_name} • Executed by ${message.author.username}`})
                .setTimestamp()]});
                console.log('1')
            let filter = m => m.author.id === message.author.id
            message.channel.awaitMessages({filter,
                max: 1,
                time: 30_000,
                errors: ['time']
            }).then(collected => {
                console.log('2')
                if (collected.first().content === 'xp') {
                    message.channel.send('Please choose either to \`enable\` or to \`disable\` the points and levels system.')
                    message.channel.awaitMessages({filter,
                        max: 1,
                        time: 30_000,
                        errors: ['time']
                    }).then(answer => {
                        if (answer.first().content === 'enable') {
                            client.setup.set(message.guild.id, '1', 'activexp')
                            message.channel.send({content:'The point system is now active.'})
                        }
                        if (answer.first().content === 'disable') {
                            client.setup.set(message.guild.id, '0', 'activexp')
                            message.channel.send({content:'The point system is now disabled.'})
                        }

                    })


                }
                if (collected.first().content === 'channels') {
                    message.channel.send({content:'Please enter a list of channels separated with a space. You can mention a channel, or provide it\'s id.'})
                    message.channel.awaitMessages({filter,
                        max: 1,
                        time: 30_000,
                        errors: ['time']
                    }).then(async answer => {
                        let channels = await answer.first().content.split(' ')
                        let channelsID = [];

                        for (index = 0; index < channels.length; index++) {
                            var matches = channels[index].match(/(\d+)/); 
              
                            if (matches) { 
                            channelsID.push(matches[0])
                            }
                        }
                        console.log(channelsID)
                        try {
                            let fetchedChannelIDs = [];
                            for (index = 0; index < channelsID.length; index++) {
                                let fetched = await message.guild.channels.cache.get(channelsID[index])
                                console.log(fetched);
                        fetchedChannelIDs.push(fetched.id)
                     
                            }
                           await client.setup.set(message.guild.id, fetchedChannelIDs,'authorizedChannels')

                        }catch(err){
                            console.log(err)
                            message.reply('One or more IDs | mentions you provided are unvalid.') 
                            return;
                        }
                        message.channel.send({content:'Channel(s) saved. Commands will be usable only in thoses channels (except admins).'})

                    })


                }
                if (collected.first().content === 'rankrole') {
                    message.channel.send({content:'Please enter a list of roles separated with a space. You can mention a role, or mention it\'s id.'})
                    message.channel.awaitMessages({filter,
                        max: 1,
                        time: 30_000,
                        errors: ['time']
                    }).then(async answer => {
                        let roles = await answer.first().content.split(' ')
                        let rolesID = [];

                        for (index = 0; index < roles.length; index++) {
                            var matches = roles[index].match(/(\d+)/); 
              
                            if (matches) { 
                            rolesID.push(matches[0])
                            }
                        }
                        
                        try {
                            let fetchedRoleIDs = [];
                            for (index = 0; index < rolesID.length; index++) {
                                let fetched = await message.guild.roles.fetch(rolesID[index])
                                console.log(fetched);
                        fetchedRoleIDs.push(fetched.id)
                     
                            }
                           await client.setup.set(message.guild.id, fetchedRoleIDs,'rankroles')

                        }catch{
                            message.reply('One or more IDs | mentions you provided are unvalid.') 
                            return;
                        }
                        message.channel.send({content:'Role(s) saved. Each 5 levels, any user will receive the roles in order.'})

                    })


                }
                if (collected.first().content === 'joinrole') {
                    const keyOwner = message.guild.id
                    message.channel.send({embeds:[embed.setTitle("Please send a role name or ID.").setColor('00ff00')]})
                    message.channel.awaitMessages({filter,
                        max: 1,
                        time: 30_000,
                        errors: ['time']
                    }).then(jrmessage => {

if(jrmessage.first().content.includes('remove')){
                            if(client.setup.has(keyOwner, 'joinrolename')){
                                client.setup.delete(keyOwner, 'joinrolename')
                                client.setup.delete(keyOwner, 'joinroleID')
                                message.channel.send({content:'Successfully removed joinrole!'})
                            }
                            else return message.channel.send({content:'No joinrole has been set.'})
                        }
                        let role = message.guild.roles.cache.find(r => r.name == jrmessage.first().content) || message.guild.roles.cache.get(args[0])
                        if (!role) return message.channel.send({embeds:[embed.setTitle('❌ **You must specify a role **name | ID**, restart the setup').setColor('ff0000')]})


 
                        const data = client.setup.get(keyOwner);
                        client.setup.set(keyOwner, {
                            ...data,
                            guild: message.guild.id,
                            joinrolename: role.name,
                            joinroleID: role.id
                        });
                        message.channel.send({embeds:[embed.setTitle(`You choose **${client.setup.get(keyOwner, 'joinrolename')} **for the role to assign.`)]})
                    })
                }

                if (collected.first().content === 'reactionrole') {
                    const keyOwner = message.guild.id
                    message.channel.send({embeds:[embed.setTitle("Please send a role name or ID.").setColor('00ff00')]})
                    message.channel.awaitMessages({filter,
                        max: 1,
                        time: 30_000,
                        errors: ['time']
                    }).then(async rRole => {


                        let role = message.guild.roles.cache.find(r => r.name == rRole.first().content) || message.guild.roles.cache.get(rRole.first().content)
console.log(role)                       
 if (!role) {
                            message.channel.send({embeds:[embed.setTitle('❌ **You must specify a role **name | ID**, restart the setup').setColor('ff0000')]})
                            return;
                        }
                        message.channel.send({embeds:[new MessageEmbed().setTitle('Please now send a channel ID with your message inside.').setColor('00ff00')]})

                        message.channel.awaitMessages({filter,
                            max: 1,
                            time: 30_000,
                            errors: ['time']
                        }).then(async reactionChannel => {
                            let channel = await message.guild.channels.cache.get(reactionChannel.first().content)

                            if (channel == undefined) return message.channel.send({content:'Wrong ID provided.'})
                            message.channel.send({embeds:[new MessageEmbed().setTitle('Please now send a message ID in the channel you provided.').setColor('00ff00')]})

                            message.channel.awaitMessages({filter,
                                max: 1,
                                time: 30_000,
                                errors: ['time']
                            }).then(async reactionMessage => {
                                let rMessage = reactionMessage.first().content;
                                let check;
                                try {
                                    check = await channel.messages.fetch(rMessage)
                                } catch {

                                }

                                if (check == undefined)

                                    return message.channel.send({content:'Wrong message ID provided'})


                                let awaitReaction = await message.channel.send({embeds:[new MessageEmbed().setTitle('Please now react with an emoji.').setColor('00ff00')]})
                                let filter1 = (reaction, user) =>{
console.log(user)
return  user.id === message.author.id;

}
                                awaitReaction.awaitReactions({filter1,
                                        max: 1,
                                        time: 60000,
                                        errors: ['time']
                                    })
                                    .then(async collected => {
                                        const reaction = collected.first().emoji.name;
console.log(reaction)
                                        let reactionName;
                                        if (collected.first().emoji.id) {
                                            const rID = collected.first().emoji.id
                                            let reactionTest = await client.emojis.cache.find(emoji => emoji.id == rID)
                                            if (reactionTest == undefined)
                                                return message.channel.send({content:'I don\'t have access to this emoji'})
                                            else reactionName = rID

                                        } else reactionName = reaction
 let time = Date.now()
                                        if (client.setup.has(keyOwner, 'reactionrole')) {
                                            if (client.setup.has(keyOwner, `reactionrole.${rMessage}`)){
                                                 client.setup.set(keyOwner, {
                                                    channel: channel.id,
                                                    message: rMessage,
                                                    role: role.id,
                                                    emoji: reactionName
                                                }, `reactionrole.${rMessage}.${time}`)
                                            }
                                            else {
                                                client.setup.set(keyOwner, {}, `reactionrole.${rMessage}`)
                                                    client.setup.set(keyOwner, {
                                                    channel: channel.id,
                                                    message: rMessage,
                                                    role: role.id,
                                                    emoji: reactionName
                                                }, `reactionrole.${rMessage}.${time}`)
                                            }


                                           
                                        }
                                        if (!client.setup.has(keyOwner, 'reactionrole')) {
                                            client.setup.set(keyOwner, {}, `reactionrole`)
                                           client.setup.set(keyOwner, {}, `reactionrole.${rMessage}`)
                                                    client.setup.set(keyOwner, {
                                                    channel: channel.id,
                                                    message: rMessage,
                                                    role: role.id,
                                                    emoji: reactionName
                                                }, `reactionrole.${rMessage}.${time}`)

                                        }
                                        message.channel.send({embeds:[new MessageEmbed().setTitle('Your reaction role system has been set up.').setColor('GREEN')]})
                                        await check.react(collected.first().emoji)


                                    })


                            })
                        })
                    })


                    // message.channel.send({embeds:[embed.setTitle(`You choose **${client.setup.get(keyOwner, 'joinrolename')} **for the role to assign.`)]})
                }
                if (collected.first().content === 'membercount') {
                    message.channel.send({content:'Please choose either to \`enable\` or to \`disable\` the member count channel.'})
                    message.channel.awaitMessages({filter,
                        max: 1,
                        time: 30_000,
                        errors: ['time']
                    }).then(async answer => {
                        if (answer.first().content === 'enable') {
                            client.setup.set(message.guild.id, '1', 'membercount')

                            message.channel.send({content:'The membercount channel has been created.'})
                            message.guild.channels.create(`Member Count -> ${message.guild.memberCount}`, {
                                type: 'voice',
                                permissionOverwrites: [{
                                    id: message.guild.roles.everyone.id,
                                    deny: ['CONNECT'],
                                }, ],
                            }).then(channel => client.setup.set(message.guild.id, channel.id, 'membercountChannel'))
                        }
                        if (answer.first().content === 'disable') {
                            if (client.setup.get(message.guild.id, 'membercount') == 0) return message.channel.send({content:'The member count system is already disabled'});
                            client.setup.set(message.guild.id, '0', 'membercount')

                            message.channel.send({content:'The membercount channel has been deleted.'})
                            message.guild.channels.cache.get(client.setup.get(message.guild.id, 'membercountChannel')).delete('MemberCount disabled')
                            await client.setup.delete(message.guild.id, 'membercountChannel')
                        }

                    })


                }
                if (collected.first().content === 'modlog') {
                    let embed = new MessageEmbed().setTitle('Mention a channel, or specify it\'s ID').setColor('00ff00')
                    message.channel.send({embeds:[embed.setColor('00ff00')]})
                    message.channel.awaitMessages({filter,
                        max: 1,
                        time: 30_000,
                        errors: ['time']
                    }).then(modlogChannel => {
                        try {
                            let channel = modlogChannel.first().mentions.channels.first() || message.guild.channels.cache.get(modlogChannel.first().content);

                            channel.send({embeds:[embed.setTitle('This channel will be used as a moderation log channel..').setFooter({text:`${client.config.bot_name} • Executed by ${message.author.username}`}).setTimestamp()]})
                            message.channel.send({embeds:[embed.setTitle('Channel saved')]})
                            data = client.setup.get(message.guild.id)
                            client.setup.set(message.guild.id, {
                                ...data,
                                modlogChannelID: channel.id
                            })
                        } catch {
                            message.channel.send({content:'I was not able to find that channel. Check my permissions or your infos.'})
                        }
                    })
                }
            })
        } else {
            message.channel.send({embeds:[client.embedPerm]})
        }
    }
}
