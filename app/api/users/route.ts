import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getAllUsers } from "@/app/lib/store"

export async function GET() {
  try {
    const cookieStore = cookies()
    const session = cookieStore.get("session")

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userList = getAllUsers();

    return NextResponse.json({ users: userList }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
