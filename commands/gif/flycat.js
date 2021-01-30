const { MessageAttachment } = require('discord.js');

module.exports = {
    name: 'flycat',
    description: 'Flycat GIF.',
    category: 'GIF',
    cooldown: 10,

    execute(message) {
        const attachment = new MessageAttachment('https://f.hellowork.com/blogdumoderateur/2013/02/gif-anime.gif');
        message.channel.send(attachment);
  },
};
