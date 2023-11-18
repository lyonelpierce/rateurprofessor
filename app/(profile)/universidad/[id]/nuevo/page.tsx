import { notFound } from "next/navigation";
import { Metadata } from "next";

import { UniversityData } from "@/constants/UniversityType";
import AddProfessor from "@/components/AddProfessor";
import ProfileInfo from "@/components/UniversityInfo";

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
    title:
      "Añadir Profesor - " +
      university.universities.name +
      " | Calificatuprofe",
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const university = await getUniversity({ params });

  return (
    <section className="h-full">
      <ProfileInfo university={university} />
      <div className="max-w-7xl mx-auto py-10 h-full px-4">
        <AddProfessor params={params} />
      </div>
    </section>
  );
}
