"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, AlertCircle } from "lucide-react";

interface QuizOption {
  id: string;
  text: string;
  correct: boolean;
}

interface QuizQuestionProps {
  question: string;
  options: QuizOption[];
  explanation: string;
  onAnswer: (correct: boolean) => void;
}

export default function QuizQuestion({
  question,
  options,
  explanation,
  onAnswer,
}: QuizQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const selectedOption = options.find((o) => o.id === selected);
  const isCorrect = selectedOption?.correct ?? false;

  const handleSelect = (optionId: string) => {
    if (answered) return;
    setSelected(optionId);
    setAnswered(true);
    const correct = options.find((o) => o.id === optionId)?.correct ?? false;
    onAnswer(correct);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{question}</h3>

      <div className="space-y-2">
        {options.map((option) => {
          const isSelected = selected === option.id;
          const showResult = answered && isSelected;
          const showCorrect = answered && option.correct;

          return (
            <motion.button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={answered}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                showResult && isCorrect
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30"
                  : showResult && !isCorrect
                  ? "border-red-500 bg-red-50 dark:bg-red-900/30"
                  : showCorrect
                  ? "border-emerald-300 dark:border-emerald-700"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              } ${answered ? "cursor-default" : "cursor-pointer"}`}
              whileHover={!answered ? { scale: 1.01 } : {}}
              whileTap={!answered ? { scale: 0.99 } : {}}
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  showResult && isCorrect
                    ? "bg-emerald-500 text-white"
                    : showResult && !isCorrect
                    ? "bg-red-500 text-white"
                    : showCorrect
                    ? "bg-emerald-200 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}
              >
                {showResult && isCorrect ? (
                  <Check className="w-4 h-4" />
                ) : showResult && !isCorrect ? (
                  <X className="w-4 h-4" />
                ) : (
                  option.id.toUpperCase()
                )}
              </span>
              <span className="text-gray-800 dark:text-gray-200">{option.text}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`flex items-start gap-3 p-4 rounded-xl ${
              isCorrect
                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200"
                : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200"
            }`}
          >
            {isCorrect ? (
              <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-semibold">{isCorrect ? "¡Correcto!" : "Incorrecto"}</p>
              <p className="text-sm mt-1 opacity-90">{explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
