import { auth } from "@clerk/nextjs";
import prismadb from "./pismadb";

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
  overallRating: number,
  content: string
) => {
  const { userId } = auth();
  if (!userId) return;

  try {
    await prismadb.$transaction(async (prisma) => {
      const isOnDb = await prisma.user.findUnique({
        where: {
          userId: userId,
        },
      });

      if (!isOnDb) {
        await prisma.user.create({
          data: {
            userId: userId,
          },
        });
      }

      await prisma.universityReview.create({
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
    });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prismadb.$disconnect();
  }
};
