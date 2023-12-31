import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export async function POST(req) {
  try {
    const request = await req.json();
    const { threadId, runId } = request;

    const run = await openai.beta.threads.runs.retrieve(threadId, runId);

    return NextResponse.json(run);
  } catch (error) {
    console.error(error);
    return NextResponse.error(error);
  }
}
