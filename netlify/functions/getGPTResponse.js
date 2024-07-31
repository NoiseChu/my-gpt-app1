const axios = require('axios');

exports.handler = async (event, context) => {
    const body = JSON.parse(event.body);
    const prompt = body.prompt;
    const apiKey = 'YOUR_OPENAI_API_KEY'; // 替換為你的 OpenAI API 金鑰

    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt: prompt,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ text: response.data.choices[0].text }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error generating response' }),
            headers
