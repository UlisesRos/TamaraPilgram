"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface HeroProps {
  visible: boolean;
}

export default function Hero({ visible }: HeroProps) {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subRef  = useRef<HTMLParagraphElement>(null);
  const ctaRef  = useRef<HTMLDivElement>(null);
  const hasRun  = useRef(false);

  useEffect(() => {
    if (!visible || hasRun.current) return;
    hasRun.current = true;

    const tl = gsap.timeline();
    tl.fromTo(nameRef.current,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }
    )
    .fromTo(
      [subRef.current, ctaRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.14, ease: "power2.out" },
      "-=0.5"
    );
  }, [visible]);

  return (
    <section
      id="inicio"
      style={{
        backgroundColor: "var(--cream)",
        minHeight:        "100vh",
        display:          "flex",
        flexDirection:    "column",
        justifyContent:   "flex-end",
        padding:          "clamp(80px, 8vw, 120px) clamp(24px, 5vw, 72px) clamp(48px, 7vw, 88px)",
        position:         "relative",
      }}
    >
      {/* Nombre principal */}
      <h1
        ref={nameRef}
        style={{
          fontFamily:    "var(--font-display), 'Helvetica Neue', sans-serif",
          fontWeight:    900,
          fontSize:      "clamp(48px, 12.5vw, 190px)",
          textTransform: "uppercase",
          letterSpacing: "-0.01em",
          lineHeight:    0.88,
          color:         "var(--black)",
          opacity:       0,
        }}
      >
        Tamara<br />Pilgram
      </h1>

      {/* Tagline */}
      <p
        ref={subRef}
        style={{
          fontFamily:    "var(--font-body), sans-serif",
          fontWeight:    400,
          
          fontSize:      "clamp(16px, 1.8vw, 22px)",
          color:         "var(--black)",
          marginTop:     "clamp(16px, 2vw, 28px)",
          maxWidth:      "480px",
          lineHeight:    1.5,
          opacity:       0,
        }}
      >
        Aprendé inglés que suena real.<br />
        13 años formando alumnos de todas las edades.
      </p>

      {/* CTAs */}
      <div
        ref={ctaRef}
        style={{
          display:   "flex",
          gap:       "clamp(10px, 1.5vw, 18px)",
          flexWrap:  "wrap",
          marginTop: "clamp(24px, 3vw, 40px)",
          opacity:   0,
        }}
      >
        <a
          href="#contacto"
          style={{
            fontFamily:      "var(--font-nav)",
            fontWeight:      800,
            fontSize:        "11px",
            letterSpacing:   "0.2em",
            textTransform:   "uppercase",
            color:           "var(--cream)",
            backgroundColor: "var(--black)",
            padding:         "clamp(12px, 1.4vw, 16px) clamp(22px, 2.8vw, 36px)",
            textDecoration:  "none",
            borderRadius:    "2px",
            transition:      "opacity 0.2s",
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          Reservar clase gratuita →
        </a>
        <a
          href="#metodologia"
          style={{
            fontFamily:     "var(--font-nav)",
            fontWeight:     800,
            fontSize:       "11px",
            letterSpacing:  "0.2em",
            textTransform:  "uppercase",
            color:          "var(--black)",
            border:         "1px solid rgba(9,9,9,0.3)",
            padding:        "clamp(12px, 1.4vw, 16px) clamp(22px, 2.8vw, 36px)",
            textDecoration: "none",
            borderRadius:   "2px",
            transition:     "border-color 0.2s",
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(9,9,9,0.8)")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(9,9,9,0.3)")}
        >
          Ver metodología
        </a>
      </div>
    </section>
  );
}
