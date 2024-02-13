import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import type { ServiceAccount } from 'firebase-admin';
import type { VercelRequest, VercelResponse } from '@vercel/node';


interface RequestBody {
  message: string;
  sessionId: string;
}

// import serviceAccount from '../serviceAccountKey.json' assert { type: "json" };

const firebaseConfig: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID!,
  privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
};

initializeApp({
  credential: cert(firebaseConfig)
});

// initializeApp({
//   credential: cert(serviceAccount as ServiceAccount)
// });

const db = getFirestore();
const API_KEY = process.env.API_KEY;

export default async function post(req: VercelRequest, res: VercelResponse) {
  try {
    const body: RequestBody = req.body; 
    const { message, sessionId } = body;

    if (typeof sessionId !== 'string') {
      return res.status(400).json({ error: 'Session ID is required and must be a string.' });
    }

    const sessionRef = db.collection('chatSessions').doc(sessionId);
    const messagesRef = sessionRef.collection('messages');
    const docSnapshot = await sessionRef.get();
    console.log("Document snapshot:", docSnapshot.exists);

    if (!docSnapshot.exists) {
      await sessionRef.set({ messages: [] });
      console.log("Document created");
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        max_tokens: 2000,
        messages: [
          {
            role: 'system',
            content: 'You are a psychologis.',
          },
          {
            role: 'user',
            content: message,
          },
        ],
      }),
    });
    const data = await response.json();

    await messagesRef.add({
      timestamp: FieldValue.serverTimestamp(),
      message,
      sender: 'user',
    });
    console.log("New message document created");
    if (!response.ok) {
    console.error("Error response from OpenAI:", response);
    return res.status(500).json({ error: 'OpenAI service error.' });
}

    if (data.choices && Array.isArray(data.choices) && data.choices.length > 0) {
      const replyMessage = data.choices[0].message.content.trim();
      return res.status(200).json({ reply: replyMessage });
    } else {
    
      return res.status(200).json({ reply: "Sorry, I couldn't process your request or there were no choices in the response." });
    }

  } catch (error) {
    console.error("Error accessing Firebase:", error);
    return res.status(500).json({ error: 'There was an error on the server.' });
  }
}
