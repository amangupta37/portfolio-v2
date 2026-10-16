import { Spotlight } from "@/components/ui/spotlight-new";
import Carousel, { type SlideData } from "@/components/ui/carousel";

const slides: SlideData[] = [
          {
                    title: "Mystic Mountains",
                    button: "View Recognition",
                    src: "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
                    title: "Urban Dreams",
                    button: "View Recognition",
                    src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
                    title: "Neon Nights",
                    button: "View Recognition",
                    src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
                    title: "Desert Whispers",
                    button: "View Recognition",
                    src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
];

const Recognitions = () => {
          return (
                    <section className="relative flex min-h-[40rem] w-full justify-center overflow-hidden bg-black/[0.96] antialiased">
                              <Spotlight />
                              <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-32">
                                        <h2 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
                                                  Recognitions
                                        </h2>
                                        <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
                                                  Awards, shout-outs and milestones collected along the way.
                                        </p>

                                        <div className="relative mt-16 w-full overflow-hidden pb-20">
                                                  <Carousel slides={slides} />
                                        </div>
                              </div>
                    </section>
          );
};

export default Recognitions;
