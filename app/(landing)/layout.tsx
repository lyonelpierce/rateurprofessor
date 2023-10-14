import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <Navbar /> */}
      <main className="flex flex-col grow h-full">{children}</main>
      <Footer />
    </>
  );
};

export default LandingLayout;
