"use client";

import React from "react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";

interface ViewServicesProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  strength?: number;
  maxDistance?: number;
}

const ViewServices = ({
  children = "View Services",
  onClick,
  className,
  icon,
  strength,
  maxDistance,
}: ViewServicesProps) => {
  return (
    <MagneticButton strength={strength} maxDistance={maxDistance}>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "flex cursor-pointer items-center gap-2 rounded-lg bg-linear-to-b from-blue-500 to-blue-700 px-5 py-2 text-sm font-medium text-white ring-1 ring-white/20 ring-offset-1 ring-offset-blue-500 transition-transform duration-150 ring-inset active:scale-98",
          className
        )}
      >
        {icon}
        <span>{children}</span>
      </button>
    </MagneticButton>
  );
};

export default ViewServices;
