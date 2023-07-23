const { MessageEmbed } = require('discord.js')
const { User } = require('../../utils/schema')

module.exports = {
    name: 'bcoin',
    description: 'Check số Bcoin của bạn',
    options: [
        {
            name: 'user',
            description: 'Người dùng cần kiểm tra số dư',
            type: 'USER',
            required: false,
        }
    ],
    run: async (client, interaction) => {
        const user = interaction.options.getUser('user') || interaction.member.user;
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id });

        const balanceEmbed = new MessageEmbed()
            .setDescription(`<@${user.id}> đang sở hữu \`\`${userData.bcoin}\`\` bcoin`)
            .setColor('WHITE');

        if (user.id !== interaction.user.id) {
            balanceEmbed
            .setDescription(`<@${user.id}> đang sở hữu \`\`${userData.bcoin}\`\` bcoin`);
        }

        return interaction.reply({
            embeds: [balanceEmbed]
        });
    },
};