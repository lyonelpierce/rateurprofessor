import { NextResponse } from "next/server";
import { getProfessor } from "@/lib/profile";

export const revalidate = 0;

export async function GET(req: Request) {
  const pathname = new URL(req.url).pathname;
  const id = pathname.split("/professor/")[1];

  try {
    const professors = await getProfessor(id);

    if (!professors) {
      return new NextResponse("Not found", { status: 404 });
    }

    return new Response(JSON.stringify(professors), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
