module.exports = (client, interaction) => {
    if (!interaction.isCommand()) return;
    const command = client.interactions.get(interaction.commandName);
    if (!command) return interaction.reply('Lệnh không hợp lệ');
    command.run(client, interaction);
}