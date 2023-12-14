require('dotenv').config();
const { OpenAI } = require('openai');
const OpenAIapi = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAPIKEY,
});

async function main(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { "role": "system", "content": "What is the process to test a metal?"},
        { "role": "user", "content": prompt }
      ]
    });

    // Log the whole API response to troubleshoot the format.
    console.log('API Response: ', response);

    // Check if the expected data exists before trying to access it.
    if (response && response.data && response.data.choices && response.data.choices.length > 0) {
      let content = response.data.choices[0].message.content;

      return {
        status: 1,
        response: content
      };
    } else {
      throw new Error('Unexpected API response format.');
    }
  } catch (error) {
    console.error('Error from OpenAI : ', error.message);
    return {
      status: 0,
      response: ''
    };
  }
};