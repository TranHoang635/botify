const { MessageEmbed } = require('discord.js');
const { User } = require('../../utils/schema');

module.exports = {
    name: 'reset',
    description: 'Reset database',
    run: async (client, interaction) => {
        try {
            // Xóa toàn bộ dữ liệu trong bảng dữ liệu User
            await User.deleteMany({});
            
            // Gửi thông điệp xác nhận khi hoàn thành
            const embed = new MessageEmbed()
                .setColor('GREEN')
                .setDescription('Đã xóa toàn bộ dữ liệu trong cơ sở dữ liệu.')
                .setTimestamp();
            
            return interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Lỗi khi xóa dữ liệu:', error);
            
            // Gửi thông điệp thông báo lỗi nếu có lỗi xảy ra
            const embed = new MessageEmbed()
                .setColor('RED')
                .setDescription('Đã xảy ra lỗi khi xóa dữ liệu.')
                .setTimestamp();
            
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
};
