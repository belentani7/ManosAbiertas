"use client";

import { motion } from "framer-motion";
import { Flame, Star, Trophy, Zap, Target } from "lucide-react";

interface GamificationPanelProps {
  xp: number;
  level: number;
  streak: number;
  badges: string[];
  xpForNextLevel: number;
}

const BADGE_INFO: Record<string, { icon: string; label: string; color: string }> = {
  "first-course": { icon: "🎓", label: "Primer curso", color: "bg-blue-100 text-blue-700" },
  "five-courses": { icon: "🏆", label: "5 cursos", color: "bg-amber-100 text-amber-700" },
  "streak-7": { icon: "🔥", label: "7 días", color: "bg-orange-100 text-orange-700" },
  "streak-30": { icon: "⭐", label: "30 días", color: "bg-purple-100 text-purple-700" },
  "quiz-master": { icon: "🧠", label: "Quiz master", color: "bg-emerald-100 text-emerald-700" },
};

export default function GamificationPanel({
  xp,
  level,
  streak,
  badges,
  xpForNextLevel,
}: GamificationPanelProps) {
  const xpInLevel = xp % xpForNextLevel;
  const xpProgress = Math.round((xpInLevel / xpForNextLevel) * 100);

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Level */}
        <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-4 text-white text-center">
          <Star className="w-6 h-6 mx-auto mb-1" />
          <p className="text-3xl font-bold">{level}</p>
          <p className="text-sm opacity-80">Nivel</p>
        </div>

        {/* XP */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-4 text-white text-center">
          <Zap className="w-6 h-6 mx-auto mb-1" />
          <p className="text-3xl font-bold">{xp}</p>
          <p className="text-sm opacity-80">XP total</p>
        </div>

        {/* Streak */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-4 text-white text-center">
          <Flame className="w-6 h-6 mx-auto mb-1" />
          <p className="text-3xl font-bold">{streak}</p>
          <p className="text-sm opacity-80">Racha 🔥</p>
        </div>
      </div>

      {/* XP progress to next level */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Progreso al nivel {level + 1}
          </span>
          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
            {xpInLevel}/{xpForNextLevel} XP
          </span>
        </div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${xpProgress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Logros</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => {
              const info = BADGE_INFO[badge];
              if (!info) return null;
              return (
                <span
                  key={badge}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${info.color}`}
                >
                  <span>{info.icon}</span>
                  {info.label}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
        <div className="flex items-start gap-3">
          <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
          <div>
            <p className="font-medium text-emerald-800 dark:text-emerald-200">¿Cómo ganar más XP?</p>
            <ul className="text-sm text-emerald-700 dark:text-emerald-300 mt-1 space-y-1">
              <li>• +25 XP por lección completada</li>
              <li>• +100 XP por curso terminado</li>
              <li>• +XP extra por rachas largas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
