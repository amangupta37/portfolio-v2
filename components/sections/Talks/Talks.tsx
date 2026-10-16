import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";
import Backdrop from "@/components/common/Backdrop/Backdrop";

const Talks = () => {
          return (
                    <section className="relative flex min-h-screen w-full justify-center overflow-hidden bg-black/[0.96] antialiased">
                              <div
                                        className={cn(
                                                  "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
                                                  "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
                                        )}
                              />


                              <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />

                              <Backdrop />
                              <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-24 md:pt-32">
                                        <h2 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
                                                  Talks
                                        </h2>
                                        <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
                                                  Conference talks, meetups and sessions I&apos;ve shared along the way.
                                        </p>
                              </div>
                    </section>
          );
};

export default Talks;
