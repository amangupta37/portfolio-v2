"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";

export interface SlideData {
  title: string;
  button: string;
  src: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const { src, button, title } = slide;

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="relative z-10 mx-[4vmin] flex h-[70vmin] w-[70vmin] flex-1 flex-col items-center justify-center text-center text-white opacity-100 transition-all duration-300 ease-in-out"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute top-0 left-0 h-full w-full overflow-hidden rounded-[1%] bg-[#1D1F2F] transition-all duration-150 ease-out"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          <div
            className="absolute top-[-10%] left-[-10%] h-[120%] w-[120%] transition-opacity duration-700 ease-in-out"
            style={{ opacity: current === index ? 1 : 0.5 }}
          >
            <Image
              className="object-cover"
              alt={title}
              src={src}
              fill
              sizes="70vmin"
            />
          </div>
          {current === index && (
            <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />
          )}
        </div>

        <article
          className={`relative p-[4vmin] transition-opacity duration-1000 ease-in-out ${current === index ? "visible opacity-100" : "invisible opacity-0"
            }`}
        >
          <h2 className="relative text-lg font-semibold md:text-2xl lg:text-4xl">
            {title}
          </h2>
          <div className="flex justify-center">
            <button className="mx-auto mt-6 flex h-12 w-fit items-center justify-center rounded-2xl border border-transparent bg-white px-4 py-2 text-xs text-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200 hover:shadow-lg sm:text-sm">
              {button}
            </button>
          </div>
        </article>
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={`mx-2 flex h-10 w-10 items-center justify-center rounded-full border-3 border-transparent bg-neutral-200 transition duration-200 hover:-translate-y-0.5 focus:border-[#6D64F7] focus:outline-none active:translate-y-0.5 dark:bg-neutral-800 ${type === "previous" ? "rotate-180" : ""
        }`}
      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
    </button>
  );
};

interface CarouselProps {
  slides: SlideData[];
}

/** Transition duration (ms) — keep in sync with `duration-1000` below. */
const SLIDE_DURATION = 1000;

const Carousel = ({ slides }: CarouselProps) => {
  const count = slides.length;
  // Append a clone of the first slide so the track can keep moving forward past
  // the last real slide, then silently snap back to the start for an endless loop.
  const displaySlides = count > 1 ? [...slides, slides[0]] : slides;

  const [current, setCurrent] = useState(0);
  const [animate, setAnimate] = useState(true);

  const goTo = (index: number) => {
    setAnimate(true);
    setCurrent(index);
  };

  const handlePreviousClick = () => {
    if (current <= 0) {
      // Jump to the trailing clone (visually identical to slide 0) without
      // animating, then slide left to the real last slide on the next frame.
      setAnimate(false);
      setCurrent(count);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimate(true);
          setCurrent(count - 1);
        }),
      );
      return;
    }
    goTo(current - 1);
  };

  const handleNextClick = () => {
    if (current >= count) return;
    goTo(current + 1);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      goTo(index);
    }
  };

  // When we land on the trailing clone, snap back to the real first slide once
  // the slide-in finishes — with animation off so the reset is invisible.
  useEffect(() => {
    if (current !== count || count <= 1) return;
    const timeout = setTimeout(() => {
      setAnimate(false);
      setCurrent(0);
    }, SLIDE_DURATION);
    return () => clearTimeout(timeout);
  }, [current, count]);

  // Re-enable transitions on the frame after an instant jump.
  useEffect(() => {
    if (animate) return;
    const frame = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(frame);
  }, [animate]);

  // Auto-advance ("crawl") every few seconds, paused while the user hovers.
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || count <= 1) return;
    const interval = setInterval(() => {
      setAnimate(true);
      setCurrent((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, count]);

  const id = useId();

  return (
    <div
      className="relative mx-auto h-[70vmin] w-[70vmin]"
      aria-labelledby={`carousel-heading-${id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ul
        className={`absolute mx-[-4vmin] flex ${animate ? "transition-transform duration-1000 ease-in-out" : ""
          }`}
        style={{
          transform: `translateX(-${current * (100 / displaySlides.length)}%)`,
        }}
      >
        {displaySlides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>

      <div className="absolute top-[calc(100%+1rem)] flex w-full justify-center">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />

        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>
    </div>
  );
};

export default Carousel;
