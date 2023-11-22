import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export async function POST(req) {
  try {
    const thread = await openai.beta.threads.create();

    return NextResponse.json(thread);
  } catch (error) {
    console.error(error);
    return NextResponse.error(error);
  }
}
