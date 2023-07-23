const { MessageEmbed } = require('discord.js')
const { User } = require('../../utils/schema')
const prettyMilliseconds = require('pretty-ms');

module.exports = {
    name: 'daily',
    description: 'Hãy điểm danh mỗi ngày để nhận thưởng nhé!',
    run: async (client,interaction) => {
        const user = interaction.user
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })
        const embed = new MessageEmbed({ color: 'WHITE' })

        if (userData.cooldowns.daily > Date.now()) return interaction.reply({
            embeds: [ embed
                .setDescription(`\`\`\`⌛| Hãy chờ ${prettyMilliseconds(userData.cooldowns.daily - Date.now(), { verbose: true, secondsDecimalDigits: 0 })} để nhận tiếp\`\`\``)
                .setFooter({ text: `ID: ${user.id} • bcoin x ${userData.bcoin}`})
            ],
             ephemeral: true
        })

        const randomBcoin = Math.floor(Math.random() * (500 - 50 + 1) + 50);
        userData.bcoin += randomBcoin;
        userData.cooldowns.daily = new Date().setHours(24,0,0,0)
        userData.save()

        return interaction.reply({
            embeds: [ embed
                .setDescription(`<@${user.id}> nhận được \`\`${randomBcoin} bcoin\`\``)
                .setFooter({ text: `ID: ${user.id} • bcoin x ${userData.bcoin}`})
            ]
        })
    }
}