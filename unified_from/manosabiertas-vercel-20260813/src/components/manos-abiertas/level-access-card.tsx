'use client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Lock, Unlock } from 'lucide-react';
import { motion } from 'framer-motion';

interface UserLevel {
  level: number;
  label: string;
  xp: number;
  xpMax: number;
  perksUnlocked: string[];
  perksLocked: string[];
}

const LEVELS: UserLevel[] = [
  {
    level: 1,
    label: 'Aprendiz',
    xp: 450,
    xpMax: 500,
    perksUnlocked: [
      '✅ 3 cursos gratis (Ofimática)',
      '✅ CV simple (plantillas básicas)',
      '✅ Guías legales (España)',
    ],
    perksLocked: ['Mentor acceso', 'Marketplace', 'Contenido premium'],
  },
  {
    level: 2,
    label: 'Explorador',
    xp: 0,
    xpMax: 1000,
    perksUnlocked: ['Mentor acceso', 'Comunidad avanzada'],
    perksLocked: ['Marketplace', 'Contenido premium'],
  },
  {
    level: 3,
    label: 'Maestro',
    xp: 0,
    xpMax: 2000,
    perksUnlocked: ['Marketplace', 'Contenido premium'],
    perksLocked: [],
  },
];

export function LevelAccessCard({ userLevel = 1 }: { userLevel?: number }) {
  const current = LEVELS[userLevel - 1] || LEVELS[0];
  const next = userLevel < LEVELS.length ? LEVELS[userLevel] : null;

  const progressPercent = (current.xp / current.xpMax) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden border-l-4 border-l-brand-warm bg-gradient-to-br from-brand-saffron/10 to-transparent">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Tu Nivel Actual</CardTitle>
            <Badge variant="default" className="bg-brand-warm">
              Nivel {current.level}
            </Badge>
          </div>
          <p className="text-2xl font-bold text-brand-warm">{current.label}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* XP Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progreso</span>
              <span className="font-medium">
                {current.xp} / {current.xpMax} XP
              </span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>

          {/* Current Perks */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">✅ Tu acceso actual:</p>
            <ul className="space-y-1">
              {current.perksUnlocked.map((perk, i) => (
                <li key={i} className="text-sm text-foreground/80">
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          {/* Locked Perks */}
          {current.perksLocked.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground/60">🔒 Próximo nivel:</p>
              <ul className="space-y-1">
                {current.perksLocked.map((perk, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock size={14} className="text-muted-foreground/60" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Next Level Preview */}
          {next && (
            <div className="rounded-lg border border-brand-warm/20 bg-brand-warm/5 p-3">
              <p className="text-sm font-semibold text-brand-warm">
                ⬆️ Sigue aprendiendo
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Faltan {next.xpMax - current.xp} XP para desbloquear {next.label}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
