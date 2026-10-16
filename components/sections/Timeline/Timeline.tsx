import TimelineCard from "@/components/common/TimelineCard/TimelineCard";
import { Vortex } from "@/components/ui/vortex";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import Backdrop from "@/components/common/Backdrop/Backdrop";
import { Timeline as TimelineUI, type TimelineEntry } from "@/components/ui/timeline";

interface JourneyEntry {
          /** Big label shown on the rail (year / period). */
          period: string;
          role: string;
          company: string;
          /** Short badge text shown on the card, e.g. exact dates. */
          badge: string;
          summary: string;
          highlights: string[];
          stack?: string[];
          /** Square company logo under `public/`. */
          logo: string;
          /** Marks the role you're currently in. */
          current?: boolean;
          /** Consecutive roles sharing a group are drawn as a sub-branch. */
          group?: string;
          groupLabel?: string;
}

const LOGOS = {
          simpplr: "/logos/simpplr.jpg",
          antino: "/logos/antino.jpg",
          ebeta: "/logos/ebeta.jpg",
} as const;

const journey: JourneyEntry[] = [
          {
                    period: "Present",
                    role: "Software Engineer II",
                    company: "Simpplr · Full-time · Remote",
                    badge: "Nov 2025 — Present",
                    summary:
                              "Building scalable, micro-frontend based employee experience products at Simpplr, with a focus on performance and AI-assisted development workflows.",
                    highlights: [
                              "Working on a Micro Frontend architecture serving a large enterprise user base",
                              "Driving modern JavaScript/TypeScript practices across the frontend",
                    ],
                    stack: ["Micro Frontend", "React", "TypeScript", "JavaScript"],
                    logo: LOGOS.simpplr,
                    current: true,
          },
          {
                    period: "2025",
                    role: "Lead Software Engineer",
                    company: "Antino · Full-time · On-site",
                    badge: "Apr 2025 — Nov 2025",
                    summary:
                              "Led the frontend team in designing and implementing a scalable architecture from scratch, delivering 10+ production-ready projects end-to-end across fintech, healthcare, edtech and real estate.",
                    highlights: [
                              "Improved Lighthouse performance score from 37% to 97% by fixing slow redirects and performance bottlenecks in a Next.js 15 app",
                              "Drove architectural decisions around performance, accessibility and security for a resilient frontend foundation",
                              "Established frontend best practices and coding standards, lifting code coverage by 95%",
                              "Implemented optimized AI development workflows and component reusability, cutting development cycles by 35%",
                              "Mentored junior engineers and led code reviews for architectural consistency and on-time releases",
                    ],
                    stack: [
                              "Next.js 15",
                              "React",
                              "TypeScript",
                              "Redux",
                              "React Query",
                              "Zustand",
                              "AG Grid",
                              "Module Federation",
                              "SCSS",
                    ],
                    logo: LOGOS.antino,
                    group: "antino",
                    groupLabel: "Antino · 4 yrs · 4 roles",
          },
          {
                    period: "2024",
                    role: "Senior Software Engineer",
                    company: "Antino · Full-time · On-site",
                    badge: "Apr 2024 — Apr 2025",
                    summary:
                              "Owned performance, real-time data and security for high-scale client products, from WebSocket pipelines to OWASP-aligned hardening.",
                    highlights: [
                              "Engineered a generic AG Grid table with advanced pagination for massive real-time data streams — 25% faster loads, 10% lower operational cost",
                              "Refactored polling-heavy workflows into event-driven WebSocket pipelines, removing race conditions and redundant requests",
                              "Resolved VAPT-identified critical/high vulnerabilities (XSS, CSRF, insecure token storage, CORS) for PCI-DSS / HIPAA-aligned frontend security",
                              "Batched WebSocket events and minimized re-renders to keep the UI smooth under heavy notification load",
                              "Delivered a multi-role login system that onboarded 10,000+ users across the country with granular roles and permissions",
                    ],
                    stack: ["React", "TypeScript", "AG Grid", "WebSockets", "Redux"],
                    logo: LOGOS.antino,
                    group: "antino",
          },
          {
                    period: "2022",
                    role: "Software Engineer",
                    company: "Antino · Full-time · On-site",
                    badge: "Apr 2022 — Apr 2024",
                    summary:
                              "Built seller-facing analytics, onboarding and SEO-optimized marketing surfaces for a marketplace product.",
                    highlights: [
                              "Built an analytics dashboard tracking 20+ seller stats with Chart.js, lifting purchase conversions by 15%",
                              "Implemented a seller onboarding stepper with Formik & Yup and caching — 30% fewer clicks, 25% higher engagement",
                              "Designed an SSR landing page in Next.js with SEO and Three.js 3D animations, improving rankings and traffic by 20%",
                              "Hardened web security with XSS protection, CSP and Axios interceptors for encrypted API calls",
                    ],
                    stack: [
                              "React",
                              "Next.js",
                              "Redux Toolkit",
                              "RTK Query",
                              "Tailwind CSS",
                              "Formik",
                              "Yup",
                              "Three.js",
                    ],
                    logo: LOGOS.antino,
                    group: "antino",
          },
          {
                    period: "Dec 2021",
                    role: "Frontend Engineer Intern",
                    company: "Antino · Internship · Remote",
                    badge: "Dec 2021 — Apr 2022",
                    summary:
                              "Contributed reusable UI components and a verified-user onboarding flow to the core product.",
                    highlights: [
                              "Built reusable generic components for the UI library, improving consistency across the product",
                              "Implemented KYC via Digilocker SDK integration to onboard verified users",
                    ],
                    stack: ["React", "Redux", "Redux Saga", "Axios", "SCSS"],
                    logo: LOGOS.antino,
                    group: "antino",
          },
          {
                    period: "Sep 2021",
                    role: "Junior Software Engineer Intern",
                    company: "e-Beta Innovations LLP · Internship · Remote",
                    badge: "Sep 2021 — Dec 2021",
                    summary:
                              "Where it all started — building responsive, interactive React interfaces and learning production-grade frontend engineering.",
                    highlights: [
                              "Built high-performance, responsive UIs with React functional components",
                              "REST API integration and state management with React Query, Hooks, Context API and React Table",
                              "Shipped language translation with React i18n",
                    ],
                    stack: ["React", "React Query", "Context API", "React Table", "React i18n"],
                    logo: LOGOS.ebeta,
          },
];

const data: TimelineEntry[] = journey.map(({ period, group, groupLabel, ...card }, index) => ({
          title: period,
          group,
          groupLabel,
          content: (
                    <TimelineCard
                              key={card.badge}
                              {...card}
                              index={index}
                              total={journey.length}
                    />
          ),
}));

const Timeline = () => {
          return (
                    <Vortex
                              backgroundColor="black"
                              containerClassName="w-full"
                              className="relative w-full overflow-clip px-2 py-10 md:px-10 md:py-16"
                    >
                              <Backdrop />
                              <StarsBackground />
                              <ShootingStars />
                              <BackgroundRippleEffect />

                              <div className="relative z-10">
                                        <TimelineUI
                                                  data={data}
                                                  title="Changelog from my journey"
                                                  description="I've been building for the web for 4+ years. Here's a timeline of my journey."
                                                  className="bg-transparent"
                                        />
                              </div>
                    </Vortex>
          );
};

export default Timeline;
