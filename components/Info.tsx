"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "./ui/button";

const Info = () => {
  const { isSignedIn } = useAuth();
  return (
    <section className="flex flex-col items-center justify-center py-12 gap-8 max-w-7xl w-full h-1/2">
      <p className="flex flex-col text-3xl text-center font-bold">
        Unete
        <span className="text-xl font-medium">y comparte tu experiencia!</span>
      </p>
      <ul className="flex justify-between gap-8 w-full h-full mt-4">
        <li className="flex flex-col items-center justify-center">
          <Image
            src="/images/Professor.svg"
            height="300"
            width="300"
            alt="Education"
            className="w-full h-full"
          />
          <p className="font-semibold text-lg">Califica a tus Profesores</p>
        </li>
        <li className="flex flex-col items-center justify-center">
          <Image
            src="/images/Secret.svg"
            height="300"
            width="300"
            alt="Education"
            className="w-full h-full"
          />
          <p className="font-semibold text-lg">Reseñas 100% anonimas</p>
        </li>
        <li className="flex flex-col items-center justify-center">
          <Image
            src="/images/University.svg"
            height="300"
            width="300"
            alt="Education"
            className="w-full h-full"
          />
          <p className="font-semibold text-lg">Califica tu Universidad</p>
        </li>
      </ul>
      {!isSignedIn && (
        <Link href="/sign-up">
          <Button className="font-bold rounded-full" size="lg">
            Crear una Cuenta
          </Button>
        </Link>
      )}
    </section>
  );
};

export default Info;
