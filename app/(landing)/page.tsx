import Hero from "@/components/Hero";
import Info from "@/components/Info";

const Home = () => {
  return (
    <section className="pt-20 flex flex-col items-center justify-center gap-8 py-16 h-full">
      <Hero />
      <Info />
    </section>
  );
};

export default Home;
