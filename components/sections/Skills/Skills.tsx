import Image from "next/image";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const SKILLS: { id: string; name: string }[] = [
          { id: "js", name: "JavaScript" },
          { id: "ts", name: "TypeScript" },
          { id: "react", name: "React" },
          { id: "nextjs", name: "Next.js" },
          { id: "redux", name: "Redux" },
          { id: "threejs", name: "Three.js" },
          { id: "tailwind", name: "Tailwind CSS" },
          { id: "sass", name: "Sass" },
          { id: "styledcomponents", name: "styled-components" },
          { id: "materialui", name: "Material UI" },
          { id: "jest", name: "Jest" },
          { id: "firebase", name: "Firebase" },
          { id: "git", name: "Git" },
          { id: "vite", name: "Vite" },
          { id: "webpack", name: "Webpack" },
          { id: "babel", name: "Babel" },
          { id: "figma", name: "Figma" },
          { id: "postman", name: "Postman" },
];

const iconUrl = (id: string) =>
          `https://skillicons.dev/icons?i=${id}&theme=dark`;

const AI_TOOLS: { label: string; src: string }[] = [
          {
                    label: "Claude Code",
                    src: "https://img.shields.io/badge/Claude%20Code-0d1117?style=flat-square&logo=anthropic&logoColor=D97757",
          },
          {
                    label: "MCP",
                    src: "https://img.shields.io/badge/MCP-0d1117?style=flat-square&logo=anthropic&logoColor=e6edf3",
          },
          {
                    label: "Cursor",
                    src: "https://img.shields.io/badge/Cursor-0d1117?style=flat-square&logo=cursor&logoColor=e6edf3",
          },
          {
                    label: "Codex",
                    src: "https://img.shields.io/badge/Codex-0d1117?style=flat-square&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2U2ZWRmMyIgZD0iTTIyLjI4MiA5LjgyMWE1Ljk4NSA1Ljk4NSAwIDAgMC0uNTE2LTQuOTExIDYuMDQ2IDYuMDQ2IDAgMCAwLTYuNTEtMi45QTYuMDY1IDYuMDY1IDAgMCAwIDQuOTgxIDQuMTgyYTUuOTg1IDUuOTg1IDAgMCAwLTMuOTk4IDIuOSA2LjA0NiA2LjA0NiAwIDAgMCAuNzQzIDcuMDk3IDUuOTggNS45OCAwIDAgMCAuNTE2IDQuOTEgNi4wNTEgNi4wNTEgMCAwIDAgNi41MTUgMi45QTUuOTg1IDUuOTg1IDAgMCAwIDEzLjI2IDI0YTYuMDU2IDYuMDU2IDAgMCAwIDUuNzcyLTQuMjA2IDUuOTg5IDUuOTg5IDAgMCAwIDMuOTk3LTIuOSA2LjA1NiA2LjA1NiAwIDAgMC0uNzQ3LTcuMDczeiIvPjwvc3ZnPg==&logoColor=e6edf3",
          },
          {
                    label: "Antigravity",
                    src: "https://img.shields.io/badge/Antigravity-0d1117?style=flat-square&logo=google&logoColor=4285F4",
          },
          {
                    label: "Snitch",
                    src: "https://img.shields.io/badge/Snitch-0d1117?style=flat-square&logo=shieldsdotio&logoColor=3fb950",
          },
          {
                    label: "GitHub Copilot",
                    src: "https://img.shields.io/badge/GitHub%20Copilot-0d1117?style=flat-square&logo=githubcopilot&logoColor=e6edf3",
          },
          {
                    label: "v0",
                    src: "https://img.shields.io/badge/v0-0d1117?style=flat-square&logo=vercel&logoColor=e6edf3",
          },
          {
                    label: "Gemini",
                    src: "https://img.shields.io/badge/Gemini-0d1117?style=flat-square&logo=googlegemini&logoColor=8E75B2",
          },
          {
                    label: "ChatGPT",
                    src: "https://img.shields.io/badge/ChatGPT-0d1117?style=flat-square&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzEwQTM3RiIgZD0iTTIyLjI4MiA5LjgyMWE1Ljk4NSA1Ljk4NSAwIDAgMC0uNTE2LTQuOTExIDYuMDQ2IDYuMDQ2IDAgMCAwLTYuNTEtMi45QTYuMDY1IDYuMDY1IDAgMCAwIDQuOTgxIDQuMTgyYTUuOTg1IDUuOTg1IDAgMCAwLTMuOTk4IDIuOSA2LjA0NiA2LjA0NiAwIDAgMCAuNzQzIDcuMDk3IDUuOTggNS45OCAwIDAgMCAuNTE2IDQuOTEgNi4wNTEgNi4wNTEgMCAwIDAgNi41MTUgMi45QTUuOTg1IDUuOTg1IDAgMCAwIDEzLjI2IDI0YTYuMDU2IDYuMDU2IDAgMCAwIDUuNzcyLTQuMjA2IDUuOTg5IDUuOTg5IDAgMCAwIDMuOTk3LTIuOSA2LjA1NiA2LjA1NiAwIDAgMC0uNzQ3LTcuMDczeiIvPjwvc3ZnPg==&logoColor=10A37F",
          },
];

