const { MessageEmbed } = require('discord.js')
const { User } = require('../../utils/schema')

module.exports = {
    name: 'recall',
    description: 'Thu hồi bcoin',
    options: [
        {
            name: 'bcoin',
            description: 'Thu hồi bcoin',
            type: 1,
            options: [
                {
                    name: 'user',
                    description: 'Người cần thu hồi',
                    type: 6,
                    require: 'false',
                },
                {
                    name: 'bcoin',
                    description: 'bcoin (0 là toàn bộ)',
                    type: 'INTEGER',
                    require: 'false',
                }
            ]
        }
    ],
    run: async (client, interaction) => {
        const user = interaction.options.getUser('user') || interaction.user;
        let bcoin = interaction.options.getInteger('bcoin');
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id });
        const embed = new MessageEmbed({ color: 'RED' });

        // Kiểm tra nếu không nhập số bcoin, trừ toàn bộ số bcoin còn lại của người dùng
        if (!bcoin) {
            bcoin = userData.bcoin;
            userData.bcoin = 0;
            embed.setDescription(`Đã thu hồi \`\`${bcoin}\`\` bcoin của <@${user.id}>⠀👌`);
        } else {
            // Kiểm tra nếu số bcoin muốn thu hồi lớn hơn số bcoin hiện có của người dùng
            if (bcoin > userData.bcoin) {
                embed.setDescription(`\`\`\`Không thể thu hồi do số dư không đủ ${bcoin} bcoin\`\`\``);
                return interaction.reply({
                    embeds: [embed]
                });
            }

            userData.bcoin -= bcoin;
            embed.setDescription(`Đã thu hồi \`\`${bcoin}\`\` bcoin của <@${user.id}>⠀👌`);
        }

        userData.save();

        return interaction.reply({
            embeds: [embed]
        });
    }
}