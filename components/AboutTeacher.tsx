"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitHeading from "./SplitHeading";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "13+",   label: "años de experiencia" },
  { value: "4–60+", label: "rango de edades" },
  { value: "100%",  label: "online" },
];

/* ─── Card de video/foto — replicando la referencia ─── */
function VideoCard() {
  const cardRef  = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playRef  = useRef<HTMLButtonElement>(null);
  const soundRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    gsap.fromTo(
      card,
      { opacity: 0, scale: 0.93, y: 32 },
      {
        opacity: 1, scale: 1, y: 0,
        duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 80%", once: true },
      }
    );
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const btn   = playRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
          if (btn) btn.textContent = "❚❚ Pause";
        } else {
          video.pause();
          if (btn) btn.textContent = "▶ Play";
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      if (playRef.current) playRef.current.textContent = "❚❚ Pause";
    } else {
      v.pause();
      if (playRef.current) playRef.current.textContent = "▶ Play";
    }
  };

  const handleSound = () => {
    const v = videoRef.current;
    const s = soundRef.current;
    if (!v || !s) return;
    v.muted = !v.muted;
    s.textContent = v.muted ? "Activar sonido" : "Silenciar";
  };

  return (
    <div
      ref={cardRef}
      style={{
        position:        "relative",
        backgroundColor: "#eee9d1",
        borderRadius:    "20px",
        overflow:        "hidden",
        padding:         "clamp(18px, 2.5vw, 28px)",
        display:         "flex",
        flexDirection:   "column",
        justifyContent:  "space-between",
        gap:             "clamp(14px, 2vw, 20px)",
        /* altura determinada por el video — no se fija manualmente */
        /* ancho adaptable: en mobile casi full, en desktop controlado */
        width:           "min(100%, clamp(320px, 48vw, 500px))",
        flex:            "0 0 auto",
        alignSelf:       "flex-start",
        opacity:         0,          /* GSAP lo anima */
        boxShadow:       "0 24px 64px rgba(0,0,0,0.45)",
      }}
    >
      {/* ── Palabra gigante de fondo ── */}
      <span
        aria-hidden="true"
        style={{
          position:      "absolute",
          top:           "44%",
          left:          "50%",
          transform:     "translate(-50%, -50%)",
          fontFamily:    "var(--font-display), sans-serif",
          fontWeight:    900,
          fontSize:      "clamp(80px, 22vw, 200px)",
          color:         "rgba(52,28,9,0.09)",
          whiteSpace:    "nowrap",
          letterSpacing: "-0.02em",
          lineHeight:    1,
          userSelect:    "none",
          pointerEvents: "none",
          textTransform: "uppercase",
          zIndex:        0,
        }}
      >
        TAMARA
      </span>

      {/* ── Tarjeta interior con foto + video ── */}
      <div
        style={{
          position:    "relative",
          zIndex:      1,
          borderRadius:"13px",
          overflow:    "hidden",
          flex:        "0 0 auto",
          width:       "100%",
          aspectRatio: "762 / 1172",
          background:  "linear-gradient(145deg, #d8c9b0 0%, #c2a47e 45%, #9a7752 100%)",
          boxShadow:   "0 10px 36px rgba(0,0,0,0.5)",
        }}
      >
        {/*
          VIDEO: descomentá src y poster cuando tengas los archivos.
          Copiá el video a /public/videos/tamara.mp4
          Copiá la foto de fondo a /public/images/tamara-bg.jpg y ponela en el <img> de abajo.

          Si querés usar solo imagen de fondo sin video, borrá el elemento <video>
          y poné la imagen directamente con: style={{ backgroundImage: 'url(...)' }} en este div.
        */}

        {/* Imagen de fondo (reemplazá el src) */}
        {/* <img
          src="/images/tamara-bg.jpg"
          alt=""
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }}
        /> */}

        {/* Video de Tamara */}
        <video
          ref={videoRef}
          playsInline
          muted
          preload="metadata"
          src="/videos/tamara.mp4"
          style={{
            position:   "absolute",
            inset:      0,
            width:      "100%",
            height:     "100%",
            objectFit:  "cover",
            display:    "block",
          }}
        />

        {/* Botones Play + Sonido */}
        <div style={{ position: "absolute", bottom: "12px", left: "14px", display: "flex", gap: "8px" }}>
          <button
            ref={playRef}
            onClick={handlePlay}
            style={{
              background:     "rgba(0,0,0,0.40)",
              border:         "none",
              cursor:         "pointer",
              color:          "#fff",
              fontFamily:     "var(--font-nav)",
              fontWeight:     700,
              fontSize:       "10px",
              letterSpacing:  "0.12em",
              padding:        "5px 12px",
              borderRadius:   "5px",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          >
            ▶ Play
          </button>
          <button
            ref={soundRef}
            onClick={handleSound}
            style={{
              background:     "rgba(0,0,0,0.40)",
              border:         "none",
              cursor:         "pointer",
              color:          "#fff",
              fontFamily:     "var(--font-nav)",
              fontWeight:     700,
              fontSize:       "10px",
              letterSpacing:  "0.12em",
              padding:        "5px 12px",
              borderRadius:   "5px",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          >
            Activar sonido
          </button>
        </div>
      </div>

      {/* ── Footer de la card ── */}
      <div
        style={{
          position:       "relative",
          zIndex:         1,
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "center",
        }}
      >
        <span style={{
          fontFamily:    "var(--font-nav)",
          fontWeight:    800,
          fontSize:      "9px",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color:         "#341c09",
        }}>
          Sobre mí
        </span>
        <span style={{
          fontFamily:    "var(--font-nav)",
          fontWeight:    400,
          fontSize:      "9px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color:         "#341c09",
          opacity:       0.55,
        }}>
          Tamara Pilgram
        </span>
      </div>
    </div>
  );
}

/* ─── Sección principal ─── */
export default function AboutTeacher() {
  const sectionRef = useRef<HTMLElement>(null);
  const bioRef     = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.from(
      bioRef.current?.querySelectorAll("p") ?? [],
      {
        y: 36, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: bioRef.current, start: "top 85%", once: true },
      }
    );

    gsap.from(
      statsRef.current?.querySelectorAll(".stat-item") ?? [],
      {
        y: 24, opacity: 0, duration: 0.8, stagger: 0.14, ease: "power2.out",
        scrollTrigger: { trigger: statsRef.current, start: "top 88%", once: true },
      }
    );
  }, []);

  return (
    <section
      id="sobre-mi"
      data-dark
      ref={sectionRef}
      style={{
        backgroundColor: "var(--brown)",
        color:           "var(--cream-text)",
        padding:         "clamp(80px, 12vw, 160px) clamp(24px, 5vw, 72px)",
        minHeight:       "100vh",
        display:         "flex",
        flexDirection:   "column",
        justifyContent:  "space-between",
        gap:             "clamp(48px, 8vw, 100px)",
      }}
    >
      {/* Tag */}
      <p style={{
        fontFamily:    "var(--font-nav)",
        fontWeight:    800,
        fontSize:      "10px",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        opacity:       0.45,
      }}>
        Sobre mí
      </p>

      {/* Título con animación por palabras */}
      <SplitHeading
        text="Soy Tamara. Profesora de inglés."
        tag="h2"
        style={{
          fontFamily:    "var(--font-display), 'Helvetica Neue', sans-serif",
          fontWeight:    900,
          fontSize:      "clamp(36px, 8vw, 120px)",
          textTransform: "uppercase",
          letterSpacing: "-0.01em",
          lineHeight:    1.05,
          color:         "var(--cream-text)",
          maxWidth:      "900px",
        }}
        start="top 74%"
      />

      {/* Bio + Card lado a lado */}
      <div
        style={{
          display:    "flex",
          gap:        "clamp(32px, 5vw, 72px)",
          flexWrap:   "wrap",
          alignItems: "flex-start",
          borderTop:  "1px solid rgba(238,233,209,0.18)",
          paddingTop: "clamp(28px, 4vw, 48px)",
        }}
      >
        {/* Párrafos bio */}
        <div
          ref={bioRef}
          style={{
            flex:          "1 1 260px",
            display:       "flex",
            flexDirection: "column",
            gap:           "clamp(16px, 2vw, 28px)",
          }}
        >
          {[
            "Llevo 13 años enseñando inglés a alumnos de todas las edades — desde los 4 años hasta adultos. Me formé en el Instituto Olga Cossettini y sigo actualizándome constantemente.",
            "Trabajar con alumnos tan distintos me enseñó a adaptarme a cada persona. No hay una fórmula única. Hay tus objetivos, tu ritmo y tus ganas — y yo diseño las clases alrededor de eso.",
            "Mi meta no es que \"aprendas algo nuevo hoy\". Es que ese aprendizaje te lleve a querer investigar más, animarte a hablar, entender el por qué del inglés.",
          ].map((text, i) => (
            <p
              key={i}
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontWeight: 400,
                fontSize:   "clamp(15px, 1.6vw, 19px)",
                lineHeight: 1.75,
                color:      "var(--cream-text)",
              }}
            >
              {text}
            </p>
          ))}
        </div>

        {/* Card de video */}
        <VideoCard />
      </div>

      {/* Stats */}
      <div
        ref={statsRef}
        style={{ display: "flex", gap: "clamp(28px, 5vw, 72px)", flexWrap: "wrap" }}
      >
        {STATS.map(({ value, label }) => (
          <div key={label} className="stat-item">
            <p style={{
              fontFamily:    "var(--font-display)",
              fontWeight:    900,
              fontSize:      "clamp(32px, 5vw, 72px)",
              color:         "var(--cream-text)",
              letterSpacing: "-0.02em",
              lineHeight:    1,
            }}>
              {value}
            </p>
            <p style={{
              fontFamily:    "var(--font-nav)",
              fontWeight:    700,
              fontSize:      "10px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color:         "var(--cream-text)",
              opacity:       0.45,
              marginTop:     "8px",
            }}>
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
