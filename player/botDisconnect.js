module.exports = (client, message, queue) => {
    message.channel.send({content:`${client.emotes.error} - Music stopped as i have been disconnected from the channel !`});
};