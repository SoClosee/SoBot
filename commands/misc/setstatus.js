
module.exports = {
    name: 'setstatus',
    async execute(message, args, client) {
        client.setup.set('status', message.content)
         client.user.setActivity(message.content, {
         type: 'WATCHING'
     });

message.channel.send('I successfully updated the status ! ')
      

    }
}
