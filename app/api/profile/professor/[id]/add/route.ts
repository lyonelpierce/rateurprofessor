import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  const { userId } = auth();
  const pathname = new URL(req.url).pathname;
  const segments = pathname.split("/");
  const id = segments[segments.length - 2];

  const body = await req.json();

  const { name, course, rate, difficulty, again, content } = body;
}
