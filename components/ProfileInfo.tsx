"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "./ui/button";

const ProfileInfo = ({ university }: any) => {
  const pathname = usePathname();

  return (
    <section className="fixed mt-20 w-full bg-white shadow-md p-8">
      <div className="flex flex-col gap-1 max-w-7xl mx-auto">
        <p className="font-semibold text-muted-foreground">
          {university.location}
        </p>
        <h2 className="text-3xl font-bold">
          {pathname.includes("calificar") && "Calificar"} {university.name}
        </h2>
        {!pathname.includes("calificar") && (
          <div className="flex gap-2">
            <Link href={`/universidad/calificar/${university.id}`}>
              <Button className="font-semibold mt-2 bg-blue-600 hover:bg-blue-600/90">
                Calificar
              </Button>
            </Link>
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
    </section>
  );
};

export default ProfileInfo;
