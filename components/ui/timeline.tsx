"use client";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  /**
   * Consecutive entries sharing a `group` are drawn on a sub-branch that forks
   * off the trunk before the first one and merges back after the last one —
   * e.g. internal promotions within a single tenure.
   */
  group?: string;
  /** Small caption shown at the fork (read from the group's first entry). */
  groupLabel?: string;
}

interface TimelineProps {
  data: TimelineEntry[];
  /** Optional heading rendered above the entries. Omit to render none. */
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  /**
   * Distance (px) from the top of the viewport where the active node is
   * pinned while its content scrolls past. Keep in sync with the fixed navbar.
   */
  stickyTop?: number;
}

/** The node is a 40px circle, so its centre sits 20px below the sticky edge. */
const NODE_SIZE = 40;
/** Vertical size of the fork / merge arcs connecting a branch to the trunk. */
const ARC = 40;

/** Piecewise-linear interpolation with clamping. `input` must be increasing. */
const interpolate = (value: number, input: number[], output: number[]) => {
  if (value <= input[0]) return output[0];
  const last = input.length - 1;
  if (value >= input[last]) return output[last];
  let i = 1;
  while (input[i] < value) i++;
  const t = (value - input[i - 1]) / (input[i] - input[i - 1]);
  return output[i - 1] + t * (output[i] - output[i - 1]);
};

const FILL_CLASS =
  "absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-b from-indigo-500 via-blue-500 to-sky-300 shadow-[0_0_12px_2px_rgba(56,189,248,0.6)]";

/** A branch line that fills in step with the trunk as the glow passes it. */
const BranchLine = ({
  fill,
  top,
  height,
}: {
  fill: MotionValue<number>;
  top: number;
  height: number;
}) => {
  const lit = useTransform(fill, (y) =>
    Math.max(0, Math.min(height, y - top)),
  );
  return (
    <div
      style={{ top, height }}
      className="absolute left-[32px] w-[2px] bg-neutral-800 md:left-[64px]"
    >
      <motion.div style={{ height: lit }} className={FILL_CLASS} />
    </div>
  );
};

