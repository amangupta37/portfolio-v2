import StickyNavbar from "@/components/common/Navbar/StickyNavbar";
import AboutMe from "@/components/sections/AboutMe/AboutMe";
import Hero from "@/components/sections/Hero/Hero";
import Timeline from "@/components/sections/Timeline/Timeline";
import Recognitions from "@/components/sections/Recognitions/Recognitions";
import Skills from "@/components/sections/Skills/Skills";
import Talks from "@/components/sections/Talks/Talks";

const Home = () => {
  return (
    <>
      <StickyNavbar watchId="timeline-section" />
      <Hero />
      <AboutMe />
      <Skills />
      <div id="timeline-section">
        <Timeline />
      </div>
      <Recognitions />
      <Talks />
    </>
  );
};

export default Home;
