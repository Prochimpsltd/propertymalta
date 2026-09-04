'use client';

import React from 'react';
import Link from 'next/link';
import { Property } from '@/types';
import { useProperties } from '@/lib/context/PropertyContext';
import { formatPrice } from '@/lib/utils';
import { Heart, MapPin, Bed, Bath, Maximize2, Sparkles } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  compact?: boolean;
}

export function PropertyCard({ property, compact = false }: PropertyCardProps) {
  const { isFavorite, toggleFavorite, recordPropertyView } = useProperties();
  const favorited = isFavorite(property.id);

  const primaryImage =
    property.images.find((img) => img.isPrimary)?.url ||
    property.images[0]?.url ||
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';

  const handleCardClick = () => {
    recordPropertyView(property.id);
  };

  return (
    <div
      className={`group rounded-lg sm:rounded-card border overflow-hidden transition-all duration-200 hover:shadow-hover hover:-translate-y-1 flex flex-col h-full ${
        property.isFeatured
          ? 'bg-[#FEF9EE] border-amber-300 shadow-xs ring-1 ring-amber-300/60'
          : 'bg-white border-malta-border shadow-soft'
      }`}
    >
      {/* Property Photo & Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-malta-warm rounded-t-lg sm:rounded-t-card">
        <Link
          href={`/property/${property.slug}`}
          onClick={handleCardClick}
          className="block w-full h-full"
        >
          <img
            src={primaryImage}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Top Badges (Desktop/Tablet only - hidden on mobile view per design requirements) */}
        <div className="hidden sm:flex absolute top-3 left-3 flex-wrap gap-1.5 z-10 pointer-events-none">
          {property.purpose === 'buy' ? (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-white/95 text-malta-charcoal shadow-sm backdrop-blur-sm">
              For Sale
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-malta-sky text-malta-navy shadow-sm font-semibold backdrop-blur-sm">
              For Rent
            </span>
          )}

          {property.isFeatured && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-amber-100 text-amber-900 border border-amber-300/60 shadow-sm backdrop-blur-sm">
              <Sparkles className="w-3 h-3 text-amber-600" />
              Featured
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(property.id);
          }}
          className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full transition-all duration-150 z-10 shadow-sm ${
            favorited
              ? 'bg-rose-50 text-rose-600 scale-105'
              : 'bg-white/90 text-malta-slate hover:text-rose-600 hover:bg-white'
          }`}
          title={favorited ? 'Remove from Saved' : 'Save Property'}
          aria-label="Save Property"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${favorited ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Property Reference on corner */}
        <div className="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-3">
          <span className="text-[9px] sm:text-[10px] font-mono font-medium px-1.5 sm:px-2 py-0.5 rounded-sm sm:rounded bg-black/60 text-white backdrop-blur-sm">
            {property.referenceCode}
          </span>
        </div>
      </div>

      {/* Card Body (2-Second Scan Rule) */}
      <div className="p-2.5 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price & Type Badge */}
          <div className="flex items-baseline justify-between gap-1 mb-1 sm:mb-1.5">
            <span className="text-sm sm:text-2xl font-extrabold text-malta-charcoal font-heading tracking-tight truncate">
              {formatPrice(property.price, property.purpose)}
            </span>
            <span className="text-[10px] sm:text-xs font-medium text-malta-blue bg-malta-sky/60 px-1.5 sm:px-2 py-0.5 rounded-sm sm:rounded shrink-0">
              {property.propertyType}
            </span>
          </div>

          {/* Title */}
          <Link
            href={`/property/${property.slug}`}
            onClick={handleCardClick}
            className="block"
          >
            <h3 className="text-xs sm:text-base font-semibold text-malta-charcoal line-clamp-1 group-hover:text-malta-blue transition-colors">
              {property.title}
            </h3>
          </Link>

          {/* Locality */}
          <p className="flex items-center gap-1 text-[11px] sm:text-xs text-malta-slate mt-1 sm:mt-1.5 font-medium truncate">
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-malta-blue shrink-0" />
            <span className="truncate">{property.location.locality}, Malta</span>
          </p>
        </div>

        {/* Organized Specs Matrix (Bedrooms, Bathrooms, Area) */}
        <div className="pt-2 sm:pt-3.5 mt-2 sm:mt-3.5 border-t border-malta-border/80 space-y-1">
          <div
            className={`grid grid-cols-3 gap-1 p-0.5 sm:p-1 rounded-md sm:rounded-btn border ${
              property.isFeatured
                ? 'bg-amber-100/50 border-amber-200/80'
                : 'bg-malta-warm/80 border-malta-border/70'
            }`}
          >
            {/* Bedrooms */}
            <div
              className="flex items-center justify-center gap-1 py-0.5 sm:py-1 px-0.5 sm:px-1 rounded-sm sm:rounded-md bg-white border border-malta-border/50 text-center shadow-xs"
              title={`${property.bedrooms === 0 ? 'Studio / Commercial' : `${property.bedrooms} Bedrooms`}`}
            >
              <Bed className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-malta-blue shrink-0" />
              <span className="text-[10px] sm:text-xs font-bold text-malta-charcoal truncate">
                {property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} Bed`}
              </span>
            </div>

            {/* Bathrooms */}
            <div
              className="flex items-center justify-center gap-1 py-0.5 sm:py-1 px-0.5 sm:px-1 rounded-sm sm:rounded-md bg-white border border-malta-border/50 text-center shadow-xs"
              title={`${property.bathrooms} Bathrooms`}
            >
              <Bath className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-malta-blue shrink-0" />
              <span className="text-[10px] sm:text-xs font-bold text-malta-charcoal truncate">
                {property.bathrooms} Bath
              </span>
            </div>

            {/* Area */}
            <div
              className="flex items-center justify-center gap-1 py-0.5 sm:py-1 px-0.5 sm:px-1 rounded-sm sm:rounded-md bg-white border border-malta-border/50 text-center shadow-xs"
              title={`Internal: ${property.internalArea} m²${property.externalArea ? ` • External: ${property.externalArea} m²` : ''}`}
            >
              <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-malta-blue shrink-0" />
              <span className="text-[10px] sm:text-xs font-bold text-malta-charcoal truncate">
                {property.internalArea} m²
              </span>
            </div>
          </div>

          {/* External Area Sub-badge if present */}
          {property.externalArea && property.externalArea > 0 ? (
            <div className="hidden sm:flex items-center justify-between text-[11px] text-malta-slate font-medium px-1">
              <span>Internal: <strong className="text-malta-charcoal">{property.internalArea} m²</strong></span>
              <span className="text-malta-blue font-semibold">+{property.externalArea} m² ext</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
