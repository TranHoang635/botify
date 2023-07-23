const { MessageEmbed } = require('discord.js');
const { User } = require('../../utils/schema');
const diceEmojis = [
    '<:dice1:1131988820703854623>',
    '<:dice2:1131988878560067696>',
    '<:dice3:1131988915742584892>',
    '<:dice4:1131988947636068524>',
    '<:dice5:1131988981869977692>',
    '<:dice6:1131989024215675023>'
];

module.exports = {
    options: [
        {
            name: 'gamemode',
            description: 'Hãy chọn một gamemode ở trên',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'tài',
                    value:'tài'
                },
                {
                    name: 'xỉu',
                    value:'xỉu'
                },
                {
                    name: 'chẵn',
                    value:'chẵn'
                },
                {
                    name: 'lẻ',
                    value:'lẻ'
                },
                {
                    name: 'bộ ba đồng nhất',
                    value:'bộ ba đồng nhất'
                }
            ]
        },
        {
            name: 'bcoin',
            description: 'Nhập số Bcoin cược',
            type: 'INTEGER',
            required: true,
        }
    ],
    run: async (client, interaction) => {
        // Lấy người dùng gọi lệnh và lựa chọn của họ
        const user = interaction.user;
        const bcoin = interaction.options.getInteger('bcoin');
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })

        // Kiểm tra số bcoin cược có lớn hơn hoặc bằng 0 hay không
        if (bcoin < 0) {
            const errorEmbed = new MessageEmbed()
                .setColor('#FF0000')
                .setDescription(`\`\`\`Số cược không hợp lệ !?\`\`\``)
            return await interaction.reply({
                embeds: [errorEmbed],
                ephemeral: true
            });
        }

        // Kiểm tra số bcoin cược có lớn hơn số bcoin hiện có của người dùng hay không
        if (bcoin > userData.bcoin) {
            const errorEmbed = new MessageEmbed()
                .setColor('#FF0000')
                .setDescription(`\`\`\`Bạn cần ${bcoin} bcoin để thực hiện lệnh\`\`\``)
                .setFooter({ text: `ID: ${user.id} • bcoin x ${userData.bcoin}` });
            return await interaction.reply({ embeds: [errorEmbed] });
        }

        const gamemode = interaction.options.getString('gamemode');
        const diceResults = [];
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * diceEmojis.length);
            diceResults.push(randomIndex + 1);
        }

        let isTai;
        let win;
        let resultText;

        if (gamemode === 'tài') {
            const sum = diceResults.reduce((a, b) => a + b, 0);
            isTai = sum >= 11 && sum <= 17;
            win = isTai;
            resultText = `> ${diceEmojis[diceResults[0] - 1]} ${diceEmojis[diceResults[1] - 1]} ${diceEmojis[diceResults[2] - 1]} ~ **${isTai ? 'tài' : 'xỉu'}**`;
            if (diceResults[0] === diceResults[1] && diceResults[1] === diceResults[2]) {
                win = false;
                resultText = `> ${diceEmojis[diceResults[0] - 1]} ${diceEmojis[diceResults[1] - 1]} ${diceEmojis[diceResults[2] - 1]} ~ **bộ ba đồng nhất**`;
            }
        } else if (gamemode === 'xỉu') {
            const sum = diceResults.reduce((a, b) => a + b, 0);
            isTai = sum >= 4 && sum <= 10;
            win = !isTai;
            resultText = `> ${diceEmojis[diceResults[0] - 1]} ${diceEmojis[diceResults[1] - 1]} ${diceEmojis[diceResults[2] - 1]} ~ **${isTai ? 'tài' : 'xỉu'}**`;
            if (diceResults[0] === diceResults[1] && diceResults[1] === diceResults[2]) {
                win = false;
                resultText = `> ${diceEmojis[diceResults[0] - 1]} ${diceEmojis[diceResults[1] - 1]} ${diceEmojis[diceResults[2] - 1]} ~ **bộ ba đồng nhất**`;
            }
        } else if (gamemode === 'bộ ba đồng nhất') {
            const isBobadongnhat = diceResults[0] === diceResults[1] && diceResults[1] === diceResults[2];
            win = isBobadongnhat;
            resultText = `> ${diceEmojis[diceResults[0] - 1]} ${diceEmojis[diceResults[1] - 1]} ${diceEmojis[diceResults[2] - 1]} ~ **${isBobadongnhat ? 'bộ ba đồng nhất' : 'không phải bộ ba'}**`;
        } else if (gamemode === 'chẵn') {
            const sum = diceResults.reduce((a, b) => a + b, 0);
            isEven = sum % 2 === 0;
            win = isEven;
            resultText = `> ${diceEmojis[diceResults[0] - 1]} ${diceEmojis[diceResults[1] - 1]} ${diceEmojis[diceResults[2] - 1]} ~ **${isEven ? 'chẵn' : 'lẻ'}**`;
            if (diceResults[0] === diceResults[1] && diceResults[1] === diceResults[2]) {
                win = false;
                resultText = `> ${diceEmojis[diceResults[0] - 1]} ${diceEmojis[diceResults[1] - 1]} ${diceEmojis[diceResults[2] - 1]} ~ **bộ ba đồng nhất**`;
            }
        } else if (gamemode === 'lẻ') {
            const sum = diceResults.reduce((a, b) => a + b, 0);
            isEven = sum % 2 === 0;
            win = !isEven;
            resultText = `> ${diceEmojis[diceResults[0] - 1]} ${diceEmojis[diceResults[1] - 1]} ${diceEmojis[diceResults[2] - 1]} ~ **${isEven ? 'chẵn' : 'lẻ'}**`;
            if (diceResults[0] === diceResults[1] && diceResults[1] === diceResults[2]) {
                win = false;
                resultText = `> ${diceEmojis[diceResults[0] - 1]} ${diceEmojis[diceResults[1] - 1]} ${diceEmojis[diceResults[2] - 1]} ~ **bộ ba đồng nhất**`;
            }
        } else if ((gamemode === 'tài' || gamemode === 'xỉu' || gamemode === 'chẵn' || gamemode === 'lẻ') && diceResults[0] === diceResults[1] && diceResults[1] === diceResults[2]) {
            win = false;
            resultText = `> ${diceEmojis[diceResults[0] - 1]} ${diceEmojis[diceResults[1] - 1]} ${diceEmojis[diceResults[2] - 1]} ~ **bộ ba đồng nhất**`;
        }

        const diceEmojiStrings = diceResults.map(index => diceEmojis[index - 1]);
        const resultEmojiString = diceEmojiStrings.join(' ');

        userData.bcoin += win ? bcoin * 1 : 0;
        userData.bcoin -= win ? 0 : bcoin;
        await userData.save();

        const loadingEmbed = new MessageEmbed()
            .setColor('#000000')
            .setDescription(`Đang tung xúc xắc...<a:roll1:1131989128175693854> <a:roll2:1131989232496414820> <a:roll3:1131989260610838558>`);

        // Gửi thông báo tạm thời để cho người dùng biết rằng bot đang roll dice
        const loadingMessage = await interaction.reply({ embeds: [loadingEmbed], fetchReply: true });

        // Xóa thông báo tạm thời và gửi kết quả
        setTimeout(async () => {
            const resultEmbed = new MessageEmbed()
                .setColor(win ? '#00FF00' : '#FF0000')
                .addFields(
                    { name: resultText, value: win ? `\`\`\`Bạn đã thắng [+${bcoin * 1} bcoin]\`\`\`` : `\`\`\`Bạn đã thua [-${bcoin} bcoin]\`\`\`` }
                )
                .setFooter({ text: `ID: ${user.id} • bcoin x ${userData.bcoin}` });
            await interaction.editReply({ embeds: [resultEmbed] });
        }, 2000);
    }
}