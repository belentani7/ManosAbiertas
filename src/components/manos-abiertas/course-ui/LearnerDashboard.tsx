"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useCourseProgress } from "./useCourseProgress";

export interface DashboardCourse {
  id: string;
  slug: string;
  title: string;
  category: string;
  level: string;
  lessonCount: number;
}

function LearnerCourseCard({ course, locale }: { course: DashboardCourse; locale: string }) {
  const { ready, completionPercentage, totalCompleted } = useCourseProgress(course.id, course.lessonCount);
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle className="line-clamp-2">{course.title}</CardTitle>
        <CardDescription>{course.category} · Nivel {course.level}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="mb-2 flex justify-between gap-2 text-sm">
            <span>{ready ? `${totalCompleted} de ${course.lessonCount} lecciones` : "Cargando progreso…"}</span>
            <span className="font-medium">{ready ? `${completionPercentage}%` : "—"}</span>
          </div>
          <Progress
            value={ready ? completionPercentage : 0}
            aria-label={`Progreso de ${course.title}`}
            className="h-2"
          />
        </div>
        <Link
          href={`/${locale}/cursos/${course.slug}`}
          className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {ready && totalCompleted > 0 ? "Continuar curso" : "Explorar curso"}
        </Link>
      </CardContent>
    </Card>
  );
}

export function LearnerDashboard({ courses, locale }: { courses: DashboardCourse[]; locale: string }) {
  if (courses.length === 0) {
    return <p className="rounded-lg border p-6">Aún no hay cursos publicados. Vuelve a consultar el catálogo.</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => <LearnerCourseCard key={course.id} course={course} locale={locale} />)}
    </div>
  );
}
