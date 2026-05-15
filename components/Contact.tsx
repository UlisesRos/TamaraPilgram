"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitHeading from "./SplitHeading";

gsap.registerPlugin(ScrollTrigger);

const LEVELS = [
  "No sé cuál es mi nivel",
  "Beginners",
  "Elementary",
  "Pre-Intermediate",
  "Intermediate",
  "Upper Intermediate",
  "Preparación FIRST",
];

const WA_NUMBER = "+5493416637601";

export default function Contact() {
  const [form, setForm]     = useState({ name: "", phone: "", level: "" });
  const [sent, setSent]     = useState(false);
  const sectionRef           = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.fromTo(
      section.querySelectorAll(".ct-reveal"),
      { opacity: 0, y: 44 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.16, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
      }
    );
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hola Tamara! Soy ${form.name}. Mi nivel es: ${form.level || "no sé cuál"}. Mi WhatsApp: ${form.phone}`
    );
    window.open(`https://wa.me/${WA_NUMBER.replace(/\D/g, "")}?text=${msg}`, "_blank");
    setSent(true);
  }

  const inputStyle: React.CSSProperties = {
    width:           "100%",
    backgroundColor: "transparent",
    border:          "none",
    borderBottom:    "1px solid rgba(238,233,209,0.25)",
    color:           "var(--cream-text)",
    fontFamily:      "var(--font-body), sans-serif",
    fontWeight:      400,
    
    fontSize:        "clamp(15px, 1.6vw, 19px)",
    padding:         "14px 0",
    outline:         "none",
    transition:      "border-color 0.2s",
  };

  return (
    <section
      id="contacto"
      data-dark
      ref={sectionRef}
      style={{
        backgroundColor: "var(--brown)",
        color:           "var(--cream-text)",
        padding:         "clamp(80px, 12vw, 160px) clamp(24px, 5vw, 72px)",
        display:         "flex",
        flexDirection:   "column",
        gap:             "clamp(40px, 6vw, 72px)",
      }}
    >
      <div>
        <p className="ct-reveal" style={{ fontFamily: "var(--font-nav)", fontWeight: 800, fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", opacity: 0, marginBottom: "clamp(20px, 3vw, 36px)", color: "var(--cream-text)" }}>
          Contacto
        </p>

        <div className="ct-reveal" style={{ opacity: 0 }}>
          <SplitHeading
            text="Reservá tu clase gratuita."
            tag="h2"
            style={{
              fontFamily:    "var(--font-display), 'Helvetica Neue', sans-serif",
              fontWeight:    900,
              fontSize:      "clamp(32px, 7vw, 110px)",
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              lineHeight:    0.9,
              color:         "var(--cream-text)",
            }}
            start="top 78%"
          />
        </div>

        <p className="ct-reveal" style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.5vw, 18px)", color: "var(--cream-text)", opacity: 0, marginTop: "clamp(16px, 2vw, 24px)" }}>
          Sin cargo. Sin compromiso. Te escribo en menos de 24 hs.
        </p>
      </div>

      {sent ? (
        <div className="ct-reveal" style={{ opacity: 0 }}>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(20px, 3vw, 36px)", textTransform: "uppercase", color: "var(--cream-text)" }}>
            ¡Perfecto! Te espero en WhatsApp.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "clamp(14px, 1.4vw, 17px)", color: "var(--cream-text)", opacity: 0.65, marginTop: "12px" }}>
            Se abrió WhatsApp con un mensaje listo para enviar.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "clamp(16px, 2.5vw, 28px)", maxWidth: "600px" }}>
          <div className="ct-reveal" style={{ opacity: 0 }}>
            <input
              required
              placeholder="Tu nombre"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              style={inputStyle}
              onFocus={e => ((e.target as HTMLElement).style.borderBottomColor = "rgba(238,233,209,0.7)")}
              onBlur={e  => ((e.target as HTMLElement).style.borderBottomColor = "rgba(238,233,209,0.25)")}
            />
          </div>
          <div className="ct-reveal" style={{ opacity: 0 }}>
            <input
              required
              placeholder="Tu WhatsApp"
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              style={inputStyle}
              onFocus={e => ((e.target as HTMLElement).style.borderBottomColor = "rgba(238,233,209,0.7)")}
              onBlur={e  => ((e.target as HTMLElement).style.borderBottomColor = "rgba(238,233,209,0.25)")}
            />
          </div>
          <div className="ct-reveal" style={{ opacity: 0 }}>
            <select
              value={form.level}
              onChange={e => setForm(f => ({ ...f, level: e.target.value }))}
              style={{ ...inputStyle, appearance: "none" }}
              onFocus={e => ((e.target as HTMLElement).style.borderBottomColor = "rgba(238,233,209,0.7)")}
              onBlur={e  => ((e.target as HTMLElement).style.borderBottomColor = "rgba(238,233,209,0.25)")}
            >
              <option value="" style={{ backgroundColor: "var(--brown)", color: "var(--cream-text)" }}>
                ¿Cuál es tu nivel?
              </option>
              {LEVELS.map(l => (
                <option key={l} value={l} style={{ backgroundColor: "var(--brown)", color: "var(--cream-text)" }}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          <div className="ct-reveal" style={{ opacity: 0 }}>
            <button
              type="submit"
              style={{ fontFamily: "var(--font-nav)", fontWeight: 800, fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--brown)", backgroundColor: "var(--cream-text)", border: "none", padding: "clamp(14px, 1.8vw, 18px) clamp(32px, 4vw, 52px)", cursor: "pointer", borderRadius: "2px", transition: "opacity 0.2s" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              Quiero mi clase gratuita →
            </button>
            <p style={{ fontFamily: "var(--font-nav)", fontWeight: 400, fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--cream-text)", opacity: 0.4, marginTop: "12px" }}>
              Sin cargo · Sin compromiso · Respuesta en menos de 24 hs
            </p>
          </div>
        </form>
      )}
    </section>
  );
}
