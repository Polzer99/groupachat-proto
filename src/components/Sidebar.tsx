'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Truck,
  GitCompareArrows,
  FileText,
  Users,
  Menu,
  X,
  Search,
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/fournisseurs', label: 'Fournisseurs', icon: Truck },
  { href: '/comparateur', label: 'Comparateur', icon: GitCompareArrows },
  { href: '/factures', label: 'Factures', icon: FileText },
  { href: '/membres', label: 'Membres', icon: Users },
];

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[240px] bg-[#1a1a2e] flex flex-col transition-transform duration-200 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 h-16 border-b border-white/10">
          <span className="text-white text-lg font-semibold tracking-tight">
            GroupAchat
          </span>
          <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
          <button
            className="ml-auto lg:hidden text-white/60 hover:text-white"
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                  active
                    ? 'bg-white/10 text-white border-l-[3px] border-[#DC2626] -ml-[3px] pl-[15px]'
                    : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                }`}
              >
                <Icon size={18} strokeWidth={active ? 2 : 1.5} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#DC2626] flex items-center justify-center text-white text-[11px] font-semibold">
              GR
            </div>
            <div>
              <p className="text-white text-[12px] font-medium">GRAL</p>
              <p className="text-white/40 text-[10px]">Groupement d'achat</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-[#e2e8f0] flex items-center px-4 lg:px-6 gap-4 shrink-0">
          <button
            className="lg:hidden text-[#334155] hover:text-[#1a1a2e]"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} />
          </button>
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]"
              />
              <input
                type="text"
                placeholder="Rechercher un fournisseur, produit, membre..."
                className="w-full h-10 pl-9 pr-4 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] text-[13px] text-[#334155] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]/40"
              />
            </div>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1a1a2e] flex items-center justify-center text-white text-[11px] font-semibold">
              PD
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
