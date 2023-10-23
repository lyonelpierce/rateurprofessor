import { NextResponse } from "next/server";

import { getCourses } from "@/lib/profile";

export const revalidate = 0;

export async function GET(req: Request) {
  const pathname = new URL(req.url).pathname;
  const id = pathname.split("/university/")[1].split("/courses")[0];

  try {
    const courses = await getCourses(id);

    if (!courses) {
      return new NextResponse("Not found", { status: 404 });
    }

    return new Response(JSON.stringify(courses));
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
