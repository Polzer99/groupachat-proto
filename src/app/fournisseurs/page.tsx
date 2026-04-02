'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Star, FileText, Calendar } from 'lucide-react';

const suppliers = [
  {
    id: 1,
    name: 'Fruits du Monde',
    location: 'Rungis, France',
    categories: ['Fruits exotiques', 'Mangues'],
    volume: '2,1M\u00a0\u20ac',
    invoices: 142,
    rating: 5,
    lastOrder: '28/03/2026',
  },
  {
    id: 2,
    name: 'Primeur Atlantic',
    location: 'Bordeaux, France',
    categories: ['Agrumes', 'Fruits de saison'],
    volume: '1,8M\u00a0\u20ac',
    invoices: 118,
    rating: 4,
    lastOrder: '27/03/2026',
  },
  {
    id: 3,
    name: 'Agrumes M\u00e9diterran\u00e9e',
    location: 'Perpignan, France',
    categories: ['Agrumes', 'Citrons'],
    volume: '980K\u00a0\u20ac',
    invoices: 87,
    rating: 4,
    lastOrder: '26/03/2026',
  },
  {
    id: 4,
    name: 'Comptoir du Frais',
    location: 'Lyon, France',
    categories: ['L\u00e9gumes', 'Herbes'],
    volume: '1,4M\u00a0\u20ac',
    invoices: 96,
    rating: 5,
    lastOrder: '29/03/2026',
  },
  {
    id: 5,
    name: 'Import Tropical',
    location: 'Marseille, France',
    categories: ['Fruits exotiques', 'Bananes'],
    volume: '870K\u00a0\u20ac',
    invoices: 64,
    rating: 3,
    lastOrder: '25/03/2026',
  },
  {
    id: 6,
    name: 'Mara\u00eecher du Sud',
    location: 'Avignon, France',
    categories: ['L\u00e9gumes', 'Tomates'],
    volume: '720K\u00a0\u20ac',
    invoices: 53,
    rating: 4,
    lastOrder: '24/03/2026',
  },
  {
    id: 7,
    name: 'Atlantic Seafresh',
    location: 'Nantes, France',
    categories: ['Fruits de mer', 'Surgel\u00e9s'],
    volume: '650K\u00a0\u20ac',
    invoices: 41,
    rating: 4,
    lastOrder: '23/03/2026',
  },
  {
    id: 8,
    name: 'Bio & Terroirs',
    location: 'Toulouse, France',
    categories: ['Bio', 'L\u00e9gumes'],
    volume: '540K\u00a0\u20ac',
    invoices: 38,
    rating: 5,
    lastOrder: '22/03/2026',
  },
  {
    id: 9,
    name: 'Costa Rica Direct',
    location: 'San Jos\u00e9, Costa Rica',
    categories: ['Fruits exotiques', 'Ananas'],
    volume: '480K\u00a0\u20ac',
    invoices: 24,
    rating: 3,
    lastOrder: '20/03/2026',
  },
  {
    id: 10,
    name: 'Sica Fruits',
    location: 'Montpellier, France',
    categories: ['Fruits de saison', 'P\u00eaches'],
    volume: '420K\u00a0\u20ac',
    invoices: 31,
    rating: 4,
    lastOrder: '21/03/2026',
  },
  {
    id: 11,
    name: 'Produits du Levant',
    location: 'Marseille, France',
    categories: ['Fruits secs', '\u00c9pices'],
    volume: '380K\u00a0\u20ac',
    invoices: 28,
    rating: 3,
    lastOrder: '19/03/2026',
  },
  {
    id: 12,
    name: 'Hispa Citrus',
    location: 'Valence, Espagne',
    categories: ['Agrumes', 'Oranges'],
    volume: '350K\u00a0\u20ac',
    invoices: 22,
    rating: 4,
    lastOrder: '18/03/2026',
  },
];

const categories = [
  'Toutes',
  'Fruits exotiques',
  'Agrumes',
  'L\u00e9gumes',
  'Fruits de saison',
  'Bio',
  'Fruits secs',
  'Surgel\u00e9s',
];

export default function Fournisseurs() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Toutes');

  const filtered = suppliers.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      category === 'Toutes' || s.categories.some((c) => c === category);
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Fournisseurs</h1>
        <p className="text-[13px] text-[#94a3b8] mt-0.5">
          {suppliers.length} fournisseurs r\u00e9f\u00e9renc\u00e9s dans le groupement
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]"
          />
          <input
            type="text"
            placeholder="Rechercher un fournisseur..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-lg bg-white border border-[#e2e8f0] text-[13px] text-[#334155] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]/40"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-10 px-4 rounded-lg bg-white border border-[#e2e8f0] text-[13px] text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 min-w-[180px]"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Supplier grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s) => (
          <Link
            key={s.id}
            href={`/fournisseurs/${s.id}`}
            className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#e2e8f0] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:border-[#DC2626]/20 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-[14px] font-semibold text-slate-900 group-hover:text-[#DC2626] transition-colors">
                  {s.name}
                </h3>
                <div className="flex items-center gap-1 mt-1 text-[#94a3b8]">
                  <MapPin size={12} />
                  <span className="text-[11px]">{s.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={
                      i < s.rating
                        ? 'text-[#f59e0b] fill-[#f59e0b]'
                        : 'text-[#e2e8f0]'
                    }
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {s.categories.map((cat) => (
                <span
                  key={cat}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#334155] font-medium"
                >
                  {cat}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#f1f5f9]">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#94a3b8]">
                  Volume annuel
                </p>
                <p className="text-[14px] font-semibold font-mono text-slate-900 mt-0.5">
                  {s.volume}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#94a3b8]">
                  Factures
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <FileText size={13} className="text-[#94a3b8]" />
                  <span className="text-[14px] font-semibold font-mono text-slate-900">
                    {s.invoices}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 mt-3 text-[#94a3b8]">
              <Calendar size={11} />
              <span className="text-[10px]">Derni\u00e8re commande : {s.lastOrder}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
