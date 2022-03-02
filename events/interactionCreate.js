const {Modal} = require('discord.js')
module.exports = async (client, interaction) => {
    console.log(interaction.type)
    if (!interaction.isCommand()) return;

    const command = client.slashCommands.get(interaction.commandName);
  
    if (!command) return;

    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
}