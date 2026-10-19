import { PrismaClient } from "@prisma/client";
import { LearnerDashboard } from "@/components/manos-abiertas/course-ui/LearnerDashboard";

const prisma = new PrismaClient();

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const courses = await prisma.course.findMany({
    where: { published: true },
    select: {
      id: true,
      slug: true,
      title: true,
      category: true,
      level: true,
      _count: { select: { lessons: true } },
    },
    orderBy: { title: "asc" },
  });

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-2 text-4xl font-bold">Tu espacio de aprendizaje</h1>
      <p className="mb-4 text-muted-foreground">
        Continúa tus cursos y consulta tu progreso. No necesitas una cuenta.
      </p>
      <p className="mb-8 text-sm text-muted-foreground">
        Tus datos se conservan únicamente en este navegador: puedes exportarlos, restaurarlos o eliminarlos.
        Todavía no existe sincronización entre dispositivos.
      </p>
      <LearnerDashboard
        locale={locale}
        courses={courses.map((course) => ({
          id: course.id,
          slug: course.slug,
          title: course.title,
          category: course.category,
          level: course.level,
          lessonCount: course._count.lessons,
        }))}
      />
    </div>
  );
}
