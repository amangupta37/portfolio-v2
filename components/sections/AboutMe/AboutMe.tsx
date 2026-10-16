import { BackgroundBeams } from "@/components/ui/background-beams";
import SparklesTitle from "@/components/common/SparklesTitle/SparklesTitle";
import { Terminal } from "@/components/ui/terminal";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

const AboutMe = () => {
          return (
                    <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-neutral-950 px-6 py-16 antialiased">
                              <SparklesTitle title="About Me" className="relative z-10 mx-auto max-w-6xl" />

                              <BackgroundBeams />

                              <div className="relative z-10 mx-auto mt-8 grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-2 md:gap-32">
                                        {/* Left: text */}
                                        <FollowerPointerCard
                                                  title="Aman Gupta"
                                                  className="w-full h-full text-center md:text-left"
                                        >
                                                  <p className="mx-auto max-w-lg text-lg text-neutral-400 md:mx-0 md:text-3xl">
                                                            I'm a Frontend Engineer with 4+ years of experience building scalable & performant Frontend Systems.
                                                  </p>

                                                  <br />

                                                  <div className="mx-auto flex max-w-lg flex-wrap items-center justify-center gap-x-2 text-lg text-neutral-400 md:mx-0 md:justify-start md:text-3xl">
                                                            Currently focused on agentic AI engineering & the evolution from
                                                            <PointerHighlight
                                                                      rectangleClassName="border-blue-500"
                                                                      pointerClassName="text-blue-500"
                                                            >
                                                                      <span className="relative z-10 px-1 text-white">
                                                                                SDLC to ADLC.
                                                                      </span>
                                                            </PointerHighlight>
                                                  </div>

                                                  <br />
                                                  <p className="mx-auto max-w-lg text-lg text-neutral-400 md:mx-0 md:text-3xl">
                                                            Developed & deploy 10+ AI workflows that automate key stages of the Frontend Development.
                                                  </p>

                                                  <br />
                                                  <div className="mx-auto flex max-w-lg flex-wrap items-center justify-center gap-x-2 text-lg text-neutral-400 md:mx-0 md:justify-start md:text-3xl">
                                                            Cracked 7+ Frontend Interviews of Top Product Based Companies.
                                                  </div>
                                        </FollowerPointerCard>

                                        {/* Right: terminal */}
                                        <div className="w-full">
                                                  <Terminal
                                                            username="Aman-Macbook"
                                                            commands={[
                                                                      "cd frontend",
                                                                      "cd interview-cracked",
                                                                      "cd techlife",
                                                                      "cd ..",
                                                            ]}
                                                            outputs={{
                                                                      0: [
                                                                                "✔ 4+ years of experience.",
                                                                                "✔ Building AI-powered development workflows",
                                                                                "✔ Building performant, scalable web applications",
                                                                      ],
                                                                      1: ["✔ 7+ offers cracked at leading tech companies",
                                                                                "✔ Flipkart",
                                                                                "✔ Paytm",
                                                                                "✔ Expedia Group",
                                                                                "✔ KPMG",
                                                                                "✔ Publicis Sapient",
                                                                                "✔ Guardian Life",
                                                                                "✔ Simpplr",],
                                                                      2: [
                                                                                "✔ Speaker at React Delhi — AI workflows",
                                                                                "✔ Delivering tech talks on frontend engineering",
                                                                                "✔ Publishing technical blogs on Medium",],

                                                                      3: [
                                                                                "✔ connect for interview preparation",
                                                                      ]
                                                            }}
                                                            typingSpeed={45}
                                                            delayBetweenCommands={1000}
                                                  />
                                        </div>
                              </div>
                    </section>
          );
};

export default AboutMe;
