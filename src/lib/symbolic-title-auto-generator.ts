/**
 * Sistema Automático de Generación de Títulos Simbólicos
 * Se dispara automáticamente al completar una lección/módulo
 * No requiere intervención manual del usuario
 */
class SymbolicTitleAutoGenerator {
  constructor(options = {}) {
    this.storageKey = 'ma_titulos_ganados';
    this.coursesKey = 'manos_abiertas_courses_progress';
    this.titlesKey = 'ma_titulos_ganados';
    this.notificationQueue = [];
    this.isProcessing = false;
    
    // Configuración de cursos y sus títulos asociados
    this.courseConfigs = {
      'ia-1': { category: 'ia', lessons: 8, title: 'Primeros pasos con IA' },
      'ia-2': { category: 'ia', lessons: 8, title: 'ChatGPT para buscar empleo' },
      'ia-3': { category: 'ia', lessons: 8, title: 'Traduce y entiende documentos' },
      'ia-4': { category: 'ia', lessons: 8, title: 'Imágenes y creatividad con IA' },
      'cv-1': { category: 'cv', lessons: 5, title: 'Crea tu CV ganador' },
      'cv-2': { category: 'cv', lessons: 4, title: 'Cartas de motivación' },
      'id-1': { category: 'idiomas', lessons: 6, title: 'Español para el trabajo' },
      'id-2': { category: 'idiomas', lessons: 4, title: 'Catalán de supervivencia' },
      'of-1': { category: 'oficios', lessons: 6, title: 'Marketing digital' },
      'of-2': { category: 'oficios', lessons: 5, title: 'Programación web' },
      'of-3': { category: 'oficios', lessons: 4, title: 'Contabilidad básica' },
      'of-4': { category: 'oficios', lessons: 6, title: 'Cocina profesional (FP)' },
      'de-1': { category: 'derechos', lessons: 8, title: 'Derechos, arraigo y ayudas' },
      'ge-1': { category: 'general', lessons: 3, title: 'Bienvenida a Manos Abiertas' }
    };

    this.init();
  }

  init() {
    // Escuchar eventos de completación de lecciones
    this.setupEventListeners();
    
    // Verificar si hay títulos pendientes de mostrar al cargar
    this.checkPendingNotifications();
    
    // Exponer API global
    window.MA_TitleGenerator = {
      checkCompletion: (courseId, lessonId) => this.checkAndGenerate(courseId, lessonId),
      getTitles: () => this.getEarnedTitles(),
      getStats: () => this.getStats()
    };
  }

  setupEventListeners() {
    // Escuchar eventos de completación de lecciones
    document.addEventListener('lessonCompleted', (e) => {
      const { courseId, lessonId, userName, userGender } = e.detail;
      this.onLessonCompleted(courseId, lessonId, userName, userGender);
    });

    // También escuchar evento genérico de progreso
    document.addEventListener('progressUpdate', (e) => {
      const { courseId, completedLessons, totalLessons, userName, userGender } = e.detail;
      if (completedLessons === this.getTotalLessons(courseId)) {
        this.onCourseCompleted(courseId, userName, userGender);
      }
    });
  }

  async onLessonCompleted(courseId, lessonId, userName, userGender) {
    const course = this.getCourseConfig(courseId);
    if (!course) return;

    const progress = this.getCourseProgress(courseId);
    const totalLessons = this.courseConfigs[courseId]?.lessons || 1;
    
    // Verificar si se completó el curso entero
    const completedLessons = Object.values(this.getCourseProgress(courseId)).filter(Boolean).length;
    const isCourseComplete = completedLessons >= this.getTotalLessons(courseId);

    if (isCourseComplete) {
      await this.generateTitleForCourse(courseId, userName);
    } else {
      // Mostrar progreso parcial
      this.showProgressNotification(courseId, completedLessons, this.getTotalLessons(courseId));
    }
  }

