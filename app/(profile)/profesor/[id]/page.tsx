import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ProfileInfo from "@/components/ProfessorInfo";
import monthNames from "@/constants/months";
import { ProfessorData } from "@/constants/UniversityType";

export const revalidate = 0;

async function getProfessor({
  params,
}: {
  params: { id: string };
}): Promise<ProfessorData> {
  const response = await fetch(
    `${process.env.URL}/api/profile/professor/${params.id}`
  );

  if (response.status === 404) notFound();

  return await response.json();
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const professor = await getProfessor({ params });
  return {
    title:
      professor.professors.name +
      " - " +
      professor.professors.university.name +
      " | Calificatuprofe",
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const professor = await getProfessor({ params });

  // CALCULATE  RATING
  const calculateRating = (aspectKey: string) => {
    if (
      !professor.professors.reviews ||
      professor.professors.reviews.length === 0
    ) {
      return 0;
    }

    const totalRatings = professor.professors.reviews.reduce(
      (accumulator: number, review: any) =>
        accumulator + parseFloat(review[aspectKey] || 0),
      0
    );

    return totalRatings / professor.professors.reviews.length;
  };

  const calculateAgainPercentage = () => {
    if (
      !professor.professors.reviews ||
      professor.professors.reviews.length === 0
    ) {
      return 0;
    }

    const totalReviews = professor.professors.reviews.length;
    const positiveAgainReviews = professor.professors.reviews.filter(
      (review: any) => review.again === 1
    ).length;

    return (positiveAgainReviews / totalReviews) * 100;
  };

  return (
    <>
      <ProfileInfo professor={professor} />
      <div className="flex-grow flex flex-col pt-72 max-w-7xl mx-auto h-full gap-4 px-4 md:px-0">
        <div className="md:flex flex-col md:flex-row gap-8 justify-center items-center pb-16 pt-20 hidden">
          <p className="flex flex-col items-center text-xl md:text-5xl font-bold text-center w-1/3">
            {calculateRating("difficulty")}/5
            <span className="text-xl font-semibold">Dificultad</span>
          </p>
          <p className="flex flex-col items-center text-5xl md:text-8xl font-bold text-center md:w-1/3">
            {calculateRating("rate")}/5
            <span className="text-xl font-semibold">General</span>
          </p>
          <p className="flex flex-col items-center text-xl md:text-5xl font-bold text-center w-1/3">
            {calculateAgainPercentage()}%
            <span className="text-xl font-semibold">Lo volveria a elegir</span>
          </p>
        </div>
        <div className="flex flex-col gap-8 justify-center items-center py-12 md:hidden">
          <p className="flex flex-col items-center text-6xl md:text-8xl font-bold text-center w-full">
            {calculateRating("rate")}/5
            <span className="text-base md:text-xl font-semibold">General</span>
          </p>
          <div className="flex w-full">
            <p className="flex flex-col items-center text-2xl md:text-5xl font-bold text-center w-1/2">
              {calculateRating("difficulty")}/5
              <span className="text-base md:text-xl font-semibold">
                Dificultad
              </span>
            </p>
            <p className="flex flex-col items-center text-2xl md:text-5xl font-bold text-center w-1/2">
              {calculateAgainPercentage()}%
              <span className="text-base md:text-xl font-semibold">
                Lo volveria a elegir
              </span>
            </p>
          </div>
        </div>
        <div className="flex h-full flex-col pb-8">
          <p className="font-bold text-xl mb-2">
            {professor.professors.reviews.length}{" "}
            {professor.professors.reviews.length === 1
              ? "Calificación"
              : "Calificaciones"}
          </p>
          {professor.professors.reviews.length > 0 ? (
            <ul className="flex flex-col gap-4">
              {professor.professors.reviews.map((review: any) => (
                <li
                  key={review.id}
                  className="flex gap-4 bg-gray-100 rounded-md px-5 py-8 relative"
                >
                  <div className="absolute right-0 top-0 p-5">
                    <p className="text-sm font-semibold">
                      {`${
                        monthNames[new Date(review.createdAt).getMonth()]
                      } ${new Date(review.createdAt).getDate()}, ${new Date(
                        review.createdAt
                      ).getFullYear()}`}
                    </p>
                  </div>
                  <div className="flex gap-4 pt-4 w-full">
                    <div
                      className={cn(
                        "p-4 w-20 h-fit flex justify-center items-center",
                        (review.rate < 3 && "bg-red-400") ||
                          (review.rate >= 3 &&
                            review.rate < 4 &&
                            "bg-yellow-400") ||
                          (review.rate >= 4 && "bg-green-400")
                      )}
                    >
                      <p className="text-2xl md:text-3xl font-black">
                        {review.rate}.0
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex flex-col md:flex-row md:gap-10 font-medium">
                        <p className="flex gap-5">
                          Dificultad:{" "}
                          <span className="font-bold">
                            {review.difficulty}/5
                          </span>
                        </p>
                        <p className="flex gap-5">
                          Lo volveria a elegir:{" "}
                          <span className="font-bold">
                            {review.again ? "Si" : "No"}
                          </span>
                        </p>
                      </div>
                      <p className="font-medium break-all w-full capitalize-first">
                        {review.content}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="flex flex-col bg-gray-100 rounded-md p-12 justify-center items-center font-semibold w-full h-full text-center">
              Aun no existen reseñas para este profesor.
              <Link href={`/profesor/${professor.professors.id}/calificar`}>
                <Button className="font-semibold mt-2 bg-blue-600 hover:bg-blue-600/90">
                  Calificar
                </Button>
              </Link>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
