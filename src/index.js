require('dotenv').config();
const { GatewayIntentBits, Client } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildPresences,
    ] 
});
client.on('ready', (c) => {
    console.log(`${c.user.username} is online`)
})

client.on('messageCreate', (message) => {
    //console.log(message.content)
    if(message.author.bot)
        return;
    if(message.content.includes('hello')){
        message.reply(message.content + ' to you')
    }
})
client.login(process.env.DISCORDTOKEN); //KEEP THIS SECRET