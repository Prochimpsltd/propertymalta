'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useProperties } from '@/lib/context/PropertyContext';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { BannerCard } from '@/components/ui/BannerCard';
import { EnquiryModal } from '@/components/ui/EnquiryModal';
import { MapWrapper } from '@/components/map/MapWrapper';
import { formatPrice, formatArea, generateWhatsAppUrl } from '@/lib/utils';
import {
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Building,
  Check,
  Phone,
  MessageSquare,
  Mail,
  ShieldCheck,
  Sparkles,
  Calendar,
  Layers,
  Zap,
  Info,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const {
    properties,
    banners,
    isFavorite,
    toggleFavorite,
    boostProperty,
    recordPropertyView,
    recordWhatsAppClick,
    recordCallClick,
  } = useProperties();

  const property = properties.find((p) => p.slug === slug || p.id === slug);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [promoteModalOpen, setPromoteModalOpen] = useState(false);
  const [selectedBoostPlan, setSelectedBoostPlan] = useState<'7days' | '14days' | '30days'>('14days');
  const [boostSuccess, setBoostSuccess] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const handleBoostSubmit = () => {
    if (!property) return;
    boostProperty(property.id, selectedBoostPlan);
    setBoostSuccess(true);
    setTimeout(() => {
      setBoostSuccess(false);
      setPromoteModalOpen(false);
    }, 2000);
  };

  useEffect(() => {
    if (property) {
      recordPropertyView(property.id);
    }
  }, [property?.id]);

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-malta-charcoal font-heading">
          Property Not Found
        </h2>
        <p className="text-sm text-malta-slate">
          The property you are looking for may have been sold, rented, or removed by the owner.
        </p>
        <Link
          href="/search"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-btn bg-malta-blue text-white text-sm font-semibold hover:bg-malta-blue-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Browse Available Properties
        </Link>
      </div>
    );
  }

  const favorited = isFavorite(property.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: property.title,
          text: `Check out this property in ${property.location.locality}, Malta: ${property.title}`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const handleWhatsApp = () => {
    recordWhatsAppClick(property.id);
    const url = generateWhatsAppUrl(
      property.ownerContact.whatsappNumber || property.ownerContact.phone,
      property.referenceCode,
      property.title,
      property.location.locality
    );
    window.open(url, '_blank');
  };

  const handleCall = () => {
    recordCallClick(property.id);
    window.location.href = `tel:${property.ownerContact.phone.replace(/\s+/g, '')}`;
  };

  const similarProperties = properties
    .filter(
      (p) =>
        p.id !== property.id &&
        (p.location.locality === property.location.locality ||
          p.propertyType === property.propertyType) &&
        p.approvalStatus === 'approved'
    )
    .slice(0, 3);

  const sidebarBanner =
    banners.find((b) => b.placement === 'property_sidebar' && b.isActive) ||
    banners.find((b) => b.isActive) ||
    banners[0];

  return (
    <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8 pb-24 sm:pb-12">
      {/* 1. TOP BREADCRUMB & ACTIONS */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-malta-slate hover:text-malta-blue transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Search</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Promote Button */}
          <button
            onClick={() => setPromoteModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md sm:rounded-btn bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-soft transition-all"
            title="Promote / Boost this property"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Promote</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md sm:rounded-btn bg-white border border-malta-border text-xs font-semibold text-malta-charcoal hover:bg-malta-warm shadow-soft transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedShare ? 'Link Copied!' : 'Share'}</span>
          </button>

          {/* Favorite Heart */}
          <button
            onClick={() => toggleFavorite(property.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md sm:rounded-btn border text-xs font-semibold shadow-soft transition-all ${
              favorited
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-white border-malta-border text-malta-charcoal hover:bg-malta-warm'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-rose-600 text-rose-600' : ''}`} />
            <span>{favorited ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* 2. TOP PHOTO & DIRECT OWNER CONTACT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Hero Photo & Property Title */}
        <div className="lg:col-span-2 space-y-4">
          {/* Main Hero Photo */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-lg sm:rounded-card overflow-hidden bg-gray-100 shadow-card border border-malta-border group">
            <img
              src={property.images[activeImageIndex]?.url || property.images[0]?.url}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102 cursor-pointer"
              onClick={() => setLightboxOpen(true)}
            />

            {/* Left/Right image navigation arrows if multiple images */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm flex items-center justify-center transition-all opacity-80 hover:opacity-100 shadow-md"
                  aria-label="Previous Photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm flex items-center justify-center transition-all opacity-80 hover:opacity-100 shadow-md"
                  aria-label="Next Photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Photo Counter Badge */}
            <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 bg-black/65 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-semibold">
              <span>Photo {activeImageIndex + 1} of {property.images.length}</span>
            </div>

            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-md sm:rounded-btn bg-black/70 text-white text-xs font-semibold backdrop-blur-sm hover:bg-black/85 transition-colors z-10 flex items-center gap-1.5"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full Screen Gallery</span>
            </button>
          </div>

          {/* Property Title Under Property Image */}
          <div className="bg-white rounded-lg sm:rounded-card border border-malta-border p-4 sm:p-6 shadow-soft space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-malta-slate">
              <span className="px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold bg-malta-warm text-malta-charcoal border border-malta-border">
                {property.propertyType}
              </span>
              <span>•</span>
              <span>Ref: <strong className="font-mono text-malta-charcoal">{property.referenceCode}</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1 text-malta-blue">
                <MapPin className="w-3.5 h-3.5" />
                {property.location.locality}, Malta
              </span>
            </div>

            <h1 className="text-xl sm:text-3xl font-extrabold text-malta-charcoal font-heading tracking-tight leading-snug">
              {property.title}
            </h1>
          </div>
        </div>

        {/* Right Column: Owner Details Box (With Price, Badges, Reference, Location & Owner Contact) */}
        <div className="lg:col-span-1 bg-white rounded-lg sm:rounded-card border border-malta-border p-5 sm:p-6 shadow-card space-y-4 sm:space-y-5 lg:sticky lg:top-24">
          {/* Top Badges: Purpose (For Sale/Rent) + Featured Property Badge */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-malta-border">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full uppercase tracking-wider font-extrabold text-xs bg-malta-sky text-malta-navy">
                {property.purpose === 'buy' ? 'For Sale' : 'For Rent'}
              </span>
              {property.isFeatured && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full uppercase tracking-wider font-bold text-xs bg-amber-100 text-amber-900 border border-amber-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Featured Property
                </span>
              )}
            </div>

            <span className="text-xs font-mono font-bold text-malta-slate">
              {property.referenceCode}
            </span>
          </div>

          {/* Price Display */}
          <div className="space-y-1">
            <div className="text-xs uppercase font-bold tracking-wider text-malta-slate">
              {property.purpose === 'buy' ? 'Asking Price' : 'Monthly Rent'}
            </div>
            <div className="text-3xl sm:text-4xl font-black text-malta-blue font-heading tracking-tight">
              {formatPrice(property.price, property.purpose)}
            </div>
          </div>

          {/* Location in Owner Details Box */}
          <div className="flex items-start gap-2.5 p-3 rounded-btn bg-malta-warm/80 border border-malta-border text-xs text-malta-charcoal">
            <MapPin className="w-4 h-4 text-malta-blue shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-malta-charcoal block">{property.location.locality}, Malta</span>
              <span className="text-malta-slate text-[11px]">{property.location.region} Region</span>
            </div>
          </div>

          {/* Owner Info Header */}
          <div className="pt-2 border-t border-malta-border space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-malta-slate">
                Listed By Owner
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-malta-green bg-malta-green-light px-2.5 py-0.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                Direct Owner
              </span>
            </div>
            <h4 className="text-lg font-bold text-malta-charcoal font-heading">
              {property.ownerContact.name}
            </h4>
            <p className="text-xs text-malta-slate">
              Direct communication · Zero intermediary fees
            </p>
          </div>

          {/* Direct Contact Buttons */}
          <div className="space-y-3">
            {/* WhatsApp Button */}
            {property.ownerContact.whatsappEnabled && (
              <button
                onClick={handleWhatsApp}
                className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-btn bg-[#25D366] text-white font-bold text-sm shadow-sm hover:bg-[#1EBE5B] transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Owner</span>
              </button>
            )}

            {/* Direct Call Button */}
            <button
              onClick={handleCall}
              className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-btn bg-malta-blue text-white font-bold text-sm shadow-sm hover:bg-malta-blue-hover transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Owner: {property.ownerContact.phone}</span>
            </button>

            {/* Direct Enquiry Modal Trigger */}
            <button
              onClick={() => setEnquiryModalOpen(true)}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-btn bg-malta-warm hover:bg-malta-sky text-malta-charcoal hover:text-malta-blue border border-malta-border font-bold text-sm transition-colors"
            >
              <Mail className="w-4 h-4 text-malta-blue" />
              <span>Send Enquiry Form</span>
            </button>

            {/* Promote This Property Button */}
            <button
              onClick={() => setPromoteModalOpen(true)}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-btn bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 font-extrabold text-sm transition-all shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Promote This Property</span>
            </button>
          </div>

          <div className="pt-3 border-t border-malta-border text-[11px] text-malta-slate space-y-1.5">
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-malta-green shrink-0" />
              <span>Zero commission marketplace</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-malta-green shrink-0" />
              <span>Direct communication with seller/landlord</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. MAIN CONTENT SPECS, DESCRIPTION & DETAILS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Specs, Description, Features, Map */}
        <div className="lg:col-span-2 space-y-8">
          {/* Key Specs Matrix (Line Icons) */}
          <div className="bg-white rounded-card border border-malta-border p-6 shadow-soft">
            <h3 className="text-xs uppercase font-bold tracking-wider text-malta-slate mb-4 font-heading">
              Property Overview & Specs
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-btn bg-malta-sky flex items-center justify-center text-malta-blue">
                  <Bed className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-malta-slate font-medium">Bedrooms</div>
                  <div className="font-bold text-malta-charcoal">{property.bedrooms}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-btn bg-malta-sky flex items-center justify-center text-malta-blue">
                  <Bath className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-malta-slate font-medium">Bathrooms</div>
                  <div className="font-bold text-malta-charcoal">{property.bathrooms}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-btn bg-malta-sky flex items-center justify-center text-malta-blue">
                  <Maximize2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-malta-slate font-medium">Internal Area</div>
                  <div className="font-bold text-malta-charcoal">{property.internalArea} m²</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-btn bg-malta-sky flex items-center justify-center text-malta-blue">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-malta-slate font-medium">External Area</div>
                  <div className="font-bold text-malta-charcoal">{property.externalArea} m²</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-btn bg-malta-warm flex items-center justify-center text-malta-slate">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-malta-slate font-medium">Property Type</div>
                  <div className="font-bold text-malta-charcoal">{property.propertyType}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-btn bg-malta-warm flex items-center justify-center text-malta-slate">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-malta-slate font-medium">Furnishing</div>
                  <div className="font-bold text-malta-charcoal">{property.furnishing}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-btn bg-malta-warm flex items-center justify-center text-malta-slate">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-malta-slate font-medium">EPC Rating</div>
                  <div className="font-bold text-malta-charcoal">{property.epcRating || 'Pending'}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-btn bg-malta-warm flex items-center justify-center text-malta-slate">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-malta-slate font-medium">Floor Level</div>
                  <div className="font-bold text-malta-charcoal">
                    {property.floor === 0 ? 'Ground' : `${property.floor} of ${property.totalFloors}`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-card border border-malta-border p-6 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-malta-charcoal font-heading">
                Property Description
              </h3>
              {property.description.length > 200 && (
                <button
                  type="button"
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-malta-blue hover:text-malta-blue-hover transition-colors"
                >
                  <span>{isDescriptionExpanded ? 'Show Less' : 'See More'}</span>
                  {isDescriptionExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              )}
            </div>

            <div className="relative">
              <p
                className={`text-sm sm:text-base text-malta-charcoal leading-relaxed whitespace-pre-line transition-all duration-300 ${
                  !isDescriptionExpanded ? 'line-clamp-4 max-h-36 overflow-hidden' : ''
                }`}
              >
                {property.description}
              </p>

              {!isDescriptionExpanded && property.description.length > 200 && (
                <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
              )}
            </div>

            {property.description.length > 200 && (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-btn bg-malta-warm hover:bg-malta-sky text-malta-charcoal hover:text-malta-blue border border-malta-border text-xs font-bold transition-all shadow-sm"
                >
                  <span>{isDescriptionExpanded ? 'Show Less' : 'See More Description'}</span>
                  {isDescriptionExpanded ? <ChevronUp className="w-4 h-4 text-malta-blue" /> : <ChevronDown className="w-4 h-4 text-malta-blue" />}
                </button>
              </div>
            )}
          </div>

          {/* Features & Amenities */}
          <div className="bg-white rounded-card border border-malta-border p-6 shadow-soft space-y-4">
            <h3 className="text-lg font-bold text-malta-charcoal font-heading">
              Features & Amenities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.features.map((feat) => (
                <div
                  key={feat}
                  className="flex items-center gap-2 p-2.5 rounded-btn bg-malta-warm/60 border border-malta-border text-xs font-semibold text-malta-charcoal"
                >
                  <div className="w-4 h-4 rounded-full bg-malta-green-light text-malta-green flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Map Section */}
          <div className="bg-white rounded-card border border-malta-border p-6 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-malta-charcoal font-heading">
                  Location & Neighborhood
                </h3>
                <p className="text-xs text-malta-slate mt-0.5">
                  📍 {property.location.locality}, Malta
                  {property.location.isApproximate && ' (Approximate neighborhood radius shown for owner privacy)'}
                </p>
              </div>
            </div>

            <div className="h-72 w-full rounded-card overflow-hidden">
              <MapWrapper properties={[property]} singlePropertyMode />
            </div>
          </div>
        </div>

        {/* Right Column: Sponsored Partner & Quick Highlights */}
        <div className="space-y-6 lg:sticky lg:top-24">
          {/* Sponsored Ad Space placed OVER the Direct Owner Guarantee */}
          {sidebarBanner ? (
            <BannerCard banner={sidebarBanner} layout="sidebar" />
          ) : (
            <div className="bg-gradient-to-br from-white to-malta-warm rounded-card border border-malta-border overflow-hidden p-4 shadow-soft space-y-3">
              <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-malta-slate">
                <span>Sponsored Partner</span>
                <span className="text-gray-400">Ad Space</span>
              </div>
              <div className="relative aspect-video w-full rounded-btn overflow-hidden bg-malta-sky flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80"
                  alt="Advertise here"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-sm font-bold text-malta-charcoal leading-snug">
                Advertise Your Business to Thousands of Maltese Property Seekers
              </h4>
              <p className="text-xs text-malta-slate">
                Reach direct buyers, sellers, and tenants across Malta and Gozo.
              </p>
              <Link
                href="/advertising"
                className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-btn bg-malta-blue text-white text-xs font-semibold hover:bg-malta-blue-hover transition-colors"
              >
                <span>Partner With Us</span>
              </Link>
            </div>
          )}

          {/* Quick Direct-to-Owner Guarantee Card */}
          <div className="bg-malta-warm rounded-card border border-malta-border p-5 shadow-soft space-y-3">
            <div className="flex items-center gap-2 text-malta-blue text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Direct Owner Guarantee</span>
            </div>
            <p className="text-xs text-malta-slate leading-relaxed">
              This property is listed directly by the verified owner. You deal directly with no middleman, saving thousands in standard 5% agency commissions.
            </p>
          </div>
        </div>
      </div>

      {/* 5. SIMILAR PROPERTIES CAROUSEL */}
      {similarProperties.length > 0 && (
        <div className="pt-8 border-t border-malta-border space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-malta-charcoal font-heading">
                Similar Properties in Malta
              </h3>
              <p className="text-xs sm:text-sm text-malta-slate">
                More direct-to-owner homes you might be interested in
              </p>
            </div>

            <Link
              href={`/search?locality=${encodeURIComponent(property.location.locality)}`}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-malta-blue hover:underline"
            >
              <span>View More in {property.location.locality}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {similarProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      )}

      {/* MOBILE STICKY BOTTOM CONVERSION BAR (Design System Rule #12) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-malta-border p-3 shadow-2xl flex items-center gap-2">
        {property.ownerContact.whatsappEnabled && (
          <button
            onClick={handleWhatsApp}
            className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-btn bg-[#25D366] text-white text-xs font-bold shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>
        )}
        <button
          onClick={handleCall}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-btn bg-malta-blue text-white text-xs font-bold shadow-sm"
        >
          <Phone className="w-4 h-4" />
          <span>Call</span>
        </button>
        <button
          onClick={() => setEnquiryModalOpen(true)}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-btn bg-malta-warm text-malta-charcoal border border-malta-border text-xs font-bold"
        >
          <Mail className="w-4 h-4 text-malta-blue" />
          <span>Enquire</span>
        </button>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        property={property}
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
      />

      {/* Promote / Boost Property Modal */}
      {promoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-card max-w-lg w-full p-6 sm:p-8 shadow-card space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-malta-border">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-btn bg-amber-100 flex items-center justify-center text-amber-600">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-malta-charcoal font-heading">
                    Promote This Property
                  </h3>
                  <p className="text-[11px] text-malta-slate">
                    Ref: {property.referenceCode} · {property.location.locality}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPromoteModalOpen(false)}
                className="text-malta-slate hover:text-malta-charcoal p-1.5 rounded-btn hover:bg-gray-100 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {boostSuccess ? (
              <div className="p-6 rounded-card bg-malta-green-light border border-malta-green/30 text-center space-y-2 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-malta-green text-white flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-malta-green font-heading">
                  Promotion Activated Successfully!
                </h4>
                <p className="text-xs text-malta-slate">
                  This property is now boosted to the top of Maltese search results with a Featured Gold badge.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Property Mini Summary */}
                <div className="p-3.5 rounded-card bg-malta-warm/60 border border-malta-border flex items-center gap-3">
                  <div className="w-14 h-14 rounded-btn overflow-hidden bg-gray-100 shrink-0 border border-malta-border">
                    <img src={property.images[0]?.url} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-malta-charcoal truncate">{property.title}</h4>
                    <p className="text-[11px] text-malta-slate">
                      📍 {property.location.locality}, Malta · <strong className="text-malta-blue">{formatPrice(property.price, property.purpose)}</strong>
                    </p>
                  </div>
                </div>

                {/* Package Options */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-malta-charcoal">
                    Select Boost Duration:
                  </label>

                  {/* 7 Days */}
                  <div
                    onClick={() => setSelectedBoostPlan('7days')}
                    className={`p-3.5 rounded-btn border-2 cursor-pointer transition-all flex items-center justify-between ${
                      selectedBoostPlan === '7days'
                        ? 'border-malta-blue bg-malta-sky-light shadow-xs'
                        : 'border-malta-border bg-white hover:border-gray-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-malta-charcoal">7 Days Boost</div>
                      <div className="text-[11px] text-malta-slate">Higher rank in search + Featured badge</div>
                    </div>
                    <span className="font-extrabold text-malta-blue text-sm">€10</span>
                  </div>

                  {/* 14 Days */}
                  <div
                    onClick={() => setSelectedBoostPlan('14days')}
                    className={`p-3.5 rounded-btn border-2 cursor-pointer transition-all flex items-center justify-between relative ${
                      selectedBoostPlan === '14days'
                        ? 'border-malta-blue bg-malta-sky-light shadow-sm ring-1 ring-malta-blue'
                        : 'border-malta-border bg-white hover:border-gray-300'
                    }`}
                  >
                    <span className="absolute -top-2 right-4 px-2 py-0.2 rounded-full text-[9px] font-extrabold uppercase bg-malta-blue text-white">
                      ★ Most Popular
                    </span>
                    <div>
                      <div className="text-xs font-bold text-malta-blue">14 Days Pro Boost</div>
                      <div className="text-[11px] text-malta-slate">Homepage Carousel + Top-3 search placement</div>
                    </div>
                    <span className="font-extrabold text-malta-blue text-sm">€18</span>
                  </div>

                  {/* 30 Days */}
                  <div
                    onClick={() => setSelectedBoostPlan('30days')}
                    className={`p-3.5 rounded-btn border-2 cursor-pointer transition-all flex items-center justify-between ${
                      selectedBoostPlan === '30days'
                        ? 'border-malta-blue bg-malta-sky-light shadow-xs'
                        : 'border-malta-border bg-white hover:border-gray-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-malta-charcoal">30 Days Max Exposure</div>
                      <div className="text-[11px] text-malta-slate">Full month top coverage + Hero spotlight</div>
                    </div>
                    <span className="font-extrabold text-malta-blue text-sm">€30</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-malta-border flex items-center justify-between gap-3">
                  <button
                    onClick={() => setPromoteModalOpen(false)}
                    className="px-4 py-2.5 rounded-btn text-xs font-semibold text-malta-slate hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleBoostSubmit}
                    className="flex items-center gap-1.5 px-6 py-2.5 rounded-btn bg-malta-blue text-white text-xs font-extrabold hover:bg-malta-blue-hover shadow-sm transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      Activate Boost ({selectedBoostPlan === '7days' ? '€10' : selectedBoostPlan === '14days' ? '€18' : '€30'})
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
