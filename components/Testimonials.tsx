"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitHeading from "./SplitHeading";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote: "Empecé sin saber absolutamente nada y ahora puedo mantener una conversación básica. Las clases son muy dinámicas, nunca me aburrí.",
    name:  "M. González",
    level: "Elementary",
    stars: 5,
  },
  {
    quote: "Lo que más me gusta es que cada clase es diferente. No es el típico 'abrir el libro en la página 5'. Se nota que Tamara prepara todo para cada alumno.",
    name:  "L. Rodríguez",
    level: "Intermediate",
    stars: 5,
  },
  {
    quote: "Después de años con otros profes sin avanzar, en 3 meses con Tamara logré lo que no pude en 3 años. La recomiendo sin dudarlo.",
    name:  "F. Martínez",
    level: "Pre-Intermediate",
    stars: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section.querySelectorAll(".testi-card"),
      { opacity: 0, y: 52 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "var(--cream)",
        color:           "var(--black)",
        padding:         "clamp(80px, 12vw, 160px) clamp(24px, 5vw, 72px)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "clamp(48px, 7vw, 88px)" }}>
        <p style={{ fontFamily: "var(--font-nav)", fontWeight: 800, fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", opacity: 0.4 }}>
          Testimonios
        </p>
        <p style={{ fontFamily: "var(--font-nav)", fontWeight: 800, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", opacity: 0.4 }}>
          Lo que dicen
        </p>
      </div>

      <SplitHeading
        text="Lo que dicen los alumnos."
        tag="h2"
        style={{
          fontFamily:    "var(--font-display), 'Helvetica Neue', sans-serif",
          fontWeight:    900,
          fontSize:      "clamp(28px, 6vw, 88px)",
          textTransform: "uppercase",
          letterSpacing: "-0.01em",
          lineHeight:    0.92,
          color:         "var(--black)",
          marginBottom:  "clamp(52px, 8vw, 100px)",
        }}
        start="top 76%"
      />

      <div style={{
        display:             "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap:                 "clamp(20px, 2.5vw, 32px)",
      }}>
        {TESTIMONIALS.map(({ quote, name, level, stars }, i) => (
          <div
            key={i}
            className="testi-card"
            style={{
              borderTop:  "1px solid rgba(9,9,9,0.12)",
              paddingTop: "clamp(24px, 3vw, 40px)",
              opacity:    0,
            }}
          >
            <div style={{ display: "flex", gap: "3px", marginBottom: "16px" }}>
              {Array.from({ length: stars }).map((_, j) => (
                <span key={j} style={{ color: "var(--brown)", fontSize: "12px" }}>★</span>
              ))}
            </div>
            <span style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "72px", lineHeight: 0.7, color: "var(--black)", opacity: 0.1, display: "block", marginBottom: "16px" }}>
              "
            </span>
            <p style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 400, fontSize: "clamp(15px, 1.7vw, 20px)", lineHeight: 1.65, color: "var(--black)", marginBottom: "clamp(20px, 2.5vw, 32px)" }}>
              {quote}
            </p>
            <p style={{ fontFamily: "var(--font-nav)", fontWeight: 800, fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--black)" }}>
              {name}
            </p>
            <p style={{ fontFamily: "var(--font-nav)", fontWeight: 400, fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--black)", opacity: 0.4, marginTop: "4px" }}>
              {level}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
