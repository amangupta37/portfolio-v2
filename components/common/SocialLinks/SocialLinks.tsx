/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { NoiseBackground } from "@/components/ui/noise-background";

interface SocialLink {
  href: string;
  title: string;
  icon: string;
  alt: string;
}

const links: SocialLink[] = [
  {
    href: "https://www.linkedin.com/in/amangupta37",
    title: "LinkedIn",
    icon: "https://skillicons.dev/icons?i=linkedin",
    alt: "LinkedIn",
  },
  {
    href: "https://x.com/amangupta_jsx",
    title: "Twitter / X",
    icon: "https://skillicons.dev/icons?i=twitter",
    alt: "Twitter",
  },
  {
    href: "https://medium.com/@amangupta-me",
    title: "Medium",
    icon: "/assets/icon-medium.svg",
    alt: "Medium",
  },
  {
    href: "https://dev.to/amangupta",
    title: "dev.to",
    icon: "https://skillicons.dev/icons?i=devto",
    alt: "dev.to",
  },
  {
    href: "mailto:amangupta6121998@gmail.com",
    title: "Email",
    icon: "https://skillicons.dev/icons?i=gmail",
    alt: "Email",
  },
  {
    href: "https://instagram.com/amangupta.sde",
    title: "Instagram",
    icon: "https://skillicons.dev/icons?i=instagram",
    alt: "Instagram",
  },
  {
    href: "https://github.com/amangupta37",
    title: "GitHub",
    icon: "https://skillicons.dev/icons?i=github",
    alt: "GitHub",
  },
];

interface SocialLinksProps {
  className?: string;
  size?: number;
}

const SocialLinks = ({ className, size = 44 }: SocialLinksProps) => {
  return (
    <nav
      aria-label="Social links"
      className={cn(
        "flex flex-wrap items-center justify-center gap-2 sm:gap-3",
        className
      )}
    >
      {links.map((link) => (
        <a
          key={link.title}
          href={link.href}
          title={link.title}
          target={link.href.startsWith("http") ? "_blank" : undefined}
          rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="transition-transform duration-200 hover:-translate-y-1"
        >
          <NoiseBackground
          >
            <img
              src={link.icon}
              width={size}
              height={size}
              alt={link.alt}
              className="h-8 w-8 rounded-lg sm:h-11 sm:w-11"
            />
          </NoiseBackground>
        </a>
      ))}
    </nav>
  );
};

export default SocialLinks;
