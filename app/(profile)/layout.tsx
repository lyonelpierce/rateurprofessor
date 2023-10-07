"use client";

import Footer from "@/components/Footer";
import NavbarProfile from "@/components/NavbarProfile";
import ProfileInfo from "@/components/ProfileInfo";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full">
      <NavbarProfile />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
