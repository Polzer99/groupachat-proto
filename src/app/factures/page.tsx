'use client';

import { useState } from 'react';
import { CloudUpload, FileText, Filter } from 'lucide-react';

const invoicesData = [
  { date: '29/03/2026', supplier: 'Fruits du Monde', amount: '12\u00a0450\u00a0\u20ac', status: 'Trait\u00e9e', member: 'Maison Deroche' },
  { date: '28/03/2026', supplier: 'Primeur Atlantic', amount: '8\u00a0720\u00a0\u20ac', status: 'Trait\u00e9e', member: 'Boulangerie Duval' },
  { date: '28/03/2026', supplier: 'Import Tropical', amount: '15\u00a0340\u00a0\u20ac', status: 'En attente', member: 'Maison Deroche' },
  { date: '27/03/2026', supplier: 'Agrumes M\u00e9diterran\u00e9e', amount: '6\u00a0890\u00a0\u20ac', status: 'Trait\u00e9e', member: 'P\u00e2tisserie Lef\u00e8vre' },
  { date: '27/03/2026', supplier: 'Comptoir du Frais', amount: '9\u00a0180\u00a0\u20ac', status: 'Trait\u00e9e', member: 'Traiteur Moreau' },
  { date: '26/03/2026', supplier: 'Bio & Terroirs', amount: '4\u00a0560\u00a0\u20ac', status: 'Rejet\u00e9e', member: 'Les Halles de Sophie' },
  { date: '26/03/2026', supplier: 'Fruits du Monde', amount: '11\u00a0200\u00a0\u20ac', status: 'Trait\u00e9e', member: 'Boulangerie Duval' },
  { date: '25/03/2026', supplier: 'Hispa Citrus', amount: '7\u00a0340\u00a0\u20ac', status: 'En attente', member: '\u00c9picerie Lambert' },
  { date: '25/03/2026', supplier: 'Mara\u00eecher du Sud', amount: '3\u00a0780\u00a0\u20ac', status: 'Trait\u00e9e', member: 'Traiteur Moreau' },
  { date: '24/03/2026', supplier: 'Costa Rica Direct', amount: '18\u00a0900\u00a0\u20ac', status: 'Trait\u00e9e', member: 'Maison Deroche' },
  { date: '24/03/2026', supplier: 'Sica Fruits', amount: '5\u00a0120\u00a0\u20ac', status: 'En attente', member: 'Primeurs Gauthier' },
  { date: '23/03/2026', supplier: 'Primeur Atlantic', amount: '10\u00a0450\u00a0\u20ac', status: 'Trait\u00e9e', member: 'P\u00e2tisserie Lef\u00e8vre' },
  { date: '22/03/2026', supplier: 'Produits du Levant', amount: '2\u00a0670\u00a0\u20ac', status: 'Rejet\u00e9e', member: 'Restaurant Blanc' },
  { date: '21/03/2026', supplier: 'Import Tropical', amount: '14\u00a0230\u00a0\u20ac', status: 'Trait\u00e9e', member: 'Maison Deroche' },
  { date: '20/03/2026', supplier: 'Atlantic Seafresh', amount: '8\u00a0560\u00a0\u20ac', status: 'Trait\u00e9e', member: 'Les Halles de Sophie' },
];

const members = ['Tous', 'Maison Deroche', 'Boulangerie Duval', 'P\u00e2tisserie Lef\u00e8vre', 'Traiteur Moreau', 'Les Halles de Sophie', '\u00c9picerie Lambert', 'Primeurs Gauthier', 'Restaurant Blanc'];
const statuses = ['Tous', 'Trait\u00e9e', 'En attente', 'Rejet\u00e9e'];

export default function Factures() {
  const [memberFilter, setMemberFilter] = useState('Tous');
  const [statusFilter, setStatusFilter] = useState('Tous');

  const filtered = invoicesData.filter((inv) => {
    const matchMember = memberFilter === 'Tous' || inv.member === memberFilter;
    const matchStatus = statusFilter === 'Tous' || inv.status === statusFilter;
    return matchMember && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Factures</h1>
        <p className="text-[13px] text-[#94a3b8] mt-0.5">
          Gestion et suivi des factures du groupement
        </p>
      </div>

      {/* Upload zone */}
      <div className="bg-white rounded-xl border-2 border-dashed border-[#e2e8f0] p-8 text-center hover:border-[#DC2626]/30 transition-colors cursor-pointer">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#fef2f2] flex items-center justify-center">
            <CloudUpload size={24} className="text-[#DC2626]" />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-slate-900">
              D\u00e9poser une facture
            </p>
            <p className="text-[12px] text-[#94a3b8] mt-1">
              Glissez-d\u00e9posez vos fichiers PDF ici ou cliquez pour parcourir
            </p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <FileText size={14} className="text-[#94a3b8]" />
            <span className="text-[11px] text-[#94a3b8]">
              PDF, JPG, PNG \u2014 Max 10 Mo
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="flex items-center gap-1.5 text-[#94a3b8]">
          <Filter size={14} />
          <span className="text-[11px] uppercase tracking-wider font-medium">
            Filtrer
          </span>
        </div>
        <select
          value={memberFilter}
          onChange={(e) => setMemberFilter(e.target.value)}
          className="h-9 px-3 rounded-lg bg-white border border-[#e2e8f0] text-[12px] text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 min-w-[180px]"
        >
          {members.map((m) => (
            <option key={m} value={m}>
              {m === 'Tous' ? 'Tous les membres' : m}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 px-3 rounded-lg bg-white border border-[#e2e8f0] text-[12px] text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 min-w-[140px]"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s === 'Tous' ? 'Tous les statuts' : s}
            </option>
          ))}
        </select>
        <span className="text-[11px] text-[#94a3b8] ml-auto">
          {filtered.length} facture{filtered.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* Invoices table */}
      <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#e2e8f0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                <th className="text-left text-[10px] uppercase tracking-wider text-[#94a3b8] font-medium p-4">
                  Date
                </th>
                <th className="text-left text-[10px] uppercase tracking-wider text-[#94a3b8] font-medium p-4">
                  Fournisseur
                </th>
                <th className="text-right text-[10px] uppercase tracking-wider text-[#94a3b8] font-medium p-4">
                  Montant
                </th>
                <th className="text-center text-[10px] uppercase tracking-wider text-[#94a3b8] font-medium p-4">
                  Statut
                </th>
                <th className="text-left text-[10px] uppercase tracking-wider text-[#94a3b8] font-medium p-4">
                  Membre
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv, i) => (
                <tr
                  key={`${inv.date}-${inv.supplier}-${i}`}
                  className={`hover:bg-[#f8fafc] transition-colors ${
                    i < filtered.length - 1 ? 'border-b border-[#f1f5f9]' : ''
                  }`}
                >
                  <td className="p-4 text-[13px] text-[#334155]">{inv.date}</td>
                  <td className="p-4 text-[13px] font-medium text-slate-900">
                    {inv.supplier}
                  </td>
                  <td className="p-4 text-right text-[13px] font-mono font-semibold text-slate-900">
                    {inv.amount}
                  </td>
                  <td className="p-4 text-center">
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
                  <td className="p-4 text-[13px] text-[#334155]">{inv.member}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
