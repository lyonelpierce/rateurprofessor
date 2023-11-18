import { NextResponse } from "next/server";

import prismadb from "./pismadb";

export const getUniversity = async (id: string) => {
  try {
    const university = await prismadb.university.findUnique({
      where: {
        id: id,
      },
      include: {
        professors: {
          include: {
            reviews: {
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        },
        reviews: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return university;
  } catch (error) {
    console.error("Error fetching university", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const getProfessor = async (id: string) => {
  try {
    const professor = await prismadb.professor.findUnique({
      where: {
        id: id,
      },
      include: {
        university: true,
        reviews: true,
      },
    });

    return professor;
  } catch (error) {
    console.error("Error fetching professor", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
