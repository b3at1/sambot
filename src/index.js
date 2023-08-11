require('dotenv').config();
const { GatewayIntentBits, Client } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs');

function generateRandomBooleanWithPercentage(percentage) {
    if (percentage < 0 || percentage > 100) {
      throw new Error('Percentage must be between 0 and 100');
    }
  
    const randomValue = Math.random() * 100;
    return randomValue < percentage;
  }
  

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
    ],
});

const configuration = new Configuration({
    apiKey: process.env.OPENAPIKEY,
});

const openai = new OpenAIApi(configuration);

client.on('ready', () => {
    console.log(`${client.user.username} is online`);
});

let prompt_txt = fs.readFileSync('prompt.txt', 'utf-8');
let conversationLog = [
    { role: 'system', content: prompt_txt },
  ];
client.on("messageCreate", async (message) => {
    // ADD RANDOM CHANCE TO DO STUFF HERE

    // RANDOM RESPOND OR RANDFACT
    if (generateRandomBooleanWithPercentage(50)){
       // DO RANDOM FACT PROMPT
    }
        
    else{
        if (message.author.bot) return;
        if (message.channel.id !== process.env.CHANNEL_ID) return;
        if (message.content.startsWith('!')) return;
        const input = `You: ${message.content}`; //Construct the input based on message content
        let gptResponse = "";

        try {
            await message.channel.sendTyping();
            let prevMessages = await message.channel.messages.fetch({ limit: 15 });
            prevMessages.reverse();
            
            prevMessages.forEach((msg) => {
            if (msg.content.startsWith('!')) return;
            if (msg.author.id !== client.user.id && message.author.bot) return;
            if (msg.author.id == client.user.id) {
                conversationLog.push({
                role: 'assistant',
                content: msg.content,
                name: msg.author.username
                    .replace(/\s+/g, '_')
                    .replace(/[^\w\s]/gi, ''),
                });
            }
        
            if (msg.author.id == message.author.id) {
                conversationLog.push({
                role: 'user',
                content: msg.content,
                name: message.author.username
                    .replace(/\s+/g, '_')
                    .replace(/[^\w\s]/gi, ''),
                });
            }
            });
        
            const result = await openai
            .createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: conversationLog,
                // max_tokens: 256, // limit token usage
            })
            .catch((error) => {
                console.log(`OPENAI ERR: ${error}`);
            });

            const originalText = result.data.choices[0].message.content
            console.log(originalText)
            const modifiedText = originalText.includes("Σ: ") ? originalText.replace("Σ: ", "") : originalText;
            
            message.reply(modifiedText);
            
            //message.reply(result.data.choices[0].message);
        } catch (error) {
            console.log(`ERR: ${error}`);
        }
        });    
    }
client.login(process.env.DISCORDTOKEN); //KEEP THIS SECRET
