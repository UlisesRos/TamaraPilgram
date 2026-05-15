"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { href: "#sobre-mi",    label: "Sobre mí" },
  { href: "#metodologia", label: "Metodología" },
  { href: "#niveles",     label: "Niveles" },
  { href: "#contacto",    label: "Contacto" },
];

interface NavigationProps {
  visible: boolean;
}

export default function Navigation({ visible }: NavigationProps) {
  const navRef     = useRef<HTMLElement>(null);
  const logoRef    = useRef<HTMLAnchorElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemsRef   = useRef<HTMLDivElement>(null);
  const line1Ref   = useRef<HTMLSpanElement>(null);
  const line2Ref   = useRef<HTMLSpanElement>(null);
  const line3Ref   = useRef<HTMLSpanElement>(null);
  const hasPlayed  = useRef(false);
  const menuTl     = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen] = useState(false);

  /* ─── Entrada del nav tras el preloader ─── */
  useEffect(() => {
    if (!visible || hasPlayed.current || !navRef.current) return;
    hasPlayed.current = true;
    gsap.set(logoRef.current, { filter: "invert(1)" });
    gsap.fromTo(
      [navRef.current, logoRef.current],
      { y: -28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power2.out", delay: 0.2, stagger: 0 }
    );
  }, [visible]);

  /* ─── Logo color: blanco sobre oscuro, negro sobre claro ─── */
  useEffect(() => {
    if (!visible || !logoRef.current) return;
    const logo = logoRef.current;
    const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

    document.querySelectorAll<HTMLElement>("[data-dark]").forEach((section) => {
      const t = ScrollTrigger.create({
        trigger:     section,
        start:       "top 60px",
        end:         "bottom 60px",
        onEnter:     () => gsap.to(logo, { filter: "invert(0)", duration: 0.35, overwrite: true }),
        onLeave:     () => gsap.to(logo, { filter: "invert(1)", duration: 0.35, overwrite: true }),
        onEnterBack: () => gsap.to(logo, { filter: "invert(0)", duration: 0.35, overwrite: true }),
        onLeaveBack: () => gsap.to(logo, { filter: "invert(1)", duration: 0.35, overwrite: true }),
      });
      triggers.push(t);
    });

    return () => triggers.forEach((t) => t.kill());
  }, [visible]);

  /* ─── Construir timeline del menú mobile (una sola vez) ─── */
  useEffect(() => {
    const overlay = overlayRef.current;
    const items   = itemsRef.current;
    if (!overlay || !items) return;

    const linkEls = items.querySelectorAll(".mob-link");

    menuTl.current = gsap.timeline({ paused: true })
      /* 1. Mostrar overlay */
      .set(overlay, { display: "flex" })
      /* 2. Cortina que baja desde arriba */
      .fromTo(
        overlay,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.6, ease: "power3.inOut" }
      )
      /* 3. Links suben staggered desde abajo */
      .fromTo(
        linkEls,
        { y: 64, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.52, stagger: 0.09, ease: "power3.out" },
        "-=0.25"
      );

    return () => { menuTl.current?.kill(); };
  }, []);

  /* ─── Abrir / cerrar ─── */
  useEffect(() => {
    const tl = menuTl.current;
    if (!tl) return;

    if (open) {
      tl.play();
      document.body.style.overflow = "hidden";
      /* Hamburguesa → X */
      gsap.to(line1Ref.current, { rotate: 45,  y: 7, duration: 0.32, ease: "power2.inOut" });
      gsap.to(line2Ref.current, { scaleX: 0, opacity: 0, duration: 0.18 });
      gsap.to(line3Ref.current, { rotate: -45, y: -7, duration: 0.32, ease: "power2.inOut" });
    } else {
      tl.reverse();
      document.body.style.overflow = "";
      /* X → Hamburguesa */
      gsap.to(line1Ref.current, { rotate: 0, y: 0, duration: 0.32, ease: "power2.inOut" });
      gsap.to(line2Ref.current, { scaleX: 1, opacity: 1, duration: 0.28, delay: 0.08 });
      gsap.to(line3Ref.current, { rotate: 0, y: 0, duration: 0.32, ease: "power2.inOut" });
    }
  }, [open]);

  const handleToggle    = useCallback(() => setOpen(p => !p), []);
  const handleLinkClick = useCallback(() => setOpen(false), []);

  return (
    <>
      {/* ─── Barra de navegación fija ─── */}
      <nav
        ref={navRef}
        style={{
          position:       "fixed",
          top:            0,
          left:           0,
          right:          0,
          zIndex:         200,
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "center",
          padding:        "clamp(16px, 2.4vw, 28px) clamp(20px, 4.5vw, 72px)",
          opacity:        0,
          mixBlendMode:   "difference",
          pointerEvents:  visible ? "auto" : "none",
        }}
      >
        {/* Espacio reservado para que los links queden a la derecha */}
        <div style={{ width: "clamp(80px, 12vw, 160px)" }} />

        {/* Links desktop */}
        <div
          className="nav-desktop"
          style={{
            display:    "flex",
            alignItems: "center",
            gap:        "clamp(20px, 3vw, 48px)",
          }}
        >
          <ul style={{ display: "flex", gap: "clamp(16px, 2.6vw, 40px)", listStyle: "none", margin: 0, padding: 0 }}>
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  style={{
                    fontFamily:     "var(--font-nav), 'Helvetica Neue', sans-serif",
                    fontWeight:     700,
                    fontSize:       "10px",
                    letterSpacing:  "0.2em",
                    textTransform:  "uppercase",
                    color:          "var(--cream)",
                    textDecoration: "none",
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contacto"
            style={{
              fontFamily:      "var(--font-nav), 'Helvetica Neue', sans-serif",
              fontWeight:      800,
              fontSize:        "10px",
              letterSpacing:   "0.2em",
              textTransform:   "uppercase",
              color:           "var(--black)",
              backgroundColor: "var(--cream)",
              padding:         "8px 18px",
              borderRadius:    "2px",
              textDecoration:  "none",
              whiteSpace:      "nowrap",
            }}
          >
            Reservar clase →
          </a>
        </div>

        {/* Hamburguesa (mobile) */}
        <button
          className="nav-hamburger"
          onClick={handleToggle}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          style={{
            display:         "none", /* CSS lo muestra en mobile */
            background:      "none",
            border:          "none",
            cursor:          "pointer",
            padding:         "4px",
            flexDirection:   "column",
            justifyContent:  "center",
            gap:             "6px",
          }}
        >
          <span ref={line1Ref} style={{ display: "block", width: "22px", height: "2px", backgroundColor: "var(--cream)", transformOrigin: "center" }} />
          <span ref={line2Ref} style={{ display: "block", width: "22px", height: "2px", backgroundColor: "var(--cream)", transformOrigin: "center" }} />
          <span ref={line3Ref} style={{ display: "block", width: "22px", height: "2px", backgroundColor: "var(--cream)", transformOrigin: "center" }} />
        </button>
      </nav>

      {/* ─── Overlay menú mobile ─── */}
      <div
        ref={overlayRef}
        style={{
          position:        "fixed",
          inset:           0,
          zIndex:          199,
          backgroundColor: "var(--black)",
          display:         "none", /* GSAP lo activa */
          flexDirection:   "column",
          alignItems:      "center",
          justifyContent:  "center",
          gap:             "clamp(40px, 8vw, 80px)",
          padding:         "0 clamp(20px, 6vw, 64px)",
          overflowX:       "hidden",
        }}
      >
        {/* Links grandes + CTA */}
        <div
          ref={itemsRef}
          style={{
            display:        "flex",
            flexDirection:  "column",
            alignItems:     "center",
            gap:            "clamp(4px, 2vw, 16px)",
          }}
        >
          {LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="mob-link"
              onClick={handleLinkClick}
              style={{
                fontFamily:     "var(--font-display), 'Helvetica Neue', sans-serif",
                fontWeight:     900,
                fontSize:       "clamp(26px, 7.5vw, 82px)",
                textTransform:  "uppercase",
                letterSpacing:  "-0.01em",
                lineHeight:     1.05,
                color:          "var(--cream-text)",
                textDecoration: "none",
                opacity:        0,
              }}
            >
              {label}
            </a>
          ))}

          {/* CTA */}
          <a
            href="#contacto"
            className="mob-link"
            onClick={handleLinkClick}
            style={{
              marginTop:       "clamp(20px, 4vw, 40px)",
              fontFamily:      "var(--font-nav), 'Helvetica Neue', sans-serif",
              fontWeight:      800,
              fontSize:        "11px",
              letterSpacing:   "0.22em",
              textTransform:   "uppercase",
              color:           "var(--black)",
              backgroundColor: "var(--cream-text)",
              padding:         "14px 36px",
              borderRadius:    "2px",
              textDecoration:  "none",
              opacity:         0,
            }}
          >
            Reservar clase →
          </a>
        </div>

        {/* Tagline discreta */}
        <p
          style={{
            position:      "absolute",
            bottom:        "clamp(24px, 4vw, 40px)",
            fontFamily:    "var(--font-nav)",
            fontWeight:    400,
            fontSize:      "9px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color:         "var(--cream-text)",
            opacity:       0.3,
          }}
        >
          Rosario · Clases online
        </p>
      </div>

      {/* ─── Logo firma (fuera del blend mode del nav) ─── */}
      <a
        ref={logoRef}
        href="#inicio"
        aria-label="Inicio"
        style={{
          position:      "fixed",
          top:           "clamp(10px, 1.8vw, 20px)",
          left:          "clamp(20px, 4.5vw, 72px)",
          zIndex:        201,
          opacity:       0,       /* GSAP lo anima junto al nav */
          pointerEvents: visible ? "auto" : "none",
          display:       "block",
          lineHeight:    0,
        }}
      >
        <img
          src="/images/logo.png"
          alt="Tamara Pilgram"
          style={{
            height:  "clamp(40px, 5.5vw, 68px)",
            width:   "auto",
            display: "block",
          }}
        />
      </a>

      {/* ─── Media query: desktop vs mobile ─── */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop   { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-desktop   { display: flex !important; }
          .nav-hamburger { display: none !important; }
        }
      `}</style>
    </>
  );
}
