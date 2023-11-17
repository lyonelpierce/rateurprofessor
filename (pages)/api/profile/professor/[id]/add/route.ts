import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { saveProfessor, saveProfessorRating } from "@/lib/rate";

export async function POST(req: Request) {
  const { userId } = auth();
  const pathname = new URL(req.url).pathname;
  const segments = pathname.split("/");
  const id = segments[segments.length - 2];

  const body = await req.json();

  const { name, course, rate, difficulty, again, content } = body;

  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  if (!name || !rate || !again || !difficulty || !content || !course)
    return new NextResponse("Missing fields", { status: 400 });

  const rateRating = parseInt(rate, 10);
  const againRating = parseInt(again, 10);
  const difficultyRating = parseInt(difficulty, 10);

  try {
    const professorId = await saveProfessor(name, id);

    if (!professorId) {
      console.error("Error getting professorId");
      return new NextResponse("Error", { status: 500 });
    }

    console.log(professorId);

    await saveProfessorRating(
      professorId,
      course,
      rateRating,
      againRating,
      difficultyRating,
      content
    );

    return new NextResponse(JSON.stringify({ success: true, professorId }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Error", { status: 500 });
  }
}
