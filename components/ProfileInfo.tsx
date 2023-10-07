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
          <Link href={`/calificar/universidad/${university.id}`}>
            <Button className="w-1/6 font-semibold mt-2 bg-blue-600 hover:bg-blue-600/90">
              Calificar {university.tipo}
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default ProfileInfo;
