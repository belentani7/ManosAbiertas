#!/usr/bin/env node
/**
 * Publish the existing 8 × 26 × 4 curriculum as complete, standalone HTML.
 * Markdown remains the single source of truth; generated pages are build output.
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const CURRICULUM_PAGE_LANGUAGES = Object.freeze([
  {
    code: 'ES',
    lang: 'es',
    name: 'Español',
    copy: {
      skip: 'Saltar al contenido',
      catalog: 'Todos los módulos',
      levels: 'Niveles del módulo',
      level: 'Nivel',
      previous: 'Nivel anterior',
      next: 'Nivel siguiente',
      language: 'Idioma del material',
      time: 'Tiempo estimado',
      footer: 'Material educativo abierto. No constituye una certificación.',
    },
  },
  {
    code: 'PT',
    lang: 'pt',
    name: 'Português',
    copy: {
      skip: 'Saltar para o conteúdo',
      catalog: 'Todos os módulos',
      levels: 'Níveis do módulo',
      level: 'Nível',
      previous: 'Nível anterior',
      next: 'Próximo nível',
      language: 'Idioma do material',
      time: 'Tempo estimado',
      footer: 'Material educativo aberto. Não constitui certificação.',
    },
  },
  {
    code: 'CA',
    lang: 'ca',
    name: 'Català',
    copy: {
      skip: 'Ves al contingut',
      catalog: 'Tots els mòduls',
      levels: 'Nivells del mòdul',
      level: 'Nivell',
      previous: 'Nivell anterior',
      next: 'Nivell següent',
      language: 'Idioma del material',
      time: 'Temps estimat',
      footer: 'Material educatiu obert. No constitueix una certificació.',
    },
  },
  {
    code: 'EN',
    lang: 'en',
    name: 'English',
    copy: {
      skip: 'Skip to content',
      catalog: 'All modules',
      levels: 'Module levels',
      level: 'Level',
      previous: 'Previous level',
      next: 'Next level',
      language: 'Content language',
      time: 'Estimated time',
      footer: 'Open educational material. It is not a certification.',
    },
  },
]);

export const CURRICULUM_LEVELS = Object.freeze(
  Array.from({ length: 26 }, (_, index) => String(index).padStart(2, '0')),
);

const SOURCE_ROOT = 'public/contenido/curriculum';
const LANGUAGE_BY_CODE = new Map(
  CURRICULUM_PAGE_LANGUAGES.map((language) => [language.code, language]),
);

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function safeHref(value) {
  const href = value.trim();
  if (/^(https?:|mailto:|#|\/|\.\/|\.\.\/)/i.test(href)) return href;
  return null;
}

function renderInline(source) {
  const token = /(!?)\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`/g;
  let html = '';
  let cursor = 0;
  for (const match of source.matchAll(token)) {
    html += escapeHtml(source.slice(cursor, match.index));
    if (match[2] && match[3]) {
      const href = safeHref(match[3]);
      if (!href) {
        html += escapeHtml(match[2]);
      } else if (match[1] === '!') {
        html += `<img src="${escapeHtml(href)}" alt="${escapeHtml(match[2])}" loading="lazy" decoding="async">`;
      } else {
        const external = /^https?:/i.test(href);
        html += `<a href="${escapeHtml(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${escapeHtml(match[2])}</a>`;
      }
    } else if (match[4]) {
      html += `<strong>${escapeHtml(match[4])}</strong>`;
    } else if (match[5]) {
      html += `<em>${escapeHtml(match[5])}</em>`;
    } else if (match[6]) {
      html += `<code>${escapeHtml(match[6])}</code>`;
    }
    cursor = match.index + match[0].length;
  }
  return html + escapeHtml(source.slice(cursor));
}

const isFence = (line) => /^\s*`{3,}|^\s*~{3,}/.test(line);
const isHeading = (line) => /^\s{0,3}#{1,6}\s+/.test(line);
const isRule = (line) => /^\s{0,3}(?:-{3,}|_{3,}|\*{3,})\s*$/.test(line);
const listMatch = (line) => line.match(/^\s{0,3}(?:([-+*])|(\d+)[.)])\s+(.+)$/);
const isQuote = (line) => /^\s{0,3}>\s?/.test(line);

function tableCells(line) {
  return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim());
}

function isTableSeparator(line) {
  const cells = tableCells(line);
  return cells.length > 1 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

/** Safe renderer for the documented curriculum Markdown subset; raw HTML is escaped. */
export function renderCurriculumMarkdown(markdown) {
  const lines = markdown.replaceAll('\r\n', '\n').split('\n');
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (isFence(line)) {
      const fence = line.trim().slice(0, 3);
      const code = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith(fence)) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`);
      continue;
    }

    const heading = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const level = Math.min(6, heading[1].length + 1);
      blocks.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }

    if (isRule(line)) {
      blocks.push('<hr>');
      index += 1;
      continue;
    }

    if (line.includes('|') && index + 1 < lines.length && isTableSeparator(lines[index + 1])) {
      const headers = tableCells(line);
      index += 2;
      const rows = [];
      while (index < lines.length && lines[index].includes('|') && lines[index].trim()) {
        rows.push(tableCells(lines[index]));
        index += 1;
      }
      blocks.push(
        '<div class="table-scroll" role="region" tabindex="0" aria-label="Tabla de contenido">' +
        '<table><thead><tr>' + headers.map((cell) => `<th scope="col">${renderInline(cell)}</th>`).join('') +
        '</tr></thead><tbody>' + rows.map((row) =>
          '<tr>' + headers.map((_, column) => `<td>${renderInline(row[column] ?? '')}</td>`).join('') + '</tr>',
        ).join('') + '</tbody></table></div>',
      );
      continue;
    }

    if (isQuote(line)) {
      const quote = [];
      while (index < lines.length && isQuote(lines[index])) {
        quote.push(lines[index].replace(/^\s{0,3}>\s?/, '').trim());
        index += 1;
      }
      blocks.push(`<blockquote><p>${quote.map(renderInline).join('<br>')}</p></blockquote>`);
      continue;
    }

    const firstList = listMatch(line);
    if (firstList) {
      const ordered = Boolean(firstList[2]);
      const items = [];
      while (index < lines.length) {
        const item = listMatch(lines[index]);
        if (!item || Boolean(item[2]) !== ordered) break;
        items.push(`<li>${renderInline(item[3])}</li>`);
        index += 1;
      }
      const tag = ordered ? 'ol' : 'ul';
      blocks.push(`<${tag}>${items.join('')}</${tag}>`);
      continue;
    }

    const paragraph = [trimmed];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !isFence(lines[index]) &&
      !isHeading(lines[index]) &&
      !isRule(lines[index]) &&
      !isQuote(lines[index]) &&
      !listMatch(lines[index]) &&
      !(lines[index].includes('|') && index + 1 < lines.length && isTableSeparator(lines[index + 1]))
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push(`<p>${renderInline(paragraph.join(' '))}</p>`);
  }

  return blocks.join('\n');
}

function documentShell({ title, description, lang, body, stylesheet = '../../curriculum-pages.css' }) {
  return `<!doctype html>
<html lang="${escapeHtml(lang)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#173f35">
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="color-scheme" content="light">
  <title>${escapeHtml(title)}</title>
  <link rel="stylesheet" href="${escapeHtml(stylesheet)}">
</head>
<body>
${body}
</body>
</html>
`;
}

function sourceFiles(root, moduleDir, level, lang) {
  const file = `nivel-${level}-${lang.code}.md`;
  const path = join(root, SOURCE_ROOT, moduleDir, `nivel-${level}`, file);
  if (!existsSync(path)) throw new Error(`Missing curriculum source: ${path}`);
  return { path, file, markdown: readFileSync(path, 'utf8') };
}

function readTitle(markdown, level) {
  const first = markdown.split('\n', 1)[0]?.trim() ?? '';
  const title = first.replace(/^#\s*/, '').replace(/\s+—\s+[^—]*\d{2}\s*$/, '').trim();
  if (!title) throw new Error(`Curriculum level ${level} has no title`);
  return title;
}

function readDescription(markdown) {
  const plain = markdown
    .split('\n')
    .filter((line) => line.trim() && !/^\s*#/.test(line) && !/^\s*[-|]/.test(line))
    .slice(0, 2)
    .join(' ')
    .replace(/[*_`]/g, '')
    .replace(/\[[^\]]+\]\([^)]+\)/g, 'recurso externo');
  return plain.slice(0, 220) || 'Lección completa del currículo abierto Manos Abiertas.';
}

