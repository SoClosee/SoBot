
module.exports = {
    name: 'clear',
    description: "To clear messages in a channel (limit = 50)",
    async execute(message, args, client) {
        if (message.member.permissions.has('MANAGE_MESSAGES') || message.author.id === '480692379913945099') {
          
            const numberOfMessages = args[0]
            let toIncrement = 0;
            try{
                
               let limit = parseInt(numberOfMessages)
            await   message.channel.messages.fetch({limit: limit}).then((async messages=>{
                  await messages.map(async (totalMessage) => {
                      toIncrement++
                    await totalMessage.delete({timeout: 2300}) 
                   })
                 
               
               }
                ))
message.channel.send({content:'Successfully deleted ' + toIncrement + ' messages.'})
            }catch{
               return message.channel.send({embeds: [embed.setTitle("There was a problem, please check that the number you gave doesn't exceed 50.").setColor('ff0000')]})
            }

        }
    }
}
