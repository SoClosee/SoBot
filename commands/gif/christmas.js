const { MessageAttachment } = require('discord.js');

module.exports = {
    name: 'christmas',
    description: 'Christmas GIF.',
    category: 'GIF',
    cooldown: 10,

    execute(message) {
        const attachment = new MessageAttachment('https://i.imgur.com/LerQpZS.jpeg');
        message.channel.send(attachment);
  },
};
