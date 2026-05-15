"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FreeTrial() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.fromTo(
      section.querySelectorAll(".ft-reveal"),
      { opacity: 0, y: 44 },
      {
        opacity: 1, y: 0, duration: 1.1, stagger: 0.18, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
      }
    );
  }, []);

  return (
    <section
      data-dark
      ref={sectionRef}
      style={{
        backgroundColor: "var(--brown)",
        color:           "var(--cream-text)",
        padding:         "clamp(80px, 14vw, 180px) clamp(24px, 5vw, 72px)",
        textAlign:       "center",
        display:         "flex",
        flexDirection:   "column",
        alignItems:      "center",
        gap:             "clamp(24px, 3vw, 40px)",
      }}
    >
      <p className="ft-reveal" style={{ fontFamily: "var(--font-nav)", fontWeight: 800, fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--cream-text)", opacity: 0 }}>
        Sin cargo · Sin compromiso
      </p>

      <h2 className="ft-reveal" style={{ fontFamily: "var(--font-display), 'Helvetica Neue', sans-serif", fontWeight: 900, fontSize: "clamp(36px, 9vw, 130px)", textTransform: "uppercase", letterSpacing: "-0.01em", lineHeight: 0.9, color: "var(--cream-text)", opacity: 0 }}>
        Tu primera clase<br />es gratis.
      </h2>

      <p className="ft-reveal" style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 400, fontSize: "clamp(15px, 1.7vw, 20px)", lineHeight: 1.65, color: "var(--cream-text)", opacity: 0, maxWidth: "480px" }}>
        Evaluamos tu nivel juntos y definimos tus objetivos. No hay compromisos ni pagos. Solo una conversación para ver si somos el match perfecto.
      </p>

      <a
        className="ft-reveal"
        href="#contacto"
        style={{ fontFamily: "var(--font-nav)", fontWeight: 800, fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--brown)", backgroundColor: "var(--cream-text)", padding: "clamp(14px, 1.8vw, 18px) clamp(32px, 4vw, 52px)", textDecoration: "none", borderRadius: "2px", opacity: 0, transition: "opacity 0.2s" }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
      >
        Reservar ahora →
      </a>

      <p className="ft-reveal" style={{ fontFamily: "var(--font-nav)", fontWeight: 400, fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--cream-text)", opacity: 0 }}>
        Te escribo en menos de 24 hs.
      </p>
    </section>
  );
}
