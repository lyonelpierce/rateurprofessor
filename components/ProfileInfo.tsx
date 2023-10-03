"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

const ProfileInfo = () => {
  const [university, setUniversity] = useState({} as any);

  const pathname = usePathname();
  const id = pathname.split("/universidad/")[1];

  const fetchUniversity = async () => {
    try {
      const response = await fetch(`/api/profile/university/${id}`);
      if (response.ok) {
        const data = await response.json();
        setUniversity(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchUniversity();

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
