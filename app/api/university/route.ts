import { NextResponse } from "next/server";
import { getUniversity } from "@/lib/searchBar";

export const revalidate = 0;

export async function GET(req: Request) {
  try {
    const universities = await getUniversity();
    return new Response(JSON.stringify(universities), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
