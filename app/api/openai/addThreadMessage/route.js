import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export async function POST(req) {
  const request = await req.json();
  const { message, threadId } = request;

  const addMessage = await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: message,
  });

  return NextResponse.json({ addMessage });
}
