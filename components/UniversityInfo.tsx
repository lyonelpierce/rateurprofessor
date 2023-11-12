"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

const ProfileInfo = ({ university }: any) => {
  const pathname = usePathname();

  return (
    <section className="fixed mt-20 w-full bg-white shadow-md p-6 md:p-8 z-20">
      <div className="flex max-w-7xl justify-between items-center mx-auto">
        <div className="flex flex-col gap-1 w-full">
          <p className="text-base font-semibold text-muted-foreground">
            {university.universities.location}
          </p>
          <h2 className="text-xl md:text-3xl font-bold capitalize">
            {pathname.includes("profesores") && "Profesores - "}
            {pathname.includes("calificar") && "Calificar - "}
            {pathname.includes("nuevo") && "Nuevo Profesor - "}
            {university.universities.name.toLowerCase()}
          </h2>
          <div className="flex gap-2">
            {!pathname.includes("profesores") &&
              !pathname.includes("calificar") &&
              !pathname.includes("nuevo") && (
                <Link
                  href={`/universidad/${university.universities.id}/calificar`}
                >
                  <Button className="font-semibold mt-2 bg-blue-600 hover:bg-blue-600/90">
                    Calificar
                  </Button>
                </Link>
              )}
            <Link
              href={
                pathname.includes("profesores") ||
                pathname.includes("calificar")
                  ? `/universidad/${university.universities.id}`
                  : `/universidad/${university.universities.id}/profesores`
              }
            >
              <Button
                variant="outline"
                className="font-semibold mt-2 text-blue-600 border-blue-600 hover:bg-blue-600/90 hover:text-white"
              >
                {pathname.includes("profesores") ||
                pathname.includes("calificar")
                  ? "Ver Universidad"
                  : "Ver Profesores"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileInfo;
