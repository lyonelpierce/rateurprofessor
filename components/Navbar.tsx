"use client";

import Link from "next/link";
import Image from "next/image";

import { Button } from "./ui/button";
import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

const Navbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="fixed top-0 w-full bg-white h-20 z-[100] shadow-2xl">
      <div className="flex max-w-7xl justify-between items-center mx-auto h-full px-4 md:px-0">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/Logo.svg" width={60} height={60} alt="Logo Emoji" />
          <h1 className="text-[1.35rem] font-bold pt-2">
            <span className="text-[#fca00a]">Califica</span> tu profe
          </h1>
        </Link>
        <div className="flex">
          {!isSignedIn ? (
            <>
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="border-0 font-bold hover:bg-transparent text-xs md:text-sm"
                >
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="text-xs md:text-sm font-bold">
                  Crear una Cuenta
                </Button>
              </Link>
            </>
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
