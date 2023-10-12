"use client";

import useSWR from "swr";
import { notFound } from "next/navigation";
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
  return <div>{!isLoading && <ProfileInfo professor={professor} />}</div>;
};

export default Professor;
