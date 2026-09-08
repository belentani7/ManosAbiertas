'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bold, Italic, List, FileDown, Type } from 'lucide-react';
import html2pdf from 'html2pdf.js';

export function MiniWord() {
  const [content, setContent] = useState(`<h1>Mi Documento</h1>
<p>Comienza escribiendo aquí. Usa los botones para formatear.</p>`);

  const applyFormat = (tag: string) => {
    const textarea = document.getElementById('word-editor') as HTMLDivElement;
    const selection = window.getSelection();

    if (selection && selection.toString()) {
      const selectedText = selection.toString();
      let formattedText = '';

      switch (tag) {
        case 'b':
          formattedText = `<strong>${selectedText}</strong>`;
          break;
        case 'i':
          formattedText = `<em>${selectedText}</em>`;
          break;
        case 'h2':
          formattedText = `<h2>${selectedText}</h2>`;
          break;
        case 'ul':
          formattedText = `<ul><li>${selectedText}</li></ul>`;
          break;
      }

      if (formattedText) {
        const newContent = content.replace(selectedText, formattedText);
        setContent(newContent);
      }
    }
  };

  const insertTitle = () => {
    setContent(content + '\n<h2>Nuevo Título</h2>\n');
  };

  const insertList = () => {
    setContent(
      content +
        '\n<ul><li>Punto 1</li><li>Punto 2</li><li>Punto 3</li></ul>\n'
    );
  };

  const insertTable = () => {
    const table = `<table style="width:100%;border-collapse:collapse;">
      <tr style="border-bottom:1px solid #ccc;">
        <td style="padding:8px;border-right:1px solid #ccc;"><strong>Encabezado 1</strong></td>
        <td style="padding:8px;"><strong>Encabezado 2</strong></td>
      </tr>
      <tr style="border-bottom:1px solid #ccc;">
        <td style="padding:8px;border-right:1px solid #ccc;">Dato 1</td>
        <td style="padding:8px;">Dato 2</td>
      </tr>
    </table>`;
    setContent(content + '\n' + table + '\n');
  };

  const exportToPDF = () => {
    const element = document.getElementById('word-preview');
    const opt = {
      margin: 10,
      filename: 'documento.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <Card className="border-l-4 border-l-green-500">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>📝 Mini Word</span>
          <Button
            size="sm"
            variant="outline"
            onClick={exportToPDF}
            className="gap-2"
          >
            <FileDown size={16} />
            Descargar PDF
          </Button>
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Formatea texto, agrega títulos y tablas. Exporta a PDF
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 p-3 bg-muted rounded-lg">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => applyFormat('b')}
            title="Negrita"
          >
            <Bold size={18} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => applyFormat('i')}
            title="Itálica"
          >
            <Italic size={18} />
          </Button>
          <div className="w-px bg-border mx-1" />
          <Button
            size="sm"
            variant="ghost"
            onClick={insertTitle}
            className="gap-2"
          >
            <Type size={16} />
            Título
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={insertList}
            className="gap-2"
          >
            <List size={16} />
            Lista
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={insertTable}
            className="gap-2"
          >
            📊 Tabla
          </Button>
        </div>

        {/* Editor */}
        <div
          id="word-editor"
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setContent((e.currentTarget as HTMLDivElement).innerHTML)}
          className="min-h-96 p-4 border-2 border-dashed border-muted rounded-lg bg-white dark:bg-slate-900 focus:outline-none focus:border-brand-warm prose prose-sm dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Preview */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-2">Vista previa (PDF)</h3>
          <div
            id="word-preview"
            className="p-6 bg-white border border-border rounded-lg"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
