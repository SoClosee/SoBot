const { MessageAttachment } = require('discord.js');

module.exports = {
    name: 'furycat',
    description: 'Furycat GIF.',
    category: 'GIF',
    cooldown: 10,

    execute(message) {
        const attachment = new MessageAttachment('https://i.imgur.com/EmBC5F4.jpg');
        message.channel.send(attachment);
  },
};
