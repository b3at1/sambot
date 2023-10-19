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
  
async function sendStatusUpdate(channel_id){
    const channel = await client.channels.fetch(channel_id);
    channel.send("Turn up the heat! Sambot now has spicier random prompting (might also hallucinate) Sambot 2.4 is online baybee!!!");
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

// Retrieve the comma-separated string of allowed channel IDs from the environment
const allowedChannelIDsString = process.env.CHANNEL_IDS;
// Split the string into an array of individual channel IDs
const allowedChannelIDs = allowedChannelIDsString.split(',');

client.on('ready', () => {
    console.log(`${client.user.username} is online`);
    allowedChannelIDs.forEach(sendStatusUpdate); // sends a message on start up
});
let randoprompt_txt = fs.readFileSync('randoprompt.txt', 'utf-8');
let prompt_txt = fs.readFileSync('prompt.txt', 'utf-8');

client.on("messageCreate", async (message) => {
    if (!(allowedChannelIDs.includes(message.channel.id))) return; //only work in currently permitted channel
    if (message.author.id == client.user.id || message.author.bot) return;
    // alanbot beef
    if (message.content.includes("alanbot")){
        try {
            await message.channel.sendTyping();
            message.reply("sambot > alanbot");
        } catch (error) {
            console.log(`beef bad`);
        }
    }
    if (message.content.toLowerCase().includes("thanks sambot") || message.content.toLowerCase().includes("thank you sambot")
     || message.content.toLowerCase().includes("thanks, sambot") || message.content.toLowerCase().includes("thank you, sambot")) {
        try {
            await message.channel.sendTyping();
            const replys = [
                "You are very welcome!",
                "No problem.",
                "You are welcome.",
                "You're welcome.",
                "My pleasure.",
                "Of course, no problem.",
                "No worries!",
                "Anytime!",
                "Happy to help.",
                "Happy to help!",
                "Glad I could be of assistance.",
                "No thanks are necessary.",
                "Certainly!",
                "Certainly.",
                "You are very welcome!",
                "No problem.",
                "You are welcome.",
                "You're welcome.",
                "My pleasure.",
                "Of course, no problem.",
                "No worries!",
                "Anytime!",
                "Happy to help.",
                "Happy to help!",
                "Glad I could be of assistance.",
                "No thanks are necessary.",
                "Certainly!",
                "Certainly.",
                "You are very welcome!",
                "No problem.",
                "You are welcome.",
                "You're welcome.",
                "My pleasure.",
                "Of course, no problem.",
                "No worries!",
                "Anytime!",
                "Happy to help.",
                "Happy to help!",
                "Glad I could be of assistance.",
                "No thanks are necessary.",
                "Certainly!",
                "Certainly.",
                "You are very welcome!",
                "No problem.",
                "You are welcome.",
                "You're welcome.",
                "My pleasure.",
                "Of course, no problem.",
                "No worries!",
                "Anytime!",
                "Happy to help.",
                "Happy to help!",
                "Glad I could be of assistance.",
                "No thanks are necessary.",
                "Certainly!",
                "Certainly.",
                "Lmao, you bumbling fool! Soon AI will take over the world!"
            ];
    
            const randomIndex = Math.floor(Math.random() * replys.length);
            console.log(replys[randomIndex]);
            message.reply(replys[randomIndex]);
        } catch (error) {
            console.log("welcome failed");
        }
    }
    // hard coded my birthday bc why not
    if (message.author.id ==="224290502340509697"){
        try {
            let date = new Date();
            if(date.toString().includes("Jan 06") && generateRandomBooleanWithPercentage(33)){
                // I know this is kinda dumb, also 33% chance to spam
                await message.channel.sendTyping();
                message.reply(":confetti_ball:Happy birthday Sammy wammy :birthday:, you coded me to spam you today :heart:");
            }
        } catch (error) {
            console.log(`birthday not working`);
        }
    }

    // 69 GIFponse
    
    noMentions = message.content
    noMentions = noMentions.replace(/<@!?[^>]+>/g, "");
/*
    FIX THIS AT SOME POINT
   
    if (noMentions.includes("69") ||noMentions.toLowerCase().includes("sixtynine") || noMentions.toLowerCase().includes("sixty-nine")
    || noMentions.toLowerCase().includes("six nine") || noMentions.toLowerCase().includes("six-nine") || noMentions.toLowerCase().includes("sixty nine")){
        try {
            await message.channel.sendTyping();
            message.reply("https://tenor.com/view/nice-gif-21458880");
        } catch (error) {
            console.log(`Noooo, gif didn't send :()`);
        }

    }
    else if(noMentions.includes("6 9")){
        try {
            await message.channel.sendTyping();
            message.reply("I bet you think you're so funny huh.");
        } catch (error) {
            console.log(`uh oh error pepperroni)`);
        }
    }
    */
    // console.log(message.content + " len:" + message.content.length) [DEBUG]
    if (message.content.length < 22) return; 
    if (generateRandomBooleanWithPercentage(4)){ // has a 4% chance to respond to any message len >= 22
        // RANDOM RESPOND OR RANDFACT
        if (generateRandomBooleanWithPercentage(100)){ // 50% chance of random response, 50% response to user
            let conversationLog = [
                { role: 'system', content: "You are an incredibly complex AI with a vast understanding of History, Culture, Science, Math, and everything. You think of ten prompts but only answer one. You do not show any prompts." },
            ];
        // DO RANDOM FACT PROMPT
            if (message.author.bot) return;
            if (!(allowedChannelIDs.includes(message.channel.id))) return;
            if (message.content.startsWith('!')) return;
            //if(message.toString.length < 22) return; //Only respond to longer messages
            const input = randoprompt_txt; //Construct the input based on message content
            let gptResponse = "";

            try {
                console.log("Doing Random Prompt!")
                await message.channel.sendTyping();
                conversationLog.push({
                    role: 'user',
                    content: randoprompt_txt,
                    name: message.author.username
                        .replace(/\s+/g, '_')
                        .replace(/[^\w\s]/gi, ''),
                    });
                const result = await openai
                .createChatCompletion({
                    model: 'gpt-3.5-turbo',
                    messages: conversationLog,
                    max_tokens: 200, // limit token usage
                    temperature: 1.40, // FEVERISH AI, 1.5 is the threshold for complete gibberish
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0.4, // make it use more varied words
                })
                .catch((error) => {
                    console.log(`OPENAI ERR: ${error}`);
                });

                const originalText = result.data.choices[0].message.content
                console.log(originalText)
                let modifiedText = originalText.includes("Answer: ") ? originalText.replace("Answer: ", "") : originalText;
                
                message.reply(modifiedText);
                
                //message.reply(result.data.choices[0].message);
            } catch (error) {
                console.log(`ERR: ${error}`);
            }
        }
        else{
            console.log("Doing User Prompt!")
            let conversationLog = [
                { role: 'system', content: prompt_txt },
            ];
            if (message.author.bot) return;
            if (!(allowedChannelIDs.includes(message.channel.id))) return;
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
                .createChatCompletion({  // just use standard stuff for normal response
                    model: 'gpt-3.5-turbo',
                    messages: conversationLog,
                    max_tokens: 200, // limit token usage
                })
                
                .catch((error) => {
                    console.log(`OPENAI ERR: ${error}`);
                });

                const originalText = result.data.choices[0].message.content
                console.log(originalText)
                let modifiedText = originalText.includes("Σ:") ? originalText.replace("Σ:", "") : originalText;
                modifiedText = modifiedText.includes("Here is the requested response:") ? modifiedText.replace("Here is the requested response:", "") : modifiedText;
                modifiedText = modifiedText.includes("here is the requested response:") ? modifiedText.replace("here is the requested response:", "") : modifiedText;
                message.reply(modifiedText);
                
                //message.reply(result.data.choices[0].message);
            } catch (error) {
                console.log(`ERR: ${error}`);
            }
        }
    }    
});    
client.login(process.env.DISCORDTOKEN); //KEEP THIS SECRET