"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

interface FlashCardProps {
  front: string;
  back: string;
  hint?: string;
}

export default function FlashCard({ front, back, hint }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {isFlipped ? "Respuesta" : "Pregunta"} — toca para {isFlipped ? "ocultar" : "ver la respuesta"}
      </p>

      <div
        className="relative w-full max-w-md h-56 cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 30, damping: 20 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front */}
          <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 flex flex-col items-center justify-center text-center shadow-lg">
            <p className="text-xl font-bold text-white leading-relaxed">{front}</p>
          </div>

          {/* Back */}
          <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-white dark:bg-gray-800 border-2 border-emerald-200 dark:border-emerald-700 p-6 flex flex-col items-center justify-center text-center shadow-lg rotate-y-180">
            <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">{back}</p>
          </div>
        </motion.div>
      </div>

      {hint && !isFlipped && (
        <p className="text-sm text-amber-600 dark:text-amber-400 italic">Pista: {hint}</p>
      )}

      <button
        onClick={() => setIsFlipped(false)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <RotateCcw className="w-4 h-4" />
        Reiniciar
      </button>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
