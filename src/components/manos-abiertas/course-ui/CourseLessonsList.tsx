"use client";

import Link from "next/link";
import { CheckCircle2, Circle, PlayCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCourseProgress } from "./useCourseProgress";

export interface CourseLessonPreview {
  id: string;
  title: string;
  excerpt: string;
}

interface Props {
  courseId: string;
  slug: string;
  locale: string;
  lessons: CourseLessonPreview[];
}

/** No shared demo account: progress belongs to this browser until real auth is available. */
export function CourseLessonsList({ courseId, slug, locale, lessons }: Props) {
  const { ready, isCompleted, totalCompleted, completionPercentage } =
    useCourseProgress(courseId, lessons.length);

  return (
    <section aria-label="Lecciones del curso">
      <p className="mb-4 text-sm text-muted-foreground" role="status" aria-live="polite">
        {ready
          ? `${totalCompleted} de ${lessons.length} lecciones completadas · ${completionPercentage}%`
          : "Cargando el progreso guardado en este dispositivo…"}
      </p>
      <div className="space-y-4">
        {lessons.map((lesson, index) => {
          const completed = ready && isCompleted(lesson.id);
          return (
            <Card key={lesson.id} className="overflow-hidden hover:border-primary/50 transition-colors">
              <div className="flex items-center">
                <div className="flex-1 p-6">
                  <div className="flex items-start gap-4">
                    {completed
                      ? <CheckCircle2 className="h-7 w-7 shrink-0 text-green-600" aria-hidden="true" />
                      : <Circle className="h-7 w-7 shrink-0 text-muted-foreground/40" aria-hidden="true" />}
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold">Lección {index + 1}: {lesson.title}</h3>
                      {lesson.excerpt && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{lesson.excerpt}</p>}
                    </div>
                  </div>
                </div>
                <div className="border-l bg-muted/30 p-4">
                  <Button asChild variant={completed ? "outline" : "default"}>
                    <Link href={`/${locale}/cursos/${slug}/leccion/${lesson.id}`}>
                      <PlayCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                      {completed ? "Repasar" : "Comenzar"}
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Sin registro: el progreso se conserva solo en este navegador y puede exportarse o borrarse desde tus datos.
      </p>
    </section>
  );
}
