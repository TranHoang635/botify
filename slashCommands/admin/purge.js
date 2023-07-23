const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'purge',
  description: 'Xóa toàn bộ tin nhắn (mặc định là 50)',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'number',
      description: 'Số tin nhắn muốn xóa (tối đa là 600).',
      type: 'INTEGER',
      required: false,
    },
  ],
  run: async (client, interaction) => {
    try {
      const purgeCount = interaction.options.getInteger('number') || 50;
      const maxPurgeCount = 600;
      const purgeEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`\`\`\`Xóa thành công ${purgeCount} tin nhắn ✅\`\`\``)
        .setImage('https://media1.tenor.com/images/d623e8b064f180c6b3574193bb46083c/tenor.gif?itemid=26787964');

      if (purgeCount <= 0 || purgeCount > maxPurgeCount) {
        return await interaction.reply({ content: `Tối đa của tao xóa được ${maxPurgeCount} tin nhắn thôi đmm (điền số âm t cho mày ra khỏi server đấy) 👌.`, ephemeral: true });
      }

      // Kiểm tra xem interaction có tồn tại hay không
      if (!interaction.channel || !interaction.guild) {
        return await interaction.reply({ content: 'Lỗi khi xoá tin nhắn. Không tìm thấy interaction', ephemeral: true });
      }

      let fetched;
      let deleted = 0;
      do {
        fetched = await interaction.channel.messages.fetch({ limit: Math.min(purgeCount - deleted, 100), before: interaction.id });
        deleted += await interaction.channel.bulkDelete(fetched, true);
      } while (fetched.size > 0 && deleted < purgeCount);

      return await interaction.reply({ embeds: [purgeEmbed] });
    } catch (error) {
      console.error(error);
      return await interaction.reply({ content: `Hãy kiểm tra lại số tin nhắn bạn muốn xóa có đủ ${number} hay không`, ephemeral: true });
    }
  },
};