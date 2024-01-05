import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const corsOptions = {
    origin: 'http://localhost:5173', 
    optionsSuccessStatus: 200 
  };

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
const PORT = 3000;

const OPENAI_API_KEY = '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';

app.get('/', (req, res) => {
    res.send('Welcome to my chat app');
});

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message; 

    try {
        const prompt = `Write a short story about a person named ${userMessage}.`;
        
        const response = await fetch('https://api.openai.com/v1/engines/gpt-4/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 150 
            })
        });

        const data = await response.json();
        console.log(data);
        if (data.choices && data.choices.length > 0) {
            res.send({ reply: data.choices[0].text.trim() });
        } else {
            res.send({ reply: "Sorry, I couldn't process your request." });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ error: "There was an error on the server." });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});