const STATE_DATA: { label: string; src: string }[] = [
          {
                    label: "Redux Toolkit",
                    src: "https://img.shields.io/badge/Redux%20Toolkit-0d1117?style=flat-square&logo=redux&logoColor=764ABC",
          },
          {
                    label: "Redux Saga",
                    src: "https://img.shields.io/badge/Redux%20Saga-0d1117?style=flat-square&logo=redux&logoColor=999999",
          },
          {
                    label: "React Query",
                    src: "https://img.shields.io/badge/React%20Query-0d1117?style=flat-square&logo=reactquery&logoColor=FF4154",
          },
          {
                    label: "RTK Query",
                    src: "https://img.shields.io/badge/RTK%20Query-0d1117?style=flat-square&logo=redux&logoColor=58a6ff",
          },
          {
                    label: "Zustand",
                    src: "https://img.shields.io/badge/Zustand-0d1117?style=flat-square&logo=react&logoColor=58a6ff",
          },
          {
                    label: "MobX",
                    src: "https://img.shields.io/badge/MobX-0d1117?style=flat-square&logo=mobx&logoColor=FF9955",
          },
          {
                    label: "Context API",
                    src: "https://img.shields.io/badge/Context%20API-0d1117?style=flat-square&logo=react&logoColor=61DAFB",
          },
          {
                    label: "Axios",
                    src: "https://img.shields.io/badge/Axios-0d1117?style=flat-square&logo=axios&logoColor=5A29E4",
          },
];

const Skills = () => {
          return (
                    <section id="skills" className="relative flex h-full min-h-[40rem] w-full scroll-mt-24 justify-center overflow-hidden bg-black">
                              <DottedGlowBackground
                                        className="pointer-events-none mask-radial-to-90% mask-radial-at-center"
                                        opacity={1}
                                        gap={14}
                                        radius={1.6}
                                        colorLightVar="--color-neutral-500"
                                        glowColorLightVar="--color-neutral-600"
                                        colorDarkVar="--color-neutral-500"
                                        glowColorDarkVar="--color-sky-800"
                                        backgroundOpacity={0}
                                        speedMin={0.3}
                                        speedMax={1.6}
                                        speedScale={1}
                              />

                              <div className="relative z-10 px-4 pt-12 text-center md:pt-16">
                                        <h2 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-4xl font-bold text-transparent md:text-7xl">
                                                  Skills
                                        </h2>
                                        <div className="mx-auto mt-20 flex max-w-5xl flex-wrap items-center justify-center gap-8 md:mt-28 md:gap-12">
                                                  <AnimatedTooltip
                                                            items={SKILLS.map((skill, index) => ({
                                                                      id: index,
                                                                      name: skill.name,
                                                                      content: (
                                                                                <Image
                                                                                          key={skill.id}
                                                                                          src={iconUrl(skill.id)}
                                                                                          alt={skill.name}
                                                                                          width={64}
                                                                                          height={64}
                                                                                          unoptimized
                                                                                          className="h-12 w-12 transition-transform duration-300 group-hover:scale-110 md:h-16 md:w-16"
                                                                                />
                                                                      ),
                                                            }))}
                                                  />
                                        </div>

                                        <h3 className="mt-20 text-sm font-semibold tracking-[0.3em] text-neutral-400 uppercase md:mt-28">
                                                  AI-Native Tooling
                                        </h3>
                                        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-4">
                                                  {AI_TOOLS.map((tool) => (
                                                            <Image
                                                                      key={tool.label}
                                                                      src={tool.src}
                                                                      alt={tool.label}
                                                                      width={120}
                                                                      height={28}
                                                                      unoptimized
                                                                      className="h-7 w-auto transition-transform duration-300 hover:scale-110"
                                                            />
                                                  ))}
                                        </div>

                                        <h3 className="mt-20 text-sm font-semibold tracking-[0.3em] text-neutral-400 uppercase md:mt-28">
                                                  State &amp; Data
                                        </h3>
                                        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-4">
                                                  {STATE_DATA.map((tool) => (
                                                            <Image
                                                                      key={tool.label}
                                                                      src={tool.src}
                                                                      alt={tool.label}
                                                                      width={120}
                                                                      height={28}
                                                                      unoptimized
                                                                      className="h-7 w-auto transition-transform duration-300 hover:scale-110"
                                                            />
                                                  ))}
                                        </div>
                              </div>

                              <br />
                              <br />
                              <br />
                              <br />
                              <br />


                    </section>
          );
};

export default Skills;
