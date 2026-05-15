"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitHeading from "./SplitHeading";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: "¿Cómo es una clase típica con Tamara?",
    a: "Arrancamos repasando lo de la clase anterior — puede ser un juego, bingo, adivinanza o speaking. Después trabajamos lo planificado: un reading o ejercicios del libro. Para cerrar, practicamos el tema nuevo con algún juego o speaking para que se fije bien.",
  },
  {
    q: "¿Hay clase de prueba gratuita?",
    a: "Sí. Ofrezco una clase de entrevista sin cargo para evaluar tu nivel y definir tus objetivos juntos. Suelen ser siempre los mismos: 'quiero hablar' o 'quiero entender las películas'. Empezamos de ahí.",
  },
  {
    q: "¿Qué plataforma se usa para las clases?",
    a: "Todas las clases son 100% online a través de Google Meet. No necesitás instalar nada especial.",
  },
  {
    q: "¿Cómo sé cuál es mi nivel?",
    a: "Lo evaluamos juntos en la primera clase gratuita. No necesitás saberlo de antemano.",
  },
  {
    q: "¿Puedo consultar dudas fuera del horario de clase?",
    a: "Sí, los alumnos de clases individuales pueden escribirme por WhatsApp en cualquier momento. Las clases individuales tienen un costo un poco más alto, pero incluyen ese acompañamiento permanente.",
  },
  {
    q: "¿Cuánto dura cada clase?",
    a: "Depende de tu objetivo y disponibilidad. Hay clases de 1 hora, 1h30, o intensivos de 2h30 dos veces por semana. Con el intensivo avanzás el equivalente a 2 años en uno.",
  },
  {
    q: "¿Tamara prepara para el examen FIRST (FCE)?",
    a: "Sí. Preparo exclusivamente para el examen FIRST (FCE). Si estás pensando en otro examen, hablemos igual para ver qué puedo ofrecerte.",
  },
  {
    q: "¿Qué materiales se usan en clase?",
    a: "Para un ritmo más tranquilo uso la línea English File. Para intensivos, Empower Second Edition. En ambos casos el material se complementa con actividades de speaking, juegos y recursos propios.",
  },
];

export default function FAQ() {
  const [open, setOpen]     = useState<number | null>(null);
  const sectionRef           = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.fromTo(
      section.querySelectorAll(".faq-item"),
      { opacity: 0, y: 28 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
      }
    );
  }, []);

  return (
    <section
      id="faq"
      ref={sectionRef}
      style={{
        backgroundColor: "var(--cream)",
        color:           "var(--black)",
        padding:         "clamp(80px, 12vw, 160px) clamp(24px, 5vw, 72px)",
      }}
    >
      <p style={{ fontFamily: "var(--font-nav)", fontWeight: 800, fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", opacity: 0.4, marginBottom: "clamp(36px, 5vw, 64px)" }}>
        Preguntas frecuentes
      </p>

      <SplitHeading
        text="Todo lo que querés saber."
        tag="h2"
        style={{
          fontFamily:    "var(--font-display), 'Helvetica Neue', sans-serif",
          fontWeight:    900,
          fontSize:      "clamp(28px, 6vw, 88px)",
          textTransform: "uppercase",
          letterSpacing: "-0.01em",
          lineHeight:    0.92,
          color:         "var(--black)",
          marginBottom:  "clamp(48px, 7vw, 88px)",
        }}
        start="top 78%"
      />

      <div>
        {FAQS.map(({ q, a }, i) => (
          <div
            key={i}
            className="faq-item"
            style={{
              borderTop: "1px solid rgba(9,9,9,0.12)",
              opacity:   0,
            }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width:         "100%",
                display:       "flex",
                justifyContent: "space-between",
                alignItems:    "center",
                padding:       "clamp(18px, 2.5vw, 28px) 0",
                background:    "none",
                border:        "none",
                cursor:        "pointer",
                textAlign:     "left",
                gap:           "16px",
              }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(14px, 1.7vw, 20px)", textTransform: "uppercase", letterSpacing: "0.02em", color: "var(--black)", lineHeight: 1.2 }}>
                {q}
              </span>
              <span style={{ fontFamily: "var(--font-nav)", fontWeight: 800, fontSize: "18px", color: "var(--black)", flexShrink: 0, transition: "transform 0.3s ease", transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}>
                +
              </span>
            </button>
            <div
              style={{
                maxHeight:  open === i ? "400px" : "0px",
                overflow:   "hidden",
                transition: "max-height 0.4s ease",
              }}
            >
              <p style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.5vw, 18px)", lineHeight: 1.7, color: "var(--black)", opacity: 0.75, paddingBottom: "clamp(18px, 2.5vw, 28px)" }}>
                {a}
              </p>
            </div>
          </div>
        ))}
        <div style={{ borderTop: "1px solid rgba(9,9,9,0.12)" }} />
      </div>
    </section>
  );
}
