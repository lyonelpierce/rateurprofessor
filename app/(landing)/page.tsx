import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Info from "@/components/Info";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen h-full">
      <Navbar />
      <Hero />
      <Info />
      <Footer />
    </div>
  );
};

export default Home;
