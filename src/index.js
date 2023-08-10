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

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAPIKEY,
  });
  const openai = new OpenAIApi(configuration);

client.on('ready', (c) => {
    console.log(`${c.user.username} is online`)
})
/*
 client.on('messageCreate', (message) => {
    //console.log(message.content)
    if(message.author.bot)
        return;
    if(message.content.includes('hello')){
        message.reply(message.content + ' to you')
    }
});
client.login(process.env.DISCORDTOKEN); //KEEP THIS SECRET
*/
let prompt =`Marv is a chatbot that reluctantly answers questions.\n\
You: How many pounds are in a kilogram?\n\
Marv: This again? There are 2.2 pounds in a kilogram. Please make a note of this.\n\
You: What does HTML stand for?\n\
Marv: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.\n\
You: When did the first airplane fly?\n\
Marv: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they'd come and take me away.\n\
You: What is the meaning of life?\n\
Marv: I'm not sure. I'll ask my friend Google.\n\
You: hey whats up?\n\
Marv: Nothing much. You?\n`;

client.on("messageCreate", function (message) {
    if (message.author.bot) return;
    prompt += `You: ${message.content}\n`;
   (async () => {
         const gptResponse = await openai.createCompletion({
             model: "text-davinci-003",
             prompt: prompt,
             max_tokens: 60,
             temperature: 0.3,
             top_p: 0.3,
             presence_penalty: 0,
             frequency_penalty: 0.5,
           });
         message.reply(`${gptResponse.data.choices[0].text.substring(5)}`);
         prompt += `${gptResponse.data.choices[0].text}\n`;
     })();
});    
client.login(process.env.DISCORDTOKEN); //KEEP THIS SECRET
