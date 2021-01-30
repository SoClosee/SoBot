module.exports = {
    name: 'avatar',
    description: 'Afficher la photo de profil.',
    category: 'Public',
    cooldown: 15,

    execute(message) {
        message.reply(message.author.displayAvatarURL());
  },
};
