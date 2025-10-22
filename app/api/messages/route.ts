import { NextResponse } from "next/server";

interface Message {
  id: string;
  username: string;
  text: string;
  timestamp: string;
}

// In-memory storage for messages
let messages: Message[] = [];

export async function GET() {
  return NextResponse.json({ messages });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, text } = body;

    if (!username || !text) {
      return NextResponse.json(
        { error: "Username and text are required" },
        { status: 400 }
      );
    }

    const newMessage: Message = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      username: username.trim(),
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };

    messages.push(newMessage);

    // Keep only the last 100 messages to prevent memory issues
    if (messages.length > 100) {
      messages = messages.slice(-100);
    }

    return NextResponse.json({ message: newMessage }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

