module.exports = (client, message, track) => {
    message.channel.send({content:`${client.emotes.music} - Now playing ${track.title} into ${message.member.voice.channel.name} ...`});
};