'use client';

import { useState } from 'react';
import { Award, ChevronDown } from 'lucide-react';

const products = [
  'Mangue Kent (P\u00e9rou)',
  'Avocat Hass (Espagne)',
  'Citron Eureka (Argentine)',
  'Banane Cavendish (\u00c9quateur)',
  'Ananas Victoria (R\u00e9union)',
  'Orange Navel (Espagne)',
  'Kiwi Hayward (Italie)',
  'Tomate Grappe (France)',
];

type ComparisonRow = {
  supplier: string;
  price: number;
  unit: string;
  delay: string;
  quality: number;
  minOrder: string;
  remarks: string;
  best?: boolean;
};

const comparisons: Record<string, ComparisonRow[]> = {
  'Mangue Kent (P\u00e9rou)': [
    {
      supplier: 'Fruits du Monde',
      price: 3.85,
      unit: '\u20ac/kg',
      delay: '48h',
      quality: 9.2,
      minOrder: '200 kg',
      remarks: 'Calibre A, m\u00fbr \u00e0 point',
    },
    {
      supplier: 'Import Tropical',
      price: 3.65,
      unit: '\u20ac/kg',
      delay: '72h',
      quality: 8.5,
      minOrder: '300 kg',
      remarks: 'Calibre A/B m\u00e9lang\u00e9',
      best: true,
    },
    {
      supplier: 'Costa Rica Direct',
      price: 4.1,
      unit: '\u20ac/kg',
      delay: '96h',
      quality: 9.0,
      minOrder: '500 kg',
      remarks: 'Bio certifi\u00e9, lot homog\u00e8ne',
    },
    {
      supplier: 'Comptoir du Frais',
      price: 3.95,
      unit: '\u20ac/kg',
      delay: '48h',
      quality: 8.8,
      minOrder: '150 kg',
      remarks: 'Provenance v\u00e9rifi\u00e9e',
    },
  ],
  'Avocat Hass (Espagne)': [
    {
      supplier: 'Agrumes M\u00e9diterran\u00e9e',
      price: 4.2,
      unit: '\u20ac/kg',
      delay: '24h',
      quality: 9.5,
      minOrder: '100 kg',
      remarks: 'Circuit court, fra\u00eecheur garantie',
      best: true,
    },
    {
      supplier: 'Hispa Citrus',
      price: 3.9,
      unit: '\u20ac/kg',
      delay: '48h',
      quality: 8.7,
      minOrder: '250 kg',
      remarks: 'Calibre 16-20',
    },
    {
      supplier: 'Primeur Atlantic',
      price: 4.05,
      unit: '\u20ac/kg',
      delay: '48h',
      quality: 9.0,
      minOrder: '150 kg',
      remarks: 'M\u00fbrissement contr\u00f4l\u00e9',
    },
    {
      supplier: 'Fruits du Monde',
      price: 4.35,
      unit: '\u20ac/kg',
      delay: '72h',
      quality: 8.9,
      minOrder: '200 kg',
      remarks: 'Cat. Extra',
    },
    {
      supplier: 'Bio & Terroirs',
      price: 5.1,
      unit: '\u20ac/kg',
      delay: '72h',
      quality: 9.3,
      minOrder: '80 kg',
      remarks: 'AB certifi\u00e9, premium',
    },
  ],
  'Citron Eureka (Argentine)': [
    {
      supplier: 'Agrumes M\u00e9diterran\u00e9e',
      price: 2.05,
      unit: '\u20ac/kg',
      delay: '48h',
      quality: 8.8,
      minOrder: '300 kg',
      remarks: 'Calibre 3-4',
    },
    {
      supplier: 'Hispa Citrus',
      price: 1.85,
      unit: '\u20ac/kg',
      delay: '72h',
      quality: 8.2,
      minOrder: '500 kg',
      remarks: 'Traitement post-r\u00e9colte standard',
      best: true,
    },
    {
      supplier: 'Primeur Atlantic',
      price: 2.15,
      unit: '\u20ac/kg',
      delay: '48h',
      quality: 9.0,
      minOrder: '200 kg',
      remarks: 'Non trait\u00e9 apr\u00e8s r\u00e9colte',
    },
    {
      supplier: 'Costa Rica Direct',
      price: 2.4,
      unit: '\u20ac/kg',
      delay: '96h',
      quality: 8.5,
      minOrder: '400 kg',
      remarks: 'Origine unique',
    },
  ],
  'Banane Cavendish (\u00c9quateur)': [
    {
      supplier: 'Import Tropical',
      price: 1.08,
      unit: '\u20ac/kg',
      delay: '72h',
      quality: 8.5,
      minOrder: '1000 kg',
      remarks: 'Container complet',
      best: true,
    },
    {
      supplier: 'Costa Rica Direct',
      price: 1.15,
      unit: '\u20ac/kg',
      delay: '96h',
      quality: 8.8,
      minOrder: '800 kg',
      remarks: 'Rainforest Alliance',
    },
    {
      supplier: 'Fruits du Monde',
      price: 1.12,
      unit: '\u20ac/kg',
      delay: '48h',
      quality: 8.6,
      minOrder: '500 kg',
      remarks: 'Livraison Rungis',
    },
    {
      supplier: 'Comptoir du Frais',
      price: 1.2,
      unit: '\u20ac/kg',
      delay: '48h',
      quality: 8.3,
      minOrder: '300 kg',
      remarks: 'Petites quantit\u00e9s possibles',
    },
  ],
  'Ananas Victoria (R\u00e9union)': [
    {
      supplier: 'Import Tropical',
      price: 2.95,
      unit: '\u20ac/pi\u00e8ce',
      delay: '72h',
      quality: 9.2,
      minOrder: '200 pi\u00e8ces',
      remarks: 'Avion, ultra-frais',
      best: true,
    },
    {
      supplier: 'Fruits du Monde',
      price: 3.1,
      unit: '\u20ac/pi\u00e8ce',
      delay: '48h',
      quality: 9.0,
      minOrder: '100 pi\u00e8ces',
      remarks: 'Label Rouge',
    },
    {
      supplier: 'Costa Rica Direct',
      price: 2.6,
      unit: '\u20ac/pi\u00e8ce',
      delay: '96h',
      quality: 7.8,
      minOrder: '500 pi\u00e8ces',
      remarks: 'Vari\u00e9t\u00e9 MD2, pas Victoria',
    },
    {
      supplier: 'Comptoir du Frais',
      price: 3.25,
      unit: '\u20ac/pi\u00e8ce',
      delay: '48h',
      quality: 9.1,
      minOrder: '50 pi\u00e8ces',
      remarks: 'Minimum flexible',
    },
  ],
  'Orange Navel (Espagne)': [
    {
      supplier: 'Hispa Citrus',
      price: 1.45,
      unit: '\u20ac/kg',
      delay: '48h',
      quality: 9.0,
      minOrder: '500 kg',
      remarks: 'Valence, calibre 4-5',
      best: true,
    },
    {
      supplier: 'Agrumes M\u00e9diterran\u00e9e',
      price: 1.55,
      unit: '\u20ac/kg',
      delay: '48h',
      quality: 9.2,
      minOrder: '300 kg',
      remarks: 'S\u00e9lection premium',
    },
    {
      supplier: 'Primeur Atlantic',
      price: 1.6,
      unit: '\u20ac/kg',
      delay: '72h',
      quality: 8.7,
      minOrder: '200 kg',
      remarks: 'Stock disponible',
    },
  ],
  'Kiwi Hayward (Italie)': [
    {
      supplier: 'Sica Fruits',
      price: 2.3,
      unit: '\u20ac/kg',
      delay: '48h',
      quality: 9.0,
      minOrder: '200 kg',
      remarks: 'Origine Latina',
      best: true,
    },
    {
      supplier: 'Comptoir du Frais',
      price: 2.45,
      unit: '\u20ac/kg',
      delay: '48h',
      quality: 8.8,
      minOrder: '150 kg',
      remarks: 'Cat. I',
    },
    {
      supplier: 'Bio & Terroirs',
      price: 3.1,
      unit: '\u20ac/kg',
      delay: '72h',
      quality: 9.3,
      minOrder: '100 kg',
      remarks: 'Bio, saveur intense',
    },
  ],
  'Tomate Grappe (France)': [
    {
      supplier: 'Mara\u00eecher du Sud',
      price: 2.1,
      unit: '\u20ac/kg',
      delay: '24h',
      quality: 9.5,
      minOrder: '100 kg',
      remarks: 'Pleine terre, Provence',
      best: true,
    },
    {
      supplier: 'Bio & Terroirs',
      price: 2.8,
      unit: '\u20ac/kg',
      delay: '48h',
      quality: 9.2,
      minOrder: '80 kg',
      remarks: 'AB, go\u00fbt exceptionnel',
    },
    {
      supplier: 'Comptoir du Frais',
      price: 2.35,
      unit: '\u20ac/kg',
      delay: '24h',
      quality: 8.7,
      minOrder: '150 kg',
      remarks: 'Serre chauff\u00e9e, r\u00e9gulier',
    },
    {
      supplier: 'Sica Fruits',
      price: 2.25,
      unit: '\u20ac/kg',
      delay: '48h',
      quality: 8.5,
      minOrder: '200 kg',
      remarks: 'Standard',
    },
  ],
};

