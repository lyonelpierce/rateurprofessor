"use client";

import useSWR from "swr";
import { notFound } from "next/navigation";

import { cn } from "@/lib/utils";
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

  console.log(professor);
  return (
    <section>
      {!isLoading && (
        <>
          <ProfileInfo professor={professor} />
          <div className="max-w-7xl mx-auto pt-72 pb-8">
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
                  <p className="font-medium capitalize w-11/12">
                    {review.content}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </section>
  );
};

export default Professor;
