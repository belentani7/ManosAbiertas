'use client';

import { Fragment } from 'react';
import { AlertTriangle, ExternalLink, Info, Lightbulb, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SimpleMarkdownProps {
  content: string;
  className?: string;
}

/**
 * Lightweight markdown renderer for lesson content.
 * Supports: headings (#, ##, ###), bold (**text**), inline code (`code`),
 * links ([text](url)), unordered lists (-, *), ordered lists (1.),
 * blockquotes (>), horizontal rules (---), and inline formatting.
 */
export function SimpleMarkdown({ content, className }: SimpleMarkdownProps) {
  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let listItems: { ordered: boolean; items: string[] } | null = null;

  function flushList(key: string) {
    if (!listItems) return;
    if (listItems.ordered) {
      blocks.push(
        <ol key={key} className="my-2 ml-5 space-y-1.5 list-decimal marker:text-primary marker:font-semibold">
          {listItems.items.map((item, i) => (
            <li key={i} className="text-sm text-foreground/90 leading-relaxed pl-1">
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
    } else {
      blocks.push(
        <ul key={key} className="my-2 ml-5 space-y-1 list-disc marker:text-primary">
          {listItems.items.map((item, i) => (
            <li key={i} className="text-sm text-foreground/90 leading-relaxed pl-1">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
    }
    listItems = null;
  }

  lines.forEach((line, i) => {
    const trimmed = line.trim();

    // Empty line
    if (!trimmed) {
      flushList(`list-${i}`);
      blocks.push(<div key={`sp-${i}`} className="h-2.5" />);
      return;
    }

    // Horizontal rule
    if (trimmed === '---' || trimmed === '***') {
      flushList(`list-${i}`);
      blocks.push(<hr key={`hr-${i}`} className="my-4 border-border" />);
      return;
    }

    // Headings
    if (trimmed.startsWith('### ')) {
      flushList(`list-${i}`);
      blocks.push(
        <h3 key={`h3-${i}`} className="text-base font-semibold mt-5 mb-2 text-foreground flex items-center gap-1.5">
          <span className="w-1 h-4 rounded bg-primary/60" />
          {trimmed.slice(4)}
        </h3>
      );
      return;
    }
    if (trimmed.startsWith('## ')) {
      flushList(`list-${i}`);
      blocks.push(
        <h2 key={`h2-${i}`} className="text-lg font-bold mt-6 mb-2.5 text-foreground pb-1 border-b border-border/60">
          {trimmed.slice(3)}
        </h2>
      );
      return;
    }
    if (trimmed.startsWith('# ')) {
      flushList(`list-${i}`);
      blocks.push(
        <h1 key={`h1-${i}`} className="text-xl font-bold mt-5 mb-3 text-foreground">
          {trimmed.slice(2)}
        </h1>
      );
      return;
    }

    // Ordered list item (1. 2. etc.)
    const orderedMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (orderedMatch) {
      if (!listItems || !listItems.ordered) {
        flushList(`list-${i}`);
        listItems = { ordered: true, items: [] };
      }
      listItems.items.push(orderedMatch[2]);
      return;
    }

    // Unordered list item
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (!listItems || listItems.ordered) {
        flushList(`list-${i}`);
        listItems = { ordered: false, items: [] };
      }
      listItems.items.push(trimmed.slice(2));
      return;
    }

    // Blockquote (with special styling for warnings/tips)
    if (trimmed.startsWith('> ')) {
      flushList(`list-${i}`);
      const text = trimmed.slice(2);
      const lower = text.toLowerCase();

      let icon = <Info className="h-4 w-4" />;
      let bgClass = 'bg-blue-50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-800';
      let textClass = 'text-blue-900 dark:text-blue-200';

      if (lower.includes('importante') || lower.includes('atención') || lower.includes('cuidado') || lower.includes('⚠')) {
        icon = <AlertTriangle className="h-4 w-4" />;
        bgClass = 'bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800';
        textClass = 'text-amber-900 dark:text-amber-200';
      } else if (lower.includes('consejo') || lower.includes('tip') || lower.includes('💡') || lower.includes('recuerda')) {
        icon = <Lightbulb className="h-4 w-4" />;
        bgClass = 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800';
        textClass = 'text-emerald-900 dark:text-emerald-200';
      } else if (lower.includes('hecho') || lower.includes('✓') || lower.includes('correcto')) {
        icon = <CheckCircle2 className="h-4 w-4" />;
        bgClass = 'bg-teal-50 dark:bg-teal-950/20 border-teal-300 dark:border-teal-800';
        textClass = 'text-teal-900 dark:text-teal-200';
      }

      blocks.push(
        <blockquote key={`bq-${i}`} className={cn('my-3 border-l-4 rounded-r-lg p-3 flex gap-2.5', bgClass)}>
          <span className={cn('flex-shrink-0 mt-0.5', textClass)}>{icon}</span>
          <div className={cn('text-sm leading-relaxed', textClass)}>
            {renderInline(text)}
          </div>
        </blockquote>
      );
      return;
    }

    // Regular paragraph
    flushList(`list-${i}`);
    blocks.push(
      <p key={`p-${i}`} className="text-sm text-foreground/90 my-2 leading-relaxed">
        {renderInline(trimmed)}
      </p>
    );
  });

  flushList('list-final');

  return <div className={cn('space-y-0', className)}>{blocks}</div>;
}

/**
 * Render inline markdown: **bold**, *italic*, `code`, [text](url)
 */
function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  // Combined regex for bold, italic, code, and links
  const pattern = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(`([^`]+)`)|(\[([^\]]+)\]\(([^)]+)\))/;
  //                              bold            italic        code          link

  while (remaining.length > 0) {
    const match = remaining.match(pattern);
    if (!match) {
      nodes.push(<Fragment key={key++}>{remaining}</Fragment>);
      break;
    }

    const matchIndex = match.index!;
    if (matchIndex > 0) {
      nodes.push(<Fragment key={key++}>{remaining.slice(0, matchIndex)}</Fragment>);
    }

    if (match[2]) {
      // Bold
      nodes.push(<strong key={key++} className="font-semibold text-foreground">{match[2]}</strong>);
    } else if (match[4]) {
      // Italic
      nodes.push(<em key={key++} className="italic">{match[4]}</em>);
    } else if (match[6]) {
      // Inline code
      nodes.push(
        <code key={key++} className="px-1.5 py-0.5 rounded bg-muted text-primary text-[13px] font-mono">
          {match[6]}
        </code>
      );
    } else if (match[8] && match[9]) {
      // Link
      const url = match[9];
      const isExternal = url.startsWith('http');
      nodes.push(
        <a
          key={key++}
          href={url}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-primary underline decoration-primary/30 hover:decoration-primary underline-offset-2 inline-flex items-center gap-0.5"
        >
          {match[8]}
          {isExternal && <ExternalLink className="h-3 w-3 inline" />}
        </a>
      );
    }

    remaining = remaining.slice(matchIndex + match[0].length);
  }

  return nodes;
}
