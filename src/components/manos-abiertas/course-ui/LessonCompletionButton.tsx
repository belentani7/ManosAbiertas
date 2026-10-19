"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCourseProgress } from "./useCourseProgress";

interface Props {
  courseId: string;
  lessonId: string;
  totalLessons: number;
}

export function LessonCompletionButton({ courseId, lessonId, totalLessons }: Props) {
  const { ready, isCompleted, markCompleted } = useCourseProgress(courseId, totalLessons);
  const completed = isCompleted(lessonId);

  return (
    <div className="flex flex-col items-end gap-2">
      <Button
        type="button"
        size="lg"
        className="gap-2"
        disabled={!ready || completed}
        onClick={() => markCompleted(lessonId)}
        aria-label={completed ? "Lección completada" : "Marcar lección como completada"}
      >
        <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
        {completed ? "Lección completada" : ready ? "Marcar como completada" : "Cargando progreso…"}
      </Button>
      <p className="text-xs text-muted-foreground" role="status" aria-live="polite">
        {completed
          ? "Progreso guardado en este navegador."
          : "No se usa una cuenta compartida ni se envía este progreso al servidor."}
      </p>
    </div>
  );
}
