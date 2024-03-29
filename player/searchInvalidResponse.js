module.exports = (client, message, query, tracks, content, collector) => {
    if (content === 'cancel') {
        collector.stop();
        return message.channel.send({content:`${client.emotes.success} - The selection has been **cancelled** !`});
    } else message.channel.send({content:`${client.emotes.error} - You must send a valid number between **1** and **${tracks.length}** !`});
};