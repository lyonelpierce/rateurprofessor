"use client";

import useSWR from "swr";
import { notFound } from "next/navigation";

import ProfileInfo from "@/components/ProfileInfo";

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
  return (
    <section className="h-full">
      {!isLoading && <ProfileInfo university={university} />}
    </section>
  );
};

export default ProfessorsList;
