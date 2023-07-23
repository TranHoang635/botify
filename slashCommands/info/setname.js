const { MessageEmbed } = require('discord.js');
const { User } = require('../../utils/schema');

module.exports = {
    name: 'set',
    description: 'Đổi tên của bạn (tốn 100 Bcoin)',
    options: [
        {
            name: 'nickname',
            description: 'Đổi tên của bạn (tốn 100 Bcoin)',
            type: 1,
            options: [
                {
                    name: 'name',
                    type: 'STRING',
                    description: 'Nhập tên mới của bạn',
                    required: true,
                },
            ]
        },
    ],
    run: async (client, interaction) => {
        const user = interaction.user;
        const bcoin = 100;
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })
        const newNickname = interaction.options.getString('name');
        const guildMember = interaction.member;

        try {
            const remainingBcoin = userData.bcoin - bcoin;
            if (remainingBcoin < 0) {
                const errorEmbed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setDescription(`\`\`\`Bạn không đủ ☘️ để đổi tên\`\`\``)
                    .setFooter({ text: `ID: ${user.id} • ☘️ x ${userData.bcoin}` });
                await interaction.reply({
                    embeds: [errorEmbed],
                    ephemeral: true,
                });
                return;
            }

            await guildMember.setNickname(newNickname);
            userData.bcoin = remainingBcoin;
            await userData.save();

            const successEmbed = new MessageEmbed()
                .setColor('#00ff00')
                .setDescription(`\`\`\`Đổi thành công tên: ${newNickname}\`\`\``)
                .setFooter({ text: `ID: ${user.id} • ☘️ x ${userData.bcoin}` });
            await interaction.reply({
                embeds: [successEmbed],
                ephemeral: false,
            });
        } catch (error) {
            console.log(error);
            const errorEmbed = new MessageEmbed()
                .setColor('#ff0000')
                .setDescription(`\`\`\`Hãy tự đổi tên của bạn đi vì bạn có quyền cao hơn tôi 😥\`\`\``)
                .setFooter({ text: `ID: ${user.id} • ☘️ x ${userData.bcoin}` });
            await interaction.reply({
                embeds: [errorEmbed],
                ephemeral: true,
            });
        }
    },
};