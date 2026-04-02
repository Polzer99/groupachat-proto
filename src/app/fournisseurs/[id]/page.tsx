'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Star,
  MapPin,
  TrendingUp,
  TrendingDown,
  Phone,
  Mail,
  Globe,
} from 'lucide-react';

const suppliersMap: Record<
  string,
  {
    name: string;
    location: string;
    rating: number;
    phone: string;
    email: string;
    website: string;
    siret: string;
    contact: string;
    categories: string[];
  }
> = {
  '1': {
    name: 'Fruits du Monde',
    location: 'Rungis, France',
    rating: 5,
    phone: '+33 1 45 67 89 00',
    email: 'contact@fruitsdumonde.fr',
    website: 'www.fruitsdumonde.fr',
    siret: '123 456 789 00012',
    contact: 'Jean-Marc Dupont',
    categories: ['Fruits exotiques', 'Mangues'],
  },
  '2': {
    name: 'Primeur Atlantic',
    location: 'Bordeaux, France',
    rating: 4,
    phone: '+33 5 56 78 90 12',
    email: 'commandes@primeuratlantic.fr',
    website: 'www.primeuratlantic.fr',
    siret: '234 567 890 00023',
    contact: 'Sophie Martin',
    categories: ['Agrumes', 'Fruits de saison'],
  },
  '3': {
    name: 'Agrumes M\u00e9diterran\u00e9e',
    location: 'Perpignan, France',
    rating: 4,
    phone: '+33 4 68 12 34 56',
    email: 'info@agrumes-med.fr',
    website: 'www.agrumes-med.fr',
    siret: '345 678 901 00034',
    contact: 'Pierre Roux',
    categories: ['Agrumes', 'Citrons'],
  },
};

// Default for IDs not in the map
const defaultSupplier = {
  name: 'Comptoir du Frais',
  location: 'Lyon, France',
  rating: 4,
  phone: '+33 4 72 34 56 78',
  email: 'contact@comptoirdufrais.fr',
  website: 'www.comptoirdufrais.fr',
  siret: '456 789 012 00045',
  contact: 'Marie Lefebvre',
  categories: ['L\u00e9gumes', 'Herbes'],
};

const priceHistory = [
  {
    product: 'Mangue Kent (P\u00e9rou)',
    unit: '\u20ac/kg',
    prices: [
      { year: '2024', value: 3.2 },
      { year: '2025', value: 3.45 },
      { year: '2026', value: 3.85 },
    ],
  },
  {
    product: 'Avocat Hass (Espagne)',
    unit: '\u20ac/kg',
    prices: [
      { year: '2024', value: 4.1 },
      { year: '2025', value: 3.95 },
      { year: '2026', value: 4.2 },
    ],
  },
  {
    product: 'Citron Eureka (Argentine)',
    unit: '\u20ac/kg',
    prices: [
      { year: '2024', value: 1.8 },
      { year: '2025', value: 1.9 },
      { year: '2026', value: 2.05 },
    ],
  },
  {
    product: 'Banane Cavendish (\u00c9quateur)',
    unit: '\u20ac/kg',
    prices: [
      { year: '2024', value: 1.05 },
      { year: '2025', value: 1.1 },
      { year: '2026', value: 1.08 },
    ],
  },
  {
    product: 'Ananas Victoria (R\u00e9union)',
    unit: '\u20ac/pi\u00e8ce',
    prices: [
      { year: '2024', value: 2.5 },
      { year: '2025', value: 2.7 },
      { year: '2026', value: 2.95 },
    ],
  },
  {
    product: 'Fruit de la passion (Colombie)',
    unit: '\u20ac/kg',
    prices: [
      { year: '2024', value: 8.5 },
      { year: '2025', value: 9.0 },
      { year: '2026', value: 8.8 },
    ],
  },
  {
    product: 'Papaye Solo (Br\u00e9sil)',
    unit: '\u20ac/kg',
    prices: [
      { year: '2024', value: 3.6 },
      { year: '2025', value: 3.8 },
      { year: '2026', value: 4.1 },
    ],
  },
];

