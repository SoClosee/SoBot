const { MessageAttachment } = require('discord.js');


module.exports = {
    name: 'rip',
    description: 'Afficher le gif RIP.',
    category: 'GIF',
    cooldown: 10,

    execute(message) {
        const attachment = new MessageAttachment('https://i.imgur.com/w3duR07.png');
        message.channel.send(attachment);
  },
};
