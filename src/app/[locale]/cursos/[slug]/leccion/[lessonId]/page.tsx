import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { LessonCompletionButton } from "@/components/manos-abiertas/course-ui/LessonCompletionButton";
import { youtubeEmbedUrl } from "@/lib/video-embed";

const prisma = new PrismaClient();


export default async function LessonPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string; lessonId: string }>;
}) {
  const { locale, slug, lessonId } = await params;
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { course: true },
  });
  // A valid lesson ID must not expose a draft course or a different course's content.
  if (!lesson || !lesson.course.published || lesson.course.slug !== slug) notFound();

  const lessonCount = await prisma.lesson.count({ where: { courseId: lesson.courseId } });
  const videoEmbed = youtubeEmbedUrl(lesson.videoUrl);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6">
      <Link
        href={`/${locale}/cursos/${slug}`}
        className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="mr-1 h-4 w-4" aria-hidden="true" />
        Volver al curso
      </Link>
      <div className="space-y-6">
        <div>
          <h1 className="mb-2 text-3xl font-bold">{lesson.title}</h1>
          <p className="text-muted-foreground">{lesson.course.title}</p>
        </div>
        {videoEmbed && (
          <div className="aspect-video overflow-hidden rounded-xl border bg-black shadow-xl">
            <iframe
              width="100%"
              height="100%"
              src={videoEmbed}
              title={`Vídeo educativo: ${lesson.title}`}
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
        <article className="prose prose-neutral max-w-none rounded-xl border bg-card p-6 dark:prose-invert">
          <h2 className="mb-4 text-xl font-semibold">Contenido de la lección</h2>
          <p className="whitespace-pre-wrap">{lesson.content}</p>
        </article>
        <div className="flex justify-end border-t pt-4">
          <LessonCompletionButton
            courseId={lesson.courseId}
            lessonId={lesson.id}
            totalLessons={lessonCount}
          />
        </div>
      </div>
    </div>
  );
}
