const words = [
    '/bcoin',
    '/game conflip',
    '/game taixiu',
    '/lbbcoinland'
];

module.exports = (client) => {
    console.log('Bot Online ✅');
    let nextIndex = 0;
    const getNextWord = () => {
      const word = words[nextIndex];
      nextIndex = (nextIndex + 1) % words.length;
      return word;
    };
  
    // Thiết lập trạng thái hoạt động của bot
    const setActivity = () => {
      const activityName = `${getNextWord()}`;
      client.user.setActivity({
        type: 'STREAMING',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        name: activityName,
      });
    };
    setActivity();
    setInterval(setActivity, 2000);
  };