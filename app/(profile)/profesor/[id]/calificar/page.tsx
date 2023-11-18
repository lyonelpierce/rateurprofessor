import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import ProfileInfo from "@/components/ProfessorInfo";
import ProfessorRate from "@/components/ProfessorRate";
import { ProfessorData } from "@/constants/UniversityType";
import { checkProfessorRating } from "@/lib/rate";

async function getProfessor({
  params,
}: {
  params: { id: string };
}): Promise<ProfessorData> {
  const response = await fetch(
    `${process.env.URL}/api/profile/professor/${params.id}`
  );

  if (response.status === 404) notFound();

  return await response.json();
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const professor = await getProfessor({ params });

  return {
    title: "Calificar - " + professor.professors.name + " | Calificatuprofe",
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const professor = await getProfessor({ params });
  const isNotRated = await checkProfessorRating(params.id);

  return (
    <section className="flex-grow h-full">
      <ProfileInfo professor={professor} />
      <div className="max-w-7xl mx-auto h-full px-4 md:px-0">
        {isNotRated ? (
          <ProfessorRate params={params} />
        ) : (
          <div className="flex items-center justify-center pt-60 p-5 h-full w-full">
            <p className="flex flex-col justify-center text-center items-center font-medium text-base gap-2 w-full">
              <span className="text-xl md:text-2xl font-semibold">
                Ya calificaste este profesor.
              </span>
              <span>
                Podras volver a calificar a este profesor dentro de 6 meses.
              </span>
              <Link href={`/profesor/${params.id}`}>
                <Button className="border-0 font-bold bg-blue-600 hover:bg-blue-600/90 hover:text-white">
                  Regresar
                </Button>
              </Link>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
