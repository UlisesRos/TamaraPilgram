"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hook() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef   = useRef<HTMLParagraphElement>(null);
  const coda       = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      quoteRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
      }
    );
    gsap.fromTo(
      coda.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.35,
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "var(--cream)",
        color:           "var(--brown)",
        padding:         "clamp(80px, 14vw, 180px) clamp(24px, 8vw, 140px)",
        minHeight:       "60vh",
        display:         "flex",
        flexDirection:   "column",
        justifyContent:  "center",
        gap:             "clamp(20px, 3vw, 36px)",
      }}
    >
      <p
        ref={quoteRef}
        style={{
          fontFamily:    "var(--font-body), sans-serif",
          fontWeight:    400,
          
          fontSize:      "clamp(22px, 4.5vw, 64px)",
          lineHeight:    1.25,
          color:         "var(--brown)",
          opacity:       0,
          maxWidth:      "900px",
        }}
      >
        "Años estudiando inglés y todavía no podés sostener una conversación fluida."
      </p>
      <p
        ref={coda}
        style={{
          fontFamily:    "var(--font-display), 'Helvetica Neue', sans-serif",
          fontWeight:    700,
          fontSize:      "clamp(18px, 3vw, 40px)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color:         "var(--brown)",
          opacity:       0,
        }}
      >
        Eso está por cambiar.
      </p>
    </section>
  );
}
