const { MessageAttachment } = require('discord.js');


module.exports = {
    name: 'trump',
    description: 'Afficher le gif Trump qui danse.',
    category: 'GIF',
    cooldown: 10,

    execute(message) {
        const attachment = new MessageAttachment('https://media.tenor.com/images/f57cfc67871d9aa4c551ff5bb8b4f065/tenor.gif');
        message.channel.send(attachment);
  },
};
