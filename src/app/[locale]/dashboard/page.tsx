import { PrismaClient } from '@prisma/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function DashboardPage() {
  // Hardcoded for MVP, should come from NextAuth session
  const user = await prisma.user.findFirst({
    where: { email: 'student@manosabiertas.org' },
    include: {
      enrollments: {
        include: {
          course: true,
          lessonProgress: true
        }
      }
    }
  });

  if (!user) {
    return <div>User not found. Run seed script.</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <h1 className="text-4xl font-bold mb-2">Bienvenido de nuevo, {user.name}</h1>
      <p className="text-muted-foreground mb-8">Continúa tu aprendizaje y alcanza tus metas.</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {user.enrollments.map((enrollment) => {
          // Calculate progress
          const totalLessons = enrollment.course.lessons?.length || 2; // Default to 2 for seed
          const completedLessons = enrollment.lessonProgress.filter(p => p.completed).length;
          const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

          return (
            <Card key={enrollment.id} className="hover:shadow-lg transition-shadow">
              <div className="h-32 bg-muted relative rounded-t-lg overflow-hidden">
                {enrollment.course.imageUrl && (
                  <img 
                    src={enrollment.course.imageUrl} 
                    alt={enrollment.course.title} 
                    className="object-cover w-full h-full opacity-80"
                  />
                )}
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{enrollment.course.title}</CardTitle>
                <CardDescription>{enrollment.course.category} • Nivel {enrollment.course.level}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progreso</span>
                      <span className="font-medium">{progressPercentage}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                  <Link 
                    href={`/cursos/${enrollment.course.slug}`} 
                    className="inline-flex w-full justify-center items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Continuar Curso
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
