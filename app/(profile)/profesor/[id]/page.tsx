"use client";

import useSWR from "swr";
import { notFound } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import monthNames from "@/constants/months";
import ProfileInfo from "@/components/ProfessorInfo";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Professor = ({ params }: any) => {
  const {
    data: professor,
    error,
    isLoading,
  } = useSWR(`/api/profile/professor/${params.id}`, fetcher);

  if (error) {
    notFound();
  }

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
    <section>
      {!isLoading && (
        <>
          <ProfileInfo professor={professor} />
          <div className="max-w-7xl mx-auto pt-72 pb-8">
            <div className="flex justify-between w-full py-12">
              <p className="flex flex-col items-center text-8xl font-bold text-center">
                {calculateRating("rate")}/5
                <span className="text-xl">General</span>
              </p>
              <p className="flex flex-col items-center text-8xl font-bold text-center">
                {calculateRating("difficulty")}/5
                <span className="text-xl">Dificultad</span>
              </p>
              <p className="flex flex-col items-center text-8xl font-bold text-center">
                {calculateAgainPercentage()}%
                <span className="text-xl">Lo volveria a elegir</span>
              </p>
            </div>
            <p className="font-bold text-xl mb-2">
              {professor.professors.reviews.length}{" "}
              {professor.professors.reviews.length === 1
                ? "Calificación"
                : "Calificaciones"}
            </p>
            {professor.professors.reviews.length > 0 ? (
              <ul>
                {professor.professors.reviews.map((review: any) => (
                  <li
                    key={review.id}
                    className="flex bg-gray-100 gap-5 w-full relative pt-12 px-5 pb-8"
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
                    <div
                      className={cn(
                        "flex items-center justify-center p-4 w-20",
                        (review.rate < 3 && "bg-red-400") ||
                          (review.rate >= 3 &&
                            review.rate < 4 &&
                            "bg-yellow-400") ||
                          (review.rate >= 4 && "bg-green-400")
                      )}
                    >
                      <p className="text-3xl font-black">{review.rate}.0</p>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex gap-10 font-medium">
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
                      <p className="font-medium capitalize">{review.content}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="flex flex-col bg-gray-100 p-12 justify-center items-center font-semibold h-full w-full">
                Aun no existen reviews para este profesor.
                <Button className="font-semibold mt-2 bg-blue-600 hover:bg-blue-600/90 w-1/6">
                  <Link
                    href={`/universidad/${professor.professors.id}/calificar`}
                  >
                    Calificar
                  </Link>
                </Button>
              </ul>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Professor;
