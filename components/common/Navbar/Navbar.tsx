"use client";

import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  NavbarLogo,
  NavbarButton,
} from "@/components/ui/resizable-navbar";
import { FloatingDockMobile } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";

export const navItems = [
  { name: "About Me", link: "#about" },
  { name: "Skills", link: "#skills" },
  { name: "Recognitions", link: "#recognitions" },
  { name: "Tech Talks", link: "#talks" },
];

export const mobileNavItems = [
  {
    title: "Home",
    icon: <IconHome className="h-full w-full text-neutral-300" />,
    href: "#",
  },
  {
    title: "Products",
    icon: <IconTerminal2 className="h-full w-full text-neutral-300" />,
    href: "#about",
  },
  {
    title: "Components",
    icon: <IconNewSection className="h-full w-full text-neutral-300" />,
    href: "#skills",
  },
  {
    title: "Aceternity UI",
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="https://assets.aceternity.com/logo-dark.png"
        width={20}
        height={20}
        alt="Aceternity Logo"
        className="h-full w-full object-contain"
      />
    ),
    href: "#",
  },
  {
    title: "Changelog",
    icon: <IconExchange className="h-full w-full text-neutral-300" />,
    href: "#timeline-section",
  },
  {
    title: "Twitter",
    icon: <IconBrandX className="h-full w-full text-neutral-300" />,
    href: "https://x.com/amangupta_jsx",
  },
  {
    title: "GitHub",
    icon: <IconBrandGithub className="h-full w-full text-neutral-300" />,
    href: "https://github.com/amangupta37",
  },
];

export const MobileFloatingDock = () => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 block md:hidden">
      <FloatingDockMobile items={mobileNavItems} />
    </div>
  );
};

interface NavbarProps {
  includeMobileDock?: boolean;
}

const Navbar = ({ includeMobileDock = false }: NavbarProps) => {
  return (
    <>
      {/* Desktop Navigation - Hidden on mobile screens */}
      <ResizableNavbar className="hidden md:block">
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="primary">Book a call</NavbarButton>
          </div>
        </NavBody>
      </ResizableNavbar>

      {/* Mobile Navigation - Only included if rendered standalone */}
      {includeMobileDock && <MobileFloatingDock />}
    </>
  );
};

export default Navbar;
