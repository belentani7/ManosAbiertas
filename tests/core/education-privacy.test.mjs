import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { PROJECT_ROOT } from "../../scripts/test-core.mjs";
import { youtubeEmbedUrl } from "../../src/lib/video-embed.ts";

test("educational embeds accept legitimate YouTube IDs, never arbitrary remote URLs", () => {
  const id = "2ePf9rue1Ao";
  const expected = `https://www.youtube-nocookie.com/embed/${id}`;
  assert.equal(youtubeEmbedUrl(`https://www.youtube.com/watch?v=${id}&t=30`), expected);
  assert.equal(youtubeEmbedUrl(`https://youtu.be/${id}`), expected);
  assert.equal(youtubeEmbedUrl(`https://www.youtube.com/embed/${id}`), expected);
  for (const unsafe of [
    "http://www.youtube.com/watch?v=2ePf9rue1Ao",
    "https://www.youtube.com.evil.example/watch?v=2ePf9rue1Ao",
    "javascript:alert(1)",
    "https://vimeo.com/123",
    "https://www.youtube.com/watch?v=bad",
    "https://youtu.be/2ePf9rue1Ao/more",
    null,
  ]) {
    assert.equal(youtubeEmbedUrl(unsafe), null, String(unsafe));
  }
});

test("public course and lesson pages never write progress to a shared demo user", () => {
  const read = (path) => readFileSync(join(PROJECT_ROOT, path), "utf8");
  const course = read("src/app/[locale]/cursos/[slug]/page.tsx");
  const lesson = read("src/app/[locale]/cursos/[slug]/leccion/[lessonId]/page.tsx");
  const dashboard = read("src/app/[locale]/dashboard/page.tsx");
  const hook = read("src/components/manos-abiertas/course-ui/useCourseProgress.ts");
  assert.doesNotMatch(course + lesson + dashboard, /student@manosabiertas\.org|lessonProgress\.upsert|enrollment\.findUnique/);
  assert.doesNotMatch(dashboard, /const totalLessons = 2/);
  assert.match(dashboard, /where: \{ published: true \}/);
  assert.match(dashboard, /LearnerDashboard/);
  assert.match(course, /!course\.published/);
  assert.match(lesson, /lesson\.course\.slug !== slug/);
  assert.match(lesson, /LessonCompletionButton/);
  assert.match(hook, /dirtyKey !== storageKey/);
  assert.match(hook, /manos-abiertas-local-data-change/);
});
