import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.findFirst({
    where: { email: 'student@manosabiertas.org' },
  });

  if (!user) {
    console.error("User not found, run main seed first");
    return;
  }

  // Cursos Office Pack
  const officeCourse = await prisma.course.upsert({
    where: { slug: 'office-pack-esencial' },
    update: {},
    create: {
      title: 'Office Pack Esencial',
      slug: 'office-pack-esencial',
      description: 'Domina Word, Excel y PowerPoint desde cero. Ideal para mejorar tu CV.',
      category: 'Productividad',
      level: 'BEGINNER',
      published: true,
      imageUrl: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec',
      lessons: {
        create: [
          {
            title: 'Introducción a Word',
            content: 'Aprende a redactar cartas formales y documentos.',
            order: 1,
            videoUrl: 'https://www.youtube.com/watch?v=1',
          },
          {
            title: 'Excel Básico para Finanzas',
            content: 'Fórmulas esenciales, tablas y presupuestos.',
            order: 2,
            videoUrl: 'https://www.youtube.com/watch?v=2',
          },
          {
            title: 'Presentaciones PowerPoint',
            content: 'Crea diapositivas visualmente atractivas.',
            order: 3,
            videoUrl: 'https://www.youtube.com/watch?v=3',
          }
        ]
      }
    }
  });

  // Herramientas HTML (convertidas a curso / tutorial)
  const htmlCourse = await prisma.course.upsert({
    where: { slug: 'herramientas-html-web' },
    update: {},
    create: {
      title: 'Desarrollo Web: Herramientas HTML',
      slug: 'herramientas-html-web',
      description: 'Conoce las herramientas prácticas para crear páginas web con HTML5.',
      category: 'Tecnología',
      level: 'INTERMEDIATE',
      published: true,
      imageUrl: 'https://images.unsplash.com/photo-1627398240411-80c2a6342c50',
      lessons: {
        create: [
          {
            title: 'Estructura Básica HTML',
            content: 'Cómo estructurar el documento HTML5 correctamente.',
            order: 1,
            videoUrl: 'https://www.youtube.com/watch?v=4',
          },
          {
            title: 'Formularios y Entradas',
            content: 'Creación de herramientas interactivas con formularios HTML.',
            order: 2,
            videoUrl: 'https://www.youtube.com/watch?v=5',
          }
        ]
      }
    }
  });

  // Enroll user
  await prisma.enrollment.upsert({
    where: { userId_courseId: { userId: user.id, courseId: officeCourse.id } },
    update: {},
    create: { userId: user.id, courseId: officeCourse.id, status: 'IN_PROGRESS' }
  });

  await prisma.enrollment.upsert({
    where: { userId_courseId: { userId: user.id, courseId: htmlCourse.id } },
    update: {},
    create: { userId: user.id, courseId: htmlCourse.id, status: 'IN_PROGRESS' }
  });

  console.log("Seeded Office Pack & HTML Tools as LMS Courses!");
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
