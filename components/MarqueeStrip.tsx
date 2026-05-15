const ITEMS = [
  "INGLÉS", "CONFIANZA", "FLUIDEZ", "METODOLOGÍA",
  "SPEAKING", "FIRST", "ONLINE", "13 AÑOS",
];

export default function MarqueeStrip() {
  const text = [...ITEMS, ...ITEMS].join("  ·  ");

  return (
    <div
      data-dark
      style={{
        backgroundColor: "var(--brown)",
        borderTop:       "1px solid rgba(238,233,209,0.12)",
        borderBottom:    "1px solid rgba(238,233,209,0.12)",
        overflow:        "hidden",
        padding:         "clamp(14px, 1.8vw, 20px) 0",
      }}
    >
      <div
        style={{
          display:   "flex",
          width:     "max-content",
          animation: "marquee 22s linear infinite",
        }}
      >
        {[0, 1].map((k) => (
          <span
            key={k}
            style={{
              fontFamily:    "var(--font-nav), 'Helvetica Neue', sans-serif",
              fontWeight:    800,
              fontSize:      "clamp(10px, 1.1vw, 13px)",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color:         "var(--cream-text)",
              whiteSpace:    "nowrap",
              paddingRight:  "clamp(32px, 4vw, 60px)",
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
