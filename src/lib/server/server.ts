import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());
const PORT = 3000;

const OPENAI_API_KEY = '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';


app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

 
    const response = await fetch('https://api.openai.com/v1/engines/gpt-4/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            prompt: userMessage,
            max_tokens: 50
        })
    });

    const data = await response.json();
    res.send({ reply: data.choices[0].text.trim() });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
