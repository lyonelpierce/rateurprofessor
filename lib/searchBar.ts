import { NextResponse } from "next/server";
import prismadb from "./pismadb";

export const getUniversity = async () => {
  try {
    const universities = await prismadb.university.findMany({
      select: {
        id: true,
        name: true,
        location: true,
      },
    });
    return universities;
  } catch (error) {
    console.error("Error fetching universities", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const getProfessor = async () => {
  try {
    const professors = await prismadb.professor.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return professors;
  } catch (error) {
    console.error("Error fetching professors", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
