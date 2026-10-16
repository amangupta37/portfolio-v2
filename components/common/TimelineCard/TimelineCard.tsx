"use client";
import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export interface TimelineCardProps {
  role: string;
  company: string;
  /** Short badge text, e.g. exact dates. */
  badge: string;
  summary: string;
  highlights: string[];
  stack?: string[];
  /** Path to a square company logo (e.g. `/logos/acme.jpg`). Takes precedence over `icon`. */
  logo?: string;
  /** Fallback glyph when no `logo` is provided. */
  icon?: React.ReactNode;
  /** 0-based position in the timeline, used for the HUD counter. */
  index: number;
  total: number;
  /** Marks the role you're currently in. */
  current?: boolean;
  className?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

const Corner = ({ className }: { className: string }) => (
  <span
    className={cn(
      "pointer-events-none absolute h-3 w-3 border-sky-400/70 transition-colors duration-300 group-hover:border-sky-300",
      className,
    )}
  />
);

const TimelineCard = ({
  role,
  company,
  badge,
  summary,
  highlights,
  stack,
  logo,
  icon,
  index,
  total,
  current = false,
  className,
}: TimelineCardProps) => {
  const companyName = company.split(" · ")[0];
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/60 p-4 backdrop-blur-md transition-colors duration-300 hover:border-sky-500/40 sm:p-5 md:p-7",
        className,
      )}
    >
      {/* Fine grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_top_left,black_30%,transparent_80%)]" />

      {/* Cursor spotlight */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(320px_circle_at_var(--x,50%)_var(--y,50%),rgba(56,189,248,0.16),transparent_65%)]" />

      {/* Top hairline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/70 to-transparent" />

      {/* HUD corners */}
      <Corner className="top-2 left-2 border-t border-l" />
      <Corner className="top-2 right-2 border-t border-r" />
      <Corner className="bottom-2 left-2 border-b border-l" />
      <Corner className="right-2 bottom-2 border-r border-b" />

      <div className="relative">
        {/* Header */}
        <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-start md:justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-sky-400/20 bg-sky-400/5 text-sky-300 shadow-[inset_0_0_18px_rgba(56,189,248,0.12)] md:h-11 md:w-11">
              {logo ? (
                <Image
                  src={logo}
                  alt={`${companyName} logo`}
                  width={88}
                  height={88}
                  className="h-full w-full object-cover"
                />
              ) : (
                icon
              )}
            </span>
            <div>
              <h4 className="text-base font-semibold tracking-tight text-white md:text-lg">
                {role}
              </h4>
              <p className="text-sm text-neutral-400">{company}</p>
            </div>
          </div>

          <div className="flex flex-row-reverse items-center justify-end gap-3 md:flex-col md:items-end md:gap-1.5">
            <span className="font-mono text-[10px] tracking-[0.3em] text-neutral-500 uppercase">
              {pad(index + 1)} / {pad(total)}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] whitespace-nowrap text-neutral-300">
              {badge}
            </span>
          </div>
        </div>

        {current && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Currently here
          </div>
        )}

        <p className="mt-4 text-sm leading-relaxed text-neutral-300 md:text-base">
          {summary}
        </p>

        <ul className="mt-4 space-y-2">
          {highlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-neutral-300"
            >
              <IconCircleCheckFilled className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {stack && stack.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-black/50 px-2 py-1 font-mono text-[11px] text-neutral-300 transition-colors duration-300 hover:border-sky-400/50 hover:text-sky-200"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TimelineCard;
