"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UniversityData } from "@/constants/UniversityType";

const ProfileInfo = ({ professor }: any) => {
  const pathname = usePathname();

  return (
    <section className="fixed mt-20 w-full bg-white shadow-md p-6 md:p-8 z-20">
      <div className="flex max-w-7xl justify-between items-center mx-auto h-36 px-4">
        <div className="flex flex-col gap-1 w-full">
          <h2 className="text-3xl font-bold">
            {pathname.includes("calificar") ? "Calificar - " : ""}
            {professor.professors.name}
          </h2>
          <p className="font-semibold text-muted-foreground">
            {professor.professors.university.name}
          </p>
          <div className="flex gap-2">
            {!pathname.includes("calificar") && (
              <Link href={`/profesor/${professor.professors.id}/calificar`}>
                <Button className="font-semibold mt-2 bg-blue-600 hover:bg-blue-600/90">
                  Calificar
                </Button>
              </Link>
            )}
            <Link
              href={
                pathname.includes("calificar")
                  ? `/profesor/${professor.professors.id}`
                  : `/universidad/${professor.professors.university.id}`
              }
            >
              <Button
                variant="outline"
                className="font-semibold mt-2 text-blue-600 border-blue-600 hover:bg-blue-600/90 hover:text-white"
              >
                {pathname.includes("calificar")
                  ? "Ver Profesor"
                  : "Ver Universidad"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileInfo;
