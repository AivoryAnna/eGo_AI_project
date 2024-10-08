import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const config = new Configuration({
  apiKey: process.env.API_KEY
})
const openai = new OpenAIApi(config)


export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: messages.map((message: any) => ({
      content: message.content,
      role: message.role
    }))
  })

  const stream = OpenAIStream(response, {
    onCompletion:async (completion:string) => {
        await console.log('Chat completed')
    }
  })

  return new StreamingTextResponse(stream)
}