const { MessageEmbed } = require('discord.js')

module.exports = {
    name:'help',
    description: 'Thông tin các lệnh của bot',
    run: async (client,interaction) => {
        const user = interaction.user;
        const helpEmbed = new MessageEmbed()
        .setColor('WHITE')
        .setTitle('Botify')
        .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        .setThumbnail('https://cdn.discordapp.com/attachments/1059485261748244572/1096830406449430628/IMG_0087.jpg')
        .addFields(
            { name: '\`Prefix {/}\` \n',
             value: 
            `> </daily:1132677374169845837> : Điểm danh nhận <:BCoin:1132727327122522133> \n > 
             > </bcoin:1132677374169845835> : Kiểm tra <:BCoin:1132727327122522133> đang có \n > 
             > </give bcoin:1132677374169845839> : Chuyển <:BCoin:1132727327122522133> cho người khác \n > 
             > </lbbcoinland:1132677374169845840> : Bảng xếp hạng \n > 
             > </game coinflip:1132688362243883010> : Tung đồng xu đen đỏ <a:coinflip:1097815916470870066> \n > 
             > </game taixiu:1132688362243883010> : Chơi game tài xỉu chẵn lẻ \n > 
             > </set nickname:1132677374329233422> : Đổi tên của bạn (tốn 100<:BCoin:1132727327122522133>) \n > 
             > ||[09 april 2001-Bot_v13]||` 
            })
        // .setImage('https://i.imgur.com/AfFp7pu.png')
        .setFooter({ text: `ID: ${user.id}`})
        .setTimestamp();
        return interaction.reply({embeds: [ helpEmbed ]})
    }
}
