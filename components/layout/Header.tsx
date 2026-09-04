'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProperties } from '@/lib/context/PropertyContext';
import {
  Heart,
  PlusCircle,
  Menu,
  X,
  MapPin,
  Home,
  Building,
  Key,
  LayoutDashboard,
  ShieldCheck,
  User,
} from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const { favorites, currentUser } = useProperties();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/search', label: 'Properties' },
    { href: '/verified-agents', label: 'Verified Agent' },
    { href: '/search?view=map', label: 'Map Search' },
    { href: '/advertising', label: 'Ads Partnarship' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-malta-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3.5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-btn bg-malta-blue flex items-center justify-center text-white shadow-md group-hover:bg-malta-blue-hover transition-colors">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-white"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-malta-charcoal font-heading leading-tight flex items-center gap-1">
                Malta<span className="text-malta-blue">Property</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-malta-sand/50 text-malta-charcoal ml-1 hidden sm:inline-block">
                  Direct
                </span>
              </span>
              <span className="text-[11px] text-malta-slate font-medium hidden sm:inline">
                Direct-to-Owner Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href.includes('?') && pathname === link.href.split('?')[0]);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-btn text-sm font-medium transition-all ${
                    isActive
                      ? 'text-malta-blue bg-malta-sky font-semibold'
                      : 'text-malta-charcoal hover:text-malta-blue hover:bg-malta-warm'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Favorites Shortlist */}
            <Link
              href="/favorites"
              className="relative p-2 text-malta-slate hover:text-malta-blue hover:bg-malta-warm rounded-full transition-colors"
              title="Saved Properties"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-malta-blue text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Dashboard Link */}
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-btn text-malta-charcoal hover:text-malta-blue hover:bg-malta-warm transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-malta-slate" />
              Dashboard
            </Link>

            {/* List Property Primary CTA */}
            <Link
              href="/list-property"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-btn bg-malta-blue text-white text-sm font-semibold shadow-sm hover:bg-malta-blue-hover transition-all duration-150 transform active:scale-98"
            >
              <PlusCircle className="w-4 h-4" />
              List Your Property
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              href="/favorites"
              className="relative p-2 text-malta-slate hover:text-malta-blue"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-malta-blue text-white text-[10px] font-bold flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-btn text-malta-charcoal hover:bg-malta-warm focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-malta-border bg-white px-4 pt-3 pb-6 space-y-3 shadow-dropdown animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-3 rounded-card bg-malta-warm hover:bg-malta-sky text-malta-charcoal text-sm font-medium"
            >
              <Home className="w-4 h-4 text-malta-blue" />
              Properties
            </Link>
            <Link
              href="/verified-agents"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-3 rounded-card bg-malta-warm hover:bg-malta-sky text-malta-charcoal text-sm font-medium"
            >
              <ShieldCheck className="w-4 h-4 text-malta-blue" />
              Verified Agent
            </Link>
            <Link
              href="/search?view=map"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-3 rounded-card bg-malta-warm hover:bg-malta-sky text-malta-charcoal text-sm font-medium"
            >
              <MapPin className="w-4 h-4 text-malta-blue" />
              Map Search
            </Link>
            <Link
              href="/advertising"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-3 rounded-card bg-malta-warm hover:bg-malta-sky text-malta-charcoal text-sm font-medium"
            >
              <Building className="w-4 h-4 text-malta-blue" />
              Ads Partnarship
            </Link>
          </div>

          <Link
            href="/list-property"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-btn bg-malta-blue text-white text-sm font-semibold shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            List Your Property For Free
          </Link>
        </div>
      )}
    </header>
  );
}
