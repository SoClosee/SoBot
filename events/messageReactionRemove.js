module.exports = async (client, reaction, user) => {

    if (reaction.partial) {
      
        reaction.fetch()
            .then(async reaction => {
                if (!reaction.message.guild.me.hasPermission('MANAGE_ROLES')) return;
                
                let gID = reaction.message.guild.id
                if (client.setup.has(gID, 'reactionrole')) {
                    
                    if (client.setup.has(gID, `reactionrole.${reaction.message.id}`)) {
                        
                        stuff = await client.setup.get(gID, 'reactionrole.' + reaction.message.id)
                        if (reaction.emoji.id) {
            
                            for (t in stuff) {
                                let emojidb = Object.values(client.setup.get(gID, `reactionrole.${reaction.message.id}.${t}`))
                                if (emojidb[3] == reaction.emoji.id) {
                                    reaction.message.guild.members.fetch(user.id).then(member => {
            
                                        if(member.roles.cache.has(emojidb[2]))
            
                                            member.roles.remove(emojidb[2])
            
                                    })
            
            
                                }
                            }
            
            
            
            
                        } else {
                            for (t in stuff) {
                                let emojidb = Object.values(client.setup.get(gID, `reactionrole.${reaction.message.id}.${t}`))
                                if (emojidb[3] == reaction.emoji.name) {
                                    reaction.message.guild.members.fetch(user.id).then(member => {
            
                                        if(member.roles.cache.has(emojidb[2]))
            
                                            member.roles.remove(emojidb[2])
            
                                    })
            
            
                                }
                            }
                        }
                    }
                }
            })
            .catch(error => {
                console.log('Something went wrong when fetching the message: ', error);
            });
    } else {
        if (!reaction.message.guild.me.hasPermission('MANAGE_ROLES')) return;
               
                let gID = reaction.message.guild.id
                if (client.setup.has(gID, 'reactionrole')) {
                  
                    if (client.setup.has(gID, `reactionrole.${reaction.message.id}`)) {
                      
                        stuff = await client.setup.get(gID, 'reactionrole.' + reaction.message.id)
                        if (reaction.emoji.id) {
            
                            for (t in stuff) {
                                let emojidb = Object.values(client.setup.get(gID, `reactionrole.${reaction.message.id}.${t}`))
                                if (emojidb[3] == reaction.emoji.id) {
                                    reaction.message.guild.members.fetch(user.id).then(member => {
            
                                        if(member.roles.cache.has(emojidb[2]))
            
                                            member.roles.remove(emojidb[2])
            
                                    })
            
            
                                }
                            }
            
            
            
            
                        } else {
                            for (t in stuff) {
                                let emojidb = Object.values(client.setup.get(gID, `reactionrole.${reaction.message.id}.${t}`))
                                if (emojidb[3] == reaction.emoji.name) {
                                    reaction.message.guild.members.fetch(user.id).then(member => {
            
                                        if(member.roles.cache.has(emojidb[2]))
            
                                            member.roles.remove(emojidb[2])
            
                                    })
            
            
                                }
                            }
                        }
                    }
                };
    }
}

   
