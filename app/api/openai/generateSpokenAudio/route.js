import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export async function POST(req) {
  try {
    const request = await req.json();
    const { message } = request;
    const codeBlockRegex = /```[\s\S]*?```/g;
    const cleanText = message.replace(
      codeBlockRegex,
      ' [Code snippet has been skipped.] '
    );

    const speechFile = path.resolve('./public/speech.mp3');

    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'onyx',
      input: cleanText,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);

    const audioToken = new Date().getTime();

    return NextResponse.json(audioToken);
  } catch (error) {
    console.error(error);
    return NextResponse.error(error);
  }
}
