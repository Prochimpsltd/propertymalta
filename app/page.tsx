'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProperties } from '@/lib/context/PropertyContext';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { BannerCard } from '@/components/ui/BannerCard';
import { HeroMotionBanner } from '@/components/ui/HeroMotionBanner';
import { MapWrapper } from '@/components/map/MapWrapper';
import { MALTA_LOCALITIES, PROPERTY_TYPES } from '@/lib/data/properties';
import {
  Search,
  MapPin,
  Building,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Compass,
  Key,
  Home,
  PlusCircle,
  SlidersHorizontal,
  X,
  Check,
  ChevronDown,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { properties, banners } = useProperties();

  // Hero Search State
  const [purpose, setPurpose] = useState<'buy' | 'rent'>('buy');
  const [locality, setLocality] = useState('All Malta & Gozo');
  const [propertyType, setPropertyType] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [bedrooms, setBedrooms] = useState<'any' | number>('any');
  const [bathrooms, setBathrooms] = useState<'any' | number>('any');

  // Mobile Filter Sheet State
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [localitySearch, setLocalitySearch] = useState('');

  // Tab for latest properties
  const [latestTab, setLatestTab] = useState<'all' | 'buy' | 'rent'>('all');

  const matchingPropertiesCount = properties.filter((p) => {
    if (p.approvalStatus !== 'approved') return false;
    if (p.purpose !== purpose) return false;
    if (locality !== 'All Malta & Gozo' && p.location.locality !== locality) return false;
    if (propertyType !== 'all' && p.propertyType !== propertyType) return false;
    if (minPrice && p.price < Number(minPrice)) return false;
    if (maxPrice && p.price > Number(maxPrice)) return false;
    if (bedrooms !== 'any' && p.bedrooms < Number(bedrooms)) return false;
    if (bathrooms !== 'any' && p.bathrooms < Number(bathrooms)) return false;
    return true;
  }).length;

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('purpose', purpose);
    if (locality !== 'All Malta & Gozo') params.set('locality', locality);
    if (propertyType !== 'all') params.set('type', propertyType);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (bedrooms !== 'any') params.set('beds', bedrooms.toString());
    if (bathrooms !== 'any') params.set('baths', bathrooms.toString());

    router.push(`/search?${params.toString()}`);
  };

  const featuredProperties = properties
    .filter((p) => p.approvalStatus === 'approved' && p.isFeatured)
    .slice(0, 4);

  const latestProperties = properties
    .filter((p) => p.approvalStatus === 'approved')
    .filter((p) => (latestTab === 'all' ? true : p.purpose === latestTab))
    .slice(0, 6);

  const topLocations = [
    { name: 'Sliema', count: 245, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80' },
    { name: "St Julian's", count: 187, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80' },
    { name: 'Valletta', count: 112, image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80' },
    { name: 'Mosta', count: 143, image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80' },
    { name: 'Mellieħa', count: 96, image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80' },
    { name: 'Victoria (Gozo)', count: 78, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80' },
  ];

  const midBanner = banners.find((b) => b.placement === 'home_mid' && b.isActive);

  return (
    <div className="space-y-14 sm:space-y-20 pb-16">
      {/* 1. HERO SECTION & FLOATING SEARCH CARD */}
      <section className="relative pt-0 sm:pt-6 pb-10 sm:pb-16 overflow-hidden">
        {/* Subtle Mediterranean Background Gradient & Image Texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-malta-sky-light/80 via-malta-warm to-malta-warm -z-10" />

        {/* 1. TOP: Sliding Motion Banners (Full width on mobile, no side spacing) */}
        <div className="w-full max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 mb-6 sm:mb-10">
          <HeroMotionBanner />
        </div>

        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
          {/* 2. Headline & Value Proposition */}
          <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3 pt-1 sm:pt-3 px-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-malta-sky text-malta-navy text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-malta-blue" />
              Direct Owner Property Marketplace
            </div>
            <h1 className="text-2xl sm:text-5xl font-extrabold text-malta-charcoal font-heading tracking-tight leading-tight">
              Find Your Place in Malta
            </h1>
            <p className="text-xs sm:text-lg text-malta-slate leading-relaxed max-w-xl mx-auto">
              Buy, rent, or list your property directly with verified homeowners and landlords. Zero agent commissions.
            </p>
          </div>

          {/* 3. Floating Search & Filters Card */}
          <div className="max-w-5xl mx-auto bg-white rounded-lg sm:rounded-card shadow-card border border-malta-border p-4 sm:p-7 relative z-20">
            {/* Buy / Rent Switcher Tabs */}
            <div className="flex items-center justify-between pb-4 sm:pb-5 mb-4 sm:mb-5 border-b border-malta-border">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setPurpose('buy')}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-md sm:rounded-btn text-xs sm:text-sm font-bold transition-all ${
                    purpose === 'buy'
                      ? 'bg-malta-blue text-white shadow-sm'
                      : 'bg-malta-warm text-malta-slate hover:text-malta-charcoal hover:bg-gray-100'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  Buy Property
                </button>
                <button
                  type="button"
                  onClick={() => setPurpose('rent')}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-md sm:rounded-btn text-xs sm:text-sm font-bold transition-all ${
                    purpose === 'rent'
                      ? 'bg-malta-blue text-white shadow-sm'
                      : 'bg-malta-warm text-malta-slate hover:text-malta-charcoal hover:bg-gray-100'
                  }`}
                >
                  <Key className="w-4 h-4" />
                  Rent Property
                </button>
              </div>

              {/* Mobile Filter Sheet Trigger Button */}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="sm:hidden flex items-center gap-1.5 px-3 py-2 rounded-md bg-malta-warm border border-malta-border text-xs font-bold text-malta-charcoal hover:bg-malta-sky hover:text-malta-blue transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-malta-blue" />
                <span>Filters</span>
              </button>
            </div>

            {/* Search Input Controls */}
            <form onSubmit={handleHeroSearch} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                {/* Locality */}
                <div>
                  <label className="block text-[11px] font-bold text-malta-charcoal uppercase tracking-wider mb-1">
                    Location / Area
                  </label>
                  
                  {/* On Mobile: Tapping opens the bottom sheet modal filter */}
                  <div className="block sm:hidden">
                    <button
                      type="button"
                      onClick={() => setMobileFilterOpen(true)}
                      className="w-full flex items-center justify-between pl-3 pr-3 py-2.5 rounded-md border border-malta-border bg-malta-warm/40 text-xs font-semibold text-malta-charcoal text-left hover:bg-malta-sky/30 transition-colors"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <MapPin className="w-3.5 h-3.5 text-malta-blue shrink-0" />
                        <span className="truncate">{locality}</span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-malta-slate shrink-0 ml-1" />
                    </button>
                  </div>

                  {/* On Desktop: Standard select dropdown */}
                  <div className="hidden sm:block relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-malta-slate pointer-events-none" />
                    <select
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-btn border border-malta-border bg-malta-warm/40 text-sm text-malta-charcoal font-medium focus:outline-none focus:ring-2 focus:ring-malta-blue/30 focus:border-malta-blue"
                    >
                      {MALTA_LOCALITIES.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-[11px] font-bold text-malta-charcoal uppercase tracking-wider mb-1">
                    Property Type
                  </label>

                  {/* On Mobile: Tapping opens the bottom sheet modal filter */}
                  <div className="block sm:hidden">
                    <button
                      type="button"
                      onClick={() => setMobileFilterOpen(true)}
                      className="w-full flex items-center justify-between pl-3 pr-3 py-2.5 rounded-md border border-malta-border bg-malta-warm/40 text-xs font-semibold text-malta-charcoal text-left hover:bg-malta-sky/30 transition-colors"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Building className="w-3.5 h-3.5 text-malta-slate shrink-0" />
                        <span className="truncate">{propertyType === 'all' ? 'All Property Types' : propertyType}</span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-malta-slate shrink-0 ml-1" />
                    </button>
                  </div>

                  {/* On Desktop: Standard select dropdown */}
                  <div className="hidden sm:block relative">
                    <Building className="absolute left-3 top-3 w-4 h-4 text-malta-slate pointer-events-none" />
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-btn border border-malta-border bg-malta-warm/40 text-sm text-malta-charcoal font-medium focus:outline-none focus:ring-2 focus:ring-malta-blue/30 focus:border-malta-blue"
                    >
                      <option value="all">All Property Types</option>
                      {PROPERTY_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Min Price */}
                <div>
                  <label className="block text-[11px] font-bold text-malta-charcoal uppercase tracking-wider mb-1">
                    {purpose === 'buy' ? 'Min Price (€)' : 'Min Rent (€/mo)'}
                  </label>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder={purpose === 'buy' ? 'e.g. 150,000' : 'e.g. 800'}
                    className="w-full px-3.5 py-2 sm:py-2.5 rounded-md sm:rounded-btn border border-malta-border bg-malta-warm/40 text-xs sm:text-sm text-malta-charcoal font-medium focus:outline-none focus:ring-2 focus:ring-malta-blue/30 focus:border-malta-blue"
                  />
                </div>

                {/* Max Price */}
                <div>
                  <label className="block text-[11px] font-bold text-malta-charcoal uppercase tracking-wider mb-1">
                    {purpose === 'buy' ? 'Max Price (€)' : 'Max Rent (€/mo)'}
                  </label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder={purpose === 'buy' ? 'e.g. 600,000' : 'e.g. 2,500'}
                    className="w-full px-3.5 py-2 sm:py-2.5 rounded-md sm:rounded-btn border border-malta-border bg-malta-warm/40 text-xs sm:text-sm text-malta-charcoal font-medium focus:outline-none focus:ring-2 focus:ring-malta-blue/30 focus:border-malta-blue"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-malta-slate">
                  <span className="w-2 h-2 rounded-full bg-malta-green"></span>
                  <span>{properties.filter((p) => p.approvalStatus === 'approved').length} Active direct listings online</span>
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-2.5 sm:py-3 rounded-md sm:rounded-btn bg-malta-blue text-white text-xs sm:text-sm font-bold shadow-md hover:bg-malta-blue-hover transition-all duration-150 transform active:scale-98"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Properties</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* MOBILE FILTER MODAL SHEET (Opens like property page filter) */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full sm:max-w-lg max-h-[88vh] rounded-t-2xl sm:rounded-card shadow-2xl flex flex-col overflow-hidden border border-malta-border">
            {/* Pinned Top Header */}
            <div className="p-4 sm:p-5 border-b border-malta-border flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-malta-blue" />
                <h3 className="text-base font-bold text-malta-charcoal font-heading">
                  Filter Properties
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 rounded-full text-malta-slate hover:bg-gray-100 transition-colors"
                aria-label="Close Filter Dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Filter Controls */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {/* Buy / Rent Tabs */}
              <div>
                <label className="block text-xs font-bold text-malta-charcoal mb-1.5 uppercase tracking-wider">
                  Listing Purpose
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPurpose('buy')}
                    className={`py-2.5 px-3 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      purpose === 'buy'
                        ? 'bg-malta-blue text-white shadow-xs'
                        : 'bg-malta-warm text-malta-slate border border-malta-border'
                    }`}
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>For Sale</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPurpose('rent')}
                    className={`py-2.5 px-3 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      purpose === 'rent'
                        ? 'bg-malta-blue text-white shadow-xs'
                        : 'bg-malta-warm text-malta-slate border border-malta-border'
                    }`}
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>For Rent</span>
                  </button>
                </div>
              </div>

              {/* Locality Search & Selector */}
              <div>
                <label className="block text-xs font-bold text-malta-charcoal mb-1.5 uppercase tracking-wider">
                  Locality / Town
                </label>
                <div className="relative mb-2">
                  <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-malta-slate pointer-events-none" />
                  <input
                    type="text"
                    value={localitySearch}
                    onChange={(e) => setLocalitySearch(e.target.value)}
                    placeholder="Quick search locality (e.g. Sliema, Valletta)..."
                    className="w-full pl-9 pr-8 py-2 rounded-md border border-malta-border text-xs bg-malta-warm/40 focus:outline-none focus:ring-2 focus:ring-malta-blue/30"
                  />
                  {localitySearch && (
                    <button
                      type="button"
                      onClick={() => setLocalitySearch('')}
                      className="absolute right-2.5 top-2 text-malta-slate hover:text-malta-charcoal text-xs font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Locality Chips Grid */}
                <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto p-1 bg-malta-warm/40 rounded-md border border-malta-border">
                  {MALTA_LOCALITIES.filter((loc) =>
                    loc.toLowerCase().includes(localitySearch.toLowerCase())
                  ).map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setLocality(loc)}
                      className={`px-2.5 py-2 rounded text-left text-xs font-semibold flex items-center justify-between transition-all ${
                        locality === loc
                          ? 'bg-malta-blue text-white font-bold shadow-xs'
                          : 'bg-white hover:bg-malta-sky/40 text-malta-charcoal border border-malta-border/60'
                      }`}
                    >
                      <span className="truncate">{loc}</span>
                      {locality === loc && <Check className="w-3.5 h-3.5 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-xs font-bold text-malta-charcoal mb-1.5 uppercase tracking-wider">
                  Property Type
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPropertyType('all')}
                    className={`px-2.5 py-2 rounded text-xs font-semibold flex items-center justify-between transition-all ${
                      propertyType === 'all'
                        ? 'bg-malta-blue text-white font-bold shadow-xs'
                        : 'bg-white hover:bg-malta-sky/40 text-malta-charcoal border border-malta-border'
                    }`}
                  >
                    <span>All Types</span>
                    {propertyType === 'all' && <Check className="w-3.5 h-3.5 shrink-0 ml-1" />}
                  </button>
                  {PROPERTY_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPropertyType(type)}
                      className={`px-2.5 py-2 rounded text-xs font-semibold flex items-center justify-between transition-all ${
                        propertyType === type
                          ? 'bg-malta-blue text-white font-bold shadow-xs'
                          : 'bg-white hover:bg-malta-sky/40 text-malta-charcoal border border-malta-border'
                      }`}
                    >
                      <span className="truncate">{type}</span>
                      {propertyType === type && <Check className="w-3.5 h-3.5 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-xs font-bold text-malta-charcoal mb-1.5 uppercase tracking-wider">
                  {purpose === 'buy' ? 'Price Range (€)' : 'Monthly Rent (€/mo)'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder={purpose === 'buy' ? 'Min €100k' : 'Min €500'}
                    className="w-full px-3 py-2 rounded-md border border-malta-border text-xs bg-malta-warm/40"
                  />
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder={purpose === 'buy' ? 'Max €750k' : 'Max €2,500'}
                    className="w-full px-3 py-2 rounded-md border border-malta-border text-xs bg-malta-warm/40"
                  />
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-xs font-bold text-malta-charcoal mb-1.5 uppercase tracking-wider">
                  Bedrooms
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(['any', 1, 2, 3, 4] as const).map((bed) => (
                    <button
                      key={bed}
                      type="button"
                      onClick={() => setBedrooms(bed)}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                        bedrooms === bed
                          ? 'bg-malta-blue text-white shadow-xs'
                          : 'bg-malta-warm text-malta-slate border border-malta-border'
                      }`}
                    >
                      {bed === 'any' ? 'Any' : `${bed}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bathrooms */}
              <div>
                <label className="block text-xs font-bold text-malta-charcoal mb-1.5 uppercase tracking-wider">
                  Bathrooms
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(['any', 1, 2, 3] as const).map((bath) => (
                    <button
                      key={bath}
                      type="button"
                      onClick={() => setBathrooms(bath)}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                        bathrooms === bath
                          ? 'bg-malta-blue text-white shadow-xs'
                          : 'bg-malta-warm text-malta-slate border border-malta-border'
                      }`}
                    >
                      {bath === 'any' ? 'Any' : `${bath}+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Pinned Sticky Bottom Action Bar */}
            <div className="p-4 border-t border-malta-border bg-white flex items-center gap-3 shrink-0 shadow-lg">
              <button
                type="button"
                onClick={() => {
                  setLocality('All Malta & Gozo');
                  setPropertyType('all');
                  setMinPrice('');
                  setMaxPrice('');
                  setBedrooms('any');
                  setBathrooms('any');
                }}
                className="px-4 py-3 rounded-md border border-malta-border text-xs font-bold text-malta-slate hover:bg-gray-100 transition-colors"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={(e) => {
                  setMobileFilterOpen(false);
                  handleHeroSearch(e);
                }}
                className="flex-1 py-3 rounded-md bg-malta-blue text-white text-xs sm:text-sm font-bold shadow-md hover:bg-malta-blue-hover transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Search ({matchingPropertiesCount} Found)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. FEATURED PROPERTIES (Paid Boosts) */}
      {featuredProperties.length > 0 && (
        <section className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Featured Collection
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-malta-charcoal font-heading tracking-tight">
                Featured Properties
              </h2>
              <p className="text-xs sm:text-sm text-malta-slate mt-0.5 sm:mt-1">
                Hand-picked properties getting extra visibility directly from Maltese owners.
              </p>
            </div>

            <Link
              href="/search?featured=true"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-malta-blue hover:text-malta-blue-hover group"
            >
              <span>View All Featured</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {featuredProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </section>
      )}

      {/* 3. EXPLORE MALTA / INTERACTIVE MAP PREVIEW */}
      <section className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg sm:rounded-card border border-malta-border p-4 sm:p-8 shadow-card">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-malta-blue uppercase tracking-wider mb-1">
                <Compass className="w-3.5 h-3.5" />
                Explore the Maltese Islands
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-malta-charcoal font-heading tracking-tight">
                Browse by Popular Localities
              </h2>
              <p className="text-xs sm:text-sm text-malta-slate mt-0.5 sm:mt-1">
                Discover homes in the most sought-after seaside promenades, historic towns, and tranquil villages.
              </p>
            </div>

            <Link
              href="/search?view=map"
              className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-md sm:rounded-btn bg-malta-warm text-malta-charcoal text-xs sm:text-sm font-bold border border-malta-border hover:bg-malta-sky hover:text-malta-blue transition-colors shrink-0"
            >
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-malta-blue" />
              <span>Open Interactive Full Map</span>
            </Link>
          </div>

          {/* Location Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 mb-6 sm:mb-8">
            {topLocations.map((loc) => (
              <Link
                key={loc.name}
                href={`/search?locality=${encodeURIComponent(loc.name)}`}
                className="group relative rounded-lg sm:rounded-card overflow-hidden aspect-[4/3] border border-malta-border shadow-soft"
              >
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-2.5 sm:p-3 text-white">
                  <span className="text-xs sm:text-sm font-bold font-heading leading-tight group-hover:text-malta-sand transition-colors">
                    {loc.name}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-gray-200">
                    {loc.count}+ Listings
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Live Map Preview Strip */}
          <div className="h-64 sm:h-80 w-full rounded-lg sm:rounded-card overflow-hidden">
            <MapWrapper properties={properties.filter((p) => p.approvalStatus === 'approved')} />
          </div>
        </div>
      </section>

      {/* 4. LATEST PROPERTIES */}
      <section className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-malta-charcoal font-heading tracking-tight">
              Recently Listed Properties
            </h2>
            <p className="text-xs sm:text-sm text-malta-slate mt-0.5 sm:mt-1">
              Fresh direct-to-owner listings updated daily across Malta & Gozo.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 p-1 rounded-md sm:rounded-btn bg-white border border-malta-border shadow-soft">
            <button
              onClick={() => setLatestTab('all')}
              className={`px-3 sm:px-4 py-1.5 rounded-sm sm:rounded-btn text-xs font-bold transition-all ${
                latestTab === 'all'
                  ? 'bg-malta-blue text-white shadow-sm'
                  : 'text-malta-slate hover:text-malta-charcoal'
              }`}
            >
              All Listings
            </button>
            <button
              onClick={() => setLatestTab('buy')}
              className={`px-3 sm:px-4 py-1.5 rounded-sm sm:rounded-btn text-xs font-bold transition-all ${
                latestTab === 'buy'
                  ? 'bg-malta-blue text-white shadow-sm'
                  : 'text-malta-slate hover:text-malta-charcoal'
              }`}
            >
              For Sale
            </button>
            <button
              onClick={() => setLatestTab('rent')}
              className={`px-3 sm:px-4 py-1.5 rounded-sm sm:rounded-btn text-xs font-bold transition-all ${
                latestTab === 'rent'
                  ? 'bg-malta-blue text-white shadow-sm'
                  : 'text-malta-slate hover:text-malta-charcoal'
              }`}
            >
              For Rent
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
          {latestProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>

        <div className="text-center pt-8 sm:pt-10">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-md sm:rounded-btn bg-white border border-malta-border text-malta-charcoal font-bold text-xs sm:text-sm shadow-soft hover:border-malta-blue hover:text-malta-blue transition-all"
          >
            <span>Explore All {properties.length} Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Mid Banner Ad */}
      {midBanner && (
        <section className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
          <BannerCard banner={midBanner} />
        </section>
      )}

      {/* 5. DIRECT OWNER CTA BANNER */}
      <section className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="relative rounded-lg sm:rounded-card bg-gradient-to-r from-malta-blue to-malta-navy text-white overflow-hidden p-6 sm:p-12 shadow-card">
          <div className="relative z-10 max-w-2xl space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-malta-sand" />
              100% Direct Owner Marketplace
            </div>
            <h2 className="text-xl sm:text-4xl font-extrabold font-heading tracking-tight leading-tight">
              Sell or Rent Your Property in Malta With Zero Commission
            </h2>
            <p className="text-xs sm:text-base text-gray-200 leading-relaxed">
              List your property for free, receive direct calls & WhatsApp messages from buyers, and keep 100% of your sale price.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/list-property"
                className="flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-md sm:rounded-btn bg-white text-malta-charcoal font-bold text-xs sm:text-sm shadow-md hover:bg-malta-sand transition-all transform active:scale-98"
              >
                <PlusCircle className="w-4 h-4 text-malta-blue" />
                <span>List Your Property For Free</span>
              </Link>
              <Link
                href="/search?purpose=buy"
                className="px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-md sm:rounded-btn bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-colors"
              >
                Browse Marketplace
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
