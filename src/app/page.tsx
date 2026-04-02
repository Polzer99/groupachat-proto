'use client';

import {
  TrendingUp,
  TrendingDown,
  Truck,
  FileText,
  Users,
  ShoppingCart,
  Plus,
  Star,
} from 'lucide-react';

const kpis = [
  {
    label: 'Volume total achats',
    value: '12,4M\u00a0\u20ac',
    change: '+8%',
    changePositive: true,
    sublabel: 'vs N-1',
    icon: ShoppingCart,
    color: '#DC2626',
  },
  {
    label: 'Fournisseurs actifs',
    value: '47',
    change: '+3',
    changePositive: true,
    sublabel: 'ce trimestre',
    icon: Truck,
    color: '#2563eb',
  },
  {
    label: 'Factures ce mois',
    value: '234',
    change: '+12%',
    changePositive: true,
    sublabel: 'vs mois pr\u00e9c\u00e9dent',
    icon: FileText,
    color: '#f59e0b',
  },
  {
    label: 'Membres du groupement',
    value: '12',
    change: '+2',
    changePositive: true,
    sublabel: 'cette ann\u00e9e',
    icon: Users,
    color: '#16a34a',
  },
];

const categoryData = [
  { label: 'Fruits exotiques', value: 85, color: '#DC2626' },
  { label: 'Agrumes', value: 72, color: '#f59e0b' },
  { label: 'L\u00e9gumes', value: 65, color: '#16a34a' },
  { label: 'Fruits de saison', value: 58, color: '#2563eb' },
  { label: 'Produits secs', value: 42, color: '#8b5cf6' },
  { label: 'Surgel\u00e9s', value: 35, color: '#06b6d4' },
];

const activities = [
  {
    text: 'Maison Deroche a ajout\u00e9 3 factures de Fruits du Monde',
    time: 'Il y a 12 min',
    type: 'invoice',
  },
  {
    text: 'Nouveau fournisseur r\u00e9f\u00e9renc\u00e9 : Import Tropical (Costa Rica)',
    time: 'Il y a 45 min',
    type: 'supplier',
  },
  {
    text: 'Boulangerie Duval a valid\u00e9 la comparaison Avocat Hass',
    time: 'Il y a 2h',
    type: 'compare',
  },
  {
    text: 'Alerte prix : Mangue Kent +15% chez Primeur Atlantic',
    time: 'Il y a 3h',
    type: 'alert',
  },
  {
    text: 'P\u00e2tisserie Lef\u00e8vre a rejoint le groupement',
    time: 'Hier',
    type: 'member',
  },
];

const topSuppliers = [
  {
    name: 'Fruits du Monde',
    category: 'Fruits exotiques',
    volume: '2,1M\u00a0\u20ac',
    evolution: '+12%',
    positive: true,
  },
  {
    name: 'Primeur Atlantic',
    category: 'Agrumes',
    volume: '1,8M\u00a0\u20ac',
    evolution: '+5%',
    positive: true,
  },
  {
    name: 'Comptoir du Frais',
    category: 'L\u00e9gumes',
    volume: '1,4M\u00a0\u20ac',
    evolution: '-2%',
    positive: false,
  },
  {
    name: 'Agrumes M\u00e9diterran\u00e9e',
    category: 'Agrumes',
    volume: '980K\u00a0\u20ac',
    evolution: '+18%',
    positive: true,
  },
  {
    name: 'Import Tropical',
    category: 'Fruits exotiques',
    volume: '870K\u00a0\u20ac',
    evolution: '+9%',
    positive: true,
  },
];

