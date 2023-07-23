const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'ping',
    description: 'Xem độ trễ của bot',
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
        const pingEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor({ name: 'Ping Bot'})
        .setDescription(`🌍**• Pong !** \` ${client.ws.ping}ms \``)
        .setTimestamp();
        return interaction.reply({embeds: [ pingEmbed ]})
    },
};