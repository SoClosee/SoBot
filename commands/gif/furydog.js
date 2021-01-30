const { MessageAttachment } = require('discord.js');

module.exports = {
    name: 'furydog',
    description: 'Furydog GIF.',
    category: 'GIF',
    cooldown: 10,

    execute(message) {
        const attachment = new MessageAttachment('https://i.imgur.com/V4w59um.png');
        message.channel.send(attachment);
  },
};
