
module.exports = {
    name: 'setstatus',
    async execute(message, args, client) {
        if(!['633792445146202112','480692379913945099'].includes(message.author.id)) return message.reply('You can\'t do that');
        client.setup.set('status', args.join(' '));
         client.user.setActivity(args.join(' '), {
         type: 'WATCHING'
     });

message.channel.send(' I successfully updated the status ! ');
      

    }
}
