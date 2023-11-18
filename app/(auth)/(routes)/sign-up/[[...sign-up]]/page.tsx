import type { Metadata } from "next";

import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Crear una Cuenta | Califica Tu Profe",
  description: "Crea una cuenta en Califica Tu Profe",
};

export default function Page() {
  return <SignUp />;
}
