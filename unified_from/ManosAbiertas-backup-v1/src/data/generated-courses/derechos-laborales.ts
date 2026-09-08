import type { GeneratedCourse } from "./ciberseguridad";

export const derechosLaborales: GeneratedCourse = {
  id: "derechos-laborales",
  title: "Tus derechos laborales en España",
  description:
    "Lo que debes saber antes de firmar, mientras trabajas y si te despiden: contrato, nómina, jornada, baja médica y cómo reclamar gratis. Explicado en lenguaje claro con enlaces oficiales.",
  level: 1,
  category: "Derechos y empleo",
  language: "es",
  estimatedMinutes: 110,
  objectives: [
    "Reconocer los tipos de contrato y qué mirar antes de firmar",
    "Entender tu nómina: salario mínimo, pagas extra y cotización",
    "Conocer jornada máxima, vacaciones y permisos pagados",
    "Saber qué te corresponde en un despido o fin de contrato",
    "Actuar ante una baja médica sin perder ingresos",
    "Reclamar tus derechos paso a paso y sin coste cuando sea posible",
  ],
  lessons: [
    {
      id: "lab-01",
      courseId: "derechos-laborales",
      title: "El contrato de trabajo",
      level: 1,
      summary:
        "Tipos de contrato, periodo de prueba y qué leer antes de poner tu firma.",
      content:
        "El contrato es un acuerdo entre tú y la empresa. En España debe ser por escrito casi siempre, y la empresa está obligada a darte una copia firmada en 10 días.\n\nTipos más comunes:\n- Indefinido: no tiene fecha de fin. Es el más protegido.\n- Temporal (por circunstancias, sustitución): tiene fecha de inicio y fin, y solo puede usarse para los motivos que permite la ley.\n- Formación y alternancia: para estudiar y trabajar a la vez, con límites de edad y duración.\n- A tiempo parcial: menos horas que la jornada completa; tus horas deben quedar escritas.\n\nEl periodo de prueba es un tiempo inicial donde cualquiera de las partes puede terminar el contrato. Debe estar escrito en el contrato y su duración depende del convenio (normalmente 2-6 meses). Durante la prueba tienes derecho a salario completo y a alta en la Seguridad Social desde el primer día.\n\nAntes de firmar mira: puesto, salario, horario, tipo de contrato y convenio colectivo. Si algo te lo dicen solo de palabra, pídelo por escrito. Guarda copia de todo lo que firmes.",
      audio: true,
      sources: [
        {
          title: "Estatuto de los Trabajadores (BOE)",
          url: "https://www.boe.es/buscar/act.php?id=BOE-A-1995-14730",
          license: "público",
        },
        {
          title: "SEPE: contratos de trabajo",
          url: "https://www.sepe.es/HomeSepe/personas/buscar-trabajo/contrato-trabajo.html",
          license: "público",
        },
      ],
      quiz: [
        {
          q: "¿En cuánto tiempo debe entregarte la empresa el contrato ya firmado?",
          options: [
            "Al acabar el primer año",
            "En un plazo máximo de 10 días desde la firma",
            "Solo si tú lo pides",
            "No hay obligación de entregarlo",
          ],
          correct: 1,
          explain:
            "La ley obliga a entregar copia firmada del contrato en un máximo de 10 días. Si no llega, pídelo por escrito.",
        },
        {
          q: "Estás en periodo de prueba de 3 meses. ¿Tienes salario y Seguridad Social?",
          options: [
            "No, durante la prueba no se cobra",
            "Solo la mitad del sueldo",
            "Sí, ambos desde el primer día",
            "Depende de la voluntad del jefe",
          ],
          correct: 2,
          explain:
            "El periodo de prueba es trabajo normal: salario completo y alta en la Seguridad Social desde el primer día.",
        },
      ],
      xp: 20,
    },
    {
      id: "lab-02",
      courseId: "derechos-laborales",
      title: "Entender tu nómina",
      level: 1,
      summary:
        "Salario mínimo, pagas extra, base de cotización y qué hacer si te pagan menos.",
      content:
        "Tu nómina tiene dos partes: lo que ganas (devengos) y lo que te descuentan (deducciones).\n\nDevengos:\n- Salario base: lo que fija tu convenio para el puesto.\n- Complementos: nocturnidad, peligrosidad, antigüedad, idiomas...\n- Pagas extra: mínimo 2 al año salvo que el convenio las prorratee mes a mes.\n\nDeducciones:\n- IRPF: adelanto del impuesto sobre la renta según tu sueldo y familia.\n- Cotización a la Seguridad Social: financia pensiones, sanidad y paro. La empresa retiene tu parte y aporta además la suya.\n\nDatos clave:\n- El SMI (salario mínimo interprofesional) se actualiza cada año: consúltalo en boe.es o sepe.es. Nadie puede pagarte menos por jornada completa.\n- Tu base de cotización define futuras pensiones y prestaciones: revisa que coincida con tu sueldo real.\n\nSi cobras menos de lo pactado: reclama primero por escrito a la empresa. Si no responde, Inspección de Trabajo o demanda en lo social. Pide gratis tu informe de vida laboral y bases de cotización en seg-social.es para comprobar que te dieron de alta correctamente.",
      audio: true,
      sources: [
        {
          title: "Seguridad Social: sede electrónica",
          url: "https://www.seg-social.es/wps/portal/wss/internet/Ciudadano",
          license: "público",
        },
        {
          title: "BOE: Salario Mínimo Interprofesional",
          url: "https://www.boe.es/buscar/act.php?id=BOE-A-2007-11496",
          license: "público",
        },
      ],
      quiz: [
        {
          q: "¿Cuántas pagas extra mínimas corresponden al año?",
          options: ["Ninguna", "1", "2", "4"],
          correct: 2,
          explain:
            "Dos extraordinarias como mínimo, salvo prorrateo previsto en convenio.",
        },
        {
          q: "Descubres que no te dieron de alta en la Seguridad Social. ¿Qué NO debes hacer?",
          options: [
            "Pedir tu informe de vida laboral en seg-social.es",
            "Denunciar ante la Inspección de Trabajo",
            "Esperar años callado",
            "Guardar nóminas y contratos como prueba",
          ],
          correct: 2,
          explain:
            "Trabajar sin alta es ilegal y te quita paro y pensión futura. La vida laboral y la denuncia son gratuitas.",
        },
      ],
      xp: 20,
    },
    {
      id: "lab-03",
      courseId: "derechos-laborales",
      title: "Jornada, vacaciones y permisos",
      level: 1,
      summary:
        "Horas máximas, descansos, 30 días de vacaciones y permisos retribuidos por ley.",
      content:
        "Límites legales de la jornada ordinaria:\n- Máximo 40 horas semanales de media anual.\n- Descanso mínimo de 12 horas entre jornadas y de 36 horas ininterrumpidas por semana.\n- Horas extra voluntarias salvo fuerza mayor: se compensan con descanso o se pagan, con tope anual legal.\n\nVacaciones:\n- Mínimo 30 días naturales al año (tu convenio puede dar más, nunca menos). Se cobran igual que trabajar y no pueden cambiarse por dinero salvo fin de contrato con vacaciones pendientes.\n\nPermisos retribuidos (días pagados):\n- Matrimonio: 15 días.\n- Nacimiento o adopción: el otro progenitor tiene 12 semanas transferibles además de las 6 semanas obligatorias tras la baja maternal.\n- Fallecimiento, accidente o enfermedad grave de familiar hasta segundo grado: 2 días (4 si hay desplazamiento).\n- Exámenes oficiales de aprendizaje: 2 días por examen.\n- Visita médica obligatoria en horario de trabajo: el tiempo necesario.\n\nTambién existen reducciones de jornada por cuidado de menores o dependientes, con salario proporcional. Consulta tu convenio: suele mejorar estos mínimos legales.",
      audio: true,
      sources: [
        {
          title: "Estatuto de los Trabajadores, arts. 34-37 (BOE)",
          url: "https://www.boe.es/buscar/act.php?id=BOE-A-1995-14730",
          license: "público",
        },
      ],
      quiz: [
        {
          q: "¿Cuál es el mínimo legal de vacaciones al año?",
          options: ["15 días", "22 días", "30 días", "Las que decida la empresa"],
          correct: 2,
          explain:
            "30 días naturales mínimos, mejorables por convenio, nunca por debajo.",
        },
        {
          q: "Fallece un hermano y debes viajar. ¿A cuántos días pagados tienes derecho?",
          options: ["0", "1 día", "2 días, o 4 con desplazamiento", "Un mes"],
          correct: 2,
          explain:
            "Familiar hasta segundo grado: 2 días laborables, 4 cuando necesitas desplazarte.",
        },
      ],
      xp: 20,
    },


    {
      id: "lab-04",
      courseId: "derechos-laborales",
      title: "Despidos y finiquito",
      level: 2,
      summary:
        "Tipos de salida, indemnizaciones que te corresponden y plazos para reclamar.",
      content:
        "Formas de terminar la relación laboral:\n\n1. Despido disciplinario: alegan un incumplimiento grave tuyo. No lleva indemnización, pero la carta debe describir hechos con fecha. Si crees que es injusto, reclama en 20 días hábiles.\n\n2. Despido objetivo (causas económicas o técnicas): indemnización de 20 días por año trabajado, con tope de 12 mensualidades, entregada con carta de causa.\n\n3. Despido improcedente (declarado así): 33 días por año, con tope de 24 mensualidades.\n\n4. Fin de contrato temporal: finiquito normal más 12 días de salario por año de indemnización (salvo interinidad cubriendo vacante).\n\nEl finiquito incluye: días trabajados sin cobrar, pagas extra devengadas, vacaciones generadas no disfrutadas y complementos pendientes. Se paga en la fecha habitual de nómina.\n\nPlazos clave: 20 días hábiles para demandar tras un despido, pasando antes por la conciliación previa (gratuita). El paro se pide al SEPE en 15 días hábiles desde el fin del contrato, aunque el despido esté en disputa.",
      audio: true,
      sources: [
        {
          title: "Estatuto de los Trabajadores, arts. 49-56 (BOE)",
          url: "https://www.boe.es/buscar/act.php?id=BOE-A-1995-14730",
          license: "público",
        },
        {
          title: "SEPE: prestación por desempleo",
          url: "https://www.sepe.es/HomeSepe/personas/paro.html",
          license: "público",
        },
      ],
      quiz: [
        {
          q: "Termina tu contrato temporal de 2 años. ¿Qué indemnización mínima corresponde?",
          options: [
            "Ninguna",
            "12 días de salario por año",
            "20 días por año",
            "33 días por año",
          ],
          correct: 1,
          explain:
            "Los contratos temporales llevan 12 días de salario por año trabajado al terminar (salvo interinos por vacante).",
        },
        {
          q: "Te despiden y crees que es injusto. ¿Cuál es el plazo para demandar?",
          options: ["6 meses", "1 año", "20 días hábiles", "Sin límite"],
          correct: 2,
          explain:
            "20 días hábiles desde el despido. La conciliación previa es gratuita y pausa el reloj.",
        },
      ],
      xp: 25,
    },
    {
      id: "lab-05",
      courseId: "derechos-laborales",
      title: "Baja médica y prestaciones",
      level: 1,
      summary:
        "Qué cobras si estás enfermo, cuánto dura la baja y cómo actuar ante un alta inesperada.",
      content:
        "Si una enfermedad o accidente te impide trabajar, tienes derecho a la incapacidad temporal (IT):\n\n- Días 4 a 20: 60% de tu base reguladora; desde el día 21: 75%.\n- Los 3 primeros días no se cobran en enfermedad común (los convenios suelen cubrirlos; por accidente se cobra desde el día 1).\n- Paga primero la empresa; después el INSS o la mutua.\n- Duración máxima: 365 días, prorrogables 180 más si hay mejora previsible.\n\nTus obligaciones: entregar los partes en plazo (baja en 3 días, confirmaciones periódicas) y seguir las indicaciones sanitarias.\n\nAl alta: vuelves a tu puesto. Si crees que el alta es incorrecta, reclama ante la Inspección Médica del INSS en 11 días.\n\nAccidente de trabajo: cobertura total desde el primer día y recargo de prestaciones si la empresa incumplió normas de seguridad. No firmes renuncias rápidas sin leer: consulta antes con sindicato o abogacía gratuita.",
      audio: true,
      sources: [
        {
          title: "Seguridad Social: incapacidad temporal",
          url: "https://www.seg-social.es/wps/portal/wss/internet/Ciudadano",
          license: "público",
        },
      ],
      quiz: [
        {
          q: "Baja por enfermedad común. ¿Cobras los 3 primeros días?",
          options: [
            "Sí, completos",
            "No se abonan, salvo convenio mejor (por accidente sí desde el día 1)",
            "Solo la mitad",
            "Depende del jefe",
          ],
          correct: 1,
          explain:
            "En enfermedad común los 3 primeros días no generan subsidio; muchos convenios los pagan igualmente.",
        },
        {
          q: "Te dan el alta y no te sientes recuperado. ¿Qué haces?",
          options: [
            "Nada, hay que obedecer",
            "Reclamar ante la Inspección Médica del INSS en 11 días",
            "No volver nunca a la empresa",
            "Firmar lo que sea sin leer",
          ],
          correct: 1,
          explain:
            "Puedes impugnar el alta en 11 días ante la Inspección Médica provincial del INSS.",
        },
      ],
      xp: 20,
    },
    {
      id: "lab-06",
      courseId: "derechos-laborales",
      title: "Cómo reclamar sin gastar dinero",
      level: 2,
      summary:
        "Ruta gratuita: reclamación escrita, sindicatos, SMAC, Inspección de Trabajo y justicia gratuita.",
      content:
        "Escalera práctica para defender tus derechos, de menor a mayor coste:\n\n1. Reclamación interna: burofax o correo pidiendo por escrito lo que te deben (salarios, alta, contrato). Crea prueba con fecha.\n\n2. Sindicatos: asesoran gratis en muchas gestiones aunque no estés afiliado.\n\n3. Conciliación previa (SMAC): gratuita y obligatoria antes de demandar en lo social. Pausa los plazos judiciales.\n\n4. Inspección de Trabajo: admite denuncias por salarios, horarios, seguridad o fraude; puedes pedir confidencialidad.\n\n5. Justicia gratuita: si tus ingresos no superan los umbrales legales (basados en el IPREM), abogado y procurador los paga el Estado. Se solicita en el Colegio de Abogados o en el juzgado.\n\nGuarda siempre: contrato, nóminas, horarios, mensajes del trabajo, partes médicos y carta de despido. Todo sirve como prueba.\n\nImportante: despedir por embarazo, enfermedad pasada, sindicarse o denunciar fraude es despido nulo, y su reclamación no tiene plazo límite.",
      audio: true,
      sources: [
        {
          title: "Justicia gratuita - Ministerio de Justicia",
          url: "https://www.mjusticia.gob.es/es/ciudadania/ayudas/ayuda-justicia-gratuita",
          license: "público",
        },
        {
          title: "Inspección de Trabajo y Seguridad Social",
          url: "https://itss.trabajo.gob.es/",
          license: "público",
        },
      ],
      quiz: [
        {
          q: "¿Qué paso gratuito es obligatorio antes de demandar por despido?",
          options: [
            "Una encuesta online",
            "El acto de conciliación (SMAC)",
            "Contratar un detective",
            "Publicarlo en redes sociales",
          ],
          correct: 1,
          explain:
            "El SMAC es gratuito, rápido y obligatorio antes del juicio social por despido o reclamación de cantidad.",
        },
        {
          q: "¿Por qué motivo un despido es NULO (y sin plazo para reclamar)?",
          options: [
            "Por llegar tarde una vez",
            "Por discriminación: embarazo, enfermedad pasada o sindicarse",
            "Por discutir con un compañero",
            "Ninguno, siempre hay plazo",
          ],
          correct: 1,
          explain:
            "La discriminación anula el despido: readmisión con salarios perdidos y sin plazo de reclamación.",
        },
      ],
      xp: 25,
    },
  ],
};

export default derechosLaborales;
