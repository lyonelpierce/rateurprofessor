"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

const ProfileInfo = ({ professor }: any) => {
  const pathname = usePathname();

  return (
    <section className="fixed mt-20 w-full bg-white shadow-md p-8 z-20">
      <div className="flex max-w-7xl justify-between items-center mx-auto">
        <div className="flex flex-col gap-1 w-full">
          <h2 className="text-3xl font-bold">
            {pathname.includes("calificar") ? "Calificar - " : ""}
            {professor.name}
          </h2>
          <p className="font-semibold text-muted-foreground">
            {professor.university.name}
          </p>
          <div className="flex gap-2">
            {!pathname.includes("calificar") && (
              <Button className="font-semibold mt-2 w-1/6 bg-blue-600 hover:bg-blue-600/90">
                <Link href={`/profesor/${professor.id}/calificar`}>
                  Calificar
                </Link>
              </Button>
            )}
            <Button
              variant="outline"
              className="font-semibold mt-2 w-1/6 text-blue-600 border-blue-600 hover:bg-blue-600/90 hover:text-white"
            >
              <Link
                href={
                  pathname.includes("calificar")
                    ? `/profesor/${professor.id}`
                    : `/universidad/${professor.university.id}`
                }
              >
                {pathname.includes("calificar")
                  ? "Ver Profesor"
                  : "Ver Universidad"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileInfo;
