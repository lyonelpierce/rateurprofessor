"use client";

import useSWR from "swr";
import { notFound } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ProfileInfo from "@/components/UniversityInfo";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProfessorsList = ({ params }: any) => {
  const {
    data: university,
    error,
    isLoading,
  } = useSWR(`/api/profile/university/${params.id}`, fetcher);

  if (error) {
    notFound();
  }

  // CALCULATE  RATING
  const calculateRating = (professor: any, aspectKey: string) => {
    if (!professor.reviews || professor.reviews.length === 0) {
      return 0;
    }

    const totalRatings = professor.reviews.reduce(
      (accumulator: number, review: any) =>
        accumulator + parseFloat(review[aspectKey] || 0),
      0
    );

    return totalRatings / professor.reviews.length;
  };

  return (
    <section className="h-full">
      {!isLoading && (
        <>
          <ProfileInfo university={university} />
          <div className="max-w-7xl mx-auto py-10 h-full px-4">
            <div className="flex flex-col gap-4 pt-64">
              <div className="bg-gray-100 p-8 flex flex-col gap-2 items-center justify-center rounded-md">
                <p className="font-semibold text-center">
                  No encuentras a tu profesor? Agregalo!
                </p>
                <Link href={`/universidad/${params.id}/nuevo`}>
                  <Button className="border-0 bg-blue-600 hover:bg-blue-600/90 font-semibold">
                    Agregar Profesor
                  </Button>
                </Link>
              </div>
              <p className="font-bold text-xl">
                {university.universities.professors.length}{" "}
                {university.universities.professors.length === 1
                  ? "Profesor"
                  : "Profesores"}
              </p>{" "}
              <ul className="flex flex-col gap-4 w-full">
                {university.universities.professors.map((professor: any) => (
                  <Link href={`/profesor/${professor.id}`} key={professor.id}>
                    <li className="flex gap-5 bg-gray-100 hover:bg-gray-200 p-5 text-base font-bold rounded-md">
                      <div
                        className={cn(
                          "flex items-center justify-center p-4 w-20",
                          {
                            "bg-gray-300":
                              calculateRating(professor, "rate") === 0,
                            "bg-red-400":
                              calculateRating(professor, "rate") < 3 &&
                              calculateRating(professor, "rate") > 0,
                            "bg-yellow-400":
                              calculateRating(professor, "rate") >= 3 &&
                              calculateRating(professor, "rate") < 4,
                            "bg-green-400":
                              calculateRating(professor, "rate") >= 4,
                          }
                        )}
                      >
                        {" "}
                        {calculateRating(professor, "rate")}/5
                      </div>
                      <div className="flex flex-col justify-center">
                        {professor.name}
                        <span className="text-sm text-muted-foreground font-medium">
                          {university.universities.name}
                        </span>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ProfessorsList;
