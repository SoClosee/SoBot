const fetch = require('node-fetch');

module.exports = {
    name: 'plan',
    async execute(message, args, client) {
        if(!client.config.oauthToken) return message.channel.send({content: 'Please try again later (no oAuth token)'})
       let data = await fetch(`https://soclose.co/api/v1/discord/authorized/data?token=${client.config.oauthToken}`, {method: 'post'})
       data = await data.json()
       for(user of data){
           if(user.discord_id === message.author.id){
            switch(user.plan){
                case'Starter':{
                    if(!message.member.roles.cache.has('943358819889713212')){
                        message.member.roles.add('943358819889713212')
                        message.channel.send({content: 'Your role has been added (Starter)!'})

                    }
                    message.channel.send({content: 'You already have to role corresponding to your plan (Starter).'})
                }
                case'Popular ':{
                    if(!message.member.roles.cache.has('943359129597145148')){
                        message.member.roles.add('943359129597145148')
                        message.channel.send({content: 'Your role has been added (Popular)!'})

                    }
                    message.channel.send({content: 'You already have to role corresponding to your plan (Popular).'})
                }
                case'Advance':{
                    if(!message.member.roles.cache.has('943359368458567730')){
                        message.member.roles.add('943359368458567730')
                        message.channel.send({content: 'Your role has been added (Advanced)!'})

                    }
                    message.channel.send({content: 'You already have to role corresponding to your plan (Advanced).'})
                }
                default:{
                    message.channel.send({content: 'You currently have no plan.'})
                    break;
                }

            }
           }
    
       }
       
    }
}
