const { Client, Intents, Collection } = require('discord.js');
require('dotenv').config();
const mongoose = require('mongoose');


const client = new Client({ intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS 
]});


// client.aliases = new Collection();
client.message = new Collection();
client.messageCreate = new Collection();
client.categories = new Collection();
client.interactions = new Collection();

['event', 'slashCommand'].forEach(handler => require(`./handlers/${handler}`)(client));

/* Connect to discord and mongodb */
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGOOSE).then((c) => {
    console.log('MongooseDB Connected ✅')
})

// client.on('messageCreate', message => {
//     if (message.author.id === `người sử dụng lệnh`) {
//        message.react('emoji muốn bot đuổi theo');
//      }
// });


client.login(process.env.TOKEN);