const invoices = [
  { date: '28/03/2026', ref: 'FAC-2026-0342', amount: '12\u00a0450\u00a0\u20ac', status: 'Trait\u00e9e' },
  { date: '15/03/2026', ref: 'FAC-2026-0298', amount: '8\u00a0720\u00a0\u20ac', status: 'Trait\u00e9e' },
  { date: '02/03/2026', ref: 'FAC-2026-0267', amount: '15\u00a0340\u00a0\u20ac', status: 'En attente' },
  { date: '18/02/2026', ref: 'FAC-2026-0221', amount: '9\u00a0180\u00a0\u20ac', status: 'Trait\u00e9e' },
  { date: '05/02/2026', ref: 'FAC-2026-0189', amount: '11\u00a0600\u00a0\u20ac', status: 'Trait\u00e9e' },
  { date: '22/01/2026', ref: 'FAC-2026-0145', amount: '7\u00a0890\u00a0\u20ac', status: 'Rejet\u00e9e' },
];

const tabs = ['Historique Prix', 'Factures', 'Infos'];

export default function FournisseurDetail() {
  const params = useParams();
  const id = params.id as string;
  const supplier = suppliersMap[id] || defaultSupplier;
  const [activeTab, setActiveTab] = useState('Historique Prix');

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link
        href="/fournisseurs"
        className="inline-flex items-center gap-1.5 text-[13px] text-[#94a3b8] hover:text-[#334155] transition-colors"
      >
        <ArrowLeft size={14} />
        Retour aux fournisseurs
      </Link>

      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#e2e8f0]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              {supplier.name}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1 text-[#94a3b8]">
                <MapPin size={13} />
                <span className="text-[12px]">{supplier.location}</span>
              </div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className={
                      i < supplier.rating
                        ? 'text-[#f59e0b] fill-[#f59e0b]'
                        : 'text-[#e2e8f0]'
                    }
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {supplier.categories.map((cat) => (
                <span
                  key={cat}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#334155] font-medium"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href={`tel:${supplier.phone}`}
              className="h-9 px-4 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] text-[12px] text-[#334155] font-medium flex items-center gap-1.5 hover:bg-[#f1f5f9] transition-colors"
            >
              <Phone size={13} />
              Appeler
            </a>
            <a
              href={`mailto:${supplier.email}`}
              className="h-9 px-4 rounded-lg bg-[#DC2626] text-white text-[12px] font-medium flex items-center gap-1.5 hover:bg-[#b91c1c] transition-colors"
            >
              <Mail size={13} />
              Email
            </a>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#e2e8f0]">
        <div className="flex border-b border-[#e2e8f0]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-[13px] font-medium transition-colors relative ${
                activeTab === tab
                  ? 'text-[#DC2626]'
                  : 'text-[#94a3b8] hover:text-[#334155]'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#DC2626]" />
              )}
            </button>
          ))}
        </div>

        <div className="p-5">
          {activeTab === 'Historique Prix' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#e2e8f0]">
                    <th className="text-left text-[10px] uppercase tracking-wider text-[#94a3b8] font-medium pb-3">
                      Produit
                    </th>
                    <th className="text-left text-[10px] uppercase tracking-wider text-[#94a3b8] font-medium pb-3">
                      Unit\u00e9
                    </th>
                    <th className="text-center text-[10px] uppercase tracking-wider text-[#94a3b8] font-medium pb-3">
                      2024
                    </th>
                    <th className="text-center text-[10px] uppercase tracking-wider text-[#94a3b8] font-medium pb-3">
                      2025
                    </th>
                    <th className="text-center text-[10px] uppercase tracking-wider text-[#94a3b8] font-medium pb-3">
                      2026
                    </th>
                    <th className="text-center text-[10px] uppercase tracking-wider text-[#94a3b8] font-medium pb-3">
                      \u00c9volution
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {priceHistory.map((row, i) => {
                    const lastTwo = row.prices.slice(-2);
                    const evolution =
                      ((lastTwo[1].value - lastTwo[0].value) / lastTwo[0].value) *
                      100;
                    const positive = evolution <= 0; // Lower price is good
                    return (
                      <tr
                        key={row.product}
                        className={
                          i < priceHistory.length - 1
                            ? 'border-b border-[#f1f5f9]'
                            : ''
                        }
                      >
                        <td className="py-3 text-[13px] font-medium text-slate-900">
                          {row.product}
                        </td>
                        <td className="py-3 text-[12px] text-[#94a3b8]">
                          {row.unit}
                        </td>
                        {row.prices.map((p) => (
                          <td
                            key={p.year}
                            className="py-3 text-center text-[13px] font-mono text-[#334155]"
                          >
                            {p.value.toFixed(2)}
                          </td>
                        ))}
                        <td className="py-3 text-center">
                          <span
                            className={`inline-flex items-center gap-1 text-[12px] font-medium px-2 py-0.5 rounded-full ${
                              positive
                                ? 'bg-[#dcfce7] text-[#16a34a]'
                                : 'bg-[#fef2f2] text-[#DC2626]'
                            }`}
                          >
                            {positive ? (
                              <TrendingDown size={12} />
                            ) : (
                              <TrendingUp size={12} />
                            )}
                            {evolution > 0 ? '+' : ''}
                            {evolution.toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'Factures' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#e2e8f0]">
                    <th className="text-left text-[10px] uppercase tracking-wider text-[#94a3b8] font-medium pb-3">
                      Date
                    </th>
                    <th className="text-left text-[10px] uppercase tracking-wider text-[#94a3b8] font-medium pb-3">
                      R\u00e9f\u00e9rence
                    </th>
                    <th className="text-right text-[10px] uppercase tracking-wider text-[#94a3b8] font-medium pb-3">
                      Montant
                    </th>
                    <th className="text-center text-[10px] uppercase tracking-wider text-[#94a3b8] font-medium pb-3">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv, i) => (
                    <tr
                      key={inv.ref}
                      className={
                        i < invoices.length - 1
                          ? 'border-b border-[#f1f5f9]'
                          : ''
                      }
                    >
                      <td className="py-3 text-[13px] text-[#334155]">
                        {inv.date}
                      </td>
                      <td className="py-3 text-[13px] font-mono text-slate-900">
                        {inv.ref}
                      </td>
                      <td className="py-3 text-right text-[13px] font-mono text-slate-900">
                        {inv.amount}
                      </td>
                      <td className="py-3 text-center">
                        <span
                          className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${
                            inv.status === 'Trait\u00e9e'
                              ? 'bg-[#dcfce7] text-[#16a34a]'
                              : inv.status === 'En attente'
                              ? 'bg-[#fef3c7] text-[#f59e0b]'
                              : 'bg-[#fef2f2] text-[#DC2626]'
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'Infos' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-[13px] font-semibold text-slate-900">
                  Coordonn\u00e9es
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-[#94a3b8]" />
                    <span className="text-[13px] text-[#334155]">
                      {supplier.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-[#94a3b8]" />
                    <span className="text-[13px] text-[#334155]">
                      {supplier.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={14} className="text-[#94a3b8]" />
                    <span className="text-[13px] text-[#334155]">
                      {supplier.website}
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-[13px] font-semibold text-slate-900">
                  Informations l\u00e9gales
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#94a3b8]">
                      Contact principal
                    </p>
                    <p className="text-[13px] text-[#334155] mt-0.5">
                      {supplier.contact}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#94a3b8]">
                      SIRET
                    </p>
                    <p className="text-[13px] font-mono text-[#334155] mt-0.5">
                      {supplier.siret}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#94a3b8]">
                      Adresse
                    </p>
                    <p className="text-[13px] text-[#334155] mt-0.5">
                      {supplier.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
