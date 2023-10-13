"use client";

import useSWR from "swr";
import { notFound } from "next/navigation";
import Link from "next/link";

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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const University = ({ params }: any) => {
  const {
    data: university,
    error,
    isLoading,
  } = useSWR(`/api/profile/university/${params.id}`, fetcher);

  if (error) {
    notFound();
  }

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

  // CALCULATE  RATING
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
      {!isLoading && (
        <>
          <ProfileInfo university={university} />
          <div className="max-w-7xl mx-auto pt-72 pb-8">
            <div className="flex gap-8 py-8 items-center">
              <p className="text-9xl font-bold w-1/3 text-center">
                {calculateRating("overallRating").toFixed(1)}
              </p>
              <ul className="grid grid-cols-2 w-2/3 gap-4">
                {aspectData.map((aspect) => (
                  <li
                    className="flex justify-between items-center"
                    key={aspect.label}
                  >
                    <div className="flex gap-2 w-5/6">
                      {aspect.icon}
                      <p className="text-lg font-semibold">{aspect.label}</p>
                    </div>
                    <p
                      className={cn(
                        "py-1 px-5 font-semibold text-lg w-1/6",
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
                    className="flex gap-4 bg-gray-100 px-5 py-8 relative"
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
                      <p className="capitalize font-medium">{review.content}</p>
                      <ul className="grid grid-cols-2 gap-4">
                        {aspectData.map((aspect, i) => (
                          <li
                            className="flex justify-between items-center font-semibold text-sm"
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
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="flex flex-col bg-gray-100 p-12 justify-center items-center font-semibold h-full w-full">
                Aun no existen reviews para esta universidad.
                <Link
                  href={`/universidad/${university.universities.id}/calificar`}
                >
                  <Button className="font-semibold mt-2 bg-blue-600 hover:bg-blue-600/90">
                    Calificar
                  </Button>
                </Link>
              </ul>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default University;
