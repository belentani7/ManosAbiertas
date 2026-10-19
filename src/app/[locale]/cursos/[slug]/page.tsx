import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { CourseLessonsList } from "@/components/manos-abiertas/course-ui/CourseLessonsList";

const prisma = new PrismaClient();

export default async function CoursePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug },
    include: { lessons: { orderBy: { order: "asc" } } },
  });

  // Draft content is not part of the public learner experience.
  if (!course || !course.published) notFound();

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-8 md:flex-row">
        <div className="flex-1">
          <h1 className="mb-4 text-4xl font-bold">{course.title}</h1>
          <p className="mb-6 text-xl text-muted-foreground">{course.description}</p>
          <div className="flex items-center gap-4 text-sm font-medium">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">{course.category}</span>
            <span>Nivel: {course.level}</span>
          </div>
        </div>
        {course.imageUrl && (
          <div className="relative aspect-video overflow-hidden rounded-xl shadow-lg md:w-1/3">
            {/* Remote cover URL comes from the editorial course catalog. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={course.imageUrl} alt={course.title} className="h-full w-full object-cover" />
          </div>
        )}
      </div>
      <h2 className="mb-6 text-2xl font-bold">Contenido del curso</h2>
      <CourseLessonsList
        courseId={course.id}
        slug={course.slug}
        locale={locale}
        lessons={course.lessons.map((lesson) => ({
          id: lesson.id,
          title: lesson.title,
          excerpt: (lesson.content ?? "").slice(0, 180),
        }))}
      />
    </div>
  );
}
