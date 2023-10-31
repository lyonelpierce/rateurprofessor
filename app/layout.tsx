import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Califica tu profesor",
  description: "Califica a tus profesores",
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
