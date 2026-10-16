import { Vortex } from "@/components/ui/vortex";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import Backdrop from "@/components/common/Backdrop/Backdrop";
import { Timeline as TimelineUI } from "@/components/ui/timeline";
import SparklesTitle from "@/components/common/SparklesTitle/SparklesTitle";

const Bullet = ({ children }: { children: React.ReactNode }) => (
          <div className="mb-2 flex items-center gap-2 text-xs text-neutral-300 md:text-sm">
                    {children}
          </div>
);

const data = [
          {
                    title: "2024",
                    content: (
                              <div>
                                        <p className="mb-6 text-sm font-normal text-neutral-200 md:text-base">
                                                  Joined <span className="font-semibold text-white">Flipkart</span> as a
                                                  Frontend Engineer-2 — architecting scalable frontend systems and
                                                  high-performance interfaces for products used by millions.
                                        </p>
                                        <Bullet>✅ Building AI-powered development workflows</Bullet>
                                        <Bullet>✅ Speaking at React Delhi on frontend + AI</Bullet>
                                        <Bullet>✅ Publishing technical blogs on Medium</Bullet>
                              </div>
                    ),
          },
          {
                    title: "2022 — 2024",
                    content: (
                              <div>
                                        <p className="mb-6 text-sm font-normal text-neutral-200 md:text-base">
                                                  Frontend Engineer at{" "}
                                                  <span className="font-semibold text-white">Expedia Group</span> —
                                                  building performant, accessible web experiences and scaling design
                                                  systems across teams.
                                        </p>
                                        <Bullet>✅ Shipped high-traffic, user-facing features</Bullet>
                                        <Bullet>✅ Improved performance & accessibility standards</Bullet>
                              </div>
                    ),
          },
          {
                    title: "2020 — 2022",
                    content: (
                              <div>
                                        <p className="mb-6 text-sm font-normal text-neutral-200 md:text-base">
                                                  Software Engineer at{" "}
                                                  <span className="font-semibold text-white">Publicis Sapient</span> —
                                                  delivering enterprise-grade web applications and laying the foundation
                                                  for a modern frontend career.
                                        </p>
                                        <Bullet>✅ Delivered enterprise web applications</Bullet>
                                        <Bullet>✅ Established strong frontend fundamentals</Bullet>
                              </div>
                    ),
          },
          {
                    title: "Milestones",
                    content: (
                              <div>
                                        <p className="mb-6 text-sm font-normal text-neutral-200 md:text-base">
                                                  7+ offers cracked at leading tech companies along the way.
                                        </p>
                                        <Bullet>✅ Flipkart</Bullet>
                                        <Bullet>✅ Paytm</Bullet>
                                        <Bullet>✅ Expedia Group</Bullet>
                                        <Bullet>✅ KPMG</Bullet>
                                        <Bullet>✅ Publicis Sapient</Bullet>
                                        <Bullet>✅ Guardian Life</Bullet>
                                        <Bullet>✅ Simpplr</Bullet>
                              </div>
                    ),
          },
];

const Timeline = () => {
          return (
                    <Vortex
                              backgroundColor="black"
                              containerClassName="w-full"
                              className="relative w-full overflow-clip"
                    >
                              <Backdrop />
                              <StarsBackground />
                              <ShootingStars />
                              <BackgroundRippleEffect />


                              <div className="relative z-10">
                                        <TimelineUI
                                                  data={data}
                                                  title="My Journey"
                                                  description="A timeline of my journey as a frontend engineer so far."
                                                  className="bg-transparent"
                                        />
                              </div>
                    </Vortex>
          );
};

export default Timeline;
