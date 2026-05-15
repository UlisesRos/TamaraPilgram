"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MedicalEnglish() {
  const sectionRef  = useRef<HTMLElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const modalRef    = useRef<HTMLDivElement>(null);
  const [open, setOpen]   = useState(false);
  const [sent, setSent]   = useState(false);
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");

  /* ── Entrada al scroll ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.from(section.querySelectorAll(".me-reveal"), {
      y: 44, opacity: 0, duration: 1, stagger: 0.14, ease: "power3.out",
      scrollTrigger: { trigger: section, start: "top 78%", once: true },
    });
  }, []);

  /* ── Animación del modal ── */
  useEffect(() => {
    const overlay = overlayRef.current;
    const modal   = modalRef.current;
    if (!overlay || !modal) return;

    if (open) {
      gsap.set(overlay, { display: "flex" });
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(modal, { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "power3.out" });
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(overlay, {
        opacity: 0, duration: 0.25, ease: "power2.in",
        onComplete: () => gsap.set(overlay, { display: "none" }),
      });
      document.body.style.overflow = "";
    }
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (contact.trim().length < 4) {
      setError("Ingresá un email o WhatsApp válido.");
      return;
    }
    setError("");
    setSent(true);
    setTimeout(() => setOpen(false), 2200);
  }

  return (
    <>
      {/* ── Sección ── */}
      <section
        ref={sectionRef}
        id="medical-english"
        style={{
          backgroundColor: "var(--cream)",
          color:           "var(--brown)",
          padding:         "clamp(80px, 12vw, 160px) clamp(24px, 5vw, 72px)",
          textAlign:       "center",
          position:        "relative",
          overflow:        "hidden",
          display:         "flex",
          flexDirection:   "column",
          alignItems:      "center",
          gap:             "clamp(20px, 3vw, 32px)",
        }}
      >
        {/* Palabra decorativa de fondo */}
        <span
          aria-hidden
          style={{
            position:      "absolute",
            top:           "50%",
            left:          "50%",
            transform:     "translate(-50%, -50%)",
            fontFamily:    "var(--font-display)",
            fontWeight:    900,
            fontSize:      "clamp(80px, 22vw, 260px)",
            color:         "rgba(52,28,9,0.06)",
            whiteSpace:    "nowrap",
            letterSpacing: "-0.02em",
            lineHeight:    1,
            userSelect:    "none",
            pointerEvents: "none",
            textTransform: "uppercase",
          }}
        >
          Medical
        </span>

        {/* Badge "En desarrollo" */}
        <span
          className="me-reveal"
          style={{
            display:       "inline-flex",
            alignItems:    "center",
            gap:           "8px",
            fontFamily:    "var(--font-nav)",
            fontWeight:    700,
            fontSize:      "9px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color:         "var(--brown)",
            border:        "1px solid rgba(52,28,9,0.3)",
            borderRadius:  "100px",
            padding:       "6px 16px",
            position:      "relative",
            zIndex:        1,
          }}
        >
          <span style={{
            width: "6px", height: "6px", borderRadius: "50%",
            backgroundColor: "#4ade80",
            animation: "pulse-dot 2s ease-in-out infinite",
            display: "inline-block",
            flexShrink: 0,
          }} />
          En desarrollo
        </span>

        {/* Ícono */}
        <p
          className="me-reveal"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize:   "clamp(36px, 6vw, 72px)",
            color:      "var(--brown)",
            opacity:    0.6,
            position:   "relative",
            zIndex:     1,
            lineHeight: 1,
          }}
        >
          ✚
        </p>

        {/* Título */}
        <h2
          className="me-reveal"
          style={{
            fontFamily:    "var(--font-display), 'Helvetica Neue', sans-serif",
            fontWeight:    900,
            fontSize:      "clamp(36px, 9vw, 130px)",
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
            lineHeight:    0.92,
            color:         "var(--brown)",
            position:      "relative",
            zIndex:        1,
          }}
        >
          Medical English.<br />
          <span style={{ opacity: 0.45, fontSize: "0.55em", fontWeight: 400, letterSpacing: "0.02em" }}>
            Próximamente.
          </span>
        </h2>

        {/* Descripción */}
        <p
          className="me-reveal"
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontWeight: 400,
            fontSize:   "clamp(15px, 1.6vw, 19px)",
            lineHeight: 1.7,
            color:      "var(--brown)",
            opacity:    0.65,
            maxWidth:   "520px",
            position:   "relative",
            zIndex:     1,
          }}
        >
          Inglés especializado para médicos, enfermeras, dentistas y veterinarios.
          Preparación para el examen{" "}
          <strong style={{ color: "var(--brown)", opacity: 1, fontWeight: 700 }}>OET</strong>
          {" "}(Occupational English Test) — el estándar internacional para validar el título en el exterior.
        </p>

        {/* CTA */}
        <button
          className="me-reveal"
          onClick={() => { setOpen(true); setSent(false); setContact(""); setError(""); }}
          style={{
            fontFamily:     "var(--font-nav)",
            fontWeight:     800,
            fontSize:       "11px",
            letterSpacing:  "0.22em",
            textTransform:  "uppercase",
            color:          "var(--cream)",
            backgroundColor:"var(--brown)",
            border:         "none",
            padding:        "clamp(12px, 1.6vw, 16px) clamp(28px, 3.5vw, 48px)",
            borderRadius:   "2px",
            cursor:         "pointer",
            position:       "relative",
            zIndex:         1,
            transition:     "opacity 0.2s",
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.82")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          Avisame cuando esté disponible →
        </button>
      </section>

      {/* ── Modal ── */}
      <div
        ref={overlayRef}
        onClick={() => setOpen(false)}
        style={{
          position:        "fixed",
          inset:           0,
          zIndex:          500,
          backgroundColor: "rgba(9,9,9,0.82)",
          backdropFilter:  "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          display:         "none",
          alignItems:      "center",
          justifyContent:  "center",
          padding:         "24px",
        }}
      >
        <div
          ref={modalRef}
          onClick={e => e.stopPropagation()}
          style={{
            backgroundColor: "var(--cream)",
            borderRadius:    "16px",
            padding:         "clamp(28px, 4vw, 44px)",
            maxWidth:        "400px",
            width:           "100%",
            display:         "flex",
            flexDirection:   "column",
            gap:             "16px",
          }}
        >
          {sent ? (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(22px, 4vw, 32px)", textTransform: "uppercase", color: "var(--black)", lineHeight: 1.1 }}>
                ¡Listo!<br />
                <span style={{ fontWeight: 400, fontSize: "0.6em", opacity: 0.55 }}>Te aviso cuando esté.</span>
              </p>
            </div>
          ) : (
            <>
              {/* Header modal */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ fontFamily: "var(--font-nav)", fontWeight: 800, fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--black)", opacity: 0.4, marginBottom: "6px" }}>
                    Medical English
                  </p>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(20px, 3vw, 28px)", textTransform: "uppercase", color: "var(--black)", lineHeight: 1 }}>
                    Avisame cuando esté listo.
                  </h3>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-nav)", fontSize: "14px", color: "var(--black)", opacity: 0.4, padding: "4px", lineHeight: 1 }}
                >
                  ✕
                </button>
              </div>

              <p style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "clamp(14px, 1.4vw, 16px)", color: "var(--black)", opacity: 0.6, lineHeight: 1.6 }}>
                Dejame tu email o WhatsApp y te escribo cuando Medical English esté disponible.
              </p>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input
                  value={contact}
                  onChange={e => setContact(e.target.value)}
                  placeholder="Email o WhatsApp"
                  style={{
                    width:           "100%",
                    border:          "1px solid rgba(9,9,9,0.2)",
                    borderRadius:    "6px",
                    padding:         "12px 14px",
                    fontFamily:      "var(--font-body), sans-serif",
                    fontSize:        "15px",
                    color:           "var(--black)",
                    backgroundColor: "transparent",
                    outline:         "none",
                    transition:      "border-color 0.2s",
                  }}
                  onFocus={e => ((e.target as HTMLElement).style.borderColor = "rgba(9,9,9,0.6)")}
                  onBlur={e  => ((e.target as HTMLElement).style.borderColor = "rgba(9,9,9,0.2)")}
                />
                {error && (
                  <p style={{ fontFamily: "var(--font-nav)", fontSize: "10px", color: "#dc2626", letterSpacing: "0.1em" }}>
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  style={{
                    fontFamily:      "var(--font-nav)",
                    fontWeight:      800,
                    fontSize:        "10px",
                    letterSpacing:   "0.22em",
                    textTransform:   "uppercase",
                    color:           "var(--cream-text)",
                    backgroundColor: "var(--black)",
                    border:          "none",
                    padding:         "13px 24px",
                    borderRadius:    "4px",
                    cursor:          "pointer",
                    transition:      "opacity 0.2s",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                >
                  Avisame →
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Keyframe del punto pulsante */}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.75); }
        }
      `}</style>
    </>
  );
}