export const Timeline = ({
  data,
  title,
  description,
  className,
  stickyTop = 160,
}: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Vertical position of every node's centre, relative to `ref`.
  const nodeCenters = useRef<number[]>([]);
  // Piecewise mapping from scroll progress (0–1) to fill height (px).
  const fillRange = useRef<{ input: number[]; output: number[] }>({
    input: [0, 1],
    output: [0, 0],
  });

  const [height, setHeight] = useState(0);
  const [centers, setCenters] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const anchor = stickyTop + NODE_SIZE / 2;

  // Consecutive entries with the same `group` form one branch.
  const groups = useMemo(() => {
    const out: { id: string; label?: string; first: number; last: number }[] =
      [];
    data.forEach((item, i) => {
      if (!item.group) return;
      const prev = out[out.length - 1];
      if (prev && prev.id === item.group && prev.last === i - 1) {
        prev.last = i;
      } else {
        out.push({ id: item.group, label: item.groupLabel, first: i, last: i });
      }
    });
    return out;
  }, [data]);

  // Progress is 0 when the entries' top reaches the anchor line (where nodes
  // pin) and 1 when the entries' bottom reaches the viewport bottom — i.e. as
  // far as the page can actually scroll when this is the last section.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${anchor}px`, "end end"],
  });

  const fill = useTransform(scrollYProgress, (p) =>
    interpolate(p, fillRange.current.input, fillRange.current.output),
  );
  const opacity = useTransform(scrollYProgress, [0, 0.02], [0, 1]);

  const updateActive = useCallback((y: number) => {
    let next = -1;
    nodeCenters.current.forEach((center, i) => {
      if (y >= center - 1) next = i;
    });
    setActiveIndex((prev) => (prev === next ? prev : next));
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const total = el.getBoundingClientRect().height;
      setHeight(total);

      const next = rowRefs.current.map((row) => {
        if (!row) return Number.POSITIVE_INFINITY;
        const paddingTop = parseFloat(getComputedStyle(row).paddingTop) || 0;
        return row.offsetTop + paddingTop + NODE_SIZE / 2;
      });
      nodeCenters.current = next;
      setCenters(next);

      // Scroll distance covered while progress goes 0 → 1. While a node is
      // pinned the anchor line sits exactly `distance * p` px into the entries,
      // so mapping p_i = centre_i / distance → centre_i tracks pinned nodes
      // exactly. Nodes past `distance` can never pin (the page ends first), so
      // the final segment stretches to the full height at progress 1.
      const distance = total - (window.innerHeight - anchor);
      const input = [0];
      const output = [0];
      if (distance > 0) {
        for (const center of next) {
          const p = center / distance;
          if (p > input[input.length - 1] && p < 0.98 && center < total) {
            input.push(p);
            output.push(center);
          }
        }
      }
      input.push(1);
      output.push(total);
      fillRange.current = { input, output };

      updateActive(interpolate(scrollYProgress.get(), input, output));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [anchor, scrollYProgress, updateActive]);

  useMotionValueEvent(fill, "change", updateActive);

  const measured = centers.length === data.length;

  // A branch forks just above its first node and merges back just before the
  // node that follows the group (or the end of the track). Merging there, not
  // at the last node, keeps that node on the branch for as long as it's pinned.
  const mergeAt = useCallback(
    (g: { last: number }) =>
      g.last + 1 < centers.length ? centers[g.last + 1] : height,
    [centers, height],
  );

  // The comet rides the branch (not the trunk) while the glow is between a
  // group's fork and merge. Branch offset from the trunk: 16px / 32px (md).
  const [isMd, setIsMd] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsMd(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  const cometX = useTransform(fill, (y) => {
    if (!measured) return 0;
    const offset = isMd ? 32 : 16;
    for (const g of groups) {
      const first = centers[g.first];
      const merge = mergeAt(g);
      if (y >= first - ARC && y <= merge) {
        // Ease across the arcs so the comet follows the curve.
        if (y < first) return (offset * (y - (first - ARC))) / ARC;
        if (y > merge - ARC) return (offset * (merge - y)) / ARC;
        return offset;
      }
    }
    return 0;
  });

  return (
    <div className={cn("w-full pt-16 font-sans md:px-10 md:pt-24", className)}>
      {(title || description) && (
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20 lg:px-10">
          {title && (
            <h2 className="mb-4 max-w-4xl text-lg text-white md:text-4xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="max-w-sm text-sm text-neutral-300 md:text-base">
              {description}
            </p>
          )}
        </div>
      )}

      <div ref={ref} className="relative mx-auto max-w-7xl pb-20">
        {data.map((item, index) => {
          const isReached = index <= activeIndex;
          const isCurrent = index === activeIndex;
          const onBranch = Boolean(item.group);

          return (
            <div
              key={index}
              ref={(el) => {
                rowRefs.current[index] = el;
              }}
              className="flex justify-start pt-10 md:gap-10 md:pt-32"
            >
              {/* Pinned node + desktop label */}
              <div
                className="sticky z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm"
                style={{ top: stickyTop }}
              >
                <div
                  className={cn(
                    "absolute flex h-10 w-10 items-center justify-center rounded-full bg-black",
                    onBranch ? "left-3 md:left-11" : "-left-1 md:left-3",
                  )}
                >
                  {isCurrent && (
                    <>
                      {/* Spinning conic ring */}
                      <span className="absolute inset-0 animate-spin rounded-full bg-[conic-gradient(from_0deg,transparent_0%,rgba(56,189,248,0.95)_28%,transparent_55%)] [animation-duration:2.4s] [mask:radial-gradient(farthest-side,transparent_calc(100%_-_2px),black_calc(100%_-_2px))]" />
                      <span className="absolute h-6 w-6 animate-ping rounded-full bg-sky-500/30" />
                    </>
                  )}
                  <div
                    className={cn(
                      "relative h-4 w-4 rounded-full border transition-all duration-500",
                      isReached
                        ? "border-sky-200 bg-sky-400 shadow-[0_0_18px_4px_rgba(56,189,248,0.6)]"
                        : "border-neutral-700 bg-neutral-800",
                    )}
                  />
                </div>

                <div
                  className={cn(
                    "hidden md:flex md:flex-col",
                    onBranch ? "md:pl-28" : "md:pl-20",
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-[11px] tracking-[0.35em] uppercase transition-colors duration-500",
                      isReached ? "text-sky-400" : "text-neutral-700",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(data.length).padStart(2, "0")}
                  </span>
                  <h3
                    className={cn(
                      "text-xl font-bold tracking-tight transition-all duration-500 md:text-5xl",
                      isReached
                        ? "bg-gradient-to-r from-white via-sky-100 to-sky-400 bg-clip-text text-transparent"
                        : "text-neutral-600",
                    )}
                  >
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Content + mobile label */}
              <div className="relative w-full pr-0 pl-14 md:pr-4 md:pl-4">
                <div className="mb-4 flex flex-col md:hidden">
                  <span
                    className={cn(
                      "font-mono text-[10px] tracking-[0.35em] uppercase transition-colors duration-500",
                      isReached ? "text-sky-400" : "text-neutral-700",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(data.length).padStart(2, "0")}
                  </span>
                  <h3
                    className={cn(
                      "text-left text-2xl font-bold tracking-tight transition-all duration-500 sm:text-3xl",
                      isReached
                        ? "bg-gradient-to-r from-white via-sky-100 to-sky-400 bg-clip-text text-transparent"
                        : "text-neutral-500",
                    )}
                  >
                    {item.title}
                  </h3>
                </div>
                {item.content}
              </div>
            </div>
          );
        })}

        {/* Trunk */}
        <div
          style={{ height }}
          className="absolute top-0 left-4 w-[2px] overflow-hidden bg-neutral-800 [mask-image:linear-gradient(to_bottom,transparent_0%,black_4%,black_98%,transparent_100%)] md:left-8"
        >
          {/* Soft wide glow behind the fill */}
          <motion.div
            style={{ height: fill, opacity }}
            className="absolute top-0 -left-[3px] w-2 rounded-full bg-sky-500/40 blur-[3px]"
          />
          {/* Progress fill — lit along its whole length, brightest at the tip */}
          <motion.div style={{ height: fill, opacity }} className={FILL_CLASS} />
        </div>

        {/* Sub-branches (e.g. promotions within one tenure) */}
        {measured &&
          groups.map((g) => {
            const first = centers[g.first];
            const merge = mergeAt(g);
            const forkLit = activeIndex >= g.first;
            const mergeLit = activeIndex > g.last;
            const arcBase =
              "absolute left-4 w-[18px] transition-colors duration-500 md:left-8 md:w-[34px]";
            const lit =
              "border-sky-400 drop-shadow-[0_0_6px_rgba(56,189,248,0.6)]";
            const dim = "border-neutral-800";

            return (
              <React.Fragment key={g.id + g.first}>
                {/* Fork: trunk → branch, arriving at the first node */}
                <div
                  style={{ top: first - ARC, height: ARC }}
                  className={cn(
                    arcBase,
                    "rounded-tr-[18px] border-t-2 border-r-2 md:rounded-tr-[34px]",
                    forkLit ? lit : dim,
                  )}
                />
                <BranchLine
                  fill={fill}
                  top={first}
                  height={merge - ARC - first}
                />
                {/* Merge: branch → trunk, just before the next trunk node */}
                <div
                  style={{ top: merge - ARC, height: ARC }}
                  className={cn(
                    arcBase,
                    "rounded-br-[18px] border-r-2 border-b-2 md:rounded-br-[34px]",
                    mergeLit ? lit : dim,
                  )}
                />
                {g.label && (
                  <span
                    style={{ top: first - ARC - 18 }}
                    className={cn(
                      "absolute left-[44px] font-mono text-[10px] tracking-[0.3em] whitespace-nowrap uppercase transition-colors duration-500 md:left-[76px]",
                      forkLit ? "text-sky-400/80" : "text-neutral-600",
                    )}
                  >
                    {g.label}
                  </span>
                )}
              </React.Fragment>
            );
          })}

        {/* Comet tip — outside the clipped track so its glow isn't cut off */}
        <motion.div
          style={{ top: fill, x: cometX, y: "-50%", opacity }}
          className="pointer-events-none absolute left-[11px] h-3 w-3 rounded-full md:left-[27px] bg-sky-300 blur-[1px] shadow-[0_0_16px_6px_rgba(96,165,250,0.7)]"
        />
      </div>
    </div>
  );
};
