'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProperties } from '@/lib/context/PropertyContext';
import { MALTA_LOCALITIES, PROPERTY_TYPES, AMENITY_OPTIONS } from '@/lib/data/properties';
import { PropertyPurpose, PropertyType, FurnishingStatus } from '@/types';
import {
  Building,
  Home,
  Key,
  Camera,
  MapPin,
  Phone,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  ShieldCheck,
  Check,
  Upload,
} from 'lucide-react';

export default function ListPropertyPage() {
  const router = useRouter();
  const { addProperty, currentUser } = useProperties();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [publishedProp, setPublishedProp] = useState<any>(null);

  // Form State
  const [purpose, setPurpose] = useState<PropertyPurpose>('buy');
  const [propertyType, setPropertyType] = useState<PropertyType>('Apartment');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [deposit, setDeposit] = useState('');
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [internalArea, setInternalArea] = useState('');
  const [externalArea, setExternalArea] = useState('');
  const [floor, setFloor] = useState(1);
  const [totalFloors, setTotalFloors] = useState(4);
  const [hasLift, setHasLift] = useState(true);
  const [furnishing, setFurnishing] = useState<FurnishingStatus>('Furnished');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState<string[]>(['Balcony', 'Lift', 'Air Conditioning']);

  // Images
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
  ]);

  // Location & Privacy
  const [locality, setLocality] = useState('Sliema');
  const [address, setAddress] = useState('');
  const [isApproximate, setIsApproximate] = useState(false);

  // Contact Details
  const [ownerName, setOwnerName] = useState(currentUser.name);
  const [ownerPhone, setOwnerPhone] = useState(currentUser.phone);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [ownerEmail, setOwnerEmail] = useState(currentUser.email);
  const [showEmailPublicly, setShowEmailPublicly] = useState(false);
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'call' | 'email' | 'any'>('whatsapp');

  // Promotion Plan
  const [selectedPlan, setSelectedPlan] = useState<'standard' | '7days' | '14days' | '30days'>('standard');

  const toggleFeature = (feat: string) => {
    setFeatures((prev) =>
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  };

  const addImageUrl = () => {
    if (imageUrlInput.trim()) {
      setImages([...images, imageUrlInput.trim()]);
      setImageUrlInput('');
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
      return;
    }
    setIsSubmitting(true);

    setTimeout(() => {
      const isFeatured = selectedPlan !== 'standard';
      const created = addProperty({
        title: title || `${bedrooms} Bedroom ${propertyType} in ${locality}`,
        description:
          description ||
          `Direct from owner: Beautiful ${propertyType} located in ${locality}, finished to high standards. Contact for more details.`,
        purpose,
        propertyType,
        price: Number(price) || (purpose === 'buy' ? 350000 : 1200),
        deposit: deposit ? Number(deposit) : undefined,
        bedrooms,
        bathrooms,
        internalArea: Number(internalArea) || 110,
        externalArea: Number(externalArea) || 15,
        floor,
        totalFloors,
        hasLift,
        furnishing,
        location: {
          locality,
          region: 'Northern Harbour',
          address,
          lat: 35.9122 + (Math.random() - 0.5) * 0.05,
          lng: 14.5042 + (Math.random() - 0.5) * 0.05,
          isApproximate,
        },
        features,
        images: images.map((url, idx) => ({
          id: `img-${Date.now()}-${idx}`,
          url,
          isPrimary: idx === 0,
        })),
        ownerContact: {
          name: ownerName,
          phone: ownerPhone,
          whatsappEnabled,
          whatsappNumber: ownerPhone.replace(/\s+/g, ''),
          email: ownerEmail,
          showEmailPublicly,
          preferredContact,
        },
        isFeatured,
        featuredPlan: selectedPlan,
      });

      setIsSubmitting(false);
      setPublishedProp(created);
    }, 800);
  };

  const steps = [
    { num: 1, label: 'Purpose & Type' },
    { num: 2, label: 'Details' },
    { num: 3, label: 'Photos' },
    { num: 4, label: 'Location' },
    { num: 5, label: 'Contact' },
    { num: 6, label: 'Promote' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 1. HEADER */}
      <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-malta-charcoal font-heading tracking-tight">
          List Your Property in Malta
        </h1>
        <p className="text-sm text-malta-slate">
          Connect directly with thousands of verified buyers and renters with zero intermediary commission fees.
        </p>
      </div>

      {/* 2. PROGRESS STEPPER */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-malta-border -z-10" />
          {steps.map((s) => {
            const isCompleted = publishedProp ? true : s.num < currentStep;
            const isCurrent = !publishedProp && s.num === currentStep;

            return (
              <button
                key={s.num}
                type="button"
                onClick={() => {
                  if (!publishedProp) setCurrentStep(s.num);
                }}
                className={`flex flex-col items-center gap-1 bg-white px-2 cursor-pointer transition-all ${
                  isCurrent
                    ? 'text-malta-blue font-bold scale-105'
                    : isCompleted
                    ? 'text-malta-green'
                    : 'text-malta-slate hover:text-malta-charcoal'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-malta-blue text-white shadow-md ring-4 ring-malta-sky'
                      : isCompleted
                      ? 'bg-malta-green text-white'
                      : 'bg-malta-warm text-malta-slate border border-malta-border'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span className="text-[11px] font-semibold hidden sm:inline">{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. SUCCESS / SUBMITTED SCREEN */}
      {publishedProp ? (
        <div className="bg-white rounded-card border border-malta-border p-8 sm:p-12 text-center shadow-card space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-malta-green-light text-malta-green flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-2xl font-extrabold text-malta-charcoal font-heading">
              Property Submitted Successfully!
            </h3>
            <p className="text-sm text-malta-slate">
              Your listing reference is <strong className="text-malta-charcoal font-mono">{publishedProp.referenceCode}</strong>.
              {publishedProp.approvalStatus === 'pending'
                ? ' It is now in the admin moderation queue and will be published live shortly.'
                : ' It is now live on the marketplace.'}
            </p>
          </div>

          <div className="p-4 rounded-btn bg-malta-warm max-w-sm mx-auto text-left text-xs space-y-1">
            <div className="font-bold text-malta-charcoal">{publishedProp.title}</div>
            <div className="text-malta-slate">📍 {publishedProp.location.locality}, Malta</div>
            <div className="font-bold text-malta-blue">
              €{publishedProp.price.toLocaleString()} {publishedProp.purpose === 'rent' && '/ month'}
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => router.push(`/property/${publishedProp.slug}`)}
              className="w-full sm:w-auto px-6 py-3 rounded-btn bg-malta-blue text-white text-sm font-bold hover:bg-malta-blue-hover transition-colors"
            >
              Preview Listing
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full sm:w-auto px-6 py-3 rounded-btn bg-malta-warm border border-malta-border text-malta-charcoal text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              Go to Owner Dashboard
            </button>
          </div>
        </div>
      ) : (
        /* WIZARD FORM CONTAINER */
        <div className="bg-white rounded-card border border-malta-border p-6 sm:p-8 shadow-card">
          <form onSubmit={handleSubmit}>
            {/* STEP 1: PURPOSE & TYPE */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-lg font-bold text-malta-charcoal font-heading">
                    Step 1: Property Purpose & Category
                  </h3>
                  <p className="text-xs text-malta-slate">Are you selling or renting this property?</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPurpose('buy')}
                    className={`p-5 rounded-card border-2 text-left transition-all ${
                      purpose === 'buy'
                        ? 'border-malta-blue bg-malta-sky-light/60 shadow-sm'
                        : 'border-malta-border bg-white hover:border-gray-300'
                    }`}
                  >
                    <Home className={`w-6 h-6 mb-2 ${purpose === 'buy' ? 'text-malta-blue' : 'text-malta-slate'}`} />
                    <div className="font-bold text-malta-charcoal">Sell Property</div>
                    <div className="text-xs text-malta-slate mt-1">For sale on direct market</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPurpose('rent')}
                    className={`p-5 rounded-card border-2 text-left transition-all ${
                      purpose === 'rent'
                        ? 'border-malta-blue bg-malta-sky-light/60 shadow-sm'
                        : 'border-malta-border bg-white hover:border-gray-300'
                    }`}
                  >
                    <Key className={`w-6 h-6 mb-2 ${purpose === 'rent' ? 'text-malta-blue' : 'text-malta-slate'}`} />
                    <div className="font-bold text-malta-charcoal">Rent Property</div>
                    <div className="text-xs text-malta-slate mt-1">Long-let or rental lease</div>
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-malta-charcoal uppercase tracking-wider mb-2">
                    Select Property Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {PROPERTY_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setPropertyType(type)}
                        className={`p-3 rounded-btn border text-left text-xs font-semibold transition-all ${
                          propertyType === type
                            ? 'border-malta-blue bg-malta-sky text-malta-navy'
                            : 'border-malta-border bg-malta-warm/40 text-malta-charcoal hover:border-gray-300'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: PROPERTY INFORMATION */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-lg font-bold text-malta-charcoal font-heading">
                    Step 2: Property Information & Pricing
                  </h3>
                  <p className="text-xs text-malta-slate">Provide key specifications for prospective buyers/tenants.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-malta-charcoal mb-1">
                    Listing Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. 3 Bedroom Seafront Luxury Apartment with Terrace"
                    className="w-full px-3.5 py-2.5 rounded-btn border border-malta-border text-sm focus:outline-none focus:ring-2 focus:ring-malta-blue/30"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-malta-charcoal mb-1">
                      {purpose === 'buy' ? 'Asking Price (€) *' : 'Monthly Rent (€) *'}
                    </label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder={purpose === 'buy' ? 'e.g. 385000' : 'e.g. 1500'}
                      className="w-full px-3.5 py-2.5 rounded-btn border border-malta-border text-sm focus:outline-none focus:ring-2 focus:ring-malta-blue/30"
                    />
                  </div>

                  {purpose === 'rent' && (
                    <div>
                      <label className="block text-xs font-bold text-malta-charcoal mb-1">
                        Security Deposit (€)
                      </label>
                      <input
                        type="number"
                        value={deposit}
                        onChange={(e) => setDeposit(e.target.value)}
                        placeholder="e.g. 1500"
                        className="w-full px-3.5 py-2.5 rounded-btn border border-malta-border text-sm focus:outline-none focus:ring-2 focus:ring-malta-blue/30"
                      />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-malta-charcoal mb-1">Bedrooms</label>
                    <input
                      type="number"
                      min={0}
                      value={bedrooms}
                      onChange={(e) => setBedrooms(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-btn border border-malta-border text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-malta-charcoal mb-1">Bathrooms</label>
                    <input
                      type="number"
                      min={1}
                      value={bathrooms}
                      onChange={(e) => setBathrooms(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-btn border border-malta-border text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-malta-charcoal mb-1">Internal (m²)</label>
                    <input
                      type="number"
                      value={internalArea}
                      onChange={(e) => setInternalArea(e.target.value)}
                      placeholder="120"
                      className="w-full px-3 py-2 rounded-btn border border-malta-border text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-malta-charcoal mb-1">External (m²)</label>
                    <input
                      type="number"
                      value={externalArea}
                      onChange={(e) => setExternalArea(e.target.value)}
                      placeholder="20"
                      className="w-full px-3 py-2 rounded-btn border border-malta-border text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-malta-charcoal mb-1">
                    Detailed Description
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the rooms, views, finishings, neighborhood advantages, and inclusions..."
                    className="w-full px-3.5 py-2.5 rounded-btn border border-malta-border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-malta-blue/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-malta-charcoal mb-2">
                    Features & Amenities
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {AMENITY_OPTIONS.map((feat) => (
                      <label
                        key={feat}
                        className="flex items-center gap-2 p-2 rounded-btn bg-malta-warm/40 border border-malta-border text-xs text-malta-charcoal cursor-pointer hover:bg-malta-sky/30"
                      >
                        <input
                          type="checkbox"
                          checked={features.includes(feat)}
                          onChange={() => toggleFeature(feat)}
                          className="rounded text-malta-blue focus:ring-malta-blue/30"
                        />
                        <span>{feat}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: PHOTOS */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-lg font-bold text-malta-charcoal font-heading">
                    Step 3: Property Photographs
                  </h3>
                  <p className="text-xs text-malta-slate">
                    High quality Mediterranean photography dramatically increases enquiries.
                  </p>
                </div>

                <div className="flex gap-2">
                  <input
                    type="url"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    placeholder="Paste image URL (e.g. Unsplash or direct photo link)"
                    className="flex-1 px-3.5 py-2.5 rounded-btn border border-malta-border text-sm focus:outline-none focus:ring-2 focus:ring-malta-blue/30"
                  />
                  <button
                    type="button"
                    onClick={addImageUrl}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-btn bg-malta-blue text-white text-xs font-bold"
                  >
                    <Plus className="w-4 h-4" />
                    Add Photo
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {images.map((url, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-[4/3] rounded-btn overflow-hidden border border-malta-border group bg-gray-100"
                    >
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      {idx === 0 && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-malta-blue text-white shadow-sm">
                          Cover Photo
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: LOCATION & PRIVACY */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-lg font-bold text-malta-charcoal font-heading">
                    Step 4: Location & Map Privacy
                  </h3>
                  <p className="text-xs text-malta-slate">
                    Choose the locality and decide whether to show an exact pin or approximate radius.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-malta-charcoal mb-1">
                      Locality in Malta <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-btn border border-malta-border text-sm focus:outline-none focus:ring-2 focus:ring-malta-blue/30"
                    >
                      {MALTA_LOCALITIES.filter((l) => l !== 'All Malta & Gozo').map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-malta-charcoal mb-1">
                      Street / Area Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Tower Road, Sliema"
                      className="w-full px-3.5 py-2.5 rounded-btn border border-malta-border text-sm"
                    />
                  </div>
                </div>

                {/* Privacy Toggle (Design System Rule #14) */}
                <div className="p-4 rounded-card border border-malta-border bg-malta-warm/60 space-y-3">
                  <div className="text-xs font-bold text-malta-charcoal">Map Privacy Settings</div>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="privacy"
                      checked={!isApproximate}
                      onChange={() => setIsApproximate(false)}
                      className="text-malta-blue focus:ring-malta-blue/30"
                    />
                    <div>
                      <div className="text-xs font-semibold text-malta-charcoal">
                        Show exact location on map
                      </div>
                      <div className="text-[11px] text-malta-slate">
                        Pin placed at exact address (Recommended for commercial or landmark properties)
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="privacy"
                      checked={isApproximate}
                      onChange={() => setIsApproximate(true)}
                      className="text-malta-blue focus:ring-malta-blue/30"
                    />
                    <div>
                      <div className="text-xs font-semibold text-malta-charcoal">
                        Show approximate neighborhood radius
                      </div>
                      <div className="text-[11px] text-malta-slate">
                        Displays a 400m radius circle around the locality for residential privacy
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* STEP 5: OWNER CONTACT SETTINGS */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-lg font-bold text-malta-charcoal font-heading">
                    Step 5: Contact Preferences
                  </h3>
                  <p className="text-xs text-malta-slate">
                    How should interested buyers and renters contact you?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-malta-charcoal mb-1">
                      Owner Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-btn border border-malta-border text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-malta-charcoal mb-1">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={ownerPhone}
                      onChange={(e) => setOwnerPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-btn border border-malta-border text-sm"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-card border border-malta-border bg-malta-warm/60 space-y-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <div className="text-xs font-bold text-malta-charcoal">
                        Enable Direct WhatsApp Contact
                      </div>
                      <div className="text-[11px] text-malta-slate">
                        Buyers can click to chat with pre-filled property reference ID
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={whatsappEnabled}
                      onChange={(e) => setWhatsappEnabled(e.target.checked)}
                      className="w-4 h-4 rounded text-malta-blue focus:ring-malta-blue/30"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* STEP 6: PROMOTE & PUBLISH */}
            {currentStep === 6 && (
              <div className="space-y-8 animate-fadeIn">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-malta-sky text-malta-navy text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-malta-blue" />
                    Listing Visibility & Promotion
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-malta-charcoal font-heading">
                    Step 6: Choose Your Listing Package
                  </h3>
                  <p className="text-xs sm:text-sm text-malta-slate">
                    Standard listing is always 100% free with direct owner contact. Boost with a Featured package for up to 5x more buyer enquiries.
                  </p>
                </div>

                {/* Listing Summary Preview */}
                <div className="p-4 rounded-card border border-malta-border bg-gradient-to-r from-malta-warm/80 via-white to-malta-warm/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-16 h-16 rounded-btn overflow-hidden bg-gray-100 shrink-0 border border-malta-border">
                      <img
                        src={images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-malta-sky text-malta-navy">
                        {purpose === 'buy' ? 'For Sale' : 'For Rent'} · {propertyType}
                      </span>
                      <h4 className="text-sm font-bold text-malta-charcoal line-clamp-1">
                        {title || `${bedrooms} Bedroom ${propertyType} in ${locality}`}
                      </h4>
                      <p className="text-xs text-malta-slate">
                        📍 {locality}, Malta · <strong className="text-malta-blue">€{Number(price || (purpose === 'buy' ? 350000 : 1200)).toLocaleString()} {purpose === 'rent' && '/ mo'}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 w-full sm:w-auto">
                    <div className="text-[11px] font-bold text-malta-green flex items-center sm:justify-end gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Zero Agent Commission</span>
                    </div>
                    <div className="text-[10px] text-malta-slate">
                      Direct Owner Verification Included
                    </div>
                  </div>
                </div>

                {/* 4 Promotion Packages Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Tier 1: Free Standard */}
                  <div
                    onClick={() => setSelectedPlan('standard')}
                    className={`p-5 rounded-card border-2 cursor-pointer transition-all flex flex-col justify-between relative ${
                      selectedPlan === 'standard'
                        ? 'border-malta-blue bg-malta-sky-light/80 shadow-md ring-2 ring-malta-blue/30'
                        : 'border-malta-border bg-white hover:border-gray-300 hover:shadow-soft'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-malta-slate">
                          Standard
                        </span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPlan === 'standard' ? 'border-malta-blue bg-malta-blue text-white' : 'border-gray-300'
                        }`}>
                          {selectedPlan === 'standard' && <Check className="w-3 h-3" />}
                        </div>
                      </div>

                      <div className="text-2xl sm:text-3xl font-black text-malta-charcoal font-heading mb-1">
                        €0
                      </div>
                      <p className="text-[11px] text-malta-slate mb-4">Free forever · Direct listing</p>

                      <ul className="text-xs text-malta-slate space-y-2 mb-4">
                        <li className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-malta-green shrink-0 mt-0.5" />
                          <span>Standard search results</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-malta-green shrink-0 mt-0.5" />
                          <span>Interactive map marker</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-malta-green shrink-0 mt-0.5" />
                          <span>Direct WhatsApp & phone calls</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-malta-green shrink-0 mt-0.5" />
                          <span>Owner lead inbox</span>
                        </li>
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-malta-border text-center">
                      <span className={`text-xs font-bold block ${selectedPlan === 'standard' ? 'text-malta-blue' : 'text-malta-slate'}`}>
                        {selectedPlan === 'standard' ? 'Selected Plan' : 'Select Free'}
                      </span>
                    </div>
                  </div>

                  {/* Tier 2: 7 Days Boost */}
                  <div
                    onClick={() => setSelectedPlan('7days')}
                    className={`p-5 rounded-card border-2 cursor-pointer transition-all flex flex-col justify-between relative ${
                      selectedPlan === '7days'
                        ? 'border-malta-blue bg-malta-sky-light/80 shadow-md ring-2 ring-malta-blue/30'
                        : 'border-malta-border bg-white hover:border-gray-300 hover:shadow-soft'
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

                      <div className="text-2xl sm:text-3xl font-black text-malta-charcoal font-heading mb-1">
                        €10
                      </div>
                      <p className="text-[11px] text-malta-slate mb-4">1 week fast-track boost</p>

                      <ul className="text-xs text-malta-slate space-y-2 mb-4">
                        <li className="flex items-start gap-1.5 font-medium text-malta-charcoal">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>Higher rank in locality searches</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-malta-green shrink-0 mt-0.5" />
                          <span>Featured badge on card</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-malta-green shrink-0 mt-0.5" />
                          <span>Priority direct WhatsApp clicks</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-malta-green shrink-0 mt-0.5" />
                          <span>+150% more weekly views</span>
                        </li>
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-malta-border text-center">
                      <span className={`text-xs font-bold block ${selectedPlan === '7days' ? 'text-malta-blue' : 'text-malta-slate'}`}>
                        {selectedPlan === '7days' ? 'Selected Plan' : 'Select 7 Days'}
                      </span>
                    </div>
                  </div>

                  {/* Tier 3: 14 Days Featured (Recommended / Most Popular) */}
                  <div
                    onClick={() => setSelectedPlan('14days')}
                    className={`p-5 rounded-card border-2 cursor-pointer transition-all flex flex-col justify-between relative ${
                      selectedPlan === '14days'
                        ? 'border-malta-blue bg-malta-sky-light shadow-lg ring-2 ring-malta-blue'
                        : 'border-malta-blue/50 bg-white hover:border-malta-blue hover:shadow-soft'
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

                      <div className="text-2xl sm:text-3xl font-black text-malta-charcoal font-heading mb-1">
                        €18
                      </div>
                      <p className="text-[11px] text-malta-slate mb-4">2 weeks maximum impact</p>

                      <ul className="text-xs text-malta-slate space-y-2 mb-4">
                        <li className="flex items-start gap-1.5 font-bold text-malta-charcoal">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>Homepage Featured showcase</span>
                        </li>
                        <li className="flex items-start gap-1.5 font-semibold text-malta-charcoal">
                          <Check className="w-3.5 h-3.5 text-malta-green shrink-0 mt-0.5" />
                          <span>Top 3 search result placement</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-malta-green shrink-0 mt-0.5" />
                          <span>Prominent Gold badge & border</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-malta-green shrink-0 mt-0.5" />
                          <span>+300% direct buyer enquiries</span>
                        </li>
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-malta-border text-center">
                      <span className={`text-xs font-bold block ${selectedPlan === '14days' ? 'text-malta-blue' : 'text-malta-slate'}`}>
                        {selectedPlan === '14days' ? 'Selected Plan' : 'Select 14 Days'}
                      </span>
                    </div>
                  </div>

                  {/* Tier 4: 30 Days Spotlight */}
                  <div
                    onClick={() => setSelectedPlan('30days')}
                    className={`p-5 rounded-card border-2 cursor-pointer transition-all flex flex-col justify-between relative ${
                      selectedPlan === '30days'
                        ? 'border-malta-blue bg-malta-sky-light/80 shadow-md ring-2 ring-malta-blue/30'
                        : 'border-malta-border bg-white hover:border-gray-300 hover:shadow-soft'
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

                      <div className="text-2xl sm:text-3xl font-black text-malta-charcoal font-heading mb-1">
                        €30
                      </div>
                      <p className="text-[11px] text-malta-slate mb-4">Full month premium visibility</p>

                      <ul className="text-xs text-malta-slate space-y-2 mb-4">
                        <li className="flex items-start gap-1.5 font-bold text-malta-charcoal">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>Full month top-tier coverage</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-malta-green shrink-0 mt-0.5" />
                          <span>All Homepage & Search boosts</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-malta-green shrink-0 mt-0.5" />
                          <span>Priority WhatsApp leads</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-malta-green shrink-0 mt-0.5" />
                          <span>+500% maximum reach</span>
                        </li>
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-malta-border text-center">
                      <span className={`text-xs font-bold block ${selectedPlan === '30days' ? 'text-malta-blue' : 'text-malta-slate'}`}>
                        {selectedPlan === '30days' ? 'Selected Plan' : 'Select 30 Days'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Final Order Confirmation Strip */}
                <div className="p-5 rounded-card bg-malta-warm/70 border border-malta-border flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="text-xs font-bold text-malta-charcoal">
                      Selected Plan: <strong className="text-malta-blue uppercase font-extrabold">{selectedPlan === 'standard' ? 'Free Standard Listing' : `${selectedPlan === '7days' ? '7 Days' : selectedPlan === '14days' ? '14 Days' : '30 Days'} Featured Boost`}</strong>
                    </div>
                    <div className="text-[11px] text-malta-slate">
                      {selectedPlan === 'standard'
                        ? 'No payment required. Your property will go live with zero fees.'
                        : 'Simulated one-click payment. Your property will go live instantly with Featured status.'}
                    </div>
                  </div>

                  <div className="text-center sm:text-right">
                    <div className="text-xs text-malta-slate">Total Due:</div>
                    <div className="text-2xl font-black text-malta-blue font-heading">
                      {selectedPlan === 'standard' ? '€0 (Free)' : selectedPlan === '7days' ? '€10' : selectedPlan === '14days' ? '€18' : '€30'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* WIZARD FOOTER NAVIGATION */}
            <div className="pt-8 mt-8 border-t border-malta-border flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-btn border border-malta-border text-xs font-bold text-malta-slate hover:bg-gray-100 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>
              ) : (
                <div />
              )}

              {currentStep < 6 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-btn bg-malta-blue text-white text-xs font-bold hover:bg-malta-blue-hover shadow-sm transition-all"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-btn bg-malta-blue text-white text-sm font-extrabold hover:bg-malta-blue-hover shadow-md hover:shadow-lg transition-all duration-150 transform active:scale-98 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Publishing Listing...</span>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>
                        {selectedPlan === 'standard'
                          ? 'Publish Property Listing (Free)'
                          : `Publish & Activate ${selectedPlan === '7days' ? '7 Days' : selectedPlan === '14days' ? '14 Days' : '30 Days'} Boost (${selectedPlan === '7days' ? '€10' : selectedPlan === '14days' ? '€18' : '€30'})`}
                      </span>
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
