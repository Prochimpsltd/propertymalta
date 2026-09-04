'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProperties } from '@/lib/context/PropertyContext';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { PropertyStatus } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils';
import {
  LayoutDashboard,
  Home,
  Mail,
  Heart,
  Sparkles,
  User,
  PlusCircle,
  Eye,
  MessageSquare,
  Phone,
  CheckCircle2,
  Clock,
  Trash2,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Award,
  MapPin,
  Camera,
  FileCheck,
  Check,
  Edit3,
  Calendar,
  Lock,
  Upload,
  ArrowRight,
  Zap,
} from 'lucide-react';

export default function DashboardPage() {
  const {
    properties,
    enquiries,
    favorites,
    currentUser,
    updateUserProfile,
    updateProperty,
    deleteProperty,
    boostProperty,
    updateEnquiryStatus,
  } = useProperties();

  const [activeTab, setActiveTab] = useState<'properties' | 'enquiries' | 'verify' | 'promotions' | 'profile' | 'saved'>('properties');
  const [propertyFilter, setPropertyFilter] = useState<'all' | 'available' | 'under_offer' | 'sold' | 'rented'>('all');
  const [boostModalProperty, setBoostModalProperty] = useState<any>(null);
  const [profileSuccessMessage, setProfileSuccessMessage] = useState('');

  // Profile Edit State
  const [editName, setEditName] = useState(currentUser.name);
  const [editEmail, setEditEmail] = useState(currentUser.email);
  const [editPhone, setEditPhone] = useState(currentUser.phone);
  const [editAvatarUrl, setEditAvatarUrl] = useState(
    currentUser.avatarUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
  );
  const [editCompany, setEditCompany] = useState(currentUser.companyName || 'Private Owner & Investor');
  const [verifyUploadSuccess, setVerifyUploadSuccess] = useState(false);

  const ownerProperties = properties.filter((p) => p.userId === currentUser.id || currentUser.role === 'admin');
  const filteredOwnerProperties = ownerProperties.filter((p) => {
    if (propertyFilter === 'all') return true;
    return p.status === propertyFilter;
  });

  const ownerEnquiries = enquiries.filter(
    (e) => e.ownerUserId === currentUser.id || currentUser.role === 'admin'
  );
  const favoritedProperties = properties.filter((p) => favorites.includes(p.id));

  // Analytics summary
  const totalViews = ownerProperties.reduce((acc, p) => acc + (p.viewsCount || 0), 0);
  const totalEnquiries = ownerProperties.reduce((acc, p) => acc + (p.enquiriesCount || 0), 0);
  const totalWhatsApp = ownerProperties.reduce((acc, p) => acc + (p.whatsappClicksCount || 0), 0);
  
  // Calculate commission saved (assuming 5% standard agency fee on sale value)
  const totalPropertySaleValue = ownerProperties
    .filter((p) => p.purpose === 'buy')
    .reduce((acc, p) => acc + p.price, 0);
  const estimatedCommissionSaved = Math.round(totalPropertySaleValue * 0.05);

  const handleStatusChange = (propertyId: string, newStatus: PropertyStatus) => {
    updateProperty(propertyId, { status: newStatus });
  };

  const handleApplyBoost = (plan: '7days' | '14days' | '30days') => {
    if (boostModalProperty) {
      boostProperty(boostModalProperty.id, plan);
      setBoostModalProperty(null);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: editName,
      email: editEmail,
      phone: editPhone,
      avatarUrl: editAvatarUrl,
      companyName: editCompany,
    });
    setProfileSuccessMessage('Profile details updated successfully!');
    setTimeout(() => {
      setProfileSuccessMessage('');
    }, 3000);
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVerifyUploadSuccess(true);
    setTimeout(() => {
      setVerifyUploadSuccess(false);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. TOP USER PROFILE & CREDENTIALS BANNER */}
      <div className="bg-white rounded-card border border-malta-border p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-malta-border">
          {/* User Photo & Core Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-malta-blue shadow-md">
                <img
                  src={
                    currentUser.avatarUrl ||
                    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
                  }
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => setActiveTab('profile')}
                className="absolute bottom-0 right-0 p-1.5 rounded-full bg-malta-blue text-white shadow-sm hover:bg-malta-blue-hover transition-colors"
                title="Change Photo / Edit Profile"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-malta-charcoal font-heading">
                  {currentUser.name}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-malta-green-light text-malta-green shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Direct Owner
                </span>
              </div>

              <p className="text-xs sm:text-sm font-medium text-malta-blue">
                {currentUser.companyName || 'Private Maltese Property Owner'}
              </p>

              {/* Contact Credentials Grid */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-malta-slate pt-1">
                <div className="flex items-center gap-1.5" title="Verified Primary Email">
                  <Mail className="w-3.5 h-3.5 text-malta-blue" />
                  <span className="font-mono text-malta-charcoal font-medium">{currentUser.email}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-malta-green shrink-0" />
                </div>

                <div className="flex items-center gap-1.5" title="Verified Direct Mobile & WhatsApp">
                  <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                  <span className="font-mono text-malta-charcoal font-medium">{currentUser.phone}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-malta-green shrink-0" />
                </div>

                <div className="flex items-center gap-1.5 text-gray-400">
                  <MapPin className="w-3.5 h-3.5 text-malta-slate" />
                  <span>Sliema, Malta</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => setActiveTab('verify')}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-btn bg-malta-warm hover:bg-malta-sky text-malta-charcoal hover:text-malta-blue border border-malta-border text-xs font-bold transition-all"
            >
              <FileCheck className="w-4 h-4 text-malta-green" />
              <span>Verify Pages & Documents</span>
            </button>

            <Link
              href="/list-property"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-btn bg-malta-blue text-white text-xs sm:text-sm font-bold shadow-sm hover:bg-malta-blue-hover transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List New Property</span>
            </Link>
          </div>
        </div>

        {/* 2. ANALYTICS & SAVINGS METRIC CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-card bg-malta-warm/60 border border-malta-border space-y-1">
            <div className="text-xs text-malta-slate font-semibold flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-malta-blue" />
              My Listings
            </div>
            <div className="text-2xl font-black text-malta-charcoal font-heading">
              {ownerProperties.length}
            </div>
            <div className="text-[11px] text-malta-slate">Properties managed</div>
          </div>

          <div className="p-4 rounded-card bg-malta-warm/60 border border-malta-border space-y-1">
            <div className="text-xs text-malta-slate font-semibold flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-malta-blue" />
              Total Views
            </div>
            <div className="text-2xl font-black text-malta-charcoal font-heading">
              {totalViews.toLocaleString()}
            </div>
            <div className="text-[11px] text-malta-green font-medium">+24% this week</div>
          </div>

          <div className="p-4 rounded-card bg-malta-warm/60 border border-malta-border space-y-1">
            <div className="text-xs text-malta-slate font-semibold flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-malta-blue" />
              Buyer Leads
            </div>
            <div className="text-2xl font-black text-malta-charcoal font-heading">
              {totalEnquiries}
            </div>
            <div className="text-[11px] text-malta-slate">Direct form inquiries</div>
          </div>

          <div className="p-4 rounded-card bg-malta-warm/60 border border-malta-border space-y-1">
            <div className="text-xs text-malta-slate font-semibold flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              WhatsApp Leads
            </div>
            <div className="text-2xl font-black text-malta-charcoal font-heading">
              {totalWhatsApp}
            </div>
            <div className="text-[11px] text-malta-slate">Direct buyer chats</div>
          </div>

          <div className="p-4 rounded-card bg-gradient-to-br from-malta-green-light to-white border border-malta-green/30 space-y-1 col-span-2 sm:col-span-1">
            <div className="text-xs text-malta-green font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Commission Saved
            </div>
            <div className="text-2xl font-black text-malta-green font-heading">
              €{estimatedCommissionSaved > 0 ? estimatedCommissionSaved.toLocaleString() : '17,500+'}
            </div>
            <div className="text-[10px] text-malta-slate">Saved vs 5% agency fees</div>
          </div>
        </div>
      </div>

      {/* 3. NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-malta-border pb-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('properties')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-btn text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'properties'
              ? 'bg-malta-blue text-white shadow-sm'
              : 'text-malta-slate hover:text-malta-charcoal hover:bg-white'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>My Properties ({ownerProperties.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('enquiries')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-btn text-xs sm:text-sm font-bold transition-all relative whitespace-nowrap ${
            activeTab === 'enquiries'
              ? 'bg-malta-blue text-white shadow-sm'
              : 'text-malta-slate hover:text-malta-charcoal hover:bg-white'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Enquiries Inbox</span>
          {ownerEnquiries.filter((e) => e.status === 'new').length > 0 && (
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('verify')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-btn text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'verify'
              ? 'bg-malta-blue text-white shadow-sm'
              : 'text-malta-slate hover:text-malta-charcoal hover:bg-white'
          }`}
        >
          <FileCheck className="w-4 h-4 text-malta-green" />
          <span>Verify Pages & Trust</span>
        </button>

        <button
          onClick={() => setActiveTab('promotions')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-btn text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'promotions'
              ? 'bg-malta-blue text-white shadow-sm'
              : 'text-malta-slate hover:text-malta-charcoal hover:bg-white'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Promotions & Boosts</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-btn text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'profile'
              ? 'bg-malta-blue text-white shadow-sm'
              : 'text-malta-slate hover:text-malta-charcoal hover:bg-white'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile & Contact Details</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-btn text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'saved'
              ? 'bg-malta-blue text-white shadow-sm'
              : 'text-malta-slate hover:text-malta-charcoal hover:bg-white'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved ({favoritedProperties.length})</span>
        </button>
      </div>

      {/* 4. TAB CONTENT: MY PROPERTIES */}
      {activeTab === 'properties' && (
        <div className="space-y-6">
          {/* Status Filter Pill Bar */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-btn border border-malta-border text-xs font-semibold">
              <button
                onClick={() => setPropertyFilter('all')}
                className={`px-3 py-1.5 rounded-btn transition-colors ${
                  propertyFilter === 'all'
                    ? 'bg-malta-blue text-white'
                    : 'text-malta-slate hover:text-malta-charcoal'
                }`}
              >
                All ({ownerProperties.length})
              </button>
              <button
                onClick={() => setPropertyFilter('available')}
                className={`px-3 py-1.5 rounded-btn transition-colors ${
                  propertyFilter === 'available'
                    ? 'bg-malta-blue text-white'
                    : 'text-malta-slate hover:text-malta-charcoal'
                }`}
              >
                Live & Available ({ownerProperties.filter((p) => p.status === 'available').length})
              </button>
              <button
                onClick={() => setPropertyFilter('under_offer')}
                className={`px-3 py-1.5 rounded-btn transition-colors ${
                  propertyFilter === 'under_offer'
                    ? 'bg-malta-blue text-white'
                    : 'text-malta-slate hover:text-malta-charcoal'
                }`}
              >
                Under Offer ({ownerProperties.filter((p) => p.status === 'under_offer').length})
              </button>
              <button
                onClick={() => setPropertyFilter('sold')}
                className={`px-3 py-1.5 rounded-btn transition-colors ${
                  propertyFilter === 'sold'
                    ? 'bg-malta-blue text-white'
                    : 'text-malta-slate hover:text-malta-charcoal'
                }`}
              >
                Sold / Rented ({ownerProperties.filter((p) => p.status === 'sold' || p.status === 'rented').length})
              </button>
            </div>

            <Link
              href="/list-property"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-malta-blue hover:underline"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Another Listing</span>
            </Link>
          </div>

          {/* Properties List */}
          {filteredOwnerProperties.length === 0 ? (
            <div className="bg-white rounded-card border border-malta-border p-12 text-center space-y-4 shadow-soft">
              <Home className="w-12 h-12 text-malta-slate mx-auto" />
              <h3 className="text-lg font-bold text-malta-charcoal font-heading">
                No properties in this category
              </h3>
              <p className="text-xs text-malta-slate max-w-sm mx-auto">
                List your direct-to-owner property in Malta and start receiving zero-commission buyer and tenant enquiries today.
              </p>
              <Link
                href="/list-property"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-btn bg-malta-blue text-white text-xs font-bold hover:bg-malta-blue-hover transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                List Property Now
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOwnerProperties.map((prop) => {
                const primaryImg =
                  prop.images.find((i) => i.isPrimary)?.url || prop.images[0]?.url;

                return (
                  <div
                    key={prop.id}
                    className="bg-white rounded-card border border-malta-border p-5 shadow-soft hover:shadow-card transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
                      <div className="relative aspect-[4/3] w-full sm:w-36 rounded-btn overflow-hidden bg-gray-100 shrink-0 border border-malta-border">
                        <img src={primaryImg} alt={prop.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/70 text-white backdrop-blur-xs">
                          {prop.purpose === 'buy' ? 'For Sale' : 'For Rent'}
                        </span>
                      </div>

                      <div className="space-y-1.5 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-malta-warm text-malta-charcoal border border-malta-border">
                            {prop.referenceCode}
                          </span>

                          {prop.approvalStatus === 'pending' ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Pending Review
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-malta-green-light text-malta-green flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Live on Marketplace
                            </span>
                          )}

                          {prop.isFeatured && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-600" />
                              ★ Featured ({prop.featuredPlan || '14 Days'})
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-malta-charcoal font-heading leading-tight line-clamp-1">
                          {prop.title}
                        </h3>

                        <div className="text-xs text-malta-slate flex items-center gap-2">
                          <span className="font-bold text-malta-blue text-sm">
                            {formatPrice(prop.price, prop.purpose)}
                          </span>
                          <span>•</span>
                          <span>📍 {prop.location.locality}, Malta</span>
                          <span>•</span>
                          <span>{prop.bedrooms} Bed · {prop.bathrooms} Bath · {prop.internalArea} m²</span>
                        </div>

                        {/* Mini Live Performance Counters */}
                        <div className="flex items-center gap-4 text-[11px] text-malta-slate pt-1">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5 text-malta-blue" />
                            <strong>{prop.viewsCount}</strong> Views
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5 text-malta-blue" />
                            <strong>{prop.enquiriesCount}</strong> Enquiries
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                            <strong>{prop.whatsappClicksCount}</strong> WhatsApp
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions & Status Changer */}
                    <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-malta-border">
                      {/* Status Selector */}
                      <select
                        value={prop.status}
                        onChange={(e) => handleStatusChange(prop.id, e.target.value as PropertyStatus)}
                        className="px-3 py-2 rounded-btn border border-malta-border text-xs font-bold bg-malta-warm text-malta-charcoal focus:outline-none focus:ring-2 focus:ring-malta-blue/30"
                      >
                        <option value="available">Status: Live & Available</option>
                        <option value="under_offer">Under Offer</option>
                        <option value="sold">Sold</option>
                        <option value="rented">Rented</option>
                        <option value="inactive">Inactive</option>
                      </select>

                      {/* Boost / Promote Button */}
                      {!prop.isFeatured ? (
                        <button
                          onClick={() => setBoostModalProperty(prop)}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-btn bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 transition-colors shadow-xs"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                          <span>Boost</span>
                        </button>
                      ) : (
                        <span className="px-3 py-2 rounded-btn bg-amber-100/60 text-amber-900 text-xs font-bold border border-amber-200">
                          Active Boost
                        </span>
                      )}

                      {/* View Public Listing */}
                      <Link
                        href={`/property/${prop.slug}`}
                        className="p-2 rounded-btn border border-malta-border text-malta-slate hover:text-malta-blue hover:bg-malta-warm transition-colors"
                        title="View Live Listing Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      {/* Delete */}
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to remove this property listing?')) {
                            deleteProperty(prop.id);
                          }
                        }}
                        className="p-2 rounded-btn border border-malta-border text-rose-500 hover:bg-rose-50 transition-colors"
                        title="Delete Listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 5. TAB CONTENT: ENQUIRIES INBOX */}
      {activeTab === 'enquiries' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-malta-charcoal font-heading">
              Direct Buyer & Tenant Enquiries
            </h3>
            <span className="text-xs text-malta-slate">
              {ownerEnquiries.length} Messages Received
            </span>
          </div>

          {ownerEnquiries.length === 0 ? (
            <div className="bg-white rounded-card border border-malta-border p-12 text-center space-y-3 shadow-soft">
              <Mail className="w-12 h-12 text-malta-slate mx-auto" />
              <h3 className="text-lg font-bold text-malta-charcoal font-heading">
                Your enquiry inbox is empty
              </h3>
              <p className="text-xs text-malta-slate max-w-sm mx-auto">
                When prospective buyers or tenants request viewings or submit questions, their messages will arrive here instantly.
              </p>
            </div>
          ) : (
            ownerEnquiries.map((enq) => (
              <div
                key={enq.id}
                className={`bg-white rounded-card border p-6 shadow-soft space-y-4 transition-all ${
                  enq.status === 'new' ? 'border-malta-blue ring-1 ring-malta-blue/20' : 'border-malta-border'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-malta-border">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-malta-charcoal">{enq.senderName}</span>
                    {enq.status === 'new' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-malta-blue text-white">
                        New Enquiry
                      </span>
                    )}
                    <span className="text-xs text-malta-slate">({enq.senderEmail} · {enq.senderPhone})</span>
                  </div>
                  <div className="text-xs text-malta-slate">
                    Received: {formatDate(enq.createdAt)}
                  </div>
                </div>

                <div className="p-3 rounded-btn bg-malta-warm/60 border border-malta-border text-xs flex items-center justify-between">
                  <div>
                    <span className="text-malta-slate">Property Reference: </span>
                    <strong className="text-malta-charcoal">{enq.propertyTitle} ({enq.propertyReference})</strong>
                  </div>
                  <span className="font-bold text-malta-blue">
                    €{enq.propertyPrice?.toLocaleString()}
                  </span>
                </div>

                <p className="text-sm text-malta-charcoal whitespace-pre-line leading-relaxed bg-gray-50/50 p-4 rounded-card border border-gray-100">
                  "{enq.message}"
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={`https://wa.me/${enq.senderPhone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(enq.senderName)},%20regarding%20your%20enquiry%20for%20property%20${enq.propertyReference}:`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-btn bg-[#25D366] text-white text-xs font-bold hover:bg-[#1EBE5B] transition-colors shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Reply via WhatsApp</span>
                  </a>

                  <a
                    href={`mailto:${enq.senderEmail}?subject=Regarding your enquiry for property ${enq.propertyReference}`}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-btn bg-malta-blue text-white text-xs font-bold hover:bg-malta-blue-hover transition-colors shadow-xs"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Reply by Email</span>
                  </a>

                  <a
                    href={`tel:${enq.senderPhone}`}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-btn bg-malta-warm text-malta-charcoal border border-malta-border text-xs font-bold hover:bg-gray-100 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-malta-blue" />
                    <span>Call: {enq.senderPhone}</span>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 6. TAB CONTENT: VERIFICATION & TRUST PAGES */}
      {activeTab === 'verify' && (
        <div className="space-y-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-malta-green-light via-white to-malta-warm rounded-card border border-malta-green/30 p-6 sm:p-8 shadow-soft space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-malta-green text-white text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              Maltese Direct Owner Verification Level 3 (Highest)
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-malta-charcoal font-heading">
              Owner Identity & Property Deeds Verification Center
            </h2>
            <p className="text-xs sm:text-sm text-malta-slate max-w-2xl leading-relaxed">
              Verified owners enjoy 4x more viewings, top search priority, and direct trust badges on all property listings with zero middleman interference.
            </p>
          </div>

          {/* Verification Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pillar 1: Maltese ID Verification */}
            <div className="bg-white rounded-card border border-malta-border p-6 shadow-soft space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold tracking-wider text-malta-slate">
                    Verification Item 1
                  </span>
                  <h3 className="text-base font-bold text-malta-charcoal font-heading">
                    Maltese National ID / Passport
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-malta-green-light text-malta-green">
                  <Check className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>
              <p className="text-xs text-malta-slate leading-relaxed">
                National identity card ending in <strong className="font-mono text-malta-charcoal">...84M</strong> verified with Maltese identity registry standards.
              </p>
              <div className="text-[11px] text-gray-400 flex items-center gap-1">
                <Lock className="w-3 h-3 text-malta-green" />
                <span>Identity encrypted & GDPR compliant</span>
              </div>
            </div>

            {/* Pillar 2: Property Ownership Deed Proof */}
            <div className="bg-white rounded-card border border-malta-border p-6 shadow-soft space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold tracking-wider text-malta-slate">
                    Verification Item 2
                  </span>
                  <h3 className="text-base font-bold text-malta-charcoal font-heading">
                    Notarial Property Deed / Land Registry
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-malta-green-light text-malta-green">
                  <Check className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>
              <p className="text-xs text-malta-slate leading-relaxed">
                Ownership documentation verified. Listings display the official <strong className="text-malta-green">"Direct Owner Guarantee"</strong> badge.
              </p>
              <div className="text-[11px] text-gray-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-malta-green" />
                <span>Zero agency commission verified</span>
              </div>
            </div>

            {/* Pillar 3: Mobile & WhatsApp Authentication */}
            <div className="bg-white rounded-card border border-malta-border p-6 shadow-soft space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold tracking-wider text-malta-slate">
                    Verification Item 3
                  </span>
                  <h3 className="text-base font-bold text-malta-charcoal font-heading">
                    Maltese Mobile & WhatsApp OTP
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-malta-green-light text-malta-green">
                  <Check className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>
              <p className="text-xs text-malta-slate leading-relaxed">
                Primary phone number <strong className="font-mono text-malta-charcoal">{currentUser.phone}</strong> authenticated with WhatsApp pre-filled chat links.
              </p>
              <div className="text-[11px] text-[#25D366] font-semibold flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />
                <span>Instant click-to-chat active</span>
              </div>
            </div>

            {/* Pillar 4: Primary Email Confirmation */}
            <div className="bg-white rounded-card border border-malta-border p-6 shadow-soft space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold tracking-wider text-malta-slate">
                    Verification Item 4
                  </span>
                  <h3 className="text-base font-bold text-malta-charcoal font-heading">
                    Email Security & Alerts
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-malta-green-light text-malta-green">
                  <Check className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>
              <p className="text-xs text-malta-slate leading-relaxed">
                Account email <strong className="font-mono text-malta-charcoal">{currentUser.email}</strong> is verified to receive direct buyer viewing alerts.
              </p>
              <div className="text-[11px] text-malta-blue font-semibold flex items-center gap-1">
                <Mail className="w-3 h-3" />
                <span>Instant email dispatch active</span>
              </div>
            </div>
          </div>

          {/* Document Upload for New Listings */}
          <div className="bg-white rounded-card border border-malta-border p-6 sm:p-8 shadow-soft space-y-6">
            <h3 className="text-lg font-bold text-malta-charcoal font-heading">
              Upload Ownership Documents for New Property Verification
            </h3>
            <p className="text-xs sm:text-sm text-malta-slate leading-relaxed">
              Have you recently listed a new property in Malta? Upload your Notarial Contract of Purchase, Land Registry Certificate, or utility bill to unlock verified status immediately.
            </p>

            {verifyUploadSuccess && (
              <div className="p-4 rounded-card bg-malta-green-light border border-malta-green/30 text-malta-green flex items-center gap-3 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <div className="text-xs font-bold">
                  Document submitted successfully! Our moderation team will approve your badge within 2 hours.
                </div>
              </div>
            )}

            <form onSubmit={handleVerifySubmit} className="space-y-4">
              <div className="border-2 border-dashed border-malta-border hover:border-malta-blue rounded-card p-8 text-center bg-malta-warm/40 cursor-pointer transition-colors space-y-3">
                <Upload className="w-8 h-8 text-malta-blue mx-auto" />
                <div className="text-xs font-bold text-malta-charcoal">
                  Click to browse or drag & drop Land Registry PDF / Notary Deeds
                </div>
                <div className="text-[11px] text-malta-slate">
                  Supports PDF, JPG, PNG up to 15MB
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-btn bg-malta-blue text-white text-xs font-bold hover:bg-malta-blue-hover transition-colors shadow-sm"
                >
                  Submit Document for Fast Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. TAB CONTENT: PROMOTIONS & BOOSTS */}
      {activeTab === 'promotions' && (
        <div className="space-y-8">
          <div className="bg-white rounded-card border border-malta-border p-6 sm:p-8 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-malta-charcoal font-heading flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  Featured Property Promotion Center
                </h3>
                <p className="text-xs sm:text-sm text-malta-slate mt-0.5">
                  Accelerate your sale or rental by promoting your listings to the very top of search results and homepage showcases.
                </p>
              </div>

              <Link
                href="/promote"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-btn bg-malta-blue text-white text-xs font-bold hover:bg-malta-blue-hover shadow-sm transition-colors"
              >
                <span>Full Promotion Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="p-5 rounded-card border border-malta-border bg-malta-warm/40 space-y-3">
                <div className="text-xs font-bold text-malta-slate uppercase">7 Days Boost</div>
                <div className="text-3xl font-black text-malta-charcoal font-heading">€10</div>
                <ul className="text-xs text-malta-slate space-y-1.5">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-malta-green" />
                    <span>Top locality rank</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-malta-green" />
                    <span>Featured badge</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-card border-2 border-malta-blue bg-malta-sky-light space-y-3 relative">
                <span className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-malta-blue text-white shadow-xs">
                  ★ Most Popular
                </span>
                <div className="text-xs font-bold text-malta-blue uppercase">14 Days Pro Boost</div>
                <div className="text-3xl font-black text-malta-charcoal font-heading">€18</div>
                <ul className="text-xs text-malta-slate space-y-1.5">
                  <li className="flex items-center gap-1.5 font-bold text-malta-charcoal">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Homepage Carousel spotlight</span>
                  </li>
                  <li className="flex items-center gap-1.5 font-semibold text-malta-charcoal">
                    <Check className="w-3.5 h-3.5 text-malta-green" />
                    <span>Top 3 search results rank</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-malta-green" />
                    <span>+300% more buyer leads</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-card border border-malta-border bg-malta-warm/40 space-y-3">
                <div className="text-xs font-bold text-malta-slate uppercase">30 Days Max Boost</div>
                <div className="text-3xl font-black text-malta-charcoal font-heading">€30</div>
                <ul className="text-xs text-malta-slate space-y-1.5">
                  <li className="flex items-center gap-1.5 font-bold text-malta-charcoal">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Full month top-tier placement</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-malta-green" />
                    <span>All Homepage & Map boosts</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-malta-green" />
                    <span>+500% maximum reach</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. TAB CONTENT: PROFILE & CONTACT SETTINGS */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-card border border-malta-border p-6 sm:p-8 shadow-card space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-malta-charcoal font-heading">
              Edit Owner Profile & Contact Details
            </h3>
            <p className="text-xs sm:text-sm text-malta-slate">
              Update your publicly displayed name, direct telephone, email address, and profile photo.
            </p>
          </div>

          {profileSuccessMessage && (
            <div className="p-4 rounded-card bg-malta-green-light border border-malta-green/30 text-malta-green flex items-center gap-2 animate-fadeIn text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>{profileSuccessMessage}</span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-malta-charcoal mb-1 uppercase tracking-wider">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-btn border border-malta-border text-sm focus:outline-none focus:ring-2 focus:ring-malta-blue/30"
                />
              </div>

              {/* Company or Title */}
              <div>
                <label className="block text-xs font-bold text-malta-charcoal mb-1 uppercase tracking-wider">
                  Owner Title / Investor Tag
                </label>
                <input
                  type="text"
                  value={editCompany}
                  onChange={(e) => setEditCompany(e.target.value)}
                  placeholder="e.g. Private Property Owner"
                  className="w-full px-3.5 py-2.5 rounded-btn border border-malta-border text-sm focus:outline-none focus:ring-2 focus:ring-malta-blue/30"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-malta-charcoal mb-1 uppercase tracking-wider">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-btn border border-malta-border text-sm focus:outline-none focus:ring-2 focus:ring-malta-blue/30"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-malta-charcoal mb-1 uppercase tracking-wider">
                  Mobile / WhatsApp Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-btn border border-malta-border text-sm focus:outline-none focus:ring-2 focus:ring-malta-blue/30"
                />
              </div>

              {/* Profile Photo URL */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-malta-charcoal mb-1 uppercase tracking-wider">
                  Profile Photo URL
                </label>
                <div className="flex gap-3 items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-malta-border">
                    <img src={editAvatarUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <input
                    type="url"
                    value={editAvatarUrl}
                    onChange={(e) => setEditAvatarUrl(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-3.5 py-2.5 rounded-btn border border-malta-border text-sm focus:outline-none focus:ring-2 focus:ring-malta-blue/30"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-malta-border flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 rounded-btn bg-malta-blue text-white text-sm font-bold hover:bg-malta-blue-hover shadow-sm transition-colors"
              >
                Save Profile Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 9. TAB CONTENT: SAVED PROPERTIES */}
      {activeTab === 'saved' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-malta-charcoal font-heading">
              Your Shortlisted & Saved Properties
            </h3>
            <span className="text-xs text-malta-slate">
              {favoritedProperties.length} Properties Saved
            </span>
          </div>

          {favoritedProperties.length === 0 ? (
            <div className="bg-white rounded-card border border-malta-border p-12 text-center space-y-3 shadow-soft">
              <Heart className="w-12 h-12 text-malta-slate mx-auto" />
              <h3 className="text-lg font-bold text-malta-charcoal font-heading">
                No saved properties yet
              </h3>
              <p className="text-xs text-malta-slate max-w-sm mx-auto">
                Click the heart icon on any listing across Malta to bookmark properties for quick reference.
              </p>
              <Link
                href="/search"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-btn bg-malta-blue text-white text-xs font-bold hover:bg-malta-blue-hover transition-colors"
              >
                Browse Properties
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {favoritedProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* BOOST MODAL */}
      {boostModalProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-card max-w-md w-full p-6 sm:p-8 shadow-card space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-malta-charcoal font-heading">
                Boost: {boostModalProperty.title}
              </h3>
            </div>
            <p className="text-xs text-malta-slate">
              Choose a Featured boost duration to elevate this property to the top of Maltese search results instantly.
            </p>

            <div className="space-y-2.5 pt-1">
              <button
                onClick={() => handleApplyBoost('7days')}
                className="w-full p-3.5 rounded-btn border border-malta-border text-left hover:border-malta-blue hover:bg-malta-sky-light transition-all flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-xs text-malta-charcoal">7 Days Boost</div>
                  <div className="text-[11px] text-malta-slate">Top locality search ranking</div>
                </div>
                <span className="font-extrabold text-malta-blue text-base">€10</span>
              </button>

              <button
                onClick={() => handleApplyBoost('14days')}
                className="w-full p-3.5 rounded-btn border-2 border-malta-blue text-left bg-malta-sky-light flex items-center justify-between shadow-xs"
              >
                <div>
                  <div className="font-bold text-xs text-malta-blue flex items-center gap-1">
                    <span>14 Days Pro Boost</span>
                    <span className="text-[10px] bg-malta-blue text-white px-1.5 py-0.2 rounded">Popular</span>
                  </div>
                  <div className="text-[11px] text-malta-slate">Homepage carousel + top-3 search rank</div>
                </div>
                <span className="font-extrabold text-malta-blue text-base">€18</span>
              </button>

              <button
                onClick={() => handleApplyBoost('30days')}
                className="w-full p-3.5 rounded-btn border border-malta-border text-left hover:border-malta-blue hover:bg-malta-sky-light transition-all flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-xs text-malta-charcoal">30 Days Max Boost</div>
                  <div className="text-[11px] text-malta-slate">Full month maximum exposure</div>
                </div>
                <span className="font-extrabold text-malta-blue text-base">€30</span>
              </button>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-malta-border">
              <button
                onClick={() => setBoostModalProperty(null)}
                className="px-4 py-2 rounded-btn text-xs font-semibold text-malta-slate hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
