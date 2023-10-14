import Hero from "@/components/Hero";
import Info from "@/components/Info";

const Home = () => {
  return (
    <div className="flex flex-col items-center h-full">
      <Hero />
      <Info />
    </div>
  );
};

export default Home;
