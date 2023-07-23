const coinflip = require('./coinflip');
const taixiu = require('./taixiu');
const info = require('./info');

module.exports = {
    name: 'game',
    description: 'Hãy chọn game',
    type: 'SUB_COMMAND_GROUP',
    options: [
        {
            name: 'coinflip',
            description: 'Thử xem đỏ hay đen nhé',
            type: 'SUB_COMMAND',
            options: coinflip.options
        },
        {
            name: 'taixiu',
            description: 'tài xỉu chẵn lẻ bộ ba',
            type: 'SUB_COMMAND',
            options: taixiu.options
        },
        {
            name: 'info',
            description: 'Thông tin các lệnh của bot',
            type: 'SUB_COMMAND',
        }
    ],
    run: async (client, interaction) => {
        const subcommand = interaction.options.getSubcommand();// Lấy tên của tùy chọn con
        if (subcommand === 'coinflip') {        // Xử lý logic tương ứng với tùy chọn con
            coinflip.run(client, interaction);  // Xử lý tùy chọn coinflip
        } else if (subcommand === 'taixiu') {
            taixiu.run(client, interaction);    // Xử lý tùy chọn taixiu
        } else if (subcommand === 'info') {
            info.run(client, interaction);      // Xử lý tùy chọn info
        }
    }
};
