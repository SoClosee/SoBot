module.exports = (client, message, queue) => {
    message.channel.send({content:`${client.emotes.error} - Music stopped as there is no more member in the voice channel !`});
};