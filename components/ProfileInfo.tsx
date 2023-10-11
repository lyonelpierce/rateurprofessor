"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

const ProfileInfo = ({ university }: any) => {
  const pathname = usePathname();

  return (
    <section className="fixed mt-20 w-full bg-white shadow-md p-8 z-20">
      <div className="flex max-w-7xl justify-between items-center mx-auto">
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-muted-foreground">
            {university.universities.location}
          </p>
          <h2 className="text-3xl font-bold">
            {pathname.includes("calificar") && "Calificar"}{" "}
            {university.universities.name}
          </h2>
          {!pathname.includes("calificar") && (
            <div className="flex gap-2">
              <Button
                className="font-semibold mt-2 bg-blue-600 hover:bg-blue-600/90"
                // disabled={!university.isReviewed}
              >
                <Link
                  href={`/universidad/calificar/${university.universities.id}`}
                >
                  Calificar
                </Link>
              </Button>
              <Link href={`/`}>
                <Button
                  variant="outline"
                  className="font-semibold mt-2 text-blue-600 border-blue-600 hover:bg-blue-600/90 hover:text-white"
                >
                  Ver Profesores
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileInfo;
