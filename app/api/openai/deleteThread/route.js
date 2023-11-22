import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export async function POST(req) {
  try {
    const request = await req.json();
    const { threadId } = request;

    const response = await openai.beta.threads.del(threadId);

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.error(error);
  }
}
