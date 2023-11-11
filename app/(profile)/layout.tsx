"use client";

import Footer from "@/components/Footer";
import NavbarProfile from "@/components/NavbarProfile";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <NavbarProfile />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

export default LandingLayout;
