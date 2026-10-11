'use client';

import { motion } from 'framer-motion';
import { Phone, Ambulance, Shield, Users, Globe, Heart, Building2, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  EMBASSY_CONTACTS,
  MAIN_EMERGENCY_CONTACTS,
  NGO_CONTACTS,
  contactLabel,
  toTelHref,
} from '@/data/main-contacts';

export function ContactsSection() {
  return (
    <div id="contactos" className="container mx-auto max-w-7xl px-4 py-8">
      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-2 gap-1.5">
          <Phone className="h-3 w-3" /> Disponible 24/7
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Contactos de Emergencia</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
          Números gratuitos para emergencias, ayuda humanitaria y consulados en España.
          Todos los canales llevan a <strong>instituciones reales con atención humana</strong>.
        </p>
      </div>

      {/* Main emergencies - quick access */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Shield className="h-5 w-5 text-destructive" />
          Emergencias principales
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {MAIN_EMERGENCY_CONTACTS.map((contact, i) => (
            <motion.a
              key={contact.id}
              href={toTelHref(contact.phone)}
              aria-label={`Llamar al ${contact.phone} — ${contact.name}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="block group"
            >
              <Card className="card-hover border-destructive/30 hover:border-destructive overflow-hidden h-full">
                <CardContent className="p-4 text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-destructive flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    {contact.category === 'health' ? (
                      <Ambulance className="h-7 w-7 text-white" />
                    ) : (
                      <Phone className="h-7 w-7 text-white" />
                    )}
                  </div>
                  <div className="text-2xl font-bold text-destructive">{contact.phone}</div>
                  <div className="text-xs font-medium mt-0.5">{contactLabel(contact)}</div>
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
          {NGO_CONTACTS.map((ngo, i) => (
            <motion.div
              key={ngo.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="group"
            >
              <Card className="card-hover border-border/60 hover:border-primary/40 h-full">
                <CardContent className="p-4 flex h-full flex-col">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-2xl">{ngo.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm leading-tight">{ngo.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-1">{ngo.desc}</p>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-2">
                    <a
                      href={toTelHref(ngo.phone)}
                      aria-label={`Llamar a ${ngo.name} al ${ngo.phone}`}
                      className="text-sm font-bold text-primary flex items-center gap-1 hover:underline"
                    >
                      <Phone className="h-3 w-3" />
                      {ngo.phone}
                    </a>
                    <a
                      href={ngo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Web oficial de ${ngo.name} (se abre en una pestaña nueva)`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
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
          {EMBASSY_CONTACTS.map((emb, i) => (
            <motion.div
              key={emb.country}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card className="card-hover border-border/60 hover:border-primary/40">
                <CardContent className="p-4 flex items-center gap-3">
                  <span className="text-3xl" aria-hidden="true">{emb.flag}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm">Embajada de {emb.country}</h3>
                    <a
                      href={toTelHref(emb.phone)}
                      aria-label={`Llamar a la Embajada de ${emb.country} al ${emb.phone}`}
                      className="text-xs text-primary hover:underline flex items-center gap-1"
                    >
                      <Phone className="h-3 w-3" />
                      {emb.phone}
                    </a>
                  </div>
                  <a
                    href={emb.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Web oficial de la Embajada de ${emb.country} (se abre en una pestaña nueva)`}
                    className="text-muted-foreground hover:text-primary"
                  >
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
            Detrás de cada número hay <strong>personas reales que te atienden</strong>.
          </p>
          <a href="tel:112">
            <Badge variant="secondary" className="text-base px-4 py-2 gap-2">
              <Phone className="h-4 w-4" />
              Llamar al 112
            </Badge>
          </a>
        </CardContent>
      </Card>

      <p className="sr-only">
        Todos los teléfonos y enlaces de esta página son estáticos y funcionan sin JavaScript:
        enlaces tel: para llamar directamente y enlaces https: a las webs oficiales de cada institución.
      </p>
    </div>
  );
}
