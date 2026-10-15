"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import { useEffect, useState } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: "easeInOut",
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(
                    `dark:text-white text-black opacity-0 hidden`,
                    word.className
                  )}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </motion.div>
    );
  };
  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
        className
      )}
    >
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words,
  prefix,
  typingSpeed = 70,
  deletingSpeed = 40,
  pauseDuration = 1500,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  /** Constant text shown before the cycling phrases (e.g. "I "). */
  prefix?: string;
  /** ms per character while typing. @default 70 */
  typingSpeed?: number;
  /** ms per character while deleting. @default 40 */
  deletingSpeed?: number;
  /** ms to pause once a phrase is fully typed. @default 1500 */
  pauseDuration?: number;
  className?: string;
  cursorClassName?: string;
}) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Longest phrase, used to reserve a constant width so the prefix never shifts.
  const longest = words.reduce(
    (a, b) => (b.text.length > a.length ? b.text : a),
    ""
  );

  useEffect(() => {
    const current = words[index]?.text ?? "";

    // Finished typing the full phrase -> pause, then start deleting.
    if (!isDeleting && text === current) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(timeout);
    }

    // Finished deleting -> advance to the next phrase.
    if (isDeleting && text === "") {
      setIsDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setText((prev) =>
          isDeleting
            ? current.slice(0, prev.length - 1)
            : current.slice(0, prev.length + 1)
        );
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <div
      className={cn(
        "my-6 flex items-center justify-center text-base font-bold whitespace-pre",
        className
      )}
    >
      {prefix && <span className="dark:text-white text-black">{prefix}</span>}
      {/* Reserve the width of the longest phrase so the layout never jumps. */}
      <span className="relative inline-flex">
        <span aria-hidden className="invisible inline-flex">
          {longest}
          <span className="ml-1 inline-block h-[1em] w-[4px]" />
        </span>
        <span className="absolute inset-0 inline-flex items-center">
          <span
            className={cn("dark:text-white text-black", words[index]?.className)}
          >
            {text}
          </span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className={cn(
              "ml-1 inline-block h-[1em] w-[4px] rounded-sm bg-blue-500",
              cursorClassName
            )}
          />
        </span>
      </span>
    </div>
  );
};
