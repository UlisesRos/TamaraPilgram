"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitHeading from "./SplitHeading";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    num:   "01",
    title: "Comunicación Real",
    body:  "Hablás desde el primer día. Sin traducciones, sin memorización de reglas. El foco está siempre en expresarte.",
  },
  {
    num:   "02",
    title: "Práctica Intensa",
    body:  "Ejercicios diseñados para tu vida: tu trabajo, tus objetivos, los temas que te importan.",
  },
  {
    num:   "03",
    title: "Progreso Visible",
    body:  "Seguimiento semanal de tu avance. Sabés exactamente dónde estabas y adónde vas.",
  },
];

export default function Methodology() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section.querySelectorAll(".pillar"),
      { opacity: 0, y: 56 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.18, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 70%", once: true },
      }
    );
  }, []);

  return (
    <section
      id="metodologia"
      ref={sectionRef}
      style={{
        backgroundColor: "var(--cream)",
        color:           "var(--brown)",
        padding:         "clamp(80px, 12vw, 160px) clamp(24px, 5vw, 72px)",
        minHeight:       "100vh",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "clamp(52px, 8vw, 100px)" }}>
        <p style={{ fontFamily: "var(--font-nav)", fontWeight: 800, fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", opacity: 0.4 }}>
          Metodología
        </p>
        <p style={{ fontFamily: "var(--font-nav)", fontWeight: 800, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", opacity: 0.4 }}>
          3 pilares
        </p>
      </div>

      <SplitHeading
        text="Cómo trabajamos"
        tag="h2"
        style={{
          fontFamily:    "var(--font-display), 'Helvetica Neue', sans-serif",
          fontWeight:    900,
          fontSize:      "clamp(36px, 7.5vw, 110px)",
          textTransform: "uppercase",
          letterSpacing: "-0.01em",
          lineHeight:    0.9,
          color:         "var(--brown)",
          marginBottom:  "clamp(52px, 8vw, 100px)",
        }}
        start="top 76%"
      />

      <div style={{ display: "flex", flexDirection: "column" }}>
        {PILLARS.map(({ num, title, body }, i) => (
          <div key={i} className="pillar" style={{ opacity: 0 }}>
            <span className="pillar-num">
              {num}
            </span>
            <h3 className="pillar-title">
              {title}
            </h3>
            <p className="pillar-body">
              {body}
            </p>
          </div>
        ))}
        <div style={{ borderTop: "1px solid rgba(52,28,9,0.12)" }} />
      </div>

      <style>{`
        .pillar {
          display: grid;
          grid-template-columns: 60px 1fr 1fr;
          grid-template-areas: "num title body";
          gap: clamp(16px, 3vw, 40px);
          padding: clamp(24px, 3.5vw, 44px) 0;
          border-top: 1px solid rgba(52,28,9,0.12);
          align-items: start;
        }
        .pillar-num {
          grid-area: num;
          font-family: var(--font-nav);
          font-weight: 800;
          font-size: 10px;
          letter-spacing: 0.15em;
          opacity: 0.35;
          padding-top: 4px;
        }
        .pillar-title {
          grid-area: title;
          font-family: var(--font-display), 'Helvetica Neue', sans-serif;
          font-weight: 700;
          font-size: clamp(20px, 3.2vw, 44px);
          text-transform: uppercase;
          letter-spacing: -0.01em;
          line-height: 1;
          color: var(--brown);
        }
        .pillar-body {
          grid-area: body;
          font-family: var(--font-body), sans-serif;
          font-weight: 400;
          font-size: clamp(14px, 1.4vw, 18px);
          line-height: 1.65;
          color: var(--brown);
          opacity: 0.72;
        }

        /* Mobile: número + título en fila, body debajo del título */
        @media (max-width: 768px) {
          .pillar {
            grid-template-columns: 44px 1fr;
            grid-template-areas:
              "num   title"
              ".     body";
            gap: 10px clamp(12px, 3vw, 24px);
          }
        }
      `}</style>
    </section>
  );
}
