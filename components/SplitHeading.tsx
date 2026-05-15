"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitHeadingProps {
  text: string;
  tag?: "h1" | "h2" | "h3";
  style?: React.CSSProperties;
  wordStyle?: React.CSSProperties;
  /** ScrollTrigger start position, defaults to "top 78%" */
  start?: string;
  /** Extra delay before animation kicks in */
  delay?: number;
}

/**
 * Splits text into words and animates each from alternating sides
 * (even words from left, odd words from right) on scroll entry.
 */
export default function SplitHeading({
  text,
  tag: Tag = "h2",
  style,
  wordStyle,
  start = "top 78%",
  delay = 0,
}: SplitHeadingProps) {
  const wrapRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const wordEls = Array.from(wrap.querySelectorAll<HTMLSpanElement>(".sh-word"));

    wordEls.forEach((el, i) => {
      gsap.fromTo(
        el,
        { x: i % 2 === 0 ? -70 : 70, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          delay: delay + i * 0.11,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrap,
            start,
            once: true,
          },
        }
      );
    });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, [start, delay]);

  const words = text.split(" ");

  return (
    <Tag
      ref={wrapRef}
      style={{
        display:   "flex",
        flexWrap:  "wrap",
        columnGap: "0.3em",
        rowGap:    "0",
        ...style,
      }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="sh-word"
          style={{
            display: "inline-block",
            opacity: 0,
            ...wordStyle,
          }}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}
