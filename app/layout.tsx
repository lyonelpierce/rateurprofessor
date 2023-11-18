import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";

export const metadata: Metadata = {
  title: "Califica Tu Profe",
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
    <ClerkProvider localization={esES}>
      <html lang="en">
        <body className={`${GeistSans.className} min-h-screen`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
