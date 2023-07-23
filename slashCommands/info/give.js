const { MessageEmbed } = require('discord.js');
const { User } = require('../../utils/schema');

// Tạo một Map để lưu trữ thông tin số lần gửi và thời gian gửi gần nhất của mỗi người dùng
const userSendLimits = new Map();

module.exports = {
    name: 'give',
    description: 'Chuyển tiền cho người khác',
    options: [
        {
            name: 'bcoin',
            description: 'Chuyển tiền cho người khác',
            type: 1,
            options: [
                {
                    name: 'user',
                    description: 'Người bạn muốn chuyển',
                    type: 'USER',
                    required: true,
                },
                {
                    name: 'bcoin',
                    description: 'bcoin',
                    type: 'INTEGER',
                    required: true,
                    constraints: {
                        min: 1,
                        integer: true
                    }
                }
            ]
        }
    ],
    run: async (client, interaction) => {
        const user = interaction.options.getUser('user');
        const bcoin = interaction.options.getInteger('bcoin');
        const senderData = await User.findOne({ id: interaction.user.id }) || new User({ id: interaction.user.id });
        const receiverData = await User.findOne({ id: user.id }) || new User({ id: user.id });

        if (bcoin < 0) {
            const senderembed = new MessageEmbed({ color: 'RED' })      
            .setDescription(`\`\`\`Ấn số âm ăn cứt à, cho mày ra đảo giờ!\`\`\``)
            return interaction.reply({ embeds: [senderembed], ephemeral: true });
        }

        // Kiểm tra nếu số bcoin gửi là số âm hoặc lớn hơn 800, gửi thông báo lỗi
        if (bcoin < 1 || bcoin > 900) {
            const senderembed = new MessageEmbed({ color: 'RED' })      
            .setDescription(`\`\`\`Bạn chỉ được phép chuyển tối đa 800 bcoin trong mỗi lần gửi\`\`\``)
            return interaction.reply({ embeds: [senderembed], ephemeral: true });
        }

        // Kiểm tra nếu người dùng đã gửi 2 lần trong cùng một ngày
        const today = new Date().toDateString();
        const userSendInfo = userSendLimits.get(interaction.user.id) || { count: 0, lastSent: '', totalSentToday: 0 };

        if (userSendInfo.lastSent === today && userSendInfo.count >= 2) {
            const senderembed = new MessageEmbed({ color: 'RED' })      
            .setDescription(`\`\`\`Bạn đã đạt tới giới hạn 2 lần gửi trong ngày\`\`\``)
            return interaction.reply({ embeds: [senderembed], ephemeral: true });
        }

        // Kiểm tra nếu tổng số bcoin gửi trong ngày vượt quá 800
        if (userSendInfo.totalSentToday + bcoin > 800) {
            const senderembed = new MessageEmbed({ color: 'RED' })      
            .setDescription(`\`\`\`Bạn chỉ được phép gửi tối đa 800 bcoin\`\`\``)
            return interaction.reply({ embeds: [senderembed], ephemeral: true });
        }

        // Lưu thông tin số lần gửi và thời gian gửi gần nhất của người dùng
        userSendInfo.count++;
        userSendInfo.lastSent = today;
        userSendInfo.totalSentToday += bcoin;
        userSendLimits.set(interaction.user.id, userSendInfo);

        // Kiểm tra số bcoin người gửi còn đủ không
        if (senderData.bcoin < bcoin) {
            const senderembed = new MessageEmbed({ color: 'RED' })      
            .setDescription(`\`\`\`Bạn cần có ${bcoin} bcoin để chuyển\`\`\``)
            return interaction.reply({ embeds: [senderembed], ephemeral: true });
        }

        // Cập nhật số bcoin của người gửi và người nhận
        senderData.bcoin -= bcoin;
        receiverData.bcoin += bcoin;
        senderData.save();
        receiverData.save();

        const embed = new MessageEmbed({ color: 'WHITE' })
        .setDescription(`\`\`\`Đã chuyển ${bcoin} bcoin cho ${user.username}\`\`\``)
        return interaction.reply({ embeds: [embed] });
    }
};