"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Lock, Play, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
}

interface CourseLayoutProps {
  courseTitle: string;
  lessons: Lesson[];
  currentLessonIndex: number;
  children: React.ReactNode;
  onComplete: (lessonId: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function CourseLayout({
  courseTitle,
  lessons,
  currentLessonIndex,
  children,
  onComplete,
  onNext,
  onPrev,
}: CourseLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const currentLesson = lessons[currentLessonIndex];
  const completedCount = lessons.filter((l) => l.completed).length;
  const progress = Math.round((completedCount / lessons.length) * 100);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-80" : "w-0"
        } transition-all duration-300 overflow-hidden bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg text-gray-900 dark:text-white truncate">
              {courseTitle}
            </h2>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>{completedCount}/{lessons.length} lecciones</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        {/* Lessons list */}
        <nav className="flex-1 overflow-y-auto p-2">
          {lessons.map((lesson, index) => (
            <button
              key={lesson.id}
              disabled={lesson.locked}
              className={`w-full flex items-center gap-3 p-3 rounded-lg mb-1 text-left transition-all ${
                index === currentLessonIndex
                  ? "bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700"
                  : lesson.completed
                  ? "bg-gray-50 dark:bg-gray-800"
                  : lesson.locked
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 ${
                  lesson.completed
                    ? "bg-emerald-500 text-white"
                    : index === currentLessonIndex
                    ? "bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}
              >
                {lesson.completed ? (
                  <Check className="w-4 h-4" />
                ) : lesson.locked ? (
                  <Lock className="w-3 h-3" />
                ) : (
                  index + 1
                )}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {lesson.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {lesson.duration}
                </p>
              </div>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <BookOpen className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          )}
          <div className="flex-1 mx-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {currentLesson?.title}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Lección {currentLessonIndex + 1} de {lessons.length} · {currentLesson?.duration}
            </p>
          </div>
        </header>

        {/* Lesson content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-6 lg:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLesson?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom navigation */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <button
              onClick={onPrev}
              disabled={currentLessonIndex === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </button>

            <button
              onClick={() => {
                if (currentLesson && !currentLesson.completed) {
                  onComplete(currentLesson.id);
                }
                onNext();
              }}
              disabled={currentLessonIndex === lessons.length - 1}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {currentLesson?.completed ? "Siguiente" : "Marcar completada"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}
