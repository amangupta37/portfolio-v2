"use client";

import React from "react";
import { NoiseBackground } from "@/components/ui/noise-background";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  containerClassName?: string;
  /** Icon rendered before the label. */
  icon?: React.ReactNode;
  disabled?: boolean;
  gradientColors?: string[];
}

const Button = ({
  children,
  onClick,
  type = "button",
  className,
  containerClassName,
  icon,
  disabled = false,
  gradientColors = [
    "rgb(255, 100, 150)",
    "rgb(100, 150, 255)",
    "rgb(255, 200, 100)",
  ],
}: ButtonProps) => {
  return (
    <NoiseBackground
      containerClassName={cn("mx-auto w-fit rounded-full p-2", containerClassName)}
      gradientColors={gradientColors}
    >
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "flex h-full w-full cursor-pointer items-center gap-2 rounded-full bg-linear-to-r from-neutral-100 via-neutral-100 to-white px-3 py-1.5 text-sm text-black shadow-[0px_2px_0px_0px_var(--color-neutral-50)_inset,0px_0.5px_1px_0px_var(--color-neutral-400)] transition-all duration-100 active:scale-98 md:px-4 md:py-2 md:text-base dark:from-black dark:via-black dark:to-neutral-900 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--color-neutral-950)_inset,0px_1px_0px_0px_var(--color-neutral-800)]",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        {icon}
        <span>{children}</span>
      </button>
    </NoiseBackground>
  );
};

export default Button;
