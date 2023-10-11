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

  console.log(university);

  return (
    <section className="h-full">
      {!isLoading && (
        <>
          <ProfileInfo university={university} />
          <div className="max-w-7xl mx-auto py-10 h-full">
            <div className="pt-64">
              <p className="font-bold text-xl mb-2">
                {university.universities.professors.length}{" "}
                {university.universities.professors.length === 1
                  ? "Profesor"
                  : "Profesores"}
              </p>{" "}
              <ul className="flex flex-col gap-4 w-full">
                {university.universities.professors.map((professor: any) => (
                  <li
                    key={professor.id}
                    className="bg-gray-100 p-5 text-xl font-bold"
                  >
                    {professor.name}
                  </li>
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
