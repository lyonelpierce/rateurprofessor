import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <main className="h-full">{children}</main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
