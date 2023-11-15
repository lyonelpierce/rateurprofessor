"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "./ui/button";

const Info = () => {
  const { isSignedIn } = useAuth();
  return (
    <section className="flex-grow flex items-center">
      <div className="flex flex-col items-center max-w-7xl mx-auto w-full gap-5 px-4 py-12 md:py-0">
        <p className="flex flex-col text-3xl text-center font-bold">
          Unete
          <span className="text-xl font-medium">
            y comparte tu experiencia!
          </span>
        </p>
        <ul className="flex flex-col md:flex-row justify-between w-full h-full">
          <li className="flex flex-col items-center justify-center">
            <Image
              src="/images/Professor.svg"
              height="300"
              width="300"
              alt="Education"
              className="w-2/3 md:w-full h-full"
            />
            <p className="font-semibold text-lg">Califica a tus Profesores</p>
          </li>
          <li className="flex flex-col items-center justify-center">
            <Image
              src="/images/Secret.svg"
              height="300"
              width="300"
              alt="Education"
              className="w-2/3 md:w-full h-full"
            />
            <p className="font-semibold text-lg">Reseñas 100% anonimas</p>
          </li>
          <li className="flex flex-col items-center justify-center">
            <Image
              src="/images/University.svg"
              height="300"
              width="300"
              alt="Education"
              className="w-2/3 md:w-full h-full"
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
      </div>
    </section>
  );
};

export default Info;
