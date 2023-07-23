const { MessageEmbed } = require('discord.js')
const { User } = require('../../utils/schema')

let leaderboard = []
let bcoinCount = {}

module.exports = {
    name: 'lbbcoinland',
    description: 'Xem bảng xếp hạng',
    run: async (client, interaction) => {
        const updateLeaderboard = async () => {
            const users = await User.find().then(users => {
                return users.filter(async user => await interaction.guild.members.fetch(user.id))
            })
            leaderboard = users.sort((a, b) => b.bcoin - a.bcoin).slice(0, 6)
        }

        const updateUserBcoinCount = async () => {
            const users = await User.find()
            users.forEach(user => bcoinCount[user.id] = user.bcoin)
        }

        await updateLeaderboard()
        await updateUserBcoinCount()

        setInterval(async () => {
            await updateLeaderboard()
            await updateUserBcoinCount()
        }, 4000)

        await interaction.deferReply()
        const indexOfUser = leaderboard.findIndex(user => user.id === interaction.user.id)

        return interaction.followUp({ embeds: [new MessageEmbed()
            .setTitle('BCOIN LEADERBOARD')
            .setColor('WHITE')
            .setDescription(leaderboard.map((user, index) => {
                return ` > \`[ ${index + 1} ]\`⠀|⠀**<@${user.id}>** : \`⟪ ${user.bcoin} bcoin ⟫\` \n`
            }).join('> \n'))
            .setFooter({ text: `Bạn đứng thứ ${indexOfUser + 1}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()
        ]})
    }
}