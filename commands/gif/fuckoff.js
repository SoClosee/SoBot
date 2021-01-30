const { MessageAttachment } = require('discord.js');

module.exports = {
    name: 'fuckoff',
    description: 'Fuckoff GIF.',
    category: 'GIF',
    cooldown: 10,

    execute(message) {
        const attachment = new MessageAttachment('https://i.pinimg.com/originals/0b/8c/08/0b8c081b7b05dcc0aad6238856ea87d2.gif');
        message.channel.send(attachment);
  },
};
