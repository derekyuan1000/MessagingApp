import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getMessagesForUser, addMessage } from "@/app/lib/store"
import type { Message } from "@/app/lib/store"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("session")

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const currentUser = session.value

    // Get messages for the current user
    const userMessages = getMessagesForUser(currentUser);

    return NextResponse.json({ messages: userMessages }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("session")

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { to, content } = await request.json()
    const from = session.value

    if (!to || !content) {
      return NextResponse.json({ error: "Recipient and content are required" }, { status: 400 })
    }

    if (content.trim().length === 0) {
      return NextResponse.json({ error: "Message content cannot be empty" }, { status: 400 })
    }

    const message: Message = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      from,
      to,
      content: content.trim(),
      timestamp: new Date().toISOString(),
    }

    addMessage(message);

    return NextResponse.json({ message: "Message sent successfully", data: message }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