function getActivityIcon(type: string) {
  switch (type) {
    case 'invoice':
      return <FileText size={14} className="text-[#f59e0b]" />;
    case 'supplier':
      return <Plus size={14} className="text-[#16a34a]" />;
    case 'compare':
      return <Star size={14} className="text-[#2563eb]" />;
    case 'alert':
      return <TrendingUp size={14} className="text-[#DC2626]" />;
    case 'member':
      return <Users size={14} className="text-[#8b5cf6]" />;
    default:
      return null;
  }
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-[13px] text-[#94a3b8] mt-0.5">
          Vue d&apos;ensemble du groupement d&apos;achat GRAL
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#e2e8f0]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#94a3b8] font-medium">
                    {kpi.label}
                  </p>
                  <p className="text-2xl font-semibold text-slate-900 mt-1 font-mono">
                    {kpi.value}
                  </p>
                </div>
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${kpi.color}10` }}
                >
                  <Icon size={20} style={{ color: kpi.color }} />
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-3">
                {kpi.changePositive ? (
                  <TrendingUp size={14} className="text-[#16a34a]" />
                ) : (
                  <TrendingDown size={14} className="text-[#DC2626]" />
                )}
                <span
                  className={`text-[12px] font-medium ${
                    kpi.changePositive ? 'text-[#16a34a]' : 'text-[#DC2626]'
                  }`}
                >
                  {kpi.change}
                </span>
                <span className="text-[11px] text-[#94a3b8]">{kpi.sublabel}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart placeholder */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#e2e8f0]">
          <h2 className="text-[14px] font-semibold text-slate-900 mb-4">
            \u00c9volution des achats par cat\u00e9gorie
          </h2>
          <div className="space-y-3">
            {categoryData.map((cat) => (
              <div key={cat.label} className="flex items-center gap-3">
                <span className="text-[12px] text-[#334155] w-32 shrink-0">
                  {cat.label}
                </span>
                <div className="flex-1 h-8 bg-[#f8fafc] rounded-lg overflow-hidden">
                  <div
                    className="h-full rounded-lg transition-all duration-500"
                    style={{
                      width: `${cat.value}%`,
                      background: `linear-gradient(90deg, ${cat.color}, ${cat.color}cc)`,
                    }}
                  />
                </div>
                <span className="text-[12px] font-mono text-[#334155] w-10 text-right">
                  {cat.value}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#e2e8f0]">
          <h2 className="text-[14px] font-semibold text-slate-900 mb-4">
            Activit\u00e9 r\u00e9cente
          </h2>
          <div className="space-y-4">
            {activities.map((activity, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center shrink-0 mt-0.5">
                  {getActivityIcon(activity.type)}
                </div>
                <div>
                  <p className="text-[12px] text-[#334155] leading-relaxed">
                    {activity.text}
                  </p>
                  <p className="text-[10px] text-[#94a3b8] mt-0.5">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top fournisseurs table */}
      <div className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#e2e8f0]">
        <h2 className="text-[14px] font-semibold text-slate-900 mb-4">
          Top fournisseurs
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e2e8f0]">
                <th className="text-left text-[10px] uppercase tracking-wider text-[#94a3b8] font-medium pb-3">
                  Fournisseur
                </th>
                <th className="text-left text-[10px] uppercase tracking-wider text-[#94a3b8] font-medium pb-3">
                  Cat\u00e9gorie
                </th>
                <th className="text-right text-[10px] uppercase tracking-wider text-[#94a3b8] font-medium pb-3">
                  Volume
                </th>
                <th className="text-right text-[10px] uppercase tracking-wider text-[#94a3b8] font-medium pb-3">
                  \u00c9volution
                </th>
              </tr>
            </thead>
            <tbody>
              {topSuppliers.map((s, i) => (
                <tr
                  key={s.name}
                  className={i < topSuppliers.length - 1 ? 'border-b border-[#f1f5f9]' : ''}
                >
                  <td className="py-3 text-[13px] font-medium text-slate-900">
                    {s.name}
                  </td>
                  <td className="py-3">
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#334155]">
                      {s.category}
                    </span>
                  </td>
                  <td className="py-3 text-right text-[13px] font-mono text-[#334155]">
                    {s.volume}
                  </td>
                  <td className="py-3 text-right">
                    <span
                      className={`inline-flex items-center gap-1 text-[12px] font-medium ${
                        s.positive ? 'text-[#16a34a]' : 'text-[#DC2626]'
                      }`}
                    >
                      {s.positive ? (
                        <TrendingUp size={13} />
                      ) : (
                        <TrendingDown size={13} />
                      )}
                      {s.evolution}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
