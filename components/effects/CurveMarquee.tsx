"use client";

import { useMemo } from "react";

/* ── geometry helpers ─────────────────────────────────────────────── */

type Point = { x: number; y: number };
type Cubic = { p0: Point; p1: Point; p2: Point; p3: Point };
type Segment = { c1: Point; c2: Point; end: Point };
type PathState = { start: Point; segments: Segment[] };

const round = (n: number) => Math.round(n * 1000) / 1000;
const rp = (p: Point): Point => ({ x: round(p.x), y: round(p.y) });
const lerp = (a: Point, b: Point, t: number): Point => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
});

/* ── original Bézier segments ─────────────────────────────────────── */

const ORIGINAL_SEGMENTS: Cubic[] = [
  {
    p0: { x: 0.597656, y: 50.924805 },
    p1: { x: 17.4612, y: 143.2965 },
    p2: { x: 97.8522, y: 293.141 },
    p3: { x: 284.508, y: 353.548 },
  },
  {
    p0: { x: 284.508, y: 353.548 },
    p1: { x: 440.828, y: 399.056 },
    p2: { x: 583.839, y: 294.067 },
    p3: { x: 500.618, y: 184.7492 },
  },
  {
    p0: { x: 500.618, y: 184.7492 },
    p1: { x: 417.397, y: 75.4309 },
    p2: { x: 238.217, y: 282.098 },
    p3: { x: 499.258, y: 441.668 },
  },
  {
    p0: { x: 499.258, y: 441.668 },
    p1: { x: 551.913, y: 477.802 },
    p2: { x: 817.468, y: 561.26 },
    p3: { x: 1046.43, y: 565.235 },
  },
];

const SPLITS_PER_SEGMENT = 2;

function splitCubic(b: Cubic, t: number): { left: Cubic; right: Cubic } {
  const a1 = lerp(b.p0, b.p1, t);
  const a2 = lerp(b.p1, b.p2, t);
  const a3 = lerp(b.p2, b.p3, t);
  const b1 = lerp(a1, a2, t);
  const b2 = lerp(a2, a3, t);
  const mid = lerp(b1, b2, t);
  return {
    left: { p0: b.p0, p1: a1, p2: b1, p3: mid },
    right: { p0: mid, p1: b2, p2: a3, p3: b.p3 },
  };
}

function subCubic(b: Cubic, t0: number, t1: number): Cubic {
  const right = splitCubic(b, t0).right;
  const t = (t1 - t0) / (1 - t0);
  return splitCubic(right, t).left;
}

/* ── build the default path once ──────────────────────────────────── */

const DEFAULT_PATH: PathState = {
  start: rp(ORIGINAL_SEGMENTS[0].p0),
  segments: ORIGINAL_SEGMENTS.flatMap((cubic) => {
    const segs: Segment[] = [];
    for (let i = 0; i < SPLITS_PER_SEGMENT; i++) {
      const sub = subCubic(
        cubic,
        i / SPLITS_PER_SEGMENT,
        (i + 1) / SPLITS_PER_SEGMENT,
      );
      segs.push({ c1: rp(sub.p1), c2: rp(sub.p2), end: rp(sub.p3) });
    }
    return segs;
  }),
};

function toPathD({ start, segments }: PathState): string {
  let d = `M${round(start.x)} ${round(start.y)}`;
  for (const s of segments) {
    d += `C${round(s.c1.x)} ${round(s.c1.y)} ${round(s.c2.x)} ${round(s.c2.y)} ${round(s.end.x)} ${round(s.end.y)}`;
  }
  return d;
}

/* ── marquee text ─────────────────────────────────────────────────── */

const MARQUEE_TEXT =
  "Umm, hope your week has started well…I was talking to Cheyene earlier but reception was really bad and I think their going to handle the first part of the project, but I\u2019m not totally sure. Also, I told the team the the new timeline should be ready by Friday, although it\u2019s probably going to slip. There\u2019s been a lot of back and forth and honestly the the whole thing\u2019s been kind of chaotic, like nobody really knows what\u2019s going on so can you check in with them and see if the notes from yesterday\u2019s meeting were sent out, or if they\u2019re still waiting. I think Cheyene mentioned it but didn\u2019t confirm, and now I\u2019m a little lost.";

const VIEW_W = 1048;
const VIEW_H = 594;

/* ── component ────────────────────────────────────────────────────── */

export interface CurveMarqueeProps {
  /** Marquee speed — higher is faster (default 25) */
  speed?: number;
  /** Font size in SVG user‑units (default 15) */
  fontSize?: number;
  /** Text opacity 0–1 (default 0.15) */
  textOpacity?: number;
  /** Fill colour of the marquee text (default neutral‑400) */
  textColor?: string;
  /** Stroke colour of the curve (default transparent) */
  strokeColor?: string;
  /** Extra className on the wrapper div */
  className?: string;
}

export default function CurveMarquee({
  speed = 25,
  fontSize = 15,
  textOpacity = 0.15,
  textColor = "#a3a3a3",
  strokeColor = "transparent",
  className = "",
}: CurveMarqueeProps) {
  const d = useMemo(() => toPathD(DEFAULT_PATH), []);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        className="h-full w-full"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path id="curve-marquee-path" fill="transparent" stroke={strokeColor} d={d} />

        <text x="0" style={{ fontSize }}>
          <textPath
            href="#curve-marquee-path"
            className="font-normal [baseline-shift:-20%]"
            style={{ fill: textColor, opacity: textOpacity }}
          >
            {MARQUEE_TEXT}
          </textPath>
          <animate
            attributeName="x"
            dur={`${65 - speed}s`}
            values="-2000;0"
            repeatCount="indefinite"
          />
        </text>
      </svg>
    </div>
  );
}
