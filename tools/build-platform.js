const fs = require("fs");
const path = require("path");
const root = path.resolve(__dirname, "..");
const manifestPath = path.join(root, "data/manifest.json");
const indexPath = path.join(root, "index.html");

if (fs.existsSync(manifestPath)) {
    const m = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    let nav = "", secs = "";
    (m.sections || []).forEach(s => {
        nav += `<li><a href="#${s.id}">${s.title}</a></li>\n`;
        let btns = "";
        (s.buttons || []).forEach(b => {
            btns += `<a href="${b.target}" class="edu-btn" target="_blank" rel="noopener noreferrer">${b.label}</a>\n`;
        });
        secs += `<section id="${s.id}" class="edu-card"><h2>${s.title}</h2><p>${s.description || ""}</p><div class="button-grid">${btns}</div></section>\n`;
    });

    const html = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${m.projectName || "Plataforma Educativa"}</title>
    <link rel="stylesheet" href="assets/css/variables.css">
    <link rel="stylesheet" href="assets/css/styles.css">
    <script src="assets/js/app.js" defer></script>
</head>
<body>
    <header class="edu-header">
        <div class="edu-logo">📚 ${m.projectName || "Campus Educativo"}</div>
        <nav>
            <ul>
                ${nav}
                <li><a href="#curriculum">Plan de Estudios</a></li>
                <li><a href="#tutor">Tutor IA</a></li>
            </ul>
        </nav>
    </header>
    <main class="edu-container">
        <section class="edu-hero edu-card">
            <h1>Excelencia Académica y Formación Accesible</h1>
            <p>Bienvenido al entorno de aprendizaje interactivo. Estudia a tu propio ritmo con planes de estudio estructurados, herramientas pedagógicas y asistencia de IA.</p>
        </section>
        ${secs}
        <section id="curriculum" class="edu-card">
            <h2>Plan de Estudios Detallado</h2>
            <ul class="curriculum-list">
                <li><strong>Módulo 1:</strong> Fundamentos Teóricos y Prácticos</li>
                <li><strong>Módulo 2:</strong> Aplicación de Herramientas Open Source</li>
                <li><strong>Módulo 3:</strong> Evaluación Continua y Proyecto Final</li>
            </ul>
        </section>
        <section id="tutor" class="edu-card">
            <h2>Tutor Académico Virtual (IA)</h2>
            <div id="chat-box" class="edu-chat-box">
                <div class="chat-msg"><strong>Tutor IA:</strong> Hola. ¿En qué concepto o lección de tu plan de estudios te gustaría profundizar hoy?</div>
            </div>
            <div class="chat-input-row">
                <input type="text" id="chat-input" placeholder="Escribe tu consulta académica..." />
                <button id="chat-send" class="edu-btn">Preguntar</button>
            </div>
        </section>
    </main>
    <footer class="edu-footer">
        <p>&copy; 2026 ${m.projectName || "Plataforma Educativa"}. Educación inclusiva, abierta y de calidad.</p>
    </footer>
</body>
</html>`;

    fs.writeFileSync(indexPath, html);
    console.log(`[✓] Educational Platform Built for ${m.projectName}`);
}
