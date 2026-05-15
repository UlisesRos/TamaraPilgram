"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const NAME = "TAMARA PILGRAM";

export default function Preloader({ onComplete }: PreloaderProps) {
  const overlayRef  = useRef<HTMLDivElement>(null);
  const counterRef  = useRef<HTMLSpanElement>(null);
  const nameRef     = useRef<HTMLDivElement>(null);
  const doneRef     = useRef(false);

  const handleComplete = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const overlay  = overlayRef.current;
    const counter  = counterRef.current;
    const name     = nameRef.current;
    if (!overlay || !counter || !name) return;

    const letters = name.querySelectorAll<HTMLSpanElement>(".pl");
    const obj     = { value: 0 };
    const tl      = gsap.timeline({ paused: true });

    /* Phase 1 — counter 0 → 100 */
    tl.to(obj, {
      value: 100,
      duration: 2.2,
      ease: "power1.inOut",
      onUpdate() {
        counter.textContent = String(Math.round(obj.value));
      },
    });

    /* Phase 2 — counter out */
    tl.to(counter, { opacity: 0, y: -28, duration: 0.28, ease: "power2.in" });

    /* Phase 3 — nombre aparece letra por letra con efecto ola/bandera */
    tl.fromTo(
      letters,
      { y: "110%", opacity: 0, rotate: 8 },
      {
        y: "0%",
        opacity: 1,
        rotate: 0,
        duration: 0.55,
        stagger: { each: 0.038, ease: "power2.out" },
        ease: "power3.out",
      }
    );

    /* Phase 4 — nombre flota hacia arriba y se achica */
    tl.to(
      name,
      {
        y: "-44vh",
        scale: 0.22,
        transformOrigin: "50% 50%",
        duration: 0.95,
        ease: "power3.inOut",
      },
      "+=0.45"
    );

    /* Phase 5 — overlay se desvanece mientras el nombre sube */
    tl.to(
      overlay,
      {
        opacity: 0,
        duration: 0.55,
        ease: "power2.inOut",
        onComplete: handleComplete,
      },
      "-=0.5"
    );

    tl.play();
    return () => { tl.kill(); };
  }, [handleComplete]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position:        "fixed",
        inset:           0,
        zIndex:          999,
        backgroundColor: "var(--black)",
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        pointerEvents:   "none",
        overflow:        "hidden",
      }}
    >
      {/* Contador */}
      <span
        ref={counterRef}
        style={{
          position:      "absolute",
          fontFamily:    "var(--font-nav), 'Helvetica Neue', sans-serif",
          fontWeight:    800,
          fontSize:      "clamp(80px, 20vw, 260px)",
          color:         "var(--cream-text)",
          letterSpacing: "-0.04em",
          lineHeight:    1,
          userSelect:    "none",
        }}
      >
        0
      </span>

      {/* Nombre — cada letra tiene su propio wrapper con overflow:hidden para el efecto ola */}
      <div
        ref={nameRef}
        style={{
          position: "absolute",
          display:  "flex",
          flexWrap: "nowrap",
          maxWidth: "92vw",
          gap:      0,
          padding:  "0.05em 0",
        }}
      >
        {NAME.split("").map((char, i) => (
          <span
            key={i}
            style={{
              display:    "inline-block",
              overflow:   "hidden",
              lineHeight: 1.15,
            }}
          >
            <span
              className="pl"
              style={{
                display:       "inline-block",
                fontFamily:    "var(--font-display), 'Helvetica Neue', sans-serif",
                fontWeight:    900,
                fontSize:      "clamp(28px, 7.5vw, 100px)",
                color:         "var(--cream-text)",
                letterSpacing: char === " " ? "0.22em" : "0.04em",
                textTransform: "uppercase",
                lineHeight:    1,
                userSelect:    "none",
                minWidth:      char === " " ? "0.32em" : undefined,
              }}
            >
              {char === " " ? " " : char}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
