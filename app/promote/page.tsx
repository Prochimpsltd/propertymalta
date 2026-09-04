'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProperties } from '@/lib/context/PropertyContext';
import {
  Sparkles,
  ShieldCheck,
  Check,
  TrendingUp,
  Eye,
  MessageSquare,
  Award,
  Zap,
  ArrowRight,
  Home,
  CheckCircle2,
} from 'lucide-react';

export default function PromotePropertyPage() {
  const { properties, currentUser, boostProperty } = useProperties();
  const ownerProperties = properties.filter(
    (p) => p.userId === currentUser.id || currentUser.role === 'admin'
  );

  const [selectedPropertyId, setSelectedPropertyId] = useState(
    ownerProperties[0]?.id || ''
  );
  const [selectedPlan, setSelectedPlan] = useState<'7days' | '14days' | '30days'>('14days');
  const [boostSuccess, setBoostSuccess] = useState(false);

  const handleBoostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPropertyId) return;

    boostProperty(selectedPropertyId, selectedPlan);
    setBoostSuccess(true);
    setTimeout(() => {
      setBoostSuccess(false);
    }, 4000);
  };

  const selectedProp = properties.find((p) => p.id === selectedPropertyId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* 1. HERO HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-malta-sky text-malta-navy text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-malta-blue" />
          Malta Property Listing Promotion
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-malta-charcoal font-heading tracking-tight leading-tight">
          Boost Your Property Listing for Maximum Buyer & Tenant Exposure
        </h1>
        <p className="text-base sm:text-lg text-malta-slate leading-relaxed">
          Featured properties get up to <strong className="text-malta-charcoal">500% more daily views</strong>, top-of-search placement, and prominent gold badge visibility across Malta & Gozo.
        </p>
      </div>

      {/* 2. STATS BENEFIT BANNER */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-card border border-malta-border p-6 shadow-soft space-y-2">
          <div className="w-10 h-10 rounded-btn bg-malta-sky flex items-center justify-center text-malta-blue mb-2">
            <Eye className="w-5 h-5" />
          </div>
          <div className="text-2xl font-extrabold text-malta-charcoal font-heading">
            5x More Views
          </div>
          <p className="text-xs text-malta-slate leading-relaxed">
            Positioned at the very top of search results before standard listings.
          </p>
        </div>

        <div className="bg-white rounded-card border border-malta-border p-6 shadow-soft space-y-2">
          <div className="w-10 h-10 rounded-btn bg-malta-sky flex items-center justify-center text-[#25D366] mb-2">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="text-2xl font-extrabold text-malta-charcoal font-heading">
            3x More WhatsApp Inquiries
          </div>
          <p className="text-xs text-malta-slate leading-relaxed">
            Highlighted contact cards prompt immediate buyer and tenant outreach.
          </p>
        </div>

        <div className="bg-white rounded-card border border-malta-border p-6 shadow-soft space-y-2">
          <div className="w-10 h-10 rounded-btn bg-malta-sky flex items-center justify-center text-amber-600 mb-2">
            <Award className="w-5 h-5" />
          </div>
          <div className="text-2xl font-extrabold text-malta-charcoal font-heading">
            Homepage Featured Spotlight
          </div>
          <p className="text-xs text-malta-slate leading-relaxed">
            Showcased on the homepage carousel viewed by 100% of platform visitors.
          </p>
        </div>
      </div>

      {/* 3. INTERACTIVE BOOST FORM & PLAN SELECTOR */}
      <div className="bg-white rounded-card border border-malta-border p-6 sm:p-10 shadow-card space-y-8">
        <div>
          <h2 className="text-2xl font-extrabold text-malta-charcoal font-heading">
            Promote an Active Listing
          </h2>
          <p className="text-xs sm:text-sm text-malta-slate">
            Select one of your existing properties and choose a promotion duration.
          </p>
        </div>

        {boostSuccess && (
          <div className="p-4 rounded-card bg-malta-green-light border border-malta-green/30 text-malta-green flex items-center gap-3 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <div>
              <div className="font-bold text-sm">Listing Successfully Promoted!</div>
              <div className="text-xs">Your property is now featured at the top of search results.</div>
            </div>
          </div>
        )}

        <form onSubmit={handleBoostSubmit} className="space-y-8">
          {/* Property Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-malta-charcoal mb-2">
              1. Select Property to Boost
            </label>
            {ownerProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {ownerProperties.map((prop) => {
                  const isSelected = selectedPropertyId === prop.id;
                  const img = prop.images[0]?.url;

                  return (
                    <div
                      key={prop.id}
                      onClick={() => setSelectedPropertyId(prop.id)}
                      className={`p-3.5 rounded-card border-2 cursor-pointer transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'border-malta-blue bg-malta-sky-light shadow-sm'
                          : 'border-malta-border bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="w-14 h-14 rounded-btn overflow-hidden bg-gray-100 shrink-0">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-malta-charcoal truncate">
                          {prop.title}
                        </div>
                        <div className="text-[11px] text-malta-slate">
                          📍 {prop.location.locality} · €{prop.price.toLocaleString()}
                        </div>
                        {prop.isFeatured && (
                          <span className="inline-block text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 rounded mt-0.5">
                            Currently Featured
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 rounded-card border border-malta-border bg-malta-warm/60 text-center space-y-3">
                <Home className="w-8 h-8 text-malta-slate mx-auto" />
                <p className="text-xs text-malta-slate">
                  You don't have any properties listed yet. List your property first to boost it!
                </p>
                <Link
                  href="/list-property"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-btn bg-malta-blue text-white text-xs font-bold"
                >
                  List Property Now
                </Link>
              </div>
            )}
          </div>

          {/* Promotion Packages Grid */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-malta-charcoal mb-2">
              2. Choose Your Promotion Duration
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 7 Days Boost */}
              <div
                onClick={() => setSelectedPlan('7days')}
                className={`p-5 rounded-card border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  selectedPlan === '7days'
                    ? 'border-malta-blue bg-malta-sky-light shadow-md ring-2 ring-malta-blue/30'
                    : 'border-malta-border bg-white hover:border-gray-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-malta-blue">
                      7 Days Boost
                    </span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === '7days' ? 'border-malta-blue bg-malta-blue text-white' : 'border-gray-300'
                    }`}>
                      {selectedPlan === '7days' && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                  <div className="text-3xl font-black text-malta-charcoal font-heading mb-1">
                    €10
                  </div>
                  <p className="text-[11px] text-malta-slate mb-4">Fast-track visibility for 1 week</p>
                  <ul className="text-xs text-malta-slate space-y-2">
                    <li className="flex items-start gap-1.5 font-medium text-malta-charcoal">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>Top locality search rank</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-malta-green shrink-0 mt-0.5" />
                      <span>Featured Gold badge</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-malta-green shrink-0 mt-0.5" />
                      <span>+150% more weekly views</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 14 Days Boost */}
              <div
                onClick={() => setSelectedPlan('14days')}
                className={`p-5 rounded-card border-2 cursor-pointer transition-all flex flex-col justify-between relative ${
                  selectedPlan === '14days'
                    ? 'border-malta-blue bg-malta-sky-light shadow-lg ring-2 ring-malta-blue'
                    : 'border-malta-blue/40 bg-white hover:border-malta-blue'
                }`}
              >
                <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-malta-blue text-white shadow-sm">
                  ★ Most Popular
                </span>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-malta-blue">
                      14 Days Pro
                    </span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === '14days' ? 'border-malta-blue bg-malta-blue text-white' : 'border-gray-300'
                    }`}>
                      {selectedPlan === '14days' && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                  <div className="text-3xl font-black text-malta-charcoal font-heading mb-1">
                    €18
                  </div>
                  <p className="text-[11px] text-malta-slate mb-4">2 weeks maximum engagement</p>
                  <ul className="text-xs text-malta-slate space-y-2">
                    <li className="flex items-start gap-1.5 font-bold text-malta-charcoal">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>Homepage carousel spotlight</span>
                    </li>
                    <li className="flex items-start gap-1.5 font-semibold text-malta-charcoal">
                      <Check className="w-3.5 h-3.5 text-malta-green shrink-0 mt-0.5" />
                      <span>Top 3 search results rank</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-malta-green shrink-0 mt-0.5" />
                      <span>+300% direct buyer enquiries</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 30 Days Boost */}
              <div
                onClick={() => setSelectedPlan('30days')}
                className={`p-5 rounded-card border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  selectedPlan === '30days'
                    ? 'border-malta-blue bg-malta-sky-light shadow-md ring-2 ring-malta-blue/30'
                    : 'border-malta-border bg-white hover:border-gray-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-malta-slate">
                      30 Days Max
                    </span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === '30days' ? 'border-malta-blue bg-malta-blue text-white' : 'border-gray-300'
                    }`}>
                      {selectedPlan === '30days' && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                  <div className="text-3xl font-black text-malta-charcoal font-heading mb-1">
                    €30
                  </div>
                  <p className="text-[11px] text-malta-slate mb-4">Full month premium coverage</p>
                  <ul className="text-xs text-malta-slate space-y-2">
                    <li className="flex items-start gap-1.5 font-bold text-malta-charcoal">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>Full month top-tier placement</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-malta-green shrink-0 mt-0.5" />
                      <span>All Homepage & Search boosts</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-malta-green shrink-0 mt-0.5" />
                      <span>+500% maximum reach</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-malta-border">
            <div className="text-xs text-malta-slate">
              Selected plan: <strong className="text-malta-blue font-bold uppercase">{selectedPlan === '7days' ? '7 Days (€10)' : selectedPlan === '14days' ? '14 Days (€18)' : '30 Days (€30)'}</strong>
            </div>

            <button
              type="submit"
              disabled={!selectedPropertyId}
              className="w-full sm:w-auto px-8 py-3.5 rounded-btn bg-malta-blue text-white font-extrabold text-sm hover:bg-malta-blue-hover shadow-md transition-all disabled:opacity-50"
            >
              Boost Listing Now ({selectedPlan === '7days' ? '€10' : selectedPlan === '14days' ? '€18' : '€30'})
            </button>
          </div>
        </form>
      </div>

      {/* 4. COMMERCIAL PARTNER ADVERTISING CTA */}
      <div className="bg-gradient-to-r from-malta-blue to-malta-navy text-white rounded-card p-8 sm:p-10 shadow-card text-center space-y-4 max-w-4xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-bold font-heading">
          Looking to advertise your real estate service or business?
        </h3>
        <p className="text-sm text-gray-200 max-w-xl mx-auto">
          Explore banner sponsorships on our Homepage Hero, Search Sidebar, and Property Detail pages for banks, notaries, contractors, and interior designers.
        </p>
        <div className="pt-2">
          <Link
            href="/advertising"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-btn bg-white text-malta-charcoal font-bold text-sm shadow-md hover:bg-malta-sand transition-all"
          >
            <span>Explore Ads Partnership</span>
            <ArrowRight className="w-4 h-4 text-malta-blue" />
          </Link>
        </div>
      </div>
    </div>
  );
}
