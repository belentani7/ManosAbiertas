'use client';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export function EnhancedHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden rounded-2xl md:rounded-3xl p-8 md:p-12 mb-8"
    >
      {/* Multi-layer gradient background */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient: blue to orange */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-orange-500 to-orange-700 opacity-90" />

        {/* Animated overlay */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-30"
          style={{ backgroundSize: '200% 200%' }}
        />

        {/* Floating shapes (decorative) */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
          className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: 1,
          }}
          className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <motion.div variants={itemVariants} className="relative z-10 space-y-6 max-w-2xl">
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 w-fit"
        >
          <Sparkles size={16} className="text-white" />
          <span className="text-sm font-medium text-white">Nueva experiencia visual</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Bienvenido a{' '}
          <span className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent">
            Manos Abiertas
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-white/90 leading-relaxed max-w-xl"
        >
          Aprende IA y ofimática, crea tu CV, accede a guías legales y conecta con tu comunidad. Todo en español, portugués e inglés.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 pt-4"
        >
          <Button
            size="lg"
            className="bg-white text-orange-600 hover:bg-white/90 font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Empezar ahora
            <ArrowRight size={20} className="ml-2" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-white/40 text-white hover:bg-white/10 hover:border-white/60 font-semibold"
          >
            Ver cómo funciona
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 md:gap-6 pt-4 text-white/80 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white/60" />
            <span>50+ cursos disponibles</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white/60" />
            <span>100% gratis y offline</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white/60" />
            <span>Certificados verificables</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