function lessonBody({ moduleDir, moduleTitle, level, language, title, meta, markdown }) {
  const selectedLevel = Number(level);
  const levelFile = (value) => `nivel-${String(value).padStart(2, '0')}-${language.code}.html`;
  const currentFile = levelFile(selectedLevel);
  const previous = selectedLevel > 0
    ? `<a rel="prev" href="${escapeHtml(levelFile(selectedLevel - 1))}">${escapeHtml(language.copy.previous)}</a>`
    : '<span aria-disabled="true"></span>';
  const next = selectedLevel < CURRICULUM_LEVELS.length - 1
    ? `<a rel="next" href="${escapeHtml(levelFile(selectedLevel + 1))}">${escapeHtml(language.copy.next)}</a>`
    : '<span aria-disabled="true"></span>';

  const levelLinks = CURRICULUM_LEVELS.map((value) => (
    `<li><a href="${escapeHtml(levelFile(Number(value)))}"${value === level ? ' aria-current="page"' : ''}>${escapeHtml(language.copy.level)} ${value}</a></li>`
  )).join('');

  const languageLinks = CURRICULUM_PAGE_LANGUAGES.map((option) => (
    `<a href="${escapeHtml(`nivel-${level}-${option.code}.html`)}"${option.code === language.code ? ' aria-current="page"' : ''} lang="${escapeHtml(option.lang)}">${escapeHtml(option.name)}</a>`
  )).join('');

  const bodyContent = markdown
    .replace(/^#\s+[^\n]*\n/, '')
    .replace(/^##\s+Idioma:.*\n/m, '')
    .replace(/^##\s+(?:Tiempo|Tempo) estimado:.*\n/m, '');

  return `
<a class="skip-link" href="#contenido">${escapeHtml(language.copy.skip)}</a>
<header class="site-header">
  <a class="brand" href="../../../index.html">Manos Abiertas <span>Currículo abierto</span></a>
  <nav aria-label="${escapeHtml(language.copy.catalog)}"><a href="../../../index.html">${escapeHtml(language.copy.catalog)}</a><a href="../index.html">${escapeHtml(language.copy.levels)}</a></nav>
</header>
<div class="page-grid">
  <aside class="lesson-aside">
    <p class="eyebrow">${escapeHtml(moduleTitle)}</p>
    <details open>
      <summary>${escapeHtml(language.copy.levels)}</summary>
      <nav aria-label="${escapeHtml(language.copy.levels)}"><ol class="level-list">${levelLinks}</ol></nav>
    </details>
  </aside>
  <main id="contenido" class="lesson-main">
    <article>
      <header class="lesson-heading">
        <p class="eyebrow">${escapeHtml(moduleTitle)}</p>
        <h1>${escapeHtml(title)}</h1>
        <div class="metadata">
          <span>${escapeHtml(language.name)} (${escapeHtml(language.code)})</span>
          ${meta.difficulty ? `<span>${escapeHtml(meta.difficulty)}</span>` : ''}
          ${meta.time ? `<span>${escapeHtml(language.copy.time)}: ${escapeHtml(meta.time)}</span>` : ''}
          <span>Manos Abiertas</span>
        </div>
      </header>
      <nav class="language-picker" aria-label="${escapeHtml(language.copy.language)}"><span>${escapeHtml(language.copy.language)}:</span>${languageLinks}</nav>
      <div class="lesson-content">${renderCurriculumMarkdown(bodyContent)}</div>
      <nav class="lesson-pagination" aria-label="${escapeHtml(language.copy.levels)}">${previous}<span>${escapeHtml(language.copy.level)} ${escapeHtml(level)}</span>${next}</nav>
    </article>
  </main>
</div>
<footer class="site-footer"><span>Manos Abiertas · ${escapeHtml(moduleDir)}</span><span>${escapeHtml(language.copy.footer)}</span><a href="${escapeHtml(currentFile)}" download>${escapeHtml(language.copy.level)} ${escapeHtml(level)} · HTML</a></footer>
`;
}

function moduleBody({ moduleDir, titles, lang }) {
  const language = LANGUAGE_BY_CODE.get(lang);
  const links = CURRICULUM_LEVELS.map((level) => {
    const label = language.copy.level + ' ' + level;
    const firstPath = `nivel-${level}/nivel-${level}-${lang}.html`;
    return `<li><a href="${escapeHtml(firstPath)}"><span>${escapeHtml(label)}</span><span aria-hidden="true">→</span></a></li>`;
  }).join('');
  const languages = CURRICULUM_PAGE_LANGUAGES.map((option) => {
    const firstPath = `nivel-00/nivel-00-${option.code}.html`;
    return `<a href="${escapeHtml(firstPath)}"${option.code === lang ? ' aria-current="page"' : ''} lang="${escapeHtml(option.lang)}">${escapeHtml(option.name)}</a>`;
  }).join('');
  const body = `
<a class="skip-link" href="#contenido">${escapeHtml(language.copy.skip)}</a>
<header class="site-header">
  <a class="brand" href="../index.html">Manos Abiertas <span>Currículo abierto</span></a>
  <nav aria-label="${escapeHtml(language.copy.catalog)}"><a href="../index.html">${escapeHtml(language.copy.catalog)}</a></nav>
</header>
<main id="contenido" class="module-main">
  <header class="lesson-heading">
    <p class="eyebrow">Manos Abiertas · ${escapeHtml(moduleDir)}</p>
    <h1>${escapeHtml(titles[lang])}</h1>
    <p>26 niveles · ES · PT · CA · EN</p>
  </header>
  <nav class="language-picker" aria-label="${escapeHtml(language.copy.language)}"><span>${escapeHtml(language.copy.language)}:</span>${languages}</nav>
  <section aria-labelledby="levels-title">
    <h2 id="levels-title">${escapeHtml(language.copy.levels)}</h2>
    <ol class="module-levels">${links}</ol>
  </section>
</main>
<footer class="site-footer"><span>Manos Abiertas · ${escapeHtml(moduleDir)}</span><span>${escapeHtml(language.copy.footer)}</span></footer>
`;
  return documentShell({
    title: `${titles[lang]} | Manos Abiertas`,
    description: `Currículo completo de ${titles[lang]}, con 26 niveles en ES, PT, CA y EN.`,
    lang: language.lang,
    body,
    stylesheet: '../curriculum-pages.css',
  });
}

function catalogBody({ modules, lang }) {
  const language = LANGUAGE_BY_CODE.get(lang);
  const cards = modules.map(({ dir, titles }) => (
    `<li><a href="${escapeHtml(`${dir}/index-${lang}.html`)}"><strong>${escapeHtml(titles[lang])}</strong><span>26 ${escapeHtml(language.copy.levels.toLocaleLowerCase(language.lang))} · ES · PT · CA · EN</span></a></li>`
  )).join('');
  const languageLinks = CURRICULUM_PAGE_LANGUAGES.map((option) => (
    `<a href="index-${option.code}.html"${option.code === lang ? ' aria-current="page"' : ''} lang="${escapeHtml(option.lang)}">${escapeHtml(option.name)}</a>`
  )).join('');
  const body = `
<a class="skip-link" href="#contenido">${escapeHtml(language.copy.skip)}</a>
<header class="site-header"><a class="brand" href="../../../index.html">Manos Abiertas <span>Currículo abierto</span></a></header>
<main id="contenido" class="module-main">
  <header class="lesson-heading"><p class="eyebrow">Manos Abiertas · ES · PT · CA · EN</p><h1>Currículo de Inteligencia Artificial</h1><p>Ocho módulos, 26 niveles por módulo y cuatro itinerarios de idioma, a partir de materiales didácticos ya existentes.</p></header>
  <nav class="language-picker" aria-label="${escapeHtml(language.copy.language)}"><span>${escapeHtml(language.copy.language)}:</span>${languageLinks}</nav>
  <section aria-labelledby="modules-title"><h2 id="modules-title">Módulos</h2><ol class="module-cards">${cards}</ol></section>
</main>
<footer class="site-footer"><span>Manos Abiertas · Currículo abierto</span><span>${escapeHtml(language.copy.footer)}</span></footer>
`;
  return documentShell({
    title: 'Currículo de Inteligencia Artificial | Manos Abiertas',
    description: 'Ocho módulos de IA, con 26 niveles en español, portugués, catalán e inglés.',
    lang: language.lang,
    body,
    stylesheet: 'curriculum-pages.css',
  });
}

function parseMeta(markdown) {
  const difficulty = markdown.match(/^## Idioma:.*?·\s*Dificultad:\s*(.+)$/m)?.[1]?.trim();
  const time = markdown.match(/^## (?:Tiempo|Tempo) estimado:\s*(.+)$/m)?.[1]?.trim();
  return { difficulty, time };
}

export function publishCurriculumHtml(root = resolve(dirname(fileURLToPath(import.meta.url)), '..')) {
  const outputRoot = join(root, SOURCE_ROOT);
  const configPath = join(root, 'src/data/curriculum-modules.ts');
  const config = readFileSync(configPath, 'utf8');
  const modules = [...config.matchAll(/id:\s*'([^']+)'\s*,\s*dir:\s*'([^']+)'/g)]
    .map((match) => ({ id: match[1], dir: match[2], titles: {} }));
  if (modules.length !== 8) throw new Error(`Expected 8 curriculum modules, found ${modules.length}`);

  let pageCount = 0;
  for (const module of modules) {
    for (const level of CURRICULUM_LEVELS) {
      for (const language of CURRICULUM_PAGE_LANGUAGES) {
        const source = sourceFiles(root, module.dir, level, language);
        const title = readTitle(source.markdown, level);
        module.titles[language.code] ??= level === '00'
          ? title
          : readTitle(sourceFiles(root, module.dir, '00', language).markdown, '00');
        const body = lessonBody({
          moduleDir: module.dir,
          moduleTitle: module.titles[language.code],
          level,
          language,
          title,
          meta: parseMeta(source.markdown),
          markdown: source.markdown,
        });
        const html = documentShell({
          title: `${title} | Manos Abiertas`,
          description: readDescription(source.markdown),
          lang: language.lang,
          body,
        });
        const outputPath = join(outputRoot, module.dir, `nivel-${level}`, `nivel-${level}-${language.code}.html`);
        mkdirSync(dirname(outputPath), { recursive: true });
        writeFileSync(outputPath, html);
        pageCount += 1;
      }
    }

    for (const language of CURRICULUM_PAGE_LANGUAGES) {
      const moduleIndex = join(outputRoot, module.dir, `index-${language.code}.html`);
      writeFileSync(moduleIndex, moduleBody({ moduleDir: module.dir, titles: module.titles, lang: language.code }));
    }
  }

  for (const language of CURRICULUM_PAGE_LANGUAGES) {
    writeFileSync(join(outputRoot, `index-${language.code}.html`), catalogBody({ modules, lang: language.code }));
  }
  // English default index keeps the directory browsable without a language suffix.
  writeFileSync(join(outputRoot, 'index.html'), catalogBody({ modules, lang: 'ES' }));

  if (pageCount < 200) throw new Error(`Curriculum HTML output below platform minimum: ${pageCount}/200`);
  return { modules: modules.length, languages: CURRICULUM_PAGE_LANGUAGES.length, levels: CURRICULUM_LEVELS.length, pages: pageCount };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const summary = publishCurriculumHtml();
    console.log(`Curriculum HTML: ${summary.pages} lessons, ${summary.modules} modules, ${summary.languages} languages`);
  } catch (error) {
    console.error(`Curriculum HTML generation failed: ${error.message}`);
    process.exitCode = 1;
  }
}
