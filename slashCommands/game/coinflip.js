const { MessageEmbed } = require('discord.js');
const { User } = require('../../utils/schema');

module.exports = {
    options: [
        {
            name: 'gamemode',
            description: 'Hãy chọn color',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: '🔴 Đỏ',
                    value:'🔴'
                },
                {
                    name: '⚫ Đen',
                    value:'⚫'
                }
            ]
        },
        {
            name: 'bcoin',
            description: 'Nhập Bcoin cược',
            type: 'INTEGER',
            required: true
        }
    ],
    run: async (client, interaction) => {

        // Lấy người dùng gọi lệnh và lựa chọn của họ
        const user = interaction.user;
        const bcoin = interaction.options.getInteger('bcoin');
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id });

        // ... Tiếp tục thực hiện logic của bạn

        // Hiển thị thông báo "rolling" để người dùng biết bot đang xử lý
        const loadingEmbed = new MessageEmbed()
            .setColor('#000000')
            .setDescription('Đang tung đồng xu...<a:coinflip:1131989173147021414>');

        const loadingMessage = await interaction.reply({ embeds: [loadingEmbed], fetchReply: true });

        // Tính toán kết quả
        const result = Math.random() < 0.5 ? '🔴' : '⚫';
        const win = result === interaction.options.getString('gamemode');

        // Cập nhật số bcoin của người dùng
        userData.bcoin += win ? bcoin : -bcoin;
        await userData.save();

        // Hiển thị kết quả
        setTimeout(async () => {
            const resultText = `Kết quả: ${result}`;
            const embed = new MessageEmbed()
                .setColor(win ? '#00FF00' : '#FF0000')
                .addFields(
                    { name: '\u2009', value: win ? `\`\`\`Choose: ${interaction.options.getString('gamemode')} (${bcoin} bcoin)\nResult: ${result}\`\`\`\`\`\`Bạn đã thắng [+ ${bcoin * 1} bcoin]\`\`\`` : `\`\`\`Choose: ${interaction.options.getString('gamemode')} (${bcoin} bcoin)\nResult: ${result}\`\`\`\`\`\`Bạn đã thua [- ${bcoin} bcoin]\`\`\`` }
                )
                .setFooter({ text: `ID: ${user.id} • bcoin x ${userData.bcoin}` });
            // Thay thế thông báo "rolling" bằng kết quả cuối cùng
            await loadingMessage.edit({ embeds: [embed] });
        }, 2000);
    }
};
