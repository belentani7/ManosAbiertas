'use client';

import { motion } from 'framer-motion';
import { Phone, Ambulance, Shield, Users, Globe, Heart, Building2, MapPin, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EMERGENCY_CONTACTS } from '@/data/rights-guide';
import { useAppStore } from '@/stores/app-store';

const EMBASSIES = [
  { country: 'Marruecos', flag: '🇲🇦', phone: '+34 913 191 999', url: 'https://www.exteriores.gob.es/Embajados/rabat/' },
  { country: 'Rumanía', flag: '🇷🇴', phone: '+34 914 113 131', url: 'https://www.mae.ro/embajada-madrid' },
  { country: 'Colombia', flag: '🇨🇴', phone: '+34 91 700 73 00', url: 'https://espana.embajada.gov.co/' },
  { country: 'Ecuador', flag: '🇪🇨', phone: '+34 91 519 12 00', url: 'https://www.cancilleria.gob.ec/' },
  { country: 'China', flag: '🇨🇳', phone: '+34 915 194 242', url: 'http://es.china-embassy.gov.cn/' },
  { country: 'India', flag: '🇮🇳', phone: '+34 916 838 333', url: 'https://www.indianembassy.gov.in/' },
  { country: 'Bolivia', flag: '🇧🇴', phone: '+34 913 451 944', url: 'https://www.embol.esp.es/' },
  { country: 'Perú', flag: '🇵🇪', phone: '+34 915 436 124', url: 'https://www.embaperu.es/' },
  { country: 'Argentina', flag: '🇦🇷', phone: '+34 915 560 320', url: 'https://esem.mrecic.gov.ar/' },
  { country: 'Venezuela', flag: '🇻🇪', phone: '+34 914 117 025', url: 'https://www.embaven.es/' },
  { country: 'Ucrania', flag: '🇺🇦', phone: '+34 917 484 620', url: 'https://www.mfa.gov.ua/spain/' },
  { country: 'Brasil', flag: '🇧🇷', phone: '+34 914 266 644', url: 'https://www.gov.br/' },
];

const NGOS = [
  { name: 'Cruz Roja Española', phone: '900 222 100', desc: 'Ayuda humanitaria y social', url: 'https://www2.cruzroja.es/', emoji: '🔴' },
  { name: 'CEAR', phone: '91 530 69 69', desc: 'Ayuda a refugiados', url: 'https://www.cear.es/', emoji: '🕊️' },
  { name: 'ACCEM', phone: '91 543 00 00', desc: 'Atención a inmigrantes', url: 'https://www.accem.es/', emoji: '🤝' },
  { name: 'Cáritas Española', phone: '914 440 600', desc: 'Ayuda social', url: 'https://www.caritas.es/', emoji: '✝️' },
  { name: 'Médicos del Mundo', phone: '914 212 012', desc: 'Atención sanitaria', url: 'https://www.medicodelmundo.org/', emoji: '🌍' },
  { name: 'Teléfono de la Esperanza', phone: '717 003 717', desc: 'Apoyo emocional 24h', url: 'https://www.telefonodelaesperanza.org/', emoji: '💛' },
  { name: 'Fundación ANAR', phone: '900 20 20 10', desc: 'Ayuda a niños y adolescentes', url: 'https://www.anar.org/', emoji: '👶' },
  { name: 'SOS Racismo', phone: '915 061 818', desc: 'Lucha contra el racismo', url: 'https://sosracismomadrid.es/', emoji: '✊' },
];

export function ContactsSection() {
  const { language } = useAppStore();

  const mainEmergencies = EMERGENCY_CONTACTS.filter((c) => ['112 - Emergencias', '061 - Urgencias Sanitarias', '016 - Violencia de Género', '024 - Salud Mental', '091 - Policía Nacional', '062 - Guardia Civil', '080 - Bomberos', '092 - Policía Local'].includes(c.name));

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-2 gap-1.5">
          <Phone className="h-3 w-3" /> Disponible 24/7
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Contactos de Emergencia</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
          Números gratuitos para emergencias, ayuda humanitaria y consulados en España
        </p>
      </div>

      {/* Main emergencies - quick access */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Shield className="h-5 w-5 text-destructive" />
          Emergencias principales
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {mainEmergencies.map((contact, i) => (
            <motion.a
              key={contact.id}
              href={`tel:${contact.phone.replace(/\s/g, '')}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="block group"
            >
              <Card className="card-hover border-destructive/30 hover:border-destructive overflow-hidden h-full">
                <CardContent className="p-4 text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-destructive flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    {contact.name.includes('Sanitarias') || contact.name.includes('Salud') ? (
                      <Ambulance className="h-7 w-7 text-white" />
                    ) : (
                      <Phone className="h-7 w-7 text-white" />
                    )}
                  </div>
                  <div className="text-2xl font-bold text-destructive">{contact.phone}</div>
                  <div className="text-xs font-medium mt-0.5">{contact.name.replace(/\d+\s*-\s*/, '')}</div>
                </CardContent>
              </Card>
            </motion.a>
          ))}
        </div>
      </div>

      {/* NGOs */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          ONGs y ayuda humanitaria
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {NGOS.map((ngo, i) => (
            <motion.a
              key={ngo.name}
              href={`tel:${ngo.phone.replace(/\s/g, '')}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="block group"
            >
              <Card className="card-hover border-border/60 hover:border-primary/40 h-full">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-2xl">{ngo.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm leading-tight">{ngo.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-1">{ngo.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-primary flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {ngo.phone}
                    </div>
                    <a href={ngo.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-muted-foreground hover:text-primary">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Embassies */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-brand-clay" />
          Embajadas y consulados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {EMBASSIES.map((emb, i) => (
            <motion.div
              key={emb.country}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card className="card-hover border-border/60 hover:border-primary/40">
                <CardContent className="p-4 flex items-center gap-3">
                  <span className="text-3xl">{emb.flag}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm">Embajada de {emb.country}</h3>
                    <a href={`tel:${emb.phone.replace(/\s/g, '')}`} className="text-xs text-primary hover:underline flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {emb.phone}
                    </a>
                  </div>
                  <a href={emb.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Help banner */}
      <Card className="overflow-hidden gradient-brand border-0">
        <CardContent className="p-6 md:p-8 text-center text-white">
          <Users className="h-10 w-10 mx-auto mb-3" />
          <h2 className="text-xl md:text-2xl font-bold mb-2">¿Necesitas ayuda urgente?</h2>
          <p className="text-white/90 text-sm max-w-xl mx-auto mb-4">
            Si tienes una emergencia, llama al <strong>112</strong> (gratis, 24h, multilingüe).
            Si necesitas apoyo emocional, llama al <strong>717 003 717</strong>.
          </p>
          <a href="tel:112">
            <Badge variant="secondary" className="text-base px-4 py-2 gap-2">
              <Phone className="h-4 w-4" />
              Llamar al 112
            </Badge>
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
