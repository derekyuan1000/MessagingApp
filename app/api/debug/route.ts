import { NextResponse } from "next/server"
import { users } from "@/app/lib/store"

export async function GET() {
  // Only enable in development
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.json(
      {
        userCount: Object.keys(users).length,
        usernames: Object.keys(users),
      },
      { status: 200 },
    )
  }

  return NextResponse.json({ error: "Not available in production" }, { status: 403 })
}