  async onCourseCompleted(courseId, userName, userGender) {
    // Verificar si ya se generó el título para este curso
    const earnedTitles = this.getEarnedTitles();
    const alreadyHas = earnedTitles.some(t => t.courseId === courseId);
    
    if (alreadyHas) return; // Ya tiene el título

    await this.generateTitleForCourse(courseId, userName);
  }

  async generateTitleForCourse(courseId, userName) {
    const courseConfig = this.getCourseConfig(courseId);
    if (!courseConfig) return;

    const userNameFinal = this.getUserName(userName);
    const gender = this.getUserGender();
    
    // Generar título simbólico
    const titleData = this.generateSymbolicTitle({
      userName: userName,
      courseId: courseId,
      userGender: gender,
      variation: Date.now() // Para variación única
    });

    // Guardar título ganado
    this.saveEarnedTitle({
      courseId,
      courseName: this.courseConfigs[courseId]?.title || 'Curso',
      title: titleData.title,
      emblem: titleData.emblem,
      rarity: titleData.rarity,
      serial: titleData.serial,
      date: new Date().toISOString(),
      userName: userName,
      userGender: gender
    });

    // Mostrar celebración
    this.showCelebration({
      title: `¡${this.courseConfigs[courseId]?.title || 'Curso'} completado!`,
      titleData,
      userName
    });

    // Guardar en localStorage
    this.saveEarnedTitleToStorage({
      courseId,
      title: this.getCourseConfig(courseId)?.title || 'Curso',
      titleData,
      date: new Date().toISOString()
    });

    // Disparar evento personalizado para que otros componentes reaccionen
    window.dispatchEvent(new CustomEvent('titleEarned', {
      detail: { courseId, titleData, userName }
    }));
  }

  // Genera el título simbólico usando el motor determinista
  generateSymbolicTitle({ userName, courseId, userGender, variation = 0 }) {
    const courseConfig = this.getCourseConfig(courseId);
    const category = this.getCourseCategory(courseId);
    
    // Motor determinista: semilla = nombre + curso + variación
    const seed = this.xmur3(`${userName.toLowerCase()}::${courseId}::v${Date.now()}`)();
    const rng = this.mulberry32(seed);

    // Seleccionar arquetipo según categoría del curso
    const category = this.getCourseCategory(courseId);
    const archetypes = this.ARCHETYPES[category] || this.ARCHETYPES.general;
    const rng = this.mulberry32(this.xmur3(`${userName.toLowerCase()}::${courseId}::${Date.now()}`)());
    const archetype = this.pick(rng, this.ARCHETYPES[this.getCourseCategory(courseId)] || this.ARCHETYPES.general);
    const genderIdx = { m: 0, f: 1, n: 2 }[gender] || 1;
    const title = archetype[genderIdx] || archetype[1];
    const emblem = archetype[3];

    // Rareza ponderada
    const r = Math.random();
    const rarity = this.RARITIES.find(x => Math.random() < x.w) || this.RARITIES[0];

    return {
      title: archetype[0], // Usar forma masculina como base
      fullTitle: this.getGenderedTitle(archetype, gender),
      emblem: archetype[3],
      rarity: {
        id: 'gold',
        name: 'Sello de Oro',
        color: '#D4AF37',
        weight: 1.0
      },
      serial: `MA-${new Date().getFullYear()}-${1000 + Math.floor(Math.random() * 9000)}`,
      userName,
      courseId,
      timestamp: new Date().toISOString()
    };
  }

  // Obtener título según género
  getGenderedTitle(archetype, gender) {
    const idx = { m: 0, f: 1, n: 2 }[gender] || 1;
    return archetype[gender === 'f' ? 1 : (gender === 'n' ? 2 : 0)] || archetype[0];
  }

