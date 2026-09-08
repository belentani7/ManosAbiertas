'use client';
import { EnhancedHero } from './enhanced-hero';
import { LevelAccessCard } from './level-access-card';
import { ResourceDiscovery } from './resource-discovery';
import { motion } from 'framer-motion';

export function HomeLayoutV2() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-brand-saffron/5">
      <div className="container mx-auto px-4 py-8 space-y-12 max-w-4xl">
        {/* Hero Section */}
        <EnhancedHero />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: User Level & Access */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1"
          >
            <LevelAccessCard userLevel={1} />
          </motion.div>

          {/* Right Column: Resources Discovery */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2"
          >
            <ResourceDiscovery />
          </motion.div>
        </div>

        {/* Info Cards Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {/* Card 1: Cursos */}
          <div className="group relative p-6 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-brand-warm/10 hover:border-brand-warm/30 transition-all hover:shadow-lg dark:hover:shadow-orange-500/10">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <span className="text-xl">📚</span>
              </div>
              <h3 className="font-bold text-foreground">50+ Cursos</h3>
              <p className="text-sm text-muted-foreground">
                IA, Excel, idiomas y emprendimiento con certificados verificables
              </p>
            </div>
          </div>

          {/* Card 2: CV */}
          <div className="group relative p-6 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-brand-warm/10 hover:border-brand-warm/30 transition-all hover:shadow-lg dark:hover:shadow-orange-500/10">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <span className="text-xl">📄</span>
              </div>
              <h3 className="font-bold text-foreground">CV Profesional</h3>
              <p className="text-sm text-muted-foreground">
                Generador inteligente con plantillas adaptadas por país
              </p>
            </div>
          </div>

          {/* Card 3: Comunidad */}
          <div className="group relative p-6 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-brand-warm/10 hover:border-brand-warm/30 transition-all hover:shadow-lg dark:hover:shadow-orange-500/10">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                <span className="text-xl">👥</span>
              </div>
              <h3 className="font-bold text-foreground">Comunidad Global</h3>
              <p className="text-sm text-muted-foreground">
                Conecta con migrantes, mentores y oportunidades laborales
              </p>
            </div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center"
        >
          <div className="p-4">
            <p className="text-3xl font-bold text-brand-warm">12.4K+</p>
            <p className="text-sm text-muted-foreground">Usuarios activos</p>
          </div>
          <div className="p-4">
            <p className="text-3xl font-bold text-brand-warm">39</p>
            <p className="text-sm text-muted-foreground">Idiomas soportados</p>
          </div>
          <div className="p-4">
            <p className="text-3xl font-bold text-brand-warm">100%</p>
            <p className="text-sm text-muted-foreground">Gratis y sin anuncios</p>
          </div>
          <div className="p-4">
            <p className="text-3xl font-bold text-brand-warm">24/7</p>
            <p className="text-sm text-muted-foreground">Offline habilitado</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
