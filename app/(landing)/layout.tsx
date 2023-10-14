import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <Navbar />
      <main className="flex flex-col h-full">{children}</main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
