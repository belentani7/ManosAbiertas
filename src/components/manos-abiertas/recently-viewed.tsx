'use client';

import { motion } from 'framer-motion';
import { Clock, Trash2, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRecentItems } from '@/hooks/use-recent-items';
import { useAppStore } from '@/stores/app-store';
import { cn } from '@/lib/utils';

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  resource: { label: 'Recurso', color: 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300' },
  lesson: { label: 'Lección', color: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950 dark:text-fuchsia-300' },
  article: { label: 'Artículo', color: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' },
  event: { label: 'Evento', color: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' },
};

export function RecentlyViewed() {
  const { recent, clearRecent } = useRecentItems();
  const { setActiveSection } = useAppStore();

  if (recent.length === 0) return null;

  return (
    <section className="container mx-auto max-w-7xl px-4 py-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-lg font-bold">Visto recientemente</h2>
          <Badge variant="secondary" className="text-[10px]">{recent.length}</Badge>
        </div>
        <button
          onClick={clearRecent}
          className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
        >
          <Trash2 className="h-3 w-3" />
          Limpiar
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2">
        {recent.map((item, i) => {
          const typeInfo = TYPE_LABELS[item.type];
          return (
            <motion.button
              key={`${item.type}-${item.id}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setActiveSection(item.section as never)}
              className="group flex-shrink-0 w-56"
            >
              <Card className="card-hover border-border/60 hover:border-primary/40 h-full">
                <CardContent className="p-3">
                  <div className="flex items-start gap-2 mb-1.5">
                    <span className="text-lg flex-shrink-0">{item.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-xs leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </div>
                      {item.subtitle && (
                        <div className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={cn('text-[9px] py-0 h-4', typeInfo?.color)}>
                      {typeInfo?.label}
                    </Badge>
                    <span className="text-[9px] text-muted-foreground">
                      {formatTimeAgo(item.timestamp)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}

function formatTimeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'ahora';
  if (minutes < 60) return `hace ${minutes}min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `hace ${hours}h`;
  const days = Math.floor(hours / 24);
  return `hace ${days}d`;
}
