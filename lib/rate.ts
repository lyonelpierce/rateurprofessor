import { auth } from "@clerk/nextjs";
import prismadb from "./pismadb";
import { subMonths, isBefore } from "date-fns";

export const checkRating = async () => {
  const { userId } = auth();
  if (!userId) return true;

  try {
    const lastReview = await prismadb.universityReview.findFirst({
      where: {
        user: {
          userId: userId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!lastReview) return true;

    if (lastReview) {
      const sixMonthsAgo = subMonths(new Date(), 6);
      const reviewDate = new Date(lastReview.createdAt);
      if (isBefore(reviewDate, sixMonthsAgo)) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const saveRating = async (
  id: string,
  safetyRating: number,
  locationRating: number,
  happinessRating: number,
  opportunitiesRating: number,
  reputationRating: number,
  clubsRating: number,
  facilitiesRating: number,
  internetRating: number,
  foodRating: number,
  socialRating: number,
  overallRating: string,
  content: string
) => {
  const { userId } = auth();
  if (!userId) return;

  const isRatingAllowed = await checkRating();

  if (!isRatingAllowed) {
    console.error(
      "Rating not allowed: User already submitted a review in the last 6 months."
    );
    return;
  }

  try {
    const isOnDb = await prismadb.user.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!isOnDb) {
      await prismadb.user.create({
        data: {
          userId: userId,
        },
      });
    }

    await prismadb.universityReview.create({
      data: {
        safetyRating: safetyRating,
        locationRating: locationRating,
        happinessRating: happinessRating,
        opportunitiesRating: opportunitiesRating,
        reputationRating: reputationRating,
        clubsRating: clubsRating,
        facilitiesRating: facilitiesRating,
        internetRating: internetRating,
        foodRating: foodRating,
        socialRating: socialRating,
        overallRating: overallRating,
        content: content,
        user: {
          connect: {
            userId: userId,
          },
        },
        university: {
          connect: {
            id: id,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
};
