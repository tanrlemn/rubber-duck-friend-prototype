import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI(process.env.OPENAI_API_KEY);
const assistantId = process.env.OPENAI_ASSISTANT_ID;

export async function POST(req) {
  try {
    const request = await req.json();
    const { threadId } = request;

    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    });

    return NextResponse.json(run);
  } catch (error) {
    console.error(error);
    return NextResponse.error(error);
  }
}
