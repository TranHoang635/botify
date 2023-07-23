const { MessageEmbed } = require('discord.js')

module.exports = {
    run: async (client, interaction) => {
        const user = interaction.user;
        const helpEmbed = new MessageEmbed()
            .setColor('WHITE')
            .setTitle('Botify')
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setThumbnail('https://cdn.discordapp.com/attachments/1059485261748244572/1096830406449430628/IMG_0087.jpg')
            .addFields(
                {
                    name: '\`Prefix {/}\` \n',
                    value:
                        `> </daily:1049659584148672553> : Điểm danh nhận ☘️ ||tùy vào vận may|| \n > 
             > </clover:1096279996517060711> : Kiểm tra ☘️ đang có \n > 
             > </give_clover:1097926072290517103> : Chuyển ☘️ cho người khác \n > 
             > </lbcloverland:1097048827829170209> : Bảng xếp hạng \n > 
             > </coinflip:1097728211674202203> : Tung đồng xu đen đỏ <a:coinflip:1097815916470870066> \n > 
             > </game_taixiu:1097926635203862660> : Chơi game tài xỉu chẵn lẻ \n > 
             > </set-nickname:1097918379001647134> : Đổi tên của bạn (tốn 100☘️) \n > 
             > ||[09 april 2001-Bot_v13]||`
                })
            // .setImage('https://i.imgur.com/AfFp7pu.png')
            .setFooter({ text: `ID: ${user.id}` })
            .setTimestamp();
        return interaction.reply({ embeds: [helpEmbed] })
    }
};
