import { auth } from "@clerk/nextjs/server";

import prismadb from "./pismadb";
import { subMonths, isBefore } from "date-fns";

export const checkUniversityRating = async (universityId: string) => {
  const { userId } = auth();
  if (!userId) return true;

  try {
    const lastReview = await prismadb.universityReview.findFirst({
      where: {
        user: {
          userId: userId,
        },
        universityId: universityId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!lastReview) return true;

    const sixMonthsAgo = subMonths(new Date(), 6);
    const reviewDate = new Date(lastReview.createdAt);

    if (isBefore(reviewDate, sixMonthsAgo)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const checkProfessorRating = async (professorId: string) => {
  const { userId } = auth();
  if (!userId) return true;

  try {
    const lastReview = await prismadb.professorReview.findFirst({
      where: {
        user: {
          userId: userId,
        },
        professor: {
          id: professorId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!lastReview) return true;

    const sixMonthsAgo = subMonths(new Date(), 6);
    const reviewDate = new Date(lastReview.createdAt);
    return isBefore(reviewDate, sixMonthsAgo);
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

export const saveUniversityRating = async (
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

  const isRatingAllowed = await checkUniversityRating(id);

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

export const saveProfessorRating = async (
  id: string,
  courseName: string,
  rate: number,
  again: number,
  difficulty: number,
  content: string
) => {
  const { userId } = auth();
  if (!userId) return;

  const isRatingAllowed = await checkProfessorRating(id);

  if (!isRatingAllowed) {
    console.error(
      "Rating not allowed: User already submitted a review in the last 6 months."
    );
    return;
  }

  try {
    const course = await saveCourse(courseName);

    if (!course) {
      console.error("Error saving course. Course is undefined.");
      return;
    }

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

    await prismadb.professorReview.create({
      data: {
        rate: rate,
        again: again,
        difficulty: difficulty,
        content: content,
        user: {
          connect: {
            userId: userId,
          },
        },
        professor: {
          connect: {
            id: id,
          },
        },
        course: {
          connect: {
            id: course.id,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

const saveCourse = async (courseName: string) => {
  try {
    const existingCourse = await prismadb.course.findUnique({
      where: {
        name: courseName,
      },
    });

    if (existingCourse) {
      return existingCourse;
    }

    const newCourse = await prismadb.course.create({
      data: {
        name: courseName,
      },
    });

    return newCourse;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const saveProfessor = async (name: string, universityId: string) => {
  const { userId } = auth();
  if (!userId) return;

  try {
    const existingProfessor = await prismadb.professor.findUnique({
      where: {
        name: name,
        universityId: universityId,
      },
    });

    if (existingProfessor) {
      return existingProfessor.id;
    }

    const newProfessor = await prismadb.professor.create({
      data: {
        name: name,
        userId: userId,
        university: {
          connect: {
            id: universityId,
          },
        },
      },
    });

    return newProfessor.id;
  } catch (error) {
    console.error("Error:", error);
  }
};
