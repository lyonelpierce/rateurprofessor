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
          <div className="py-8 max-w-7xl mx-auto">{university?.name}</div>
        </>
      )}
    </>
  );
};

export default University;
