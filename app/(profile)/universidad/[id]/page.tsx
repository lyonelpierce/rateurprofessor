"use client";

import useSWR from "swr";
import { notFound } from "next/navigation";

import ProfileInfo from "@/components/ProfileInfo";

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

  return (
    <>
      {!isLoading && (
        <>
          <ProfileInfo university={university} />
          <div className="max-w-7xl mx-auto pt-72">
            <ul className="flex flex-col gap-4">
              {university?.reviews.map((review: any) => (
                <li
                  key={review.id}
                  className="flex gap-8 bg-gray-100 p-4 relative"
                >
                  <div className="bg-red-500/70 px-8 py-4">
                    <p className="text-4xl font-semibold">
                      {review.overallRating}
                    </p>
                  </div>
                  <p className="capitalize text-sm font-medium">
                    {review.content}
                  </p>
                  <div className="absolute right-0 top-0 p-4">
                    <p className="text-sm font-semibold">{review.updatedAt}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default University;
