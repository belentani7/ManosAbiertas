'use client';

import { useState } from 'react';
import { PlazosCalculator } from '@/components/manos-abiertas/PlazosCalculator';
import { IMVCalculator } from '@/components/manos-abiertas/IMVCalculator';
import { LetterGenerator } from '@/components/manos-abiertas/LetterGenerator';
import { ChecklistManager } from '@/components/manos-abiertas/ChecklistManager';
import { AdminDictionary } from '@/components/manos-abiertas/AdminDictionary';
import { GradeConverter } from '@/components/manos-abiertas/GradeConverter';
import { PhoneDirectory } from '@/components/manos-abiertas/PhoneDirectory';

export default function HerramientasPage() {
  const [activeTab, setActiveTab] = useState<'plazos' | 'imv' | 'carta' | 'checklist' | 'diccionario' | 'notas' | 'telefonos'>('plazos');

  const tabs = [
    { id: 'plazos', label: '⏱️ Plazos', icon: '⏱️' },
    { id: 'imv', label: '🧮 IMV', icon: '🧮' },
    { id: 'carta', label: '✍️ Cartas', icon: '✍️' },
    { id: 'checklist', label: '✅ Checklist', icon: '✅' },
    { id: 'diccionario', label: '📖 Diccionario', icon: '📖' },
    { id: 'notas', label: '🎓 Notas', icon: '🎓' },
    { id: 'telefonos', label: '📞 Teléfonos', icon: '📞' },
  ] as const;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-ink mb-2">Herramientas</h1>
        <p className="text-muted">7 herramientas prácticas para tu día a día en España</p>
      </header>

      <nav className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Herramientas">
        {[
          { id: 'plazos', label: '⏱️ Plazos', icon: '⏱️' },
          { id: 'imv', label: '🧮 IMV', icon: '🧮' },
          { id: 'carta', label: '✍️ Cartas', icon: '✍️' },
          { id: 'checklist', label: '✅ Checklist', icon: '✅' },
          { id: 'diccionario', label: '📖 Diccionario', icon: '📖' },
          { id: 'notas', label: '🎓 Notas', icon: '🎓' },
          { id: 'telefonos', label: '📞 Teléfonos', icon: '📞' },
        ].map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-ink text-cream shadow-md'
                : 'bg-cream border border-line text-muted hover:bg-amber-light'
            }`}
          >
            <span className="flex items-center gap-1">
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </span>
          </button>
        ))}
      </nav>

      <div id="panel-plazos" role="tabpanel" hidden={activeTab !== 'plazos'}>
        <PlazosCalculator />
      </div>
      <div id="panel-imv" role="tabpanel" hidden={activeTab !== 'imv'}>
        <IMVCalculator />
      </div>
      <div id="panel-carta" role="tabpanel" hidden={activeTab !== 'carta'}>
        <LetterGenerator />
      </div>
      <div id="panel-checklist" role="tabpanel" hidden={activeTab !== 'checklist'}>
        <ChecklistManager />
      </div>
      <div id="panel-diccionario" role="tabpanel" hidden={activeTab !== 'diccionario'}>
        <AdminDictionary />
      </div>
      <div id="panel-notas" role="tabpanel" hidden={activeTab !== 'notas'}>
        <GradeConverter />
      </div>
      <div id="panel-telefonos" role="tabpanel" hidden={activeTab !== 'telefonos'}>
        <PhoneDirectory />
      </div>
    </div>
  );
}