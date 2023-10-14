import Hero from "@/components/Hero";
import Info from "@/components/Info";

const Home = () => {
  return (
    <section className="flex flex-col items-center justify-center h-full">
      <Hero />
      <Info />
    </section>
  );
};

export default Home;
