import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export async function POST(req) {
  try {
    const request = await req.json();
    const { message, threadId } = request;

    const addMessage = await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: message,
    });

    return NextResponse.json({ addMessage });
  } catch (error) {
    console.error(error);
    return NextResponse.error(error);
  }
}
