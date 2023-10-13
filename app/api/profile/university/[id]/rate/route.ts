import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { saveUniversityRating } from "@/lib/rate";

export async function POST(req: Request) {
  const { userId } = auth();
  const pathname = new URL(req.url).pathname;
  const segments = pathname.split("/");
  const id = segments[segments.length - 2];

  const body = await req.json();

  const {
    safety,
    location,
    happiness,
    opportunities,
    reputation,
    clubs,
    facilities,
    internet,
    food,
    social,
    content,
  } = body;

  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  if (
    !safety ||
    !location ||
    !happiness ||
    !opportunities ||
    !reputation ||
    !clubs ||
    !facilities ||
    !internet ||
    !food ||
    !social ||
    !content
  )
    return new NextResponse("Missing fields", { status: 400 });

  const safetyRating = parseInt(safety, 10);
  const locationRating = parseInt(location, 10);
  const happinessRating = parseInt(happiness, 10);
  const opportunitiesRating = parseInt(opportunities, 10);
  const reputationRating = parseInt(reputation, 10);
  const clubsRating = parseInt(clubs, 10);
  const facilitiesRating = parseInt(facilities, 10);
  const internetRating = parseInt(internet, 10);
  const foodRating = parseInt(food, 10);
  const socialRating = parseInt(social, 10);
  const overallRating = (
    (safetyRating +
      locationRating +
      happinessRating +
      opportunitiesRating +
      reputationRating +
      clubsRating +
      facilitiesRating +
      internetRating +
      foodRating +
      socialRating) /
    10
  ).toFixed(1);

  try {
    const response = await saveUniversityRating(
      id,
      safetyRating,
      locationRating,
      happinessRating,
      opportunitiesRating,
      reputationRating,
      clubsRating,
      facilitiesRating,
      internetRating,
      foodRating,
      socialRating,
      overallRating,
      content
    );
    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.error("Error:", error);
  }

  return NextResponse.json("hello");
}
