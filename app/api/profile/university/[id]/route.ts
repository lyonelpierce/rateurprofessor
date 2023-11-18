import { NextResponse } from "next/server";

import { getUniversity } from "@/lib/profile";
import { checkUniversityRating } from "@/lib/rate";

export const revalidate = 0;

export async function GET(req: Request) {
  const pathname = new URL(req.url).pathname;
  const id = pathname.split("/university/")[1];

  try {
    const universities = await getUniversity(id);

    if (!universities) {
      return new NextResponse("Not found", { status: 404 });
    }

    const isReviewed = false;

    const responseData = {
      universities,
      isReviewed,
    };

    return new Response(JSON.stringify(responseData), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
