import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, CheckCircle } from 'lucide-react';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export default async function LessonPage({ params }: { params: { slug: string, lessonId: string } }) {
  const lesson = await prisma.lesson.findUnique({
    where: { id: params.lessonId },
    include: {
      course: true
    }
  });

  if (!lesson) {
    notFound();
  }

  // Handle completion form action
  async function markCompleted() {
    'use server'
    const user = await prisma.user.findFirst({ where: { email: 'student@manosabiertas.org' } });
    if (user) {
      const enrollment = await prisma.enrollment.findUnique({
        where: { userId_courseId: { userId: user.id, courseId: lesson!.courseId } }
      });
      if (enrollment) {
        await prisma.lessonProgress.upsert({
          where: { enrollmentId_lessonId: { enrollmentId: enrollment.id, lessonId: lesson!.id } },
          update: { completed: true },
          create: { enrollmentId: enrollment.id, lessonId: lesson!.id, completed: true }
        });
        revalidatePath(`/cursos/${params.slug}`);
      }
    }
  }

  return (
    <div className="container mx-auto py-6 px-4 max-w-4xl">
      <Link href={`/cursos/${params.slug}`} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6">
        <ChevronLeft className="w-4 h-4 mr-1" />
        Volver al Curso
      </Link>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
          <p className="text-muted-foreground">{lesson.course.title}</p>
        </div>

        {lesson.videoUrl && (
          <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-xl border">
            {/* Simple Youtube Embed iframe generator */}
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${lesson.videoUrl.split('v=')[1]}`}
              title={lesson.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div className="prose prose-neutral dark:prose-invert max-w-none bg-card p-6 rounded-xl border">
          <h3 className="text-xl font-semibold mb-4">Contenido de la Lección</h3>
          <p className="whitespace-pre-wrap">{lesson.content}</p>
        </div>
        
        <div className="flex justify-end pt-4 border-t">
          <form action={markCompleted}>
            <Button size="lg" className="gap-2">
              <CheckCircle className="w-5 h-5" />
              Marcar como Completada
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
