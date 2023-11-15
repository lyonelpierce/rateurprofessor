import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Calificatuprofe",
  description: "Califica a Profesores y Universidades de Ecuador",
  icons: {
    icon: "/Logo.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${GeistSans.className} min-h-screen`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
