"use client";

import Link from "next/link";

import Logo from "./Logo";
import { Button } from "./ui/button";
import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

const Navbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="fixed top-0 w-full bg-white h-20 z-20 shadow-2xl">
      <div className="flex max-w-7xl justify-between items-center mx-auto h-full px-4 md:px-0">
        <Link href="/">
          <Logo fill="#000" text="#fff" />
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
