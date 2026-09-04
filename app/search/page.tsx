'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProperties } from '@/lib/context/PropertyContext';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { BannerCard } from '@/components/ui/BannerCard';
import { MapWrapper } from '@/components/map/MapWrapper';
import { MALTA_LOCALITIES, PROPERTY_TYPES, AMENITY_OPTIONS } from '@/lib/data/properties';
import { Property, PropertyPurpose, PropertyType, FurnishingStatus } from '@/types';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Map as MapIcon,
  X,
  RotateCcw,
  Sparkles,
  Home,
  Key,
} from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const { properties, banners } = useProperties();

  // Filters State
  const [purpose, setPurpose] = useState<PropertyPurpose | 'all'>(
    (searchParams.get('purpose') as PropertyPurpose) || 'all'
  );
  const [locality, setLocality] = useState<string>(
    searchParams.get('locality') || 'All Malta & Gozo'
  );
  const [propertyType, setPropertyType] = useState<PropertyType | 'all'>(
    (searchParams.get('type') as PropertyType) || 'all'
  );
  const [minPrice, setMinPrice] = useState<string>(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState<string>(searchParams.get('maxPrice') || '');
  const [bedrooms, setBedrooms] = useState<number | 'any'>('any');
  const [bathrooms, setBathrooms] = useState<number | 'any'>('any');
  const [furnishing, setFurnishing] = useState<FurnishingStatus | 'all'>('all');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(
    searchParams.get('featured') === 'true'
  );

  // Sorting State
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'popular'>('newest');

  // View Mode: 'grid' | 'list' | 'map'
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>(
    searchParams.get('view') === 'map' ? 'map' : 'grid'
  );

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  // Toggle feature checkbox
  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  // Reset Filters
  const resetFilters = () => {
    setPurpose('all');
    setLocality('All Malta & Gozo');
    setPropertyType('all');
    setMinPrice('');
    setMaxPrice('');
    setBedrooms('any');
    setBathrooms('any');
    setFurnishing('all');
    setSelectedFeatures([]);
    setSearchQuery('');
    setFeaturedOnly(false);
  };

  // Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => p.approvalStatus === 'approved')
      .filter((p) => {
        if (purpose !== 'all' && p.purpose !== purpose) return false;
        if (locality !== 'All Malta & Gozo' && p.location.locality !== locality) return false;
        if (propertyType !== 'all' && p.propertyType !== propertyType) return false;
        if (minPrice && p.price < Number(minPrice)) return false;
        if (maxPrice && p.price > Number(maxPrice)) return false;
        if (bedrooms !== 'any' && p.bedrooms < Number(bedrooms)) return false;
        if (bathrooms !== 'any' && p.bathrooms < Number(bathrooms)) return false;
        if (furnishing !== 'all' && p.furnishing !== furnishing) return false;
        if (featuredOnly && !p.isFeatured) return false;

        // Amenities match all selected
        if (selectedFeatures.length > 0) {
          const hasAllFeatures = selectedFeatures.every((f) => p.features.includes(f));
          if (!hasAllFeatures) return false;
        }

        // Text query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(query);
          const matchLoc = p.location.locality.toLowerCase().includes(query);
          const matchRef = p.referenceCode.toLowerCase().includes(query);
          const matchDesc = p.description.toLowerCase().includes(query);
          if (!matchTitle && !matchLoc && !matchRef && !matchDesc) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        if (sortBy === 'popular') return (b.viewsCount || 0) - (a.viewsCount || 0);
        return 0;
      });
  }, [
    properties,
    purpose,
    locality,
    propertyType,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    furnishing,
    selectedFeatures,
    searchQuery,
    featuredOnly,
    sortBy,
  ]);

  const sidebarBanner = banners.find((b) => b.placement === 'search_sidebar' && b.isActive);

  return (
    <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-4 sm:space-y-6">
      {/* 1. TOP QUICK FILTER & VIEW SWITCHER BAR */}
      <div className="bg-white rounded-lg sm:rounded-card border border-malta-border p-3 sm:p-4 shadow-soft space-y-3 sm:space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Quick Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-malta-slate" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Sliema, MLT-10482, Penthouse..."
              className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-md sm:rounded-btn border border-malta-border bg-malta-warm/40 text-xs sm:text-sm text-malta-charcoal focus:outline-none focus:ring-2 focus:ring-malta-blue/30 focus:border-malta-blue"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-malta-slate hover:text-malta-charcoal"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Purpose & View Switchers */}
          <div className="flex flex-wrap items-center justify-between w-full md:w-auto gap-2 sm:gap-3">
            {/* Purpose Tabs */}
            <div className="flex items-center gap-1 p-1 bg-malta-warm rounded-md sm:rounded-btn border border-malta-border text-xs font-bold">
              <button
                onClick={() => setPurpose('all')}
                className={`px-3 py-1.5 rounded-sm sm:rounded-btn transition-all ${
                  purpose === 'all' ? 'bg-malta-blue text-white shadow-sm' : 'text-malta-slate'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setPurpose('buy')}
                className={`px-3 py-1.5 rounded-sm sm:rounded-btn transition-all ${
                  purpose === 'buy' ? 'bg-malta-blue text-white shadow-sm' : 'text-malta-slate'
                }`}
              >
                For Sale
              </button>
              <button
                onClick={() => setPurpose('rent')}
                className={`px-3 py-1.5 rounded-btn transition-all ${
                  purpose === 'rent' ? 'bg-malta-blue text-white shadow-sm' : 'text-malta-slate'
                }`}
              >
                For Rent
              </button>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 p-1 bg-malta-warm rounded-btn border border-malta-border text-xs font-bold">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-btn transition-all ${
                  viewMode === 'grid' ? 'bg-white text-malta-blue shadow-sm' : 'text-malta-slate'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-btn transition-all ${
                  viewMode === 'list' ? 'bg-white text-malta-blue shadow-sm' : 'text-malta-slate'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-btn transition-all ${
                  viewMode === 'map' ? 'bg-white text-malta-blue shadow-sm' : 'text-malta-slate'
                }`}
                title="Split Map View"
              >
                <MapIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Map</span>
              </button>
            </div>

            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-btn bg-malta-warm border border-malta-border text-xs font-bold text-malta-charcoal"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-malta-blue" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN LAYOUT: SIDEBAR FILTERS + RESULTS */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* DESKTOP FILTER SIDEBAR */}
        <aside className="hidden lg:block bg-white rounded-card border border-malta-border p-5 shadow-soft space-y-5 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-malta-border">
            <h3 className="text-sm font-bold text-malta-charcoal font-heading uppercase tracking-wider flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-malta-blue" />
              Filters
            </h3>
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-xs text-malta-slate hover:text-malta-blue font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* Locality */}
          <div>
            <label className="block text-xs font-bold text-malta-charcoal mb-1.5">
              Locality / Area
            </label>
            <select
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-full px-3 py-2 rounded-btn border border-malta-border bg-malta-warm/40 text-xs text-malta-charcoal focus:outline-none focus:ring-2 focus:ring-malta-blue/30 focus:border-malta-blue"
            >
              {MALTA_LOCALITIES.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-xs font-bold text-malta-charcoal mb-1.5">
              Property Type
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value as PropertyType | 'all')}
              className="w-full px-3 py-2 rounded-btn border border-malta-border bg-malta-warm/40 text-xs text-malta-charcoal focus:outline-none focus:ring-2 focus:ring-malta-blue/30 focus:border-malta-blue"
            >
              <option value="all">All Types</option>
              {PROPERTY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-xs font-bold text-malta-charcoal mb-1.5">
              Price Range (€)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min €"
                className="w-full px-2.5 py-1.5 rounded-btn border border-malta-border text-xs focus:outline-none focus:ring-2 focus:ring-malta-blue/30"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max €"
                className="w-full px-2.5 py-1.5 rounded-btn border border-malta-border text-xs focus:outline-none focus:ring-2 focus:ring-malta-blue/30"
              />
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-xs font-bold text-malta-charcoal mb-1.5">
              Bedrooms
            </label>
            <div className="flex items-center gap-1">
              {['any', 1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setBedrooms(num as any)}
                  className={`flex-1 py-1.5 rounded-btn text-xs font-semibold border transition-all ${
                    bedrooms === num
                      ? 'bg-malta-blue text-white border-malta-blue'
                      : 'bg-white border-malta-border text-malta-slate hover:border-malta-blue'
                  }`}
                >
                  {num === 'any' ? 'Any' : `${num}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities & Features */}
          <div>
            <label className="block text-xs font-bold text-malta-charcoal mb-2">
              Features & Amenities
            </label>
            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
              {AMENITY_OPTIONS.map((feat) => (
                <label
                  key={feat}
                  className="flex items-center gap-2 text-xs text-malta-charcoal hover:text-malta-blue cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes(feat)}
                    onChange={() => toggleFeature(feat)}
                    className="rounded text-malta-blue focus:ring-malta-blue/30"
                  />
                  <span>{feat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Featured Only Toggle */}
          <div className="pt-2 border-t border-malta-border">
            <label className="flex items-center justify-between text-xs font-bold text-malta-charcoal cursor-pointer">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Featured Only
              </span>
              <input
                type="checkbox"
                checked={featuredOnly}
                onChange={(e) => setFeaturedOnly(e.target.checked)}
                className="rounded text-malta-blue focus:ring-malta-blue/30"
              />
            </label>
          </div>

          {/* Sidebar Banner Ad */}
          {sidebarBanner && <BannerCard banner={sidebarBanner} layout="sidebar" />}
        </aside>

        {/* RESULTS SECTION */}
        <main className="lg:col-span-3 space-y-5">
          {/* Results Summary & Sorting Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-malta-slate pb-2 border-b border-malta-border">
            <div>
              Showing <strong className="text-malta-charcoal">{filteredProperties.length}</strong>{' '}
              properties found
              {locality !== 'All Malta & Gozo' && ` in ${locality}`}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="font-semibold text-malta-charcoal">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-2.5 py-1.5 rounded-btn border border-malta-border bg-white text-xs text-malta-charcoal font-medium focus:outline-none focus:ring-2 focus:ring-malta-blue/30"
              >
                <option value="newest">Newest Listed</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {/* No results */}
          {filteredProperties.length === 0 && (
            <div className="bg-white rounded-card border border-malta-border p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-malta-sky flex items-center justify-center mx-auto text-malta-blue">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-malta-charcoal font-heading">
                No properties match your filters
              </h3>
              <p className="text-xs text-malta-slate max-w-sm mx-auto">
                Try expanding your search criteria or resetting filters to explore more properties across Malta.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2 rounded-btn bg-malta-blue text-white text-xs font-bold hover:bg-malta-blue-hover transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* View Mode: Map Split View */}
          {viewMode === 'map' && filteredProperties.length > 0 && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-[720px]">
              {/* Left: Scrollable Property List */}
              <div className="overflow-y-auto pr-2 space-y-4 h-full">
                {filteredProperties.map((prop) => (
                  <div
                    key={prop.id}
                    onMouseEnter={() => setSelectedPropertyId(prop.id)}
                    className={`transition-all duration-200 rounded-card ${
                      selectedPropertyId === prop.id ? 'ring-2 ring-malta-blue' : ''
                    }`}
                  >
                    <PropertyCard property={prop} />
                  </div>
                ))}
              </div>

              {/* Right: Synced Interactive Leaflet Map */}
              <div className="h-full rounded-card overflow-hidden sticky top-24">
                <MapWrapper
                  properties={filteredProperties}
                  selectedPropertyId={selectedPropertyId}
                  onSelectProperty={(id) => setSelectedPropertyId(id)}
                />
              </div>
            </div>
          )}

          {/* View Mode: Grid View */}
          {viewMode === 'grid' && filteredProperties.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6">
              {filteredProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          )}

          {/* View Mode: List View */}
          {viewMode === 'list' && filteredProperties.length > 0 && (
            <div className="space-y-4">
              {filteredProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* MOBILE FILTER MODAL SHEET */}
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
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 rounded-full text-malta-slate hover:bg-gray-100 transition-colors"
                aria-label="Close Filter Dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Filter Controls */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {/* Locality */}
              <div>
                <label className="block text-xs font-bold text-malta-charcoal mb-1">
                  Locality / Town
                </label>
                <select
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-md sm:rounded-btn border border-malta-border text-xs sm:text-sm bg-malta-warm/40 focus:outline-none focus:ring-2 focus:ring-malta-blue/30"
                >
                  {MALTA_LOCALITIES.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-xs font-bold text-malta-charcoal mb-1">
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-md sm:rounded-btn border border-malta-border text-xs sm:text-sm bg-malta-warm/40 focus:outline-none focus:ring-2 focus:ring-malta-blue/30"
                >
                  <option value="all">All Types</option>
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-xs font-bold text-malta-charcoal mb-1">
                  Price Range (€)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min €"
                    className="w-full px-3 py-2 rounded-md sm:rounded-btn border border-malta-border text-xs sm:text-sm bg-malta-warm/40"
                  />
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max €"
                    className="w-full px-3 py-2 rounded-md sm:rounded-btn border border-malta-border text-xs sm:text-sm bg-malta-warm/40"
                  />
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-xs font-bold text-malta-charcoal mb-1.5">
                  Bedrooms
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(['any', 1, 2, 3, 4] as const).map((bed) => (
                    <button
                      key={bed}
                      type="button"
                      onClick={() => setBedrooms(bed)}
                      className={`px-3 py-1.5 rounded-md sm:rounded-btn text-xs font-bold transition-all ${
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
                <label className="block text-xs font-bold text-malta-charcoal mb-1.5">
                  Bathrooms
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(['any', 1, 2, 3] as const).map((bath) => (
                    <button
                      key={bath}
                      type="button"
                      onClick={() => setBathrooms(bath)}
                      className={`px-3 py-1.5 rounded-md sm:rounded-btn text-xs font-bold transition-all ${
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
                onClick={resetFilters}
                className="px-4 py-3 rounded-md sm:rounded-btn border border-malta-border text-xs font-bold text-malta-slate hover:bg-gray-100 transition-colors"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 rounded-md sm:rounded-btn bg-malta-blue text-white text-xs sm:text-sm font-bold shadow-md hover:bg-malta-blue-hover transition-colors"
              >
                Apply Filters ({filteredProperties.length} Found)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-malta-slate">Loading Search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
