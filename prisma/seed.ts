import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create a default user
  const user = await prisma.user.upsert({
    where: { email: 'student@manosabiertas.org' },
    update: {},
    create: {
      email: 'student@manosabiertas.org',
      name: 'Estudiante Estrella',
      passwordHash: 'hashed_password_placeholder',
    },
  })

  // Create a sample course
  const course = await prisma.course.upsert({
    where: { slug: 'introduccion-ia' },
    update: {},
    create: {
      title: 'Introducción a la Inteligencia Artificial',
      slug: 'introduccion-ia',
      description: 'Aprende los conceptos básicos de IA, Machine Learning y Redes Neuronales.',
      category: 'Tecnología',
      level: 'BEGINNER',
      published: true,
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
      lessons: {
        create: [
          {
            title: '¿Qué es la IA?',
            content: 'La inteligencia artificial es el campo de estudio que se enfoca en crear sistemas capaces de realizar tareas que normalmente requieren inteligencia humana.',
            order: 1,
            videoUrl: 'https://www.youtube.com/watch?v=2ePf9rue1Ao',
          },
          {
            title: 'Machine Learning vs Deep Learning',
            content: 'El Machine Learning es un subcampo de la IA, mientras que el Deep Learning es un subcampo del Machine Learning basado en redes neuronales artificiales.',
            order: 2,
            videoUrl: 'https://www.youtube.com/watch?v=vyNt7zEU2vE',
          }
        ]
      }
    }
  })

  // Enroll user
  const enrollment = await prisma.enrollment.upsert({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId: course.id,
      }
    },
    update: {},
    create: {
      userId: user.id,
      courseId: course.id,
      status: 'IN_PROGRESS',
    }
  })

  console.log({ user, course, enrollment })
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
