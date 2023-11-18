import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { UniversityData } from "@/constants/UniversityType";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import monthNames from "@/constants/months";
import ProfileInfo from "@/components/UniversityInfo";
import {
  ShieldCheck,
  MapPin,
  Smile,
  ArrowUpNarrowWide,
  Star,
  Medal,
  Dumbbell,
  Wifi,
  UtensilsCrossed,
  Users,
} from "lucide-react";

export const revalidate = 0;

async function getUniversity({
  params,
}: {
  params: { id: string };
}): Promise<UniversityData> {
  const response = await fetch(
    `${process.env.URL}/api/profile/university/${params.id}`
  );

  if (response.status === 404) notFound();

  return await response.json();
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const university = await getUniversity({ params });

  return {
    title: university.universities.name + " | Calificatuprofe",
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const university = await getUniversity({ params });

  const aspectData = [
    {
      icon: <ShieldCheck />,
      label: "Seguridad",
      aspectKey: "safetyRating",
    },
    {
      icon: <MapPin />,
      label: "Ubicación",
      aspectKey: "locationRating",
    },
    {
      icon: <Smile />,
      label: "Felicidad",
      aspectKey: "happinessRating",
    },
    {
      icon: <ArrowUpNarrowWide />,
      label: "Oportunidades",
      aspectKey: "opportunitiesRating",
    },
    {
      icon: <Star />,
      label: "Reputación",
      aspectKey: "reputationRating",
    },
    {
      icon: <Medal />,
      label: "Clubes",
      aspectKey: "clubsRating",
    },
    {
      icon: <Dumbbell />,
      label: "Instalaciones",
      aspectKey: "facilitiesRating",
    },
    {
      icon: <Wifi />,
      label: "Internet",
      aspectKey: "internetRating",
    },
    {
      icon: <UtensilsCrossed />,
      label: "Comida",
      aspectKey: "foodRating",
    },
    {
      icon: <Users />,
      label: "Social",
      aspectKey: "socialRating",
    },
  ];

  const calculateRating = (aspectKey: string) => {
    if (
      !university.universities.reviews ||
      university.universities.reviews.length === 0
    ) {
      return 0;
    }

    const totalRatings = university.universities.reviews.reduce(
      (accumulator: number, review: any) =>
        accumulator + parseFloat(review[aspectKey] || 0),
      0
    );

    return totalRatings / university.universities.reviews.length;
  };
  return (
    <>
      <ProfileInfo university={university} />
      <div className="flex-grow flex flex-col pt-72 max-w-7xl mx-auto h-full gap-4 px-4 md:px-0">
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center py-4">
          <p className="text-9xl font-bold w-full md:w-1/3 text-center">
            {calculateRating("overallRating").toFixed(1)}
          </p>
          <ul className="grid grid-cols-2 w-full md:w-2/3 gap-4">
            {aspectData.map((aspect) => (
              <li
                className="flex justify-between items-center"
                key={aspect.label}
              >
                <div className="flex gap-1 md:gap-2 w-5/6">
                  {aspect.icon}
                  <p className="text-sm md:text-lg font-semibold">
                    {aspect.label}
                  </p>
                </div>
                <p
                  className={cn(
                    "py-1 text-center font-semibold text-sm md:text-lg w-1/6",
                    (calculateRating(aspect.aspectKey) >= 3 &&
                      calculateRating(aspect.aspectKey) < 4 &&
                      "bg-yellow-400/80") ||
                      (calculateRating(aspect.aspectKey) < 3 &&
                        "bg-red-400/80") ||
                      (calculateRating(aspect.aspectKey) >= 4 &&
                        "bg-green-400/80")
                  )}
                >
                  {calculateRating(aspect.aspectKey).toFixed(1)}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex h-full flex-col pb-8 md:px-4">
          <p className="font-bold text-xl mb-2">
            {university.universities.reviews.length}{" "}
            {university.universities.reviews.length === 1
              ? "Calificación"
              : "Calificaciones"}
          </p>
          {university.universities.reviews.length > 0 ? (
            <ul className="flex flex-col gap-4">
              {university.universities.reviews.map((review: any) => (
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
                        (review.overallRating >= 3 &&
                          review.overallRating < 4 &&
                          "bg-yellow-400/80") ||
                          (review.overallRating < 3 && "bg-red-400/80") ||
                          (review.overallRating >= 4 && "bg-green-400/80")
                      )}
                    >
                      <p className="text-3xl font-black">
                        {review.overallRating}
                      </p>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                      <p className="capitalize font-medium break-all">
                        {review.content}
                      </p>
                      <ul className="md:grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 w-full hidden">
                        {aspectData.map((aspect, i) => (
                          <li
                            className="flex flex-col md:flex-row justify-between items-center font-semibold text-sm"
                            key={aspect.label}
                          >
                            {aspect.label}
                            <ul className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <li
                                  key={rating}
                                  className={cn("bg-gray-200 h-5 w-10", {
                                    "rounded-l-full": rating === 1,
                                    "rounded-r-full": rating === 5,
                                    "bg-red-400":
                                      rating >= 1 &&
                                      rating <=
                                        parseFloat(
                                          university.universities.reviews[0][
                                            aspect.aspectKey
                                          ]
                                        ),
                                    "bg-orange-400":
                                      rating >= 2 &&
                                      rating <=
                                        parseFloat(
                                          university.universities.reviews[0][
                                            aspect.aspectKey
                                          ]
                                        ),
                                    "bg-yellow-400":
                                      rating >= 3 &&
                                      rating <=
                                        parseFloat(
                                          university.universities.reviews[0][
                                            aspect.aspectKey
                                          ]
                                        ),
                                    "bg-green-400":
                                      rating >= 4 &&
                                      rating <=
                                        parseFloat(
                                          university.universities.reviews[0][
                                            aspect.aspectKey
                                          ]
                                        ),
                                    "bg-green-600":
                                      rating >= 5 &&
                                      rating ===
                                        parseFloat(
                                          university.universities.reviews[0][
                                            aspect.aspectKey
                                          ]
                                        ),
                                  })}
                                ></li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col flex-grow h-full bg-gray-100 gap-2 py-8 p-4 justify-center items-center font-semibold w-full rounded-md">
              <p className="text-center">
                Aun no existen reviews para esta universidad.
              </p>
              <Link
                href={`/universidad/${university.universities.id}/calificar`}
              >
                <Button className="font-semibold mt-1 bg-blue-600 hover:bg-blue-600/90">
                  Calificar
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
