import Navbar from "@/components/common/Navbar/Navbar";
import AboutMe from "@/components/sections/AboutMe/AboutMe";
import Hero from "@/components/sections/Hero/Hero";
import Timeline from "@/components/sections/Timeline/Timeline";
import Recognitions from "@/components/sections/Recognitions/Recognitions";
import Skills from "@/components/sections/Skills/Skills";
import Talks from "@/components/sections/Talks/Talks";

const Home = () => {
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50">
        <Navbar />
      </div>
      <Hero />
      <AboutMe />
      <Skills />
      <Timeline />
      {/* <AboutMe />
      <AboutMe /> */}
      <Recognitions />
      <Talks />

    </>
  );
};

export default Home;
