import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { saveProfessorRating } from "@/lib/rate";

export async function POST(req: Request) {
  const { userId } = auth();
  const pathname = new URL(req.url).pathname;
  const segments = pathname.split("/");
  const id = segments[segments.length - 2];

  const body = await req.json();

  const { rate, difficulty, again, content, course } = body;

  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  if (!rate || !again || !difficulty || !content || !course)
    return new NextResponse("Missing fields", { status: 400 });

  const rateRating = parseInt(rate, 10);
  const againRating = parseInt(again, 10);
  const difficultyRating = parseInt(difficulty, 10);

  try {
    const response = await saveProfessorRating(
      id,
      course,
      rateRating,
      againRating,
      difficultyRating,
      content
    );
    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.error("Error:", error);
  }

  return NextResponse.json("Error", { status: 500 });
}
