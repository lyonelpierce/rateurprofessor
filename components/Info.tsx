import Image from "next/image";
import Link from "next/link";

import { Button } from "./ui/button";

const Info = () => {
  return (
    <section className="flex flex-col items-center justify-center py-8 gap-8 max-w-7xl w-full h-full">
      <p className="text-3xl text-center font-bold">
        Unete Gratis
        <br />
        <span className="text-2xl font-medium">y comparte tu experiencia!</span>
      </p>
      <ul className="flex justify-between gap-8 w-full h-full mt-4">
        <li className="flex flex-col items-center justify-center">
          <Image
            src="/images/Professor.svg"
            height="350"
            width="350"
            alt="Education"
          />
          <p className="font-semibold text-2xl">Califica a tus Profesores</p>
        </li>
        <li className="flex flex-col items-center justify-center">
          <Image
            src="/images/Secret.svg"
            height="350"
            width="350"
            alt="Education"
          />
          <p className="font-semibold text-2xl">Reseñas 100% anonimas</p>
        </li>
        <li className="flex flex-col items-center justify-center">
          <Image
            src="/images/University.svg"
            height="350"
            width="350"
            alt="Education"
          />
          <p className="font-semibold text-2xl">Califica tu Universidad</p>
        </li>
      </ul>
      <Link href="/sign-up">
        <Button className="font-bold rounded-full" size="lg">
          Crear una Cuenta
        </Button>
      </Link>
    </section>
  );
};

export default Info;
