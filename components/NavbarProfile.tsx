"use client";

import Link from "next/link";

import Logo from "./Logo";
import { Button } from "./ui/button";
import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

const NavbarProfile = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="fixed top-0 w-full bg-black h-20">
      <div className="flex max-w-7xl justify-between items-center mx-auto h-full">
        <Link href="/">
          <Logo fill="#fff" text="#000" />
        </Link>
        <div className="flex">
          {!isSignedIn ? (
            <>
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="border-0 font-bold hover:bg-transparent"
                >
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="font-bold">Crear una Cuenta</Button>
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

export default NavbarProfile;