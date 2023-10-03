import { NextResponse } from "next/server";

import { getUniversity } from "@/lib/profile";

export const revalidate = 0;

export async function GET(req: Request) {
  const pathname = new URL(req.url).pathname;
  const id = pathname.split("/university/")[1];

  try {
    const universities = await getUniversity(id);
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
