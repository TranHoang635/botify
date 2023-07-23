const { MessageEmbed } = require('discord.js')
const { User } = require('../../utils/schema')

module.exports = {
    name: "add",
    description: "Nạp Bcoin",
    options: [
        {
            name: "bcoin",
            description: "Nạp Bcoin",
            type: 1, // 1 is type SUB_COMMAND
            options: [
                {
                    name: "user",
                    description: "Người cần thêm",
                    type: 6, // 6 is type USER
                    required: false
                },
                {
                    name: "number",
                    description: "Số Bcoin",
                    type: 10, // 10 is type INTEGER (NUMBER in application commands)
                    required: false
                }
            ]
        },
    ],
    run: async (client, interaction) => {
        const user = interaction.options.getUser('user') || interaction.user
        const number = interaction.options.getNumber('number') || interaction.number
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })
        const embed = new MessageEmbed({ color: 'WHITE' })

        // Kiểm tra xem giá trị của number có phải là một số hợp lệ hay không
        if (isNaN(number)) {
            return interaction.reply({
                embeds: [embed.setDescription(`\`\`\`Điền cái tên với số tiền VÀO!!!\`\`\``)]
            })
        }

        if (number < 0) {
            const senderembed = new MessageEmbed({ color: 'RED' })
                .setDescription(`\`\`\`Ấn số âm ăn cứt à , cho mày ra đảo giờ !\`\`\``)
            return interaction.reply({ embeds: [senderembed], ephemeral: true });
        }

        userData.bcoin += number
        userData.save()

        return interaction.reply({
            embeds: [embed.setDescription(`\`\`\`Đã thêm thành công ${number}☘️ 👌\`\`\``)]
        })
    }
}