export default function Comparateur() {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const rows = comparisons[selectedProduct] || [];
  const lowestPrice = Math.min(...rows.map((r) => r.price));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">
          Comparateur de prix
        </h1>
        <p className="text-[13px] text-[#94a3b8] mt-0.5">
          Comparez les offres fournisseurs pour chaque produit
        </p>
      </div>

      {/* Product selector */}
      <div className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#e2e8f0]">
        <label className="text-[10px] uppercase tracking-wider text-[#94a3b8] font-medium block mb-2">
          S\u00e9lectionner un produit
        </label>
        <div className="relative max-w-md">
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="w-full h-11 px-4 pr-10 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] text-[14px] font-medium text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]/40"
          >
            {products.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none"
          />
        </div>
      </div>

      {/* Comparison table */}
      <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#e2e8f0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                <th className="text-left text-[10px] uppercase tracking-wider text-[#94a3b8] font-medium p-4">
                  Fournisseur
                </th>
                <th className="text-right text-[10px] uppercase tracking-wider text-[#94a3b8] font-medium p-4">
                  Prix unitaire
                </th>
                <th className="text-center text-[10px] uppercase tracking-wider text-[#94a3b8] font-medium p-4">
                  D\u00e9lai livraison
                </th>
                <th className="text-center text-[10px] uppercase tracking-wider text-[#94a3b8] font-medium p-4">
                  Qualit\u00e9
                </th>
                <th className="text-center text-[10px] uppercase tracking-wider text-[#94a3b8] font-medium p-4">
                  Min. commande
                </th>
                <th className="text-left text-[10px] uppercase tracking-wider text-[#94a3b8] font-medium p-4">
                  Remarques
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const isBest = row.price === lowestPrice;
                return (
                  <tr
                    key={row.supplier}
                    className={`${
                      isBest ? 'bg-[#f0fdf4]' : ''
                    } ${i < rows.length - 1 ? 'border-b border-[#f1f5f9]' : ''}`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-medium text-slate-900">
                          {row.supplier}
                        </span>
                        {row.best && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#16a34a] text-white">
                            <Award size={10} />
                            Meilleur rapport qualit\u00e9/prix
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <span
                        className={`text-[14px] font-mono font-semibold ${
                          isBest ? 'text-[#16a34a]' : 'text-slate-900'
                        }`}
                      >
                        {row.price.toFixed(2)} {row.unit}
                      </span>
                    </td>
                    <td className="p-4 text-center text-[13px] text-[#334155]">
                      {row.delay}
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`text-[13px] font-mono font-semibold ${
                          row.quality >= 9.0
                            ? 'text-[#16a34a]'
                            : row.quality >= 8.5
                            ? 'text-[#f59e0b]'
                            : 'text-[#334155]'
                        }`}
                      >
                        {row.quality.toFixed(1)}/10
                      </span>
                    </td>
                    <td className="p-4 text-center text-[13px] text-[#334155]">
                      {row.minOrder}
                    </td>
                    <td className="p-4 text-[12px] text-[#94a3b8]">
                      {row.remarks}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
