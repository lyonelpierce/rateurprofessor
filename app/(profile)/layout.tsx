"use client";

import Footer from "@/components/Footer";
import NavbarProfile from "@/components/NavbarProfile";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarProfile />
      <div className="h-full flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

export default LandingLayout;
