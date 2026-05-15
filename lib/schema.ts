export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tamara",
    jobTitle: "Profesora de Inglés",
    description:
      "Profesora de inglés con 13 años de experiencia. Clases online 100% personalizadas para todas las edades.",
    knowsAbout: ["English language teaching", "FIRST exam preparation", "Medical English", "OET exam"],
    offers: {
      "@type": "Offer",
      description: "Clases de inglés online personalizadas",
      availability: "https://schema.org/InStock",
    },
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cómo es una clase típica con Tamara?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Las clases arrancan repasando lo de la clase anterior (puede ser un juego, bingo, adivinanza o speaking). Luego se trabaja lo planificado: un reading o ejercicios. Para cerrar, se practica el tema nuevo con juegos o speaking para fijar los conceptos.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué plataforma se usa para las clases?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Las clases son 100% online a través de Google Meet.",
        },
      },
      {
        "@type": "Question",
        name: "¿Hay una clase de prueba gratuita?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Tamara ofrece una clase de entrevista sin cargo para evaluar tu nivel y definir tus objetivos juntos. Sin compromiso.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cómo sé cuál es mi nivel de inglés?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "En la clase de prueba gratuita se evalúa tu nivel. Los niveles disponibles son: Beginners, Elementary, Pre-Intermediate, Intermediate y Upper Intermediate.",
        },
      },
      {
        "@type": "Question",
        name: "¿Puedo consultar dudas fuera del horario de clase?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, los alumnos de clases individuales pueden consultar dudas por WhatsApp en cualquier momento fuera del horario de clases.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuánto dura cada clase?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Depende del alumno: hay clases de 1 hora, 1 hora y media, o intensivos de 2 horas y media dos veces por semana (equivalen a avanzar 2 años en uno).",
        },
      },
      {
        "@type": "Question",
        name: "¿Tamara prepara para el examen FIRST (FCE)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, Tamara prepara alumnos exclusivamente para el examen FIRST (FCE).",
        },
      },
    ],
  };
}
