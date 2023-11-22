import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export async function POST(req) {
  try {
    const request = await req.json();
    const { threadId } = request;

    const messages = await openai.beta.threads.messages.list(threadId, {
      order: 'asc',
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error(error);
    return NextResponse.error(error);
  }
}
