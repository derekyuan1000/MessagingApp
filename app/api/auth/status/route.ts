import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("session")

    if (session) {
      return NextResponse.json({ user: session.value }, { status: 200 })
    }

    return NextResponse.json({ user: null }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
