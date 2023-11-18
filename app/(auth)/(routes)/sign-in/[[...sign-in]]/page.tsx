import type { Metadata } from "next";

import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Iniciar Sesión | Califica Tu Profe",
  description: "Inicia sesión en Califica Tu Profe",
};

export default function Page() {
  return <SignIn />;
}
