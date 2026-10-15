import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { cn } from "@/lib/utils";

interface SparklesTitleProps {
  /** The heading text (or any node). */
  title: React.ReactNode;
  className?: string;
  titleClassName?: string;
  /** Background color behind the sparkles (should match the section bg). */
  maskColor?: string;
  particleColor?: string;
  particleDensity?: number;
}

const SparklesTitle = ({
  title,
  className,
  titleClassName,
  maskColor = "bg-neutral-950",
  particleColor = "#FFFFFF",
  particleDensity = 1200,
}: SparklesTitleProps) => {
  return (
    <div className={cn("flex w-full flex-col items-center text-center", className)}>
      <div className="flex w-fit flex-col items-center px-40">
        <h2
          className={cn(
            "text-center text-3xl font-bold text-white md:text-5xl",
            titleClassName
          )}
        >
          {title}
        </h2>

        {/* Sparkles underline */}
        <div className="relative mt-4 h-24 w-full">
          <div className="absolute left-1/2 top-0 h-[2px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
          <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          <div className="absolute left-1/2 top-0 h-[5px] w-1/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
          <div className="absolute left-1/2 top-0 h-px w-1/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />

          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={particleDensity}
            className="h-full w-full"
            particleColor={particleColor}
          />

          <div
            className={cn(
              "absolute inset-0 h-full w-full [mask-image:radial-gradient(50%_100%_at_top,transparent_20%,white)]",
              maskColor
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SparklesTitle;
