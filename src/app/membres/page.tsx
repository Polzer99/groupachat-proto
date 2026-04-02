'use client';

import { FileText, Calendar } from 'lucide-react';

const members = [
  {
    name: 'Maison Deroche',
    city: 'Villejuif (94)',
    contact: 'Philippe Deroche',
    volume: '3,2M\u00a0\u20ac',
    invoices: 342,
    since: 2018,
    initials: 'MD',
    color: '#DC2626',
  },
  {
    name: 'Boulangerie Duval',
    city: 'Lyon (69)',
    contact: 'Marc Duval',
    volume: '1,8M\u00a0\u20ac',
    invoices: 187,
    since: 2019,
    initials: 'BD',
    color: '#2563eb',
  },
  {
    name: 'P\u00e2tisserie Lef\u00e8vre',
    city: 'Nantes (44)',
    contact: 'Claire Lef\u00e8vre',
    volume: '1,2M\u00a0\u20ac',
    invoices: 134,
    since: 2020,
    initials: 'PL',
    color: '#16a34a',
  },
  {
    name: 'Traiteur Moreau',
    city: 'Marseille (13)',
    contact: 'Antoine Moreau',
    volume: '980K\u00a0\u20ac',
    invoices: 98,
    since: 2020,
    initials: 'TM',
    color: '#f59e0b',
  },
  {
    name: 'Les Halles de Sophie',
    city: 'Toulouse (31)',
    contact: 'Sophie Bernard',
    volume: '870K\u00a0\u20ac',
    invoices: 89,
    since: 2021,
    initials: 'HS',
    color: '#8b5cf6',
  },
  {
    name: '\u00c9picerie Lambert',
    city: 'Bordeaux (33)',
    contact: 'Thomas Lambert',
    volume: '650K\u00a0\u20ac',
    invoices: 72,
    since: 2022,
    initials: 'EL',
    color: '#06b6d4',
  },
  {
    name: 'Primeurs Gauthier',
    city: 'Lille (59)',
    contact: 'Julien Gauthier',
    volume: '540K\u00a0\u20ac',
    invoices: 56,
    since: 2023,
    initials: 'PG',
    color: '#ec4899',
  },
  {
    name: 'Restaurant Blanc',
    city: 'Paris (75)',
    contact: 'Nicolas Blanc',
    volume: '480K\u00a0\u20ac',
    invoices: 48,
    since: 2024,
    initials: 'RB',
    color: '#14b8a6',
  },
];

export default function Membres() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Membres</h1>
        <p className="text-[13px] text-[#94a3b8] mt-0.5">
          {members.length} membres actifs dans le groupement GRAL
        </p>
      </div>

      {/* Member grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {members.map((m) => (
          <div
            key={m.name}
            className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#e2e8f0] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-white text-[13px] font-semibold shrink-0"
                style={{ backgroundColor: m.color }}
              >
                {m.initials}
              </div>
              <div className="min-w-0">
                <h3 className="text-[14px] font-semibold text-slate-900 truncate">
                  {m.name}
                </h3>
                <p className="text-[12px] text-[#94a3b8]">{m.city}</p>
              </div>
            </div>

            <p className="text-[12px] text-[#334155] mb-4">
              Contact : <span className="font-medium">{m.contact}</span>
            </p>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#f1f5f9]">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#94a3b8]">
                  Volume annuel
                </p>
                <p className="text-[14px] font-semibold font-mono text-slate-900 mt-0.5">
                  {m.volume}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#94a3b8]">
                  Factures
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <FileText size={13} className="text-[#94a3b8]" />
                  <span className="text-[14px] font-semibold font-mono text-slate-900">
                    {m.invoices}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 mt-3 text-[#94a3b8]">
              <Calendar size={11} />
              <span className="text-[10px]">Membre depuis {m.since}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
