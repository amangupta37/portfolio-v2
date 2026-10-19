import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";
import Backdrop from "@/components/common/Backdrop/Backdrop";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";

const TALKS: string[] = [

          "/talks/talk_01.jpeg",
          "/talks/talk_02.png",
          "/talks/talk_03.jpg",
          "/talks/talk_04.jpg",
          "/talks/talk_05.png",
          "/talks/talk_06.jpeg",
          "/talks/talk_07.jpg",
          "/talks/talk_08.jpg",
          "/talks/talk_001.jpeg",
          "/talks/talk_09.jpg",
          "/talks/talk_10.png",
          "/talks/talk11.jpg",
          "/talks/talk_12.jpeg",
          "/talks/talk_13.jpeg",
          "/talks/talk_14.png",
];

const Talks = () => {
          return (
                    <section id="talks" className="relative flex w-full scroll-mt-24 justify-center overflow-hidden bg-black/[0.96] antialiased">
                              <div
                                        className={cn(
                                                  "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
                                                  "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
                                        )}
                              />

                              <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />

                              <Backdrop />

                              <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 md:py-24">
                                        <h2 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
                                                  Tech Talks
                                        </h2>
                                        <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
                                                  Conference talks, meetups and sessions I&apos;ve shared along the way.
                                        </p>

                                        <div className="mt-16 grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                                  {TALKS.map((image) => (
                                                            <DirectionAwareHover
                                                                      key={image}
                                                                      imageUrl={image}
                                                                      className="h-52 w-full max-w-xs rounded-2xl border border-white/10 sm:h-72 sm:max-w-none md:h-80 md:w-full"
                                                            />
                                                  ))}
                                        </div>
                              </div>
                    </section>
          );
};

export default Talks;
