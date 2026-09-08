'use client';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MiniExcel } from './mini-excel';
import { MiniPowerPoint } from './mini-powerpoint';
import { FileText, Table2, Presentation, ExternalLink } from 'lucide-react';

export function OfficeToolsPlayground() {
  const [activeTab, setActiveTab] = useState('excel');

  return (
    <div className="space-y-6 w-full">
      {/* Hero */}
      <Card className="bg-gradient-to-r from-brand-warm/10 to-brand-saffron/10 border-brand-warm/20">
        <CardHeader>
          <CardTitle className="text-2xl">🛠️ Laboratorio Office</CardTitle>
          <CardDescription>
            Aprende Excel, Word y PowerPoint practicando. Sin instalación, todo en el navegador.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="excel" className="gap-2">
            <Table2 size={16} />
            Excel
          </TabsTrigger>
          <TabsTrigger value="word" className="gap-2">
            <FileText size={16} />
            Word
          </TabsTrigger>
          <TabsTrigger value="powerpoint" className="gap-2">
            <Presentation size={16} />
            PowerPoint
          </TabsTrigger>
        </TabsList>

        {/* Excel Tab */}
        <TabsContent value="excel" className="space-y-4">
          <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-200/50">
            <CardHeader>
              <CardTitle>📊 Excel Interactivo</CardTitle>
              <CardDescription>
                Crea tablas, usa fórmulas (ej: =col2*col3) y exporta a XLSX
              </CardDescription>
            </CardHeader>
          </Card>
          <MiniExcel />

          {/* Tips */}
          <Card className="border-blue-200/50">
            <CardHeader>
              <CardTitle className="text-base">💡 Tips para Excel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>✓ Una fila por registro, encabezados en la primera fila</p>
              <p>✓ Usa fórmulas: =col2*col3, =col1+col2, etc.</p>
              <p>✓ Filtros y búsqueda para organizar datos</p>
              <p>✓ Formatos personalizados para fechas y números</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Word Tab */}
        <TabsContent value="word" className="space-y-4">
          <Card className="bg-green-50/50 dark:bg-green-950/20 border-green-200/50">
            <CardHeader>
              <CardTitle>📝 FOLIO — Estudio de Escritura Profesional</CardTitle>
              <CardDescription>
                Editor completo: formatea, exporta a Word (.doc) y PDF. Autoguardado.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="overflow-hidden border-green-200/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  ⚠ FOLIO abre en nueva ventana. Vuelve aquí cuando termines de escribir.
                </p>
                <a
                  href="/folio.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-sm transition-all"
                >
                  Abrir FOLIO ✒
                  <ExternalLink size={16} />
                </a>
              </div>
            </CardHeader>
          </Card>

          {/* Características */}
          <Card className="border-green-200/50">
            <CardHeader>
              <CardTitle className="text-base">✨ Características de FOLIO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>Editor profesional:</strong> tipografía Georgia, estilos de título, negritas, cursivas, listas</p>
              <p><strong>Exportación real:</strong> descarga en Word (.doc) con formato A4 y márgenes 3 cm. También puedes imprimir como PDF.</p>
              <p><strong>Autoguardado:</strong> tu trabajo se guarda automáticamente en el navegador. No pierdes nada.</p>
              <p><strong>Zoom flexible:</strong> escala del 60% al 160% para leer cómodo.</p>
              <p><strong>Inicio rápido:</strong> copia y pega, o comienza desde cero.</p>
            </CardContent>
          </Card>

          {/* Flujo de trabajo */}
          <Card className="border-l-4 border-l-green-600">
            <CardHeader>
              <CardTitle className="text-base">📋 Flujo de Trabajo Recomendado</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2 text-sm">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">1</span>
                  <span><strong>Haz clic en "Abrir FOLIO"</strong> para abrir el editor en otra ventana</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">2</span>
                  <span><strong>Escribe o pega tu contenido</strong> y formatea con la cinta superior</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">3</span>
                  <span><strong>Descarga en Word</strong> con el botón dorado (Ctrl+S es un atajo)</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">4</span>
                  <span><strong>Imprime como PDF</strong> desde el menú Archivo o presiona Ctrl+P</span>
                </li>
              </ol>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PowerPoint Tab */}
        <TabsContent value="powerpoint" className="space-y-4">
          <Card className="bg-purple-50/50 dark:bg-purple-950/20 border-purple-200/50">
            <CardHeader>
              <CardTitle>🎥 PowerPoint Interactivo</CardTitle>
              <CardDescription>
                Crea diapositivas con temas visuales. Exporta como HTML
              </CardDescription>
            </CardHeader>
          </Card>
          <MiniPowerPoint />

          {/* Tips */}
          <Card className="border-purple-200/50">
            <CardHeader>
              <CardTitle className="text-base">💡 Tips para PowerPoint</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>✓ Una idea por diapositiva, texto breve</p>
              <p>✓ Contraste alto: texto claro sobre fondo oscuro</p>
              <p>✓ Uso consistente de temas y fuentes</p>
              <p>✓ Menos texto, más imágenes y gráficos</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Common Workflow */}
      <Card className="border-l-4 border-l-brand-warm">
        <CardHeader>
          <CardTitle className="text-base">📋 Flujo Común</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2 text-sm">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-warm text-white flex items-center justify-center text-xs font-bold">1</span>
              <span><strong>Define el objetivo:</strong> ¿Qué debo crear y para quién?</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-warm text-white flex items-center justify-center text-xs font-bold">2</span>
              <span><strong>Elige la herramienta:</strong> Excel (datos), Word (texto), PowerPoint (presentación)</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-warm text-white flex items-center justify-center text-xs font-bold">3</span>
              <span><strong>Práctica aquí:</strong> Experimenta sin presión en Mini Office</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-warm text-white flex items-center justify-center text-xs font-bold">4</span>
              <span><strong>Exporta y revisa:</strong> Descarga PDF/XLSX y verifica antes de enviar</span>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
