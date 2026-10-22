const assert = require('node:assert/strict');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

(async () => {
  const browser = await chromium.launch({headless:true,
    ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH ? {executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH} : {})});
  try {
    const context = await browser.newContext({viewport:{width:390,height:844}});
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const base = process.env.CAMPUS_BASE_URL || 'http://127.0.0.1:8766';
    await page.goto(base + '/campus/');
    await page.evaluate(() => navigator.serviceWorker.ready);
    await page.reload();
    await page.waitForFunction(() => navigator.serviceWorker.controller !== null);
    const slugs = ['alfabetizacion-ia','office-sin-miedo','falsos-amigos-pt-es'];
    let questions = 0;
    for (const slug of slugs) {
      await page.selectOption('#quizCurso', 'cursos/'+slug+'/quiz.json');
      await page.locator('.opciones button').first().waitFor();
      const quiz = await page.evaluate(async slug => {
        const response = await fetch('cursos/'+slug+'/quiz.json');
        return response.json();
      }, slug);
      for (const question of quiz) {
        const wrong = (question.correcta+1) % question.opciones.length;
        await page.getByRole('button',{name:question.opciones[wrong],exact:true}).click();
        assert.match(await page.locator('.feedback').innerText(), /Respuesta correcta:/);
        await page.locator('.quiz-siguiente').click();
      }
      assert.equal(await page.locator('.quiz-titulo').innerText(), 'Práctica finalizada: 0/'+quiz.length);
      assert.match(await page.locator('.feedback').innerText(), /Repaso de respuestas/);
      await page.locator('.quiz-siguiente').click();
      assert.match(await page.locator('.quiz-titulo').innerText(), /^1\//);
      assert.equal(await page.locator('.feedback').innerText(), '');
      questions += quiz.length;
    }
    await page.locator('a[href="cursos/office-sin-miedo/syllabus.md"]').first().click();
    await page.locator('#lector-nav a[href="cursos/office-sin-miedo/semana-01.md"]').click();
    await page.waitForFunction(() => document.getElementById('lector-content').textContent.length > 1500);
    await page.waitForFunction(async () => {
      const names = await caches.keys();
      const name = names.find(name => name.startsWith('manos-abiertas-campus:'));
      return name && (await (await caches.open(name)).keys()).length === 29;
    });
    await context.setOffline(true);
    await page.reload();
    await page.locator('a[href="cursos/office-sin-miedo/syllabus.md"]').first().click();
    await page.locator('#lector-nav a[href="cursos/office-sin-miedo/semana-03.md"]').click();
    await page.waitForFunction(() => document.getElementById('lector-content').textContent.length > 1500);
    await page.selectOption('#quizCurso','cursos/falsos-amigos-pt-es/quiz.json');
    await page.waitForFunction(() => document.querySelector('.quiz-titulo').textContent.startsWith('1/40'));
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),true);
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({courses:slugs.length,questions,offlineResources:29,mobileWidth:390,pageErrors:errors.length}));
  } finally {
    await browser.close();
  }
})().catch(error => {console.error(error);process.exit(1)});
