import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { message, apiKey } = await req.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: "No API key provided" },
        { status: 400 },
      );
    }

    const openai = new OpenAI({ apiKey });

    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: message }],
        model: "gpt-3.5-turbo",
      });

      return NextResponse.json({
        message: completion.choices[0].message.content,
      });
    } catch (openaiError: any) {
      if (openaiError.response?.status === 401) {
        return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
      }

      return NextResponse.json(
        { error: openaiError.message || "OpenAI API error" },
        { status: 500 },
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
