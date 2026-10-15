import { Vortex } from "@/components/ui/vortex";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import Backdrop from "@/components/common/Backdrop/Backdrop";
import { ChromaticImage } from "@/components/ui/chromatic-image";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { SquigglyText } from "@/components/ui/squiggly-text";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { LinkPreview } from "@/components/ui/link-preview";
import SocialLinks from "@/components/common/SocialLinks/SocialLinks";
import Button from "@/components/common/Button/Button";
import { IconPhone, IconBriefcase } from "@tabler/icons-react";
import ViewServices from "@/components/common/ViewServices/ViewServices";

const Hero = () => {
  return (
    <>
      <Vortex
        backgroundColor="black"
        containerClassName="min-h-screen w-full"
        className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-16 md:px-10"
      >
        <Backdrop />
        <StarsBackground />
        <ShootingStars />
        <BackgroundRippleEffect />

        <div className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-5 text-center">
          {/* Profile image (circular) */}
          <div className="relative w-40 rounded-full border border-white/10 p-2 md:w-48">
            <GlowingEffect
              spread={40}
              glow
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={2}
            />
            <ChromaticImage
              src="/MyProfile.png"
              alt="Aman Gupta"
              className="relative aspect-square w-full rounded-full outline-1 -outline-offset-1 outline-white/10"
            />
          </div>

          {/* Text content */}
          <h1 className="text-lg font-bold text-white sm:text-xl md:text-5xl">
            <span className="inline-block origin-[70%_70%] animate-wave">
              👋🏻
            </span>{" "}
            I&apos;m{" "}
            <SquigglyText scale={[6, 9]} animateOnHover className="text-amber-400">
              Aman Gupta
            </SquigglyText>
          </h1>

          <h2 className="text-lg text-white/80 sm:text-2xl md:text-4xl">
            Frontend Engineer-2 at{" "}
            <LinkPreview
              url="https://www.flipkart.com"
              className="font-bold text-white"
            >
              Flipkart
            </LinkPreview>
          </h2>
          <TypewriterEffectSmooth
            prefix="I "
            words={[
              { text: "architect scalable frontend system for web.", className: "text-blue-500" },
              { text: "engineer high-performance users interface.", className: "text-blue-500" },
              { text: "build web applications with AI workflows.", className: "text-blue-500" },
              { text: "orchestrate's AI agents to build frontend.", className: "text-blue-500" },
            ]}
            className="my-0 text-sm leading-tight text-white/80 sm:text-xl md:text-[36px]"
          />
          <SocialLinks className="mt-2" />

          <div className="mt-6 flex flex-col items-center gap-4 sm:mt-8 sm:flex-row sm:gap-8">
            <ViewServices
              icon={<IconBriefcase className="h-5 w-5" stroke={1.5} />}
              className="px-4 py-2 text-sm font-normal md:px-5 md:py-3 md:text-base"
            >
              My Services
            </ViewServices>
            <Button icon={<IconPhone className="h-6 w-6" stroke={1} />}>
              Setup 1:1 Call
            </Button>

          </div>
        </div>
      </Vortex>
    </>
  );
};

export default Hero;
