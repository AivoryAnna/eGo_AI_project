import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import admin from 'firebase-admin';


const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
};

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));
const PORT = 3000;

const serviceAccountRaw = await import('./serviceAccountKey.json').then(module => module.default);

const serviceAccount = {
    projectId: serviceAccountRaw.project_id,
    privateKey: serviceAccountRaw.private_key,
    clientEmail: serviceAccountRaw.client_email
  };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  
const db = admin.firestore()

const OPENAI_API_KEY = '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';

app.get('/', (req, res) => {
    res.send('Chat endpoint is working'); 
});

app.post('/chat', async (req, res) => {
    const userPrompt = req.body.message;
    const sessionId = req.body.sessionId;
    if (typeof sessionId !== 'string') {
        return res.status(400).send({ error: "Session ID is required and must be a string." });
    }

    const sessionRef = db.collection('chatSessions').doc(sessionId);

    try {
        console.log("POST request received on /chat");
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
                
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                temperature: 0.7,
                max_tokens: 2000,
                messages: [
                    {
                        role: "system",
                        content: "You are a psychologist who provides patients with psychological dilemmas to analyze their behavior in stressful and moral situations."
                    },
                    {
                        role: "user",
                        content: userPrompt
                    }
                ]
            })
        });
        const data = await response.json();
        
        await sessionRef.update({
            messages: admin.firestore.FieldValue.arrayUnion({
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
                message: userPrompt,
                sender: 'user'
            })
        });
        if (data.choices && data.choices.length > 0) {
            const replyMessage = data.choices[0].message.content.trim();
            console.log("Reply from AI:", replyMessage);
            res.send({ reply: replyMessage });
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
