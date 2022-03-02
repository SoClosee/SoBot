module.exports = (client, message, queue, track) => {
    message.channel.send({content:`${client.emotes.music} - ${track.title} has been added to the queue !`});
};