  // Mostrar celebración visual
  showCelebration({ titleData, userName, courseId }) {
    // Crear modal de celebración
    const modal = document.createElement('div');
    modal.className = 'title-celebration-modal';
    modal.innerHTML = `
      <div class="celebration-overlay"></div>
      <div class="celebration-modal">
        <div class="celebration-burst" aria-hidden="true"></div>
        <div class="celebration-content">
          <div class="celebration-icon">🏅</div>
          <h2>¡Título Simbólico Obtenido!</h2>
          <p class="celebration-title">Has completado el curso y ganado tu título simbólico</p>
          <div class="title-preview">
            <span class="emblem">${this.getCourseEmblem(courseId)}</span>
            <h3>${this.generateSymbolicTitle({ courseId, userGender: 'f', variation: Date.now() }).fullTitle}</h3>
            <p class="rarity">✦ Sello de Oro</p>
          </div>
          <p class="subtitle">Tu título ha sido guardado en tu galería</p>
          <button class="btn-continue" onclick="this.closest('.celebration-modal').remove()">Continuar</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    
    // Animación de entrada
    requestAnimationFrame(() => {
      modal.classList.add('show');
      // Crear partículas de celebración
      this.createCelebrationParticles();
    });

    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
      if (document.body.contains(modal)) {
        modal.classList.add('fade-out');
        setTimeout(() => modal.remove(), 500);
      }
    }, 5000);
  }

  // Obtener emblema del curso
  getCourseEmblem(courseId) {
    const emblems = {
      'ia-1': '🧠', 'ia-2': '💬', 'ia-3': '🌐', 'ia-4': '🎨',
      'cv-1': '📄', 'cv-2': '✉️',
      'id-1': '🗣️', 'id-2': '🏙️',
      'of-1': '📈', 'of-2': '💻', 'of-3': '🧾', 'of-4': '🍳',
      'de-1': '⚖️', 'ge-1': '🤲'
    };
    return this.courseEmblems[courseId] || '🏅';
  }

  getCourseConfig(courseId) {
    const courses = {
      'ia-1': { category: 'ia', lessons: 8, title: 'Primeros pasos con IA' },
      'ia-2': { category: 'ia', lessons: 8, title: 'ChatGPT para buscar empleo' },
      'ia-3': { category: 'ia', lessons: 8, title: 'Traduce y entiende documentos' },
      'ia-4': { category: 'ia', lessons: 8, title: 'Imágenes y creatividad con IA' },
      'cv-1': { category: 'cv', lessons: 5, title: 'Crea tu CV ganador' },
      'cv-2': { category: 'cv', lessons: 4, title: 'Cartas de motivación' },
      'id-1': { category: 'idiomas', lessons: 6, title: 'Español para el trabajo' },
      'id-2': { category: 'idiomas', lessons: 4, title: 'Catalán de supervivencia' },
      'of-1': { category: 'oficios', lessons: 6, title: 'Marketing digital' },
      'of-2': { category: 'oficios', lessons: 5, title: 'Programación web' },
      'of-3': { category: 'oficios', lessons: 4, title: 'Contabilidad básica' },
      'of-4': { category: 'oficios', lessons: 6, title: 'Cocina profesional (FP)' },
      'de-1': { category: 'derechos', lessons: 8, title: 'Derechos, arraigo y ayudas' },
      'ge-1': { category: 'general', lessons: 3, title: 'Bienvenida a Manos Abiertas' }
    };
    return this.courseConfigs[courseId];
  }

  getCourseConfig(courseId) {
    const configs = {
      'ia-1': { category: 'ia', lessons: 8, title: 'Primeros pasos con IA' },
      'ia-2': { category: 'ia', lessons: 8, title: 'ChatGPT para buscar empleo' },
      'ia-3': { category: 'ia', lessons: 8, title: 'Traduce y entiende documentos' },
      'ia-4': { category: 'ia', lessons: 8, title: 'Imágenes y creatividad con IA' },
      'cv-1': { category: 'cv', lessons: 5, title: 'Crea tu CV ganador' },
      'cv-2': { category: 'cv', lessons: 4, title: 'Cartas de motivación' },
      'id-1': { category: 'idiomas', lessons: 6, title: 'Español para el trabajo' },
      'id-2': { category: 'idiomas', lessons: 4, title: 'Catalán de supervivencia' },
      'of-1': { category: 'oficios', lessons: 6, title: 'Marketing digital' },
      'of-2': { category: 'oficios', lessons: 5, title: 'Programación web' },
      'of-3': { category: 'oficios', lessons: 4, title: 'Contabilidad básica' },
      'of-4': { category: 'oficios', lessons: 6, title: 'Cocina profesional (FP)' },
      'de-1': { category: 'derechos', lessons: 8, title: 'Derechos, arraigo y ayudas' },
      'ge-1': { category: 'general', lessons: 3, title: 'Bienvenida a Manos Abiertas' }
    };
    return this.courseConfigs[courseId];
  }

  getCourseCategory(courseId) {
    const cats = {
      'ia-1': 'ia', 'ia-2': 'ia', 'ia-3': 'ia', 'ia-4': 'ia',
      'cv-1': 'cv', 'cv-2': 'cv',
      'id-1': 'idiomas', 'id-2': 'idiomas',
      'of-1': 'oficios', 'of-2': 'oficios', 'of-3': 'oficios', 'of-4': 'oficios',
      'de-1': 'derechos',
      'ge-1': 'general'
    };
    return this.courseCategories[courseId] || 'general';
  }

  getTotalLessons(courseId) {
    return this.courseConfigs[courseId]?.lessons || 1;
  }

  getCourseProgress(courseId) {
    try {
      const data = localStorage.getItem(`ma_course_progress_${courseId}`);
      return data ? JSON.parse(data) : {};
    } catch { return {}; }
  }

  getCourseCategory(courseId) {
    if (courseId.startsWith('ia-')) return 'ia';
    if (courseId.startsWith('cv-')) return 'cv';
    if (courseId.startsWith('id-')) return 'idiomas';
    if (courseId.startsWith('of-')) return 'oficios';
    if (courseId.startsWith('de-')) return 'derechos';
    if (courseId.startsWith('ge-')) return 'general';
    return 'general';
  }

  getUserName() {
    return localStorage.getItem('ma_user_name') || 'Viajero/a';
  }

  getUserGender() {
    return localStorage.getItem('ma_user_gender') || 'n';
  }

  getUserName(userName) {
    return userName || localStorage.getItem('ma_user_name') || 'Viajero/a';
  }

  getUserGender() {
    return localStorage.getItem('ma_user_gender') || 'n';
  }

  getCourseProgress(courseId) {
    try {
      return JSON.parse(localStorage.getItem(`ma_course_progress_${courseId}`) || '{}');
    } catch { return {}; }
  }

  getCourseConfig(courseId) {
    return this.courseConfigs[courseId] || { lessons: 1, title: 'Curso' };
  }

  getCourseCategory(courseId) {
    if (courseId.startsWith('ia-')) return 'ia';
    if (courseId.startsWith('cv-')) return 'cv';
    if (courseId.startsWith('id-')) return 'idiomas';
    if (courseId.startsWith('of-')) return 'oficios';
    if (courseId.startsWith('de-')) return 'derechos';
    if (courseId.startsWith('ge-')) return 'general';
    return 'general';
  }

  getTotalLessons(courseId) {
    return this.courseConfigs[courseId]?.lessons || 1;
  }

  // Motor de generación de títulos (simplificado)
  xmur3(str) {
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return () => {
      h = Math.imul(h ^ h >>> 16, 2246822507);
      h = Math.imul(h ^ h >>> 13, 3266489909);
      return (h ^= h >>> 16) >>> 0;
    };
  }

  mulberry32(a) {
    return function() {
      let t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  pick(rng, arr) {
    return arr[Math.floor(rng() * arr.length)];
  }

  // Arquetipos por categoría
  ARCHETYPES = {
    ia: [
      ['Arquitecto de Prompts', 'Arquitecta de Prompts', 'Arquitectura de Prompts', '🏛️'],
      ['Guardián del Prompt', 'Guardiana del Prompt', 'Custodia del Prompt', '🗝️'],
      ['Navegante de la IA', 'Navegante de la IA', 'Navegación de la IA', '⛵'],
      ['Domador de Máquinas Sabias', 'Domadora de Máquinas Sabias', 'Arte de Domar Máquinas', '🐉'],
      ['Cartógrafo de Datos', 'Cartógrafa de Datos', 'Cartografía de Datos', '🗺️'],
      ['Orfebre de Algoritmos', 'Orfebre de Algoritmos', 'Orfebrería de Algoritmos', '⚒️'],
      ['Susurrador de IAs', 'Susurradora de IAs', 'Susurro de las IAs', '🌬️'],
      ['Faro Digital', 'Faro Digital', 'Luz Digital', '🕯️']
    ],
    cv: [
      ['Forjador de Oportunidades', 'Forjadora de Oportunidades', 'Forja de Oportunidades', '🔥'],
      ['Embajador de su Historia', 'Embajadora de su Historia', 'Embajada de su Historia', '🏵️'],
      ['Artesano del Porvenir', 'Artesana del Porvenir', 'Artesanía del Porvenir', '🧵'],
      ['Abrepuertas', 'Abrepuertas', 'Oficio de Abrir Puertas', '🚪'],
      ['Cronista de sus Logros', 'Cronista de sus Logros', 'Crónica de sus Logros', '📜']
    ],
    idiomas: [
      ['Tejedor de Palabras', 'Tejedora de Palabras', 'Tejido de Palabras', '🧶'],
      ['Puente entre Mundos', 'Puente entre Mundos', 'Puente entre Mundos', '🌉'],
      ['Voz sin Fronteras', 'Voz sin Fronteras', 'Voz sin Fronteras', '🎙️'],
      ['Traductor de Horizontes', 'Traductora de Horizontes', 'Traducción de Horizontes', '🌅'],
      ['Políglota del Corazón', 'Políglota del Corazón', 'Poliglotía del Corazón', '💞']
    ],
    oficios: [
      ['Maestro de las Manos Sabias', 'Maestra de las Manos Sabias', 'Maestría de las Manos Sabias', '🖐️'],
      ['Constructor de Futuros', 'Constructora de Futuros', 'Construcción de Futuros', '🏗️'],
      ['Alquimista del Oficio', 'Alquimista del Oficio', 'Alquimia del Oficio', '⚗️'],
      ['Pionero Digital', 'Pionera Digital', 'Vanguardia Digital', '🚀'],
      ['Estratega del Detalle', 'Estratega del Detalle', 'Estrategia del Detalle', '🎯']
    ],
    derechos: [
      ['Conocedor de sus Raíces', 'Conocedora de sus Raíces', 'Conocimiento de sus Raíces', '🌳'],
      ['Defensor de Caminos', 'Defensora de Caminos', 'Defensa de Caminos', '🛤️'],
      ['Guardián de sus Derechos', 'Guardiana de sus Derechos', 'Custodia de sus Derechos', '🛡️'],
      ['Raíz Firme', 'Raíz Firme', 'Raíz Firme', '🪨']
    ],
    general: [
      ['Viajero Imparable', 'Viajera Imparable', 'Viaje Imparable', '🧳'],
      ['Corazón Valiente', 'Corazón Valiente', 'Corazón Valiente', '🦁'],
      ['Semilla de Roble', 'Semilla de Roble', 'Semilla de Roble', '🌱'],
      ['Manantial de Luz', 'Manantial de Luz', 'Manantial de Luz', '✨'],
      ['Alma Constante', 'Alma Constante', 'Alma Constante', '🌊']
    ]
  };

  // Utilidades
  xmur3(str) {
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return () => {
      h = Math.imul(h ^ h >>> 16, 2246822507);
      h = Math.imul(h ^ h >>> 13, 3266489909);
      return (h ^= h >>> 16) >>> 0;
    };
  }

  mulberry32(a) {
    return function() {
      let t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  pick(rng, arr) {
    return arr[Math.floor(rng() * arr.length)];
  }

  // Generar título determinista
  generateTitle(seedStr) {
    const seed = this.xmur3(seedStr)();
    const rng = this.mulberry32(seed);
    // ... lógica de generación
  }

  // Guardar título ganado
  saveTitle(titleData) {
    const titles = this.getEarnedTitles();
    titles.unshift({
      ...titleData,
      earnedAt: new Date().toISOString()
    });
    localStorage.setItem('ma_titles_earned', JSON.stringify(titles.slice(0, 30)));
  }

  // Obtener títulos ganados
  getEarnedTitles() {
    try {
      return JSON.parse(localStorage.getItem('ma_earned_titles') || '[]');
    } catch { return []; }
  }

  // Obtener estadísticas
  getStats() {
    const titles = this.getEarnedTitles();
    return {
      total: titles.length,
      byRarity: titles.reduce((acc, t) => {
        acc[t.rarity?.id || 'common'] = (acc[t.rarity?.id || 'common'] || 0) + 1;
        return acc;
      }, {}),
      courses: [...new Set(titles.map(t => t.courseId))].length
    };
  }

  // Obtener títulos ganados
  getEarnedTitles() {
    try {
      return JSON.parse(localStorage.getItem('ma_earned_titles') || '[]');
    } catch { return []; }
  }

  // Mostrar notificación de progreso
  showProgressNotification(courseId, completed, total) {
    const course = this.getCourseConfig(courseId);
    this.showNotification({
      title: `Progreso en ${course.title}`,
      message: `${completed}/${total} lecciones completadas`,
      type: 'progress'
    });
  }

  // Mostrar notificación toast
  showNotification({ title, message, type = 'info' }) {
    // Implementar toast notification
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<strong>${title}</strong><p>${message}</p>`;
    document.body.appendChild(modal);
    setTimeout(() => modal.remove(), 4000);
  }

