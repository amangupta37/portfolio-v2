import Navbar from "@/components/common/Navbar/Navbar";
import AboutMe from "@/components/sections/AboutMe/AboutMe";
import Hero from "@/components/sections/Hero/Hero";

const Home = () => {
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50">
        <Navbar />
      </div>
      <Hero />
      <AboutMe />
    </>
  );
};

export default Home;
