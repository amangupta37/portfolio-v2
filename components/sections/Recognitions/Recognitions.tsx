import { Spotlight } from "@/components/ui/spotlight-new";
import Carousel, { type SlideData } from "@/components/ui/carousel";

const slides: SlideData[] = [
          {
                    title: "Recognition",
                    button: "View Recognition",
                    src: "/recognitions/recognition_01.JPG",
          },
          {
                    title: "Recognition",
                    button: "View Recognition",
                    src: "/recognitions/recognition_02.png",
          },
          {
                    title: "Recognition",
                    button: "View Recognition",
                    src: "/recognitions/recognition_03.jpeg",
          },
          {
                    title: "Awards",
                    button: "View Awards",
                    src: "/awards/award_01.jpg",
                    fit: "contain",
          },
          {
                    title: "Awards",
                    button: "View Awards",
                    src: "/awards/award_02.jpg",
                    fit: "contain",
          },
          {
                    title: "Awards",
                    button: "View Awards",
                    src: "/awards/award_03.jpg",
                    fit: "contain",
          },
          {
                    title: "Awards",
                    button: "View Recognition",
                    src: "/awards/award_04.jpg",
                    fit: "contain",
          },
];

const Recognitions = () => {
          return (
                    <section id="recognitions" className="relative flex h-auto min-h-0 max-h-none w-full scroll-mt-16 flex-col justify-start overflow-hidden bg-black/[0.96] pt-4 pb-12 antialiased md:h-screen md:min-h-[650px] md:max-h-[900px] md:scroll-mt-24 md:justify-center md:py-8">
                              <Spotlight />
                              <div className="relative z-10 mx-auto w-full max-w-7xl px-4">
                                        <h2 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
                                                  Recognitions
                                        </h2>
                                        <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
                                                  Awards, shout-outs and milestones collected along the way.
                                        </p>

                                        <div className="relative mt-8 md:mt-12 w-full overflow-hidden pb-16">
                                                  <Carousel slides={slides} />
                                        </div>
                              </div>
                    </section>
          );
};

export default Recognitions;
