'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProperties } from '@/lib/context/PropertyContext';
import { formatPrice, formatDate } from '@/lib/utils';
import { BannerAd, Property } from '@/types';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Sparkles,
  Building,
  DollarSign,
  TrendingUp,
  Eye,
  MousePointerClick,
  Plus,
  Trash2,
  ExternalLink,
  Layers,
  Clock,
  Check,
} from 'lucide-react';

export default function AdminPage() {
  const {
    properties,
    banners,
    enquiries,
    approveProperty,
    rejectProperty,
    deleteProperty,
    updateProperty,
    addBanner,
    toggleBannerStatus,
    deleteBanner,
  } = useProperties();

  const [activeTab, setActiveTab] = useState<'moderation' | 'properties' | 'banners' | 'analytics'>('moderation');

  // New Banner Form State
  const [showAddBannerModal, setShowAddBannerModal] = useState(false);
  const [newBannerTitle, setNewBannerTitle] = useState('');
  const [newBannerAdvertiser, setNewBannerAdvertiser] = useState('');
  const [newBannerCategory, setNewBannerCategory] = useState<'bank' | 'insurance' | 'interior' | 'legal' | 'renovation'>('bank');
  const [newBannerImageUrl, setNewBannerImageUrl] = useState('');
  const [newBannerTargetUrl, setNewBannerTargetUrl] = useState('');
  const [newBannerCta, setNewBannerCta] = useState('Learn More');
  const [newBannerPlacement, setNewBannerPlacement] = useState<'home_hero' | 'home_mid' | 'search_sidebar' | 'property_sidebar'>('home_mid');

  const pendingProperties = properties.filter((p) => p.approvalStatus === 'pending');
  const approvedProperties = properties.filter((p) => p.approvalStatus === 'approved');
  const featuredCount = properties.filter((p) => p.isFeatured).length;

  // Estimated Revenue Calculation
  const featuredRevenue = featuredCount * 18;
  const bannerRevenue = banners.filter((b) => b.isActive).length * 150;
  const totalRevenue = featuredRevenue + bannerRevenue;

  const handleCreateBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBannerTitle || !newBannerImageUrl || !newBannerTargetUrl) return;

    addBanner({
      title: newBannerTitle,
      advertiserName: newBannerAdvertiser || 'Malta Business Partner',
      category: newBannerCategory,
      imageUrl: newBannerImageUrl,
      targetUrl: newBannerTargetUrl,
      ctaText: newBannerCta,
      placement: newBannerPlacement,
      isActive: true,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-12-31',
    });

    setShowAddBannerModal(false);
    setNewBannerTitle('');
    setNewBannerAdvertiser('');
    setNewBannerImageUrl('');
    setNewBannerTargetUrl('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. ADMIN HEADER */}
      <div className="bg-white rounded-card border border-malta-border p-6 sm:p-8 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-malta-border">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              Administrative Moderation & Business Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-malta-charcoal font-heading">
              Malta Property Admin Panel
            </h1>
            <p className="text-xs sm:text-sm text-malta-slate mt-0.5">
              Review pending owner listings, manage advertiser banner campaigns, and inspect platform analytics.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
              Admin Mode Active
            </span>
          </div>
        </div>

        {/* Overview Stats (Project Plan Section #18) */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 pt-6 text-xs">
          <div className="p-4 rounded-btn bg-malta-warm/60 border border-malta-border space-y-1">
            <div className="text-malta-slate font-semibold">Total Listings</div>
            <div className="text-2xl font-extrabold text-malta-charcoal font-heading">
              {properties.length}
            </div>
            <div className="text-[11px] text-malta-green font-medium">
              {approvedProperties.length} Active / Approved
            </div>
          </div>

          <div className="p-4 rounded-btn bg-amber-50 border border-amber-200 space-y-1">
            <div className="text-amber-800 font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              Pending Approval
            </div>
            <div className="text-2xl font-extrabold text-amber-900 font-heading">
              {pendingProperties.length}
            </div>
            <div className="text-[11px] text-amber-700">Requires moderation</div>
          </div>

          <div className="p-4 rounded-btn bg-malta-warm/60 border border-malta-border space-y-1">
            <div className="text-malta-slate font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Featured Boosts
            </div>
            <div className="text-2xl font-extrabold text-malta-charcoal font-heading">
              {featuredCount}
            </div>
            <div className="text-[11px] text-malta-slate">Active campaigns</div>
          </div>

          <div className="p-4 rounded-btn bg-malta-warm/60 border border-malta-border space-y-1">
            <div className="text-malta-slate font-semibold flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-malta-blue" />
              Active Banners
            </div>
            <div className="text-2xl font-extrabold text-malta-charcoal font-heading">
              {banners.filter((b) => b.isActive).length}
            </div>
            <div className="text-[11px] text-malta-slate">Partner ad slots</div>
          </div>

          <div className="p-4 rounded-btn bg-malta-green-light border border-malta-green/20 space-y-1 col-span-2 lg:col-span-1">
            <div className="text-malta-green font-semibold flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5" />
              Est. Monthly Revenue
            </div>
            <div className="text-2xl font-extrabold text-malta-charcoal font-heading">
              €{totalRevenue.toLocaleString()}
            </div>
            <div className="text-[11px] text-malta-green font-medium">Boosts & Banner ads</div>
          </div>
        </div>
      </div>

      {/* 2. ADMIN TABS */}
      <div className="flex items-center space-x-2 border-b border-malta-border pb-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('moderation')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-btn text-xs sm:text-sm font-bold transition-all relative ${
            activeTab === 'moderation'
              ? 'bg-malta-blue text-white shadow-sm'
              : 'text-malta-slate hover:text-malta-charcoal hover:bg-white'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Moderation Queue ({pendingProperties.length})</span>
          {pendingProperties.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-amber-950 text-[10px] font-bold">
              {pendingProperties.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('properties')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-btn text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'properties'
              ? 'bg-malta-blue text-white shadow-sm'
              : 'text-malta-slate hover:text-malta-charcoal hover:bg-white'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>All Properties ({properties.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('banners')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-btn text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'banners'
              ? 'bg-malta-blue text-white shadow-sm'
              : 'text-malta-slate hover:text-malta-charcoal hover:bg-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Banner Ads ({banners.length})</span>
        </button>
      </div>

      {/* 3. TAB: MODERATION QUEUE */}
      {activeTab === 'moderation' && (
        <div className="space-y-4">
          {pendingProperties.length === 0 ? (
            <div className="bg-white rounded-card border border-malta-border p-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-malta-green mx-auto" />
              <h3 className="text-lg font-bold text-malta-charcoal font-heading">
                Moderation Queue is Clear!
              </h3>
              <p className="text-xs text-malta-slate max-w-sm mx-auto">
                There are no pending owner listings waiting for approval. All submitted properties have been processed.
              </p>
            </div>
          ) : (
            pendingProperties.map((prop) => {
              const primaryImg =
                prop.images.find((i) => i.isPrimary)?.url || prop.images[0]?.url;

              return (
                <div
                  key={prop.id}
                  className="bg-white rounded-card border border-amber-200 p-6 shadow-soft space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-malta-border">
                    <div className="flex items-center gap-3">
                      <div className="relative aspect-[4/3] w-20 sm:w-24 rounded-btn overflow-hidden bg-gray-100 shrink-0">
                        <img src={primaryImg} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-100">
                            {prop.referenceCode}
                          </span>
                          <span className="text-xs font-bold uppercase text-malta-blue">
                            {prop.purpose === 'buy' ? 'For Sale' : 'For Rent'} · {prop.propertyType}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-malta-charcoal font-heading mt-0.5">
                          {prop.title}
                        </h3>
                        <p className="text-xs text-malta-slate">
                          📍 {prop.location.locality} · {formatPrice(prop.price, prop.purpose)} · By {prop.ownerContact.name} ({prop.ownerContact.phone})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => approveProperty(prop.id)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-btn bg-malta-green text-white text-xs font-bold hover:opacity-90 shadow-sm"
                      >
                        <Check className="w-4 h-4" />
                        <span>Approve & Publish</span>
                      </button>

                      <button
                        onClick={() => rejectProperty(prop.id)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-btn bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold hover:bg-rose-100"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-malta-slate line-clamp-2">
                    {prop.description}
                  </p>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* 4. TAB: ALL PROPERTIES */}
      {activeTab === 'properties' && (
        <div className="bg-white rounded-card border border-malta-border overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-malta-warm/80 border-b border-malta-border text-[11px] font-bold uppercase tracking-wider text-malta-slate">
                <tr>
                  <th className="p-3.5">Reference</th>
                  <th className="p-3.5">Property</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5">Locality</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Featured</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-malta-border text-malta-charcoal">
                {properties.map((p) => (
                  <tr key={p.id} className="hover:bg-malta-warm/40 transition-colors">
                    <td className="p-3.5 font-mono font-semibold">{p.referenceCode}</td>
                    <td className="p-3.5 font-bold max-w-xs truncate">{p.title}</td>
                    <td className="p-3.5 font-extrabold text-malta-blue">
                      {formatPrice(p.price, p.purpose)}
                    </td>
                    <td className="p-3.5">{p.location.locality}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.approvalStatus === 'approved' ? 'bg-malta-green-light text-malta-green' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {p.approvalStatus}
                      </span>
                    </td>
                    <td className="p-3.5">
                      {p.isFeatured ? (
                        <span className="text-amber-600 font-bold">★ Yes</span>
                      ) : (
                        <span className="text-malta-slate">No</span>
                      )}
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <Link
                        href={`/property/${p.slug}`}
                        className="text-malta-blue font-bold hover:underline"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => deleteProperty(p.id)}
                        className="text-rose-600 font-bold hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. TAB: BANNER ADS */}
      {activeTab === 'banners' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-malta-charcoal font-heading">
                Partner Banner Advertising Campaigns
              </h3>
              <p className="text-xs text-malta-slate">
                Monetize ad slots for Maltese banks, legal/notary services, interior design, and moving companies.
              </p>
            </div>

            <button
              onClick={() => setShowAddBannerModal(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-btn bg-malta-blue text-white text-xs font-bold hover:bg-malta-blue-hover shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Banner Ad</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {banners.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-card border border-malta-border p-5 shadow-soft space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-malta-sky text-malta-navy">
                    {b.placement.replace('_', ' ')}
                  </span>
                  <button
                    onClick={() => toggleBannerStatus(b.id)}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                      b.isActive ? 'bg-malta-green-light text-malta-green' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {b.isActive ? 'Active' : 'Paused'}
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="aspect-video w-24 rounded-btn overflow-hidden bg-gray-100 shrink-0">
                    <img src={b.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-malta-charcoal line-clamp-1">{b.title}</h4>
                    <p className="text-xs text-malta-slate">{b.advertiserName}</p>
                    <a
                      href={b.targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-malta-blue hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <span>{b.targetUrl}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Metrics */}
                <div className="pt-3 border-t border-malta-border flex items-center justify-between text-xs text-malta-slate">
                  <div>👁 {b.impressionsCount.toLocaleString()} Impressions</div>
                  <div>🖱 {b.clicksCount} Clicks</div>
                  <div>
                    CTR:{' '}
                    <strong>
                      {b.impressionsCount > 0
                        ? ((b.clicksCount / b.impressionsCount) * 100).toFixed(1)
                        : 0}
                      %
                    </strong>
                  </div>
                  <button
                    onClick={() => deleteBanner(b.id)}
                    className="text-rose-500 hover:text-rose-700"
                    title="Delete Banner"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE BANNER MODAL */}
      {showAddBannerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-card max-w-lg w-full p-6 shadow-card space-y-4">
            <h3 className="text-lg font-bold text-malta-charcoal font-heading">
              Create New Banner Advertisement
            </h3>

            <form onSubmit={handleCreateBanner} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-malta-charcoal mb-1">
                  Campaign Title
                </label>
                <input
                  type="text"
                  required
                  value={newBannerTitle}
                  onChange={(e) => setNewBannerTitle(e.target.value)}
                  placeholder="e.g. BOV Low Rate Home Loans"
                  className="w-full px-3 py-2 rounded-btn border border-malta-border text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-malta-charcoal mb-1">
                    Advertiser / Business
                  </label>
                  <input
                    type="text"
                    required
                    value={newBannerAdvertiser}
                    onChange={(e) => setNewBannerAdvertiser(e.target.value)}
                    placeholder="e.g. Bank of Valletta"
                    className="w-full px-3 py-2 rounded-btn border border-malta-border text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-malta-charcoal mb-1">
                    Placement
                  </label>
                  <select
                    value={newBannerPlacement}
                    onChange={(e) => setNewBannerPlacement(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-btn border border-malta-border text-sm"
                  >
                    <option value="home_hero">Homepage Hero</option>
                    <option value="home_mid">Homepage Mid-section</option>
                    <option value="search_sidebar">Search Page Sidebar</option>
                    <option value="property_sidebar">Property Detail Sidebar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-malta-charcoal mb-1">
                  Banner Image URL
                </label>
                <input
                  type="url"
                  required
                  value={newBannerImageUrl}
                  onChange={(e) => setNewBannerImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3 py-2 rounded-btn border border-malta-border text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-malta-charcoal mb-1">
                    Destination URL
                  </label>
                  <input
                    type="url"
                    required
                    value={newBannerTargetUrl}
                    onChange={(e) => setNewBannerTargetUrl(e.target.value)}
                    placeholder="https://www.company.mt"
                    className="w-full px-3 py-2 rounded-btn border border-malta-border text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-malta-charcoal mb-1">
                    CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={newBannerCta}
                    onChange={(e) => setNewBannerCta(e.target.value)}
                    placeholder="Learn More"
                    className="w-full px-3 py-2 rounded-btn border border-malta-border text-sm"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddBannerModal(false)}
                  className="px-4 py-2 rounded-btn text-xs font-semibold text-malta-slate hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-btn bg-malta-blue text-white text-xs font-bold hover:bg-malta-blue-hover"
                >
                  Publish Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
