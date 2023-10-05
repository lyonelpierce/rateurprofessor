"use client";

import UniversityType from "@/types/University";

import { Button } from "./ui/button";

const ProfileInfo = ({ university }: any) => {
  return (
    <section className="mt-20 w-full bg-white shadow-md p-8">
      <div className="max-w-7xl mx-auto">
        <p className="font-semibold text-muted-foreground">
          {university.location}
        </p>
        <h2 className="text-3xl font-bold">{university.name}</h2>
        <Button className="font-semibold mt-2 bg-blue-600 hover:bg-blue-600/90">
          Calificar {university.tipo}
        </Button>
      </div>
    </section>
  );
};

export default ProfileInfo;
