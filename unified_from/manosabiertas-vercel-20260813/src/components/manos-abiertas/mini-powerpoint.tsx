'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Slide {
  id: string;
  title: string;
  content: string;
  bgColor: string;
}

export function MiniPowerPoint() {
  const [slides, setSlides] = useState<Slide[]>([
    {
      id: '1',
      title: 'Mi Presentación',
      content: 'Presiona + para agregar diapositivas',
      bgColor: 'from-blue-500 to-purple-600',
    },
  ]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = slides[currentSlide];

  const addSlide = () => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      title: `Diapositiva ${slides.length + 1}`,
      content: 'Edita el contenido aquí',
      bgColor: 'from-orange-500 to-pink-600',
    };
    setSlides([...slides, newSlide]);
    setCurrentSlide(slides.length);
  };

  const deleteSlide = (idx: number) => {
    if (slides.length > 1) {
      const updated = slides.filter((_, i) => i !== idx);
      setSlides(updated);
      if (currentSlide >= updated.length) {
        setCurrentSlide(updated.length - 1);
      }
    }
  };

  const updateSlide = (field: 'title' | 'content' | 'bgColor', value: string) => {
    const updated = [...slides];
    updated[currentSlide] = { ...updated[currentSlide], [field]: value };
    setSlides(updated);
  };

  const bgColors = [
    'from-blue-500 to-purple-600',
    'from-green-500 to-teal-600',
    'from-orange-500 to-pink-600',
    'from-red-500 to-rose-600',
    'from-indigo-500 to-blue-600',
    'from-amber-500 to-orange-600',
  ];

  const downloadPresentation = () => {
    const html = slides
      .map(
        (s) => `
      <div style="page-break-after: always; padding: 40px; background: linear-gradient(135deg, ${s.bgColor.replace('from-', '').replace('to-', '').replace('-500', '')}, ${s.bgColor.replace('from-', '').replace('-600', '')}); color: white; min-height: 100vh; display: flex; flex-direction: column; justify-content: center;">
        <h1 style="font-size: 3em; font-weight: bold; margin: 0 0 20px 0;">${s.title}</h1>
        <p style="font-size: 1.5em; margin: 0; opacity: 0.9;">${s.content}</p>
      </div>
    `
      )
      .join('');

    const fullHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Mi Presentación</title>
        <style>
          body { margin: 0; font-family: Arial, sans-serif; }
        </style>
      </head>
      <body>${html}</body>
      </html>
    `;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'presentacion.html';
    a.click();
  };

  return (
    <Card className="border-l-4 border-l-purple-500">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>🎥 Mini PowerPoint</span>
          <Button
            size="sm"
            variant="outline"
            onClick={downloadPresentation}
            className="gap-2"
          >
            <Download size={16} />
            Descargar HTML
          </Button>
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Crea diapositivas rápidas, personaliza colores, exporta como HTML
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Preview Slide */}
        <div
          className={`relative h-80 rounded-lg bg-gradient-to-br ${slide.bgColor} p-8 text-white flex flex-col justify-center shadow-lg`}
        >
          <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
          <p className="text-xl opacity-90">{slide.content}</p>
          <span className="absolute bottom-4 right-4 text-sm opacity-75">
            Diapositiva {currentSlide + 1} de {slides.length}
          </span>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentSlide(
                currentSlide === 0 ? slides.length - 1 : currentSlide - 1
              )
            }
            className="gap-2"
          >
            <ChevronLeft size={16} />
            Anterior
          </Button>

          <span className="text-sm text-muted-foreground">
            {currentSlide + 1} / {slides.length}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentSlide(
                currentSlide === slides.length - 1 ? 0 : currentSlide + 1
              )
            }
            className="gap-2"
          >
            Siguiente
            <ChevronRight size={16} />
          </Button>
        </div>

        {/* Editor */}
        <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
          <div>
            <label className="text-sm font-semibold">Título</label>
            <Input
              value={slide.title}
              onChange={(e) => updateSlide('title', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Contenido</label>
            <textarea
              value={slide.content}
              onChange={(e) => updateSlide('content', e.target.value)}
              className="w-full mt-1 p-2 rounded border border-border bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-warm text-sm"
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Tema</label>
            <div className="flex flex-wrap gap-2">
              {bgColors.map((color) => (
                <button
                  key={color}
                  onClick={() => updateSlide('bgColor', color)}
                  className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} transition-transform ${
                    slide.bgColor === color ? 'ring-2 ring-foreground scale-110' : ''
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Slide Thumbnails */}
        <div>
          <p className="text-sm font-semibold mb-2">Diapositivas</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {slides.map((s, idx) => (
              <div key={s.id} className="flex-shrink-0 relative">
                <button
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-24 h-16 rounded-lg bg-gradient-to-br ${s.bgColor} p-2 text-white text-xs font-semibold truncate transition-all ${
                    currentSlide === idx ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {s.title}
                </button>
                {slides.length > 1 && (
                  <button
                    onClick={() => deleteSlide(idx)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={addSlide}
              className="flex-shrink-0 w-24 h-16 rounded-lg border-2 border-dashed border-muted-foreground hover:border-brand-warm transition-colors flex items-center justify-center"
            >
              <Plus size={20} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
