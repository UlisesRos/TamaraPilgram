"use client";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/tami_englishteacher/" },
  { label: "Gmail",     href: "mailto:tamara@gmail.com" },
  { label: "WhatsApp",  href: "https://wa.me/5493416637601?text=Hola+Tamara%2C+me+gustar%C3%ADa+recibir+m%C3%A1s+informaci%C3%B3n+sobre+tus+clases.+%C2%A1Gracias%21&utm_source=chatgpt.com" },
];

const NAV = [
  { label: "Inicio",      href: "#inicio" },
  { label: "Sobre mí",    href: "#sobre-mi" },
  { label: "Metodología", href: "#metodologia" },
  { label: "Contacto",    href: "#contacto" },
];

const linkStyle: React.CSSProperties = {
  fontFamily:     "var(--font-nav)",
  fontWeight:     800,
  fontSize:       "clamp(11px, 1.1vw, 13px)",
  letterSpacing:  "0.18em",
  textTransform:  "uppercase",
  color:          "var(--black)",
  textDecoration: "none",
  display:        "block",
  lineHeight:     2,
  transition:     "opacity 0.2s",
};

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--cream)",
        color:           "var(--black)",
        borderTop:       "1px solid rgba(9,9,9,0.15)",
        padding:         "clamp(32px, 5vw, 56px) clamp(24px, 5vw, 72px) clamp(20px, 3vw, 36px)",
      }}
    >
      {/* ── Fila principal: socials | back to top | nav ── */}
      <div
        style={{
          display:        "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems:     "start",
          gap:            "clamp(16px, 3vw, 40px)",
        }}
      >
        {/* Redes sociales */}
        <nav aria-label="Redes sociales">
          {SOCIALS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={linkStyle}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.45")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Back to top */}
        <div style={{ textAlign: "center", paddingTop: "4px" }}>
          <a
            href="#inicio"
            style={{
              fontFamily:    "var(--font-nav)",
              fontWeight:    700,
              fontSize:      "9px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color:         "var(--black)",
              textDecoration:"none",
              opacity:       0.45,
              display:       "flex",
              flexDirection: "column",
              alignItems:    "center",
              gap:           "6px",
              transition:    "opacity 0.2s",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "0.45")}
          >
            <span style={{ fontSize: "14px" }}>↑</span>
            Back to top
          </a>
        </div>

        {/* Nav links — alineado a la derecha */}
        <nav aria-label="Navegación" style={{ textAlign: "right" }}>
          {NAV.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={linkStyle}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.45")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      {/* ── Copyright ── */}
      <p
        style={{
          fontFamily:    "var(--font-nav)",
          fontWeight:    400,
          fontSize:      "9px",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color:         "var(--black)",
          opacity:       0.25,
          marginTop:     "clamp(28px, 4vw, 48px)",
          textAlign:     "center",
        }}
      >
        © {new Date().getFullYear()} Tamara Pilgram · Diseño &amp; desarrollo — Ulises
      </p>
    </footer>
  );
}
