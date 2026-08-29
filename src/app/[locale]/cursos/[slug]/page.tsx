import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayCircle, CheckCircle2, Circle } from 'lucide-react';

const prisma = new PrismaClient();

export default async function CoursePage({ params }: { params: { slug: string } }) {
  const course = await prisma.course.findUnique({
    where: { slug: params.slug },
    include: {
      lessons: {
        orderBy: { order: 'asc' }
      }
    }
  });

  if (!course) {
    notFound();
  }

  // Hardcode user for MVP
  const user = await prisma.user.findFirst({ where: { email: 'student@manosabiertas.org' } });
  
  let enrollment = null;
  let progresses: Record<string, boolean> = {};

  if (user) {
    enrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: user.id, courseId: course.id } },
      include: { lessonProgress: true }
    });
    
    if (enrollment) {
      enrollment.lessonProgress.forEach(lp => {
        progresses[lp.lessonId] = lp.completed;
      });
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="mb-8 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{course.description}</p>
          <div className="flex items-center gap-4 text-sm font-medium">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">{course.category}</span>
            <span>Nivel: {course.level}</span>
          </div>
        </div>
        
        {course.imageUrl && (
          <div className="md:w-1/3 aspect-video relative rounded-xl overflow-hidden shadow-lg">
            <img src={course.imageUrl} alt={course.title} className="object-cover w-full h-full" />
          </div>
        )}
      </div>

      <h2 className="text-2xl font-bold mb-6">Contenido del Curso</h2>
      
      <div className="space-y-4">
        {course.lessons.map((lesson, index) => {
          const isCompleted = progresses[lesson.id];
          
          return (
            <Card key={lesson.id} className="overflow-hidden hover:border-primary/50 transition-colors">
              <div className="flex items-center p-0">
                <div className="p-6 flex-1">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                      ) : (
                        <Circle className="w-8 h-8 text-muted-foreground/30" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        Lección {index + 1}: {lesson.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-1 mt-1 text-sm">{lesson.content}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-muted/30 h-full border-l flex items-center justify-center">
                  <Button asChild variant={isCompleted ? "outline" : "default"}>
                    <Link href={`/cursos/${course.slug}/leccion/${lesson.id}`}>
                      <PlayCircle className="w-4 h-4 mr-2" />
                      {isCompleted ? 'Repasar' : 'Comenzar'}
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
