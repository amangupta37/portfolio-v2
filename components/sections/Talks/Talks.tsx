import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";
import Backdrop from "@/components/common/Backdrop/Backdrop";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";

interface Talk {
          title: string;
          meta: string;
          /** Photo from the talk. Local files under `public/` or an allow-listed remote host. */
          image: string;
}

// TODO: swap these placeholder photos for your own (e.g. "/talks/react-india.jpg").
const TALKS: Talk[] = [
          {
                    title: "From SDLC to ADLC",
                    meta: "Frontend Conf · 2025",
                    image:
                              "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop",
          },
          {
                    title: "Micro-frontends at scale",
                    meta: "React Bangalore · 2025",
                    image:
                              "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1600&auto=format&fit=crop",
          },
          {
                    title: "AI workflows for frontend",
                    meta: "Engineering Summit · 2024",
                    image:
                              "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1600&auto=format&fit=crop",
          },
          {
                    title: "Lighthouse 37 → 97",
                    meta: "JSConf meetup · 2024",
                    image:
                              "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=1600&auto=format&fit=crop",
          },
          {
                    title: "Cracking frontend interviews",
                    meta: "Community AMA · 2023",
                    image:
                              "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1600&auto=format&fit=crop",
          },
          {
                    title: "Real-time UIs with WebSockets",
                    meta: "DevFest · 2023",
                    image:
                              "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=1600&auto=format&fit=crop",
          },
];

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

                              <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-24 pb-24 md:pt-32">
                                        <h2 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
                                                  Tech Talks
                                        </h2>
                                        <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
                                                  Conference talks, meetups and sessions I&apos;ve shared along the way.
                                        </p>

                                        <div className="mt-16 grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                                  {TALKS.map((talk) => (
                                                            <DirectionAwareHover
                                                                      key={talk.title}
                                                                      imageUrl={talk.image}
                                                                      className="h-72 w-full rounded-2xl border border-white/10 md:h-80 md:w-full"
                                                            >
                                                                      <p className="text-xl font-bold">{talk.title}</p>
                                                                      <p className="text-sm font-normal text-neutral-200">{talk.meta}</p>
                                                            </DirectionAwareHover>
                                                  ))}
                                        </div>
                              </div>
                    </section>
          );
};

export default Talks;