  // Verificar títulos pendientes al cargar
  checkPendingNotifications() {
    // Verificar si hay títulos ganados sin mostrar
    const pending = localStorage.getItem('ma_pending_title_notification');
    if (pending) {
      const data = JSON.parse(pending);
      this.showCelebration(data);
      localStorage.removeItem('ma_pending_title_notification');
    }
  }

  // Guardar título en localStorage
  saveEarnedTitleToStorage(titleData) {
    const titles = this.getEarnedTitles();
    titles.unshift({
      ...titleData,
      earnedAt: new Date().toISOString()
    });
    localStorage.setItem('ma_earned_titles', JSON.stringify(titles.slice(0, 30)));
  }

  // Obtener estadísticas
  getStats() {
    const titles = this.getEarnedTitles();
    return {
      total: titles.length,
      byCategory: titles.reduce((acc, t) => {
        const cat = this.getCourseCategory(t.courseId);
        acc[cat] = (acc[t.category] || 0) + 1;
        return acc;
      }, {}),
      byRarity: titles.reduce((acc, t) => {
        acc[t.rarity?.id || 'common'] = (acc[t.rarity?.id || 'common'] || 0) + 1;
        return acc;
      }, {})
    };
  }

  // API pública
  checkAndGenerate(courseId, lessonId) {
    this.onLessonCompleted(courseId, lessonId, this.getUserName(), this.getUserGender());
  }

  getEarnedTitles() {
    try {
      return JSON.parse(localStorage.getItem('ma_earned_titles') || '[]');
    } catch { return []; }
  }

  getUserName() {
    return localStorage.getItem('ma_user_name') || 'Viajero/a';
  }

  getUserGender() {
    return localStorage.getItem('ma_user_gender') || 'n';
  }

  // API pública
  static getInstance() {
    if (!SymbolicTitleAutoGenerator.instance) {
      SymbolicTitleAutoGenerator.instance = new SymbolicTitleAutoGenerator();
    }
    return SymbolicTitleAutoGenerator.instance;
  }
}

// Auto-inicializar
if (typeof window !== 'undefined') {
  window.SymbolicTitleAutoGenerator = SymbolicTitleAutoGenerator;
  window.titleGenerator = SymbolicTitleAutoGenerator.getInstance();
}

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SymbolicTitleAutoGenerator;
}