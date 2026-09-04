'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProperties } from '@/lib/context/PropertyContext';
import {
  Home,
  Search,
  ShieldCheck,
  MapPin,
  User,
  PlusCircle,
  Sparkles,
} from 'lucide-react';

export function MobileFooterNav() {
  const pathname = usePathname();
  const { favorites } = useProperties();

  const navItems = [
    {
      label: 'Home',
      href: '/',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      label: 'Properties',
      href: '/search',
      icon: Search,
      isActive: pathname === '/search' && !pathname.includes('view=map'),
    },
    {
      label: 'List Free',
      href: '/list-property',
      icon: PlusCircle,
      isSpecial: true,
      isActive: pathname === '/list-property',
    },
    {
      label: 'Map',
      href: '/search?view=map',
      icon: MapPin,
      isActive: pathname.includes('view=map'),
    },
    {
      label: 'Agents',
      href: '/verified-agents',
      icon: ShieldCheck,
      isActive: pathname === '/verified-agents',
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: User,
      isActive: pathname === '/dashboard',
      badgeCount: favorites.length > 0 ? favorites.length : undefined,
    },
  ];

  // On property detail pages, hide footer nav so the direct contact bar (WhatsApp/Call/Enquiry) is unobstructed
  if (pathname.startsWith('/property/')) {
    return null;
  }

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-lg border-t border-malta-border shadow-[0_-4px_20px_rgba(0,0,0,0.07)] px-2 py-1.5 transition-all duration-200"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;

          if (item.isSpecial) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-4 group relative"
                aria-label={item.label}
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-transform transform active:scale-95 ${
                    active
                      ? 'bg-malta-navy text-white ring-2 ring-malta-blue ring-offset-2'
                      : 'bg-malta-blue text-white hover:bg-malta-blue-hover'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-[10px] font-bold mt-0.5 tracking-tight ${
                    active ? 'text-malta-navy font-extrabold' : 'text-malta-blue'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all duration-150 relative ${
                active
                  ? 'text-malta-blue font-bold'
                  : 'text-malta-slate hover:text-malta-charcoal'
              }`}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 ${active ? 'stroke-[2.5px]' : 'stroke-[1.75px]'}`} />
                {item.badgeCount && (
                  <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                    {item.badgeCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 ${active ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
              {active && (
                <span className="w-1 h-1 rounded-full bg-malta-blue mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
