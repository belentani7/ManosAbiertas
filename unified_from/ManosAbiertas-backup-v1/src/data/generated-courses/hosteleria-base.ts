import type { GeneratedCourse } from "./ciberseguridad";

export const hosteleriaBase: GeneratedCourse = {
  id: "hostelería-base",
  title: "Hostelería sin secretos: sala y barra",
  description:
    "Tu puerta de entrada a uno de los sectores que más contrata en España: atención al cliente, seguridad alimentaria, servicio de mesa y barra, y cómo conseguir el empleo.",
  level: 0,
  category: "Hostelería",
  language: "es",
  estimatedMinutes: 90,
  objectives: [
    "Dar un servicio amable y profesional desde el primer día",
    "Aplicar las normas básicas de seguridad alimentaria",
    "Montar una mesa y servir con orden correcto",
    "Preparar los cafés más pedidos en barra",
    "Buscar empleo en hostelería con ventaja",
  ],
  lessons: [
    {
      id: "hos-01",
      courseId: "hostelería-base",
      title: "Atención al cliente que vuelve",
      level: 0,
      summary:
        "Saludo, lenguaje positivo y qué hacer cuando algo sale mal.",
      content:
        "En hostelería el producto es la experiencia. Tres reglas de oro:\n\n1. Saluda siempre cuando entre un cliente y despídete al salir. Un saludo cálido cambia toda la comida.\n\n2. Usa lenguaje positivo: no digas que no queda; di qué sí hay o cuánto tardará. No digas eso no es mi tarea; di voy a encargarme de ello.\n\n3. Ante una queja: escucha sin interrumpir, disculpa por la experiencia aunque no tengas culpa, ofrece una solución rápida y avisa al responsable. Un cliente bien atendido en un problema vuelve; uno ignorado no.\n\nExtras que marcan diferencia: recordar el café de los habituales, preguntar por alergias sin que lo repitan dos veces y nunca discutir delante de otros clientes.",
      audio: true,
      sources: [
        {
          title: "Edutin: curso de atención al cliente",
          url: "https://edutin.com/curso-de-atención-al-cliente",
          license: "gratuito",
        },
      ],
      quiz: [
        {
          q: "Un cliente dice que su plato está frío. Primera respuesta correcta:",
          options: [
            "Decir que de cocina acaba de salir así",
            "Disculparte, recalentarlo y avisar al responsable",
            "Ignorarlo porque exagera",
            "Discutir hasta que se calle",
          ],
          correct: 1,
          explain:
            "Escuchar, disculpar por la experiencia y resolver rápido convierte una queja en fidelidad.",
        },
        {
          q: "¿Qué es lenguaje positivo?",
          options: [
            "Sonreír todo el tiempo",
            "Decir lo que SÍ hay o puedes hacer, en vez de lo que no",
            "Hablar en inglés siempre",
            "Poner música alegre",
          ],
          correct: 1,
          explain:
            "Lenguaje positivo es ofrecer alternativas: nos queda..., en cinco minutos lo tengo...",
        },
      ],
      xp: 15,
    },
    {
      id: "hos-02",
      courseId: "hostelería-base",
      title: "Seguridad alimentaria básica",
      level: 0,
      summary:
        "Cadena de frío, higiene de manos, contaminación cruzada y alérgenos.",
      content:
        "Cuatro pilares que evitan intoxicaciones:\n\n1. Higiene de manos: lavado de 40-60 segundos con jabón antes de manipular alimentos y tras tocar dinero, basura o tocarte la cara. Los guantes no sustituyen el lavado.\n\n2. Cadena de frío: refrigerados entre 0-4 grados, congelados a -18. Nunca recongelar algo descongelado. Etiqueta con fecha de apertura.\n\n3. Contaminación cruzada: tablas y cuchillos separados para crudo y cocinado. Crudo abajo, cocinado arriba en la nevera. Superficies limpias entre usos.\n\n4. Alérgenos: la ley obliga a informar sobre los 14 principales (gluten, lácteos, frutos secos, huevo, pescado, marisco...). Pregunta SIEMPRE por alergias y consulta la ficha del producto antes de asegurar que algo no lleva. Una respuesta errónea puede matar.\n\nEl sistema APPCC de análisis de peligros es obligatorio en cada cocina: sigue los registros de tu local.",
      audio: true,
      sources: [
        {
          title: "AESAN - Agencia Española de Seguridad Alimentaria",
          url: "https://www.aesan.gob.es/AECOSAN/web/seguridad_alimentaria/seccion/seguridad_alimentaria.htm",
          license: "público",
        },
      ],
      quiz: [
        {
          q: "¿Dónde guardas el pollo crudo en la nevera?",
          options: [
            "Arriba, junto al postre",
            "En el centro, tapado",
            "Abajo, para que no gotee sobre otros alimentos",
            "Dónde haya hueco",
          ],
          correct: 2,
          explain:
            "Crudo siempre abajo: si gotea no contamina nada cocinado o listo para servir.",
        },
        {
          q: "Un cliente pregunta si el arroz lleva lactosa. ¿Qué respondes?",
          options: [
            "Que seguro que no",
            "Comprobar la ficha de alérgenos y confirmar con cocina",
            "Que casi seguro no lleva",
            "Que pruebe y ya está",
          ],
          correct: 1,
          explain:
            "Con alérgenos solo vale información verificada en ficha técnica. Adivinar puede ser mortal.",
        },
      ],
      xp: 20,
    },
    {
      id: "hos-03",
      courseId: "hostelería-base",
      title: "Servicio de mesa paso a paso",
      level: 0,
      summary:
        "Montaje de mesa, toma de comanda, orden de servicio y retirada.",
      content:
        "Montaje básico: mantel o individual limpio, plato base centrado, cubertería por orden de uso de fuera hacia dentro (tenedores izquierda, cuchillos y cuchara derecha), copas arriba a la derecha, servilleta sobre el plato.\n\nToma de comanda: anota posiciones por número de silla, repite la comanda para confirmar y apunta alergias y cambios. Bebidas servidas en 3-5 minutos.\n\nOrden clásico: entrantes, primeros, segundos, postre o café. Retira platos solo cuando TODO el grupo termine ese pase, preguntando permiso. Cambia cubiertos entre pases.\n\nDurante la comida revisa agua y pan sin molestar. La cuenta se trae cuando la pidan o tras ofrecer postre y café.\n\nTrucos de profesional: bandeja a la altura del hombro, pulgar fuera del borde de los platos, y copas de tinto se sirven sujetando por el tallo para no calentar el vino.",
      audio: true,
      sources: [
        {
          title: "SEPE: formación profesional para el empleo",
          url: "https://sede.sepe.gob.es/portalSede/es/procedimientos-y-servicios/personas/formación",
          license: "público",
        },
      ],
      quiz: [
        {
          q: "¿Cuándo retiras los platos de un pase?",
          options: [
            "Cuando termina el más rápido",
            "Cuando terminan TODOS los comensales de la mesa",
            "A los 10 minutos exactos",
            "Cuando traes el plato siguiente",
          ],
          correct: 1,
          explain:
            "Se espera al grupo completo para que nadie coma acompañado de platos retirados.",
        },
        {
          q: "La cubertería se usa:",
          options: [
            "De dentro hacia fuera",
            "De fuera hacia dentro según lleguen los pases",
            "Siempre la misma cuchara",
            "Da igual el orden",
          ],
          correct: 1,
          explain:
            "Los cubiertos exteriores son para los primeros pases: el orden va de fuera hacia dentro.",
        },
      ],
      xp: 20,
    },
    {
      id: "hos-04",
      courseId: "hostelería-base",
      title: "Barra y café: los imprescindibles",
      level: 1,
      summary:
        "Cafés clásicos, tiraje de cañas y limpieza de zona de barra.",
      content:
        "Los 6 cafés que debes dominar:\n\n- Solo o americano: espresso más agua caliente.\n- Cortado: espresso con un dedo de leche caliente.\n- Café con leche: mitad café, mitad leche vaporizada en taza grande.\n- Capuchino: tercio espresso, tercio leche, tercio espuma.\n- Carajillo: espresso con licor (whisky, ron o brandy).\n- Manchado: leche con un toque de café, casi todo leche.\n\nLeche para espumar: fria y fresca, llena la jarra a un tercio. Vapor hasta 60-65 grados; quemada pierde dulzor y el cliente lo nota. Golpea la jarra y gira antes de verter para eliminar burbujas grandes.\n\nTiraje de cerveza: vaso inclinado 45 grados, grifo sin tocar la espuma, dos dedos de colchón final. Vaso del cliente nunca bajo el grifo: higiene básica.\n\nBarra siempre visible: encimera seca y sin manchas, cristaleria brillante revisada a contraluz, suelo sin restos. La barra sucia es la primera imagen que se lleva quien entra.",
      audio: true,
      sources: [
        {
          title: "SEPE: formación profesional para el empleo",
          url: "https://sede.sepe.gob.es/portalSede/es/procedimientos-y-servicios/personas/formación",
          license: "público",
        },
      ],
      quiz: [
        {
          q: "Diferencia entre capuchino y cortado:",
          options: [
            "El capuchino lleva alcohol",
            "El capuchino lleva partes iguales de café, leche y espuma; el cortado es espresso con poco de leche",
            "Son lo mismo con otro nombre",
            "El cortado es más grande",
          ],
          correct: 1,
          explain:
            "Capuchino = tres tercios (café, leche, espuma). Cortado = espresso manchado con poco de leche.",
        },
        {
          q: "Al tirar una caña, el vaso se mantiene:",
          options: [
            "Vertical y debajo del grifo",
            "Inclinado unos 45 grados y nunca bajo el grifo",
            "Boca abajo primero",
            "Lleno de hielo",
          ],
          correct: 1,
          explain:
            "Vaso inclinado 45 grados para crear espuma controlada y fuera del grifo por higiene.",
        },
      ],
      xp: 20,
    },
    {
      id: "hos-05",
      courseId: "hostelería-base",
      title: "Conseguir tu primer empleo en hostelería",
      level: 1,
      summary:
        "Dónde buscar, qué poner en el CV sin experiencia y cómo brillar en la prueba práctica.",
      content:
        "La hostelería contrata por actitud y disponibilidad. Tu plan:\n\n1. Dónde buscar: portales generales (InfoJobs, Indeed), grupos locales de Facebook y WhatsApp de tu zona, y puerta a puerta: dejar CV impreso entre 10 y 12 h o después de la merienda, cuando el local respira.\n\n2. CV sin experiencia: pon formación (este curso cuenta), idiomas, disponibilidad TOTAL (fines de semana y turnos: es lo primero que preguntan) y cualquier actividad con trato al público, aunque no fuera empleo (voluntariado, deportes en equipo).\n\n3. La entrevista: llega 10 minutos antes, pregunta por el turno de pruebas y muestra energia. Frase clave: puedo empezar ya y me adapto a cualquier turno.\n\n4. La prueba práctica: te pedirán montar una mesa o servir un café. Hazlo despacio y bien: valoran orden, limpieza y calma más que velocidad.\n\n5. Primeros días: llega 15 minutos antes, apunta todo en un cuaderno (mesas, precios, habituales) y ofrece ayuda sin esperar a que te la pidan.\n\nEl convenio de hostelería regula tus salarios y turnos: conócelo desde el día uno.",
      audio: true,
      sources: [
        {
          title: "SEPE: búsqueda de empleo",
          url: "https://www.sepe.es/HomeSepe/personas.html",
          license: "público",
        },
        {
          title: "Edutin: curso de atención al cliente",
          url: "https://edutin.com/curso-de-atención-al-cliente",
          license: "gratuito",
        },
      ],
      quiz: [
        {
          q: "Que es lo PRIMERO que valora un bar al contratarte:",
          options: [
            "Tu experiencia previa en restaurantes de lujo",
            "Tu actitud y disponibilidad total para turnos y fines de semana",
            "Saber inglés perfecto",
            "Tener coche propio",
          ],
          correct: 1,
          explain:
            "En hostelería se contrata actitud y flexibilidad; lo técnico se aprende rápido en el puesto.",
        },
        {
          q: "En la prueba práctica de montar una mesa conviene:",
          options: [
            "Ir rapidísimo aunque falten cubiertos",
            "Hacerlo despacio, ordenado y limpio",
            "Pedir ayuda a otros candidatos",
            "Decir que eso no lo has hecho nunca",
          ],
          correct: 1,
          explain:
            "Valoran orden, limpieza y calma. Velocidad sin método genera errores delante del cliente.",
        },
      ],
      xp: 20,
    },
  ],
};

export default hosteleriaBase;
