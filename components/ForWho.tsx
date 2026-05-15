"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitHeading from "./SplitHeading";

gsap.registerPlugin(ScrollTrigger);

const PROFILES = [
  {
    icon:  "✦",
    title: "El que nunca arrancó",
    body:  "Creés que el inglés no es para vos. Creés mal. Empezamos desde cero y en tu ritmo.",
    level: "Beginners",
  },
  {
    icon:  "✈",
    title: "El viajero",
    body:  "Querés viajar y comunicarte sin entrar en pánico cuando alguien te habla. Eso tiene solución.",
    level: "Elementary / Pre-Intermediate",
  },
  {
    icon:  "◈",
    title: "El que busca fluidez",
    body:  "Entendés algo, pero hablar con fluidez sigue sintiéndose lejos. Acortamos esa distancia.",
    level: "Intermediate / Upper",
  },
  {
    icon:  "◎",
    title: "El que prepara el FIRST",
    body:  "Necesitás el certificado FCE. Preparación específica para el examen, con foco en lo que realmente evalúan.",
    level: "FIRST (FCE)",
  },
];

export default function ForWho() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section.querySelectorAll(".profile-card"),
      { opacity: 0, y: 52 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.16, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 70%", once: true },
      }
    );
  }, []);

  return (
    <section
      id="niveles"
      ref={sectionRef}
      style={{
        backgroundColor: "var(--cream)",
        color:           "var(--brown)",
        padding:         "clamp(80px, 12vw, 160px) clamp(24px, 5vw, 72px)",
        minHeight:       "100vh",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "clamp(48px, 7vw, 88px)" }}>
        <p style={{ fontFamily: "var(--font-nav)", fontWeight: 800, fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", opacity: 0.4 }}>
          ¿Para quién?
        </p>
        <p style={{ fontFamily: "var(--font-nav)", fontWeight: 800, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", opacity: 0.4 }}>
          4 perfiles
        </p>
      </div>

      <SplitHeading
        text="Alguien como vos."
        tag="h2"
        style={{
          fontFamily:    "var(--font-display), 'Helvetica Neue', sans-serif",
          fontWeight:    900,
          fontSize:      "clamp(36px, 8vw, 120px)",
          textTransform: "uppercase",
          letterSpacing: "-0.01em",
          lineHeight:    0.9,
          color:         "var(--brown)",
          marginBottom:  "clamp(52px, 8vw, 100px)",
        }}
        start="top 76%"
      />

      <div style={{
        display:             "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap:                 "clamp(1px, 0.15vw, 2px)",
      }}>
        {PROFILES.map(({ icon, title, body, level }) => (
          <div
            key={title}
            className="profile-card"
            style={{
              borderTop:   "1px solid rgba(52,28,9,0.15)",
              paddingTop:  "clamp(24px, 3vw, 40px)",
              paddingBottom: "clamp(24px, 3vw, 40px)",
              opacity:     0,
            }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "28px", color: "var(--brown)", opacity: 0.3, display: "block", marginBottom: "20px" }}>
              {icon}
            </span>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(18px, 2.2vw, 28px)", textTransform: "uppercase", letterSpacing: "0.02em", color: "var(--brown)", marginBottom: "12px", lineHeight: 1.1 }}>
              {title}
            </h3>
            <p style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.4vw, 17px)", lineHeight: 1.65, color: "var(--brown)", opacity: 0.72, marginBottom: "20px" }}>
              {body}
            </p>
            <span style={{ fontFamily: "var(--font-nav)", fontWeight: 800, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--brown)", opacity: 0.35, border: "1px solid rgba(52,28,9,0.25)", padding: "4px 10px", borderRadius: "2px" }}>
              {level}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
