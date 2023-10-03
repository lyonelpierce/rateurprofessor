import { NextResponse } from "next/server";
import { getUniversity } from "@/lib/profile";

export const revalidate = 0;

export async function GET(req: Request) {
  console.log(req);
  try {
    // const universities = await getUniversity(req.params.id);
    // return new Response(JSON.stringify(universities), {
    //   headers: {
    //     "content-type": "application/json",
    //   },
    // });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
