import { NextResponse } from "next/server";
import { getProfessor } from "@/lib/searchBar";

export const revalidate = 0;

export async function GET(req: Request) {
  try {
    const professors = await getProfessor();
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
