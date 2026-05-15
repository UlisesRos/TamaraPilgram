"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitHeading from "./SplitHeading";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  { icon: "◎", title: "Google Meet", body: "Todas las clases son por videollamada. Cómodo, sin instalaciones raras." },
  { icon: "◈", title: "100% Online", body: "Desde donde estés. Solo necesitás internet, ganas y una hoja de papel." },
  { icon: "◐", title: "Material incluido", body: "Según el ritmo: English File (tranquilo) o Empower Second Edition (intensivo)." },
  { icon: "◑", title: "Duración flexible", body: "Clases de 1h, 1h30 o intensivos de 2h30 dos veces por semana." },
];

export default function Structure() {
  const sectionRef   = useRef<HTMLElement>(null);
  const calloutRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section.querySelectorAll(".str-card"),
      { opacity: 0, y: 48 },
      {
        opacity: 1, y: 0, duration: 0.9, stagger: 0.14, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
      }
    );

    gsap.fromTo(
      calloutRef.current,
      { opacity: 0, y: 36 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: calloutRef.current, start: "top 78%", once: true },
      }
    );
  }, []);

  return (
    <section
      id="estructura"
      ref={sectionRef}
      style={{
        backgroundColor: "var(--cream)",
        color:           "var(--black)",
        padding:         "clamp(80px, 12vw, 160px) clamp(24px, 5vw, 72px)",
        overflowX:       "hidden",
      }}
    >
      <p style={{ fontFamily: "var(--font-nav)", fontWeight: 800, fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", opacity: 0.4, marginBottom: "clamp(36px, 5vw, 64px)" }}>
        Estructura
      </p>

      <SplitHeading
        text="Cómo funcionan las clases."
        tag="h2"
        style={{
          fontFamily:    "var(--font-display), 'Helvetica Neue', sans-serif",
          fontWeight:    900,
          fontSize:      "clamp(30px, 6.5vw, 96px)",
          textTransform: "uppercase",
          letterSpacing: "-0.01em",
          lineHeight:    0.92,
          color:         "var(--black)",
          marginBottom:  "clamp(48px, 7vw, 88px)",
        }}
        start="top 76%"
      />

      {/* 4-card grid */}
      <div style={{
        display:             "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
        gap:                 "clamp(1px, 0.15vw, 2px)",
        marginBottom:        "clamp(52px, 8vw, 100px)",
      }}>
        {CARDS.map(({ icon, title, body }) => (
          <div
            key={title}
            className="str-card"
            style={{
              backgroundColor: "var(--black)",
              padding:         "clamp(28px, 3.5vw, 48px)",
              opacity:         0,
            }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "32px", color: "var(--cream-text)", opacity: 0.35, display: "block", marginBottom: "20px" }}>
              {icon}
            </span>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(16px, 2vw, 24px)", textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--cream-text)", marginBottom: "12px" }}>
              {title}
            </h3>
            <p style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.3vw, 17px)", lineHeight: 1.65, color: "var(--cream-text)", opacity: 0.72 }}>
              {body}
            </p>
          </div>
        ))}
      </div>

      {/* Intensive callout */}
      <div
        ref={calloutRef}
        style={{
          backgroundColor: "var(--brown)",
          padding:         "clamp(32px, 5vw, 64px)",
          display:         "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap:             "clamp(24px, 4vw, 52px)",
          alignItems:      "center",
          opacity:         0,
        }}
      >
        <div>
          <p style={{ fontFamily: "var(--font-nav)", fontWeight: 800, fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--cream-text)", opacity: 0.45, marginBottom: "12px" }}>
            Cursos intensivos
          </p>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(24px, 4vw, 56px)", textTransform: "uppercase", letterSpacing: "-0.01em", lineHeight: 0.95, color: "var(--cream-text)" }}>
            Avanzás 2 años en 1.
          </p>
        </div>
        <p style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 400, fontSize: "clamp(15px, 1.6vw, 19px)", lineHeight: 1.7, color: "var(--cream-text)", opacity: 0.8 }}>
          2h30 dos veces por semana. Para los que quieren resultados rápidos y tienen la energía para ponerle.
        </p>
      </div>
    </section>
  );
}
