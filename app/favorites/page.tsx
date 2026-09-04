'use client';

import React from 'react';
import Link from 'next/link';
import { useProperties } from '@/lib/context/PropertyContext';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { Heart, ArrowLeft, Search } from 'lucide-react';

export default function FavoritesPage() {
  const { properties, favorites } = useProperties();

  const savedProps = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-malta-border">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">
            <Heart className="w-4 h-4 fill-rose-600 text-rose-600" />
            Your Shortlist
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-malta-charcoal font-heading">
            Saved Properties ({savedProps.length})
          </h1>
          <p className="text-xs sm:text-sm text-malta-slate mt-0.5">
            Compare and review properties you've favorited during your search across Malta.
          </p>
        </div>

        <Link
          href="/search"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-btn bg-white border border-malta-border text-xs sm:text-sm font-bold text-malta-charcoal hover:bg-malta-warm shadow-soft"
        >
          <Search className="w-4 h-4 text-malta-blue" />
          <span>Browse More Properties</span>
        </Link>
      </div>

      {savedProps.length === 0 ? (
        <div className="bg-white rounded-card border border-malta-border p-16 text-center space-y-4 shadow-soft">
          <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-malta-charcoal font-heading">
            Your shortlist is currently empty
          </h3>
          <p className="text-xs text-malta-slate max-w-sm mx-auto">
            Click the heart icon on any property card or detail page to save homes for later comparison.
          </p>
          <div className="pt-2">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-btn bg-malta-blue text-white text-xs font-bold hover:bg-malta-blue-hover transition-colors"
            >
              <Search className="w-4 h-4" />
              Explore Properties in Malta
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {savedProps.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      )}
    </div>
  );
}
