'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useProperties } from '@/lib/context/PropertyContext';
import { BannerAd } from '@/types';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Percent,
  Compass,
  Building,
} from 'lucide-react';

interface SlideItem {
  id: string;
  badge: string;
  badgeIcon: 'shield' | 'sparkles' | 'percent' | 'compass' | 'building';
  tag: string;
  title: string;
  highlightText?: string;
  description: string;
  imageUrl: string;
  primaryCta: {
    label: string;
    href: string;
    isExternal?: boolean;
  };
  secondaryCta?: {
    label: string;
    href: string;
    isExternal?: boolean;
  };
  advertiserName?: string;
  isSponsored?: boolean;
  bannerId?: string;
}

const DEFAULT_SLIDES: SlideItem[] = [
  {
    id: 'slide-direct-owner',
    badge: 'Direct Owner Marketplace',
    badgeIcon: 'shield',
    tag: '0% Agent Fees',
    title: 'Buy & Rent Directly from Verified Maltese Owners',
    highlightText: 'Save up to €15,000+ in Commissions',
    description:
      'Skip estate agent fees. Connect directly via WhatsApp or phone with genuine property owners across Malta and Gozo.',
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85',
    primaryCta: {
      label: 'Explore Direct Listings',
      href: '/search?purpose=buy',
    },
    secondaryCta: {
      label: 'List Free',
      href: '/list-property',
    },
  },
  {
    id: 'slide-bov-partner',
    badge: 'Official Banking Partner',
    badgeIcon: 'percent',
    tag: 'Home Loans',
    title: 'Bank of Valletta Home Loan Solutions',
    highlightText: 'Low Rates & Fast Pre-Approval',
    description:
      'Competitive interest rates, flexible loan terms, and dedicated advisory for home buyers and investors in Malta.',
    imageUrl:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1920&q=85',
    primaryCta: {
      label: 'Calculate Mortgage Rates',
      href: 'https://www.bov.com/homeloans',
      isExternal: true,
    },
    advertiserName: 'Bank of Valletta',
    isSponsored: true,
    bannerId: 'banner-1',
  },
  {
    id: 'slide-seafront-living',
    badge: 'Trending Localities',
    badgeIcon: 'compass',
    tag: 'Coastal Luxury',
    title: 'Seafront Penthouses & Apartments in Sliema & St Julian’s',
    highlightText: 'Panoramic Sea & Marina Views',
    description:
      'Immerse in prime waterfront residences, modern sun terraces, and direct promenade access.',
    imageUrl:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=85',
    primaryCta: {
      label: 'View Sliema Homes',
      href: '/search?locality=Sliema',
    },
    secondaryCta: {
      label: 'St Julian’s',
      href: '/search?locality=St+Julian%27s',
    },
  },
  {
    id: 'slide-character-houses',
    badge: 'Maltese Heritage',
    badgeIcon: 'building',
    tag: 'Island Charm',
    title: 'Historic Character Houses & Gozo Pool Farmhouses',
    highlightText: 'Authentic Limestone Architecture',
    description:
      'Discover private courtyards, traditional wooden balconies, and tranquil village sanctuaries.',
    imageUrl:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=85',
    primaryCta: {
      label: 'Character Houses',
      href: '/search?type=House+of+Character',
    },
    secondaryCta: {
      label: 'Gozo Farmhouses',
      href: '/search?locality=Victoria+%28Gozo%29',
    },
  },
];

export function HeroMotionBanner() {
  const { banners, recordBannerClick, recordBannerImpression } = useProperties();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Combine default dynamic slides with any active custom banners from context
  const dynamicBanners = banners
    .filter((b) => b.isActive && b.placement === 'home_hero')
    .map((b) => ({
      id: b.id,
      badge: 'Featured Sponsor',
      badgeIcon: 'sparkles' as const,
      tag: b.category.toUpperCase(),
      title: b.title,
      description: `Special partner promotion by ${b.advertiserName}. Explore tailored solutions for property buyers and owners.`,
      imageUrl: b.imageUrl,
      primaryCta: {
        label: b.ctaText,
        href: b.targetUrl,
        isExternal: true,
      },
      advertiserName: b.advertiserName,
      isSponsored: true,
      bannerId: b.id,
    }));

  // Merge slides without duplicates
  const slides: SlideItem[] = [
    ...DEFAULT_SLIDES,
    ...dynamicBanners.filter((db) => !DEFAULT_SLIDES.some((ds) => ds.bannerId === db.bannerId)),
  ];

  const totalSlides = slides.length;

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      const normalizedIndex = (index + totalSlides) % totalSlides;
      setCurrentIndex(normalizedIndex);

      // Record impression if sponsored
      const currentSlide = slides[normalizedIndex];
      if (currentSlide?.bannerId) {
        recordBannerImpression(currentSlide.bannerId);
      }

      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    },
    [totalSlides, isAnimating, slides, recordBannerImpression]
  );

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // Auto-slide effect every 5.5 seconds
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [nextSlide, isPaused]);

  // Handle touch gestures for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    setTouchStartX(null);
  };

  const getBadgeIcon = (type: SlideItem['badgeIcon']) => {
    switch (type) {
      case 'shield':
        return <ShieldCheck className="w-3 h-3 text-malta-green" />;
      case 'percent':
        return <Percent className="w-3 h-3 text-amber-500" />;
      case 'compass':
        return <Compass className="w-3 h-3 text-malta-blue" />;
      case 'building':
        return <Building className="w-3 h-3 text-amber-600" />;
      case 'sparkles':
      default:
        return <Sparkles className="w-3 h-3 text-malta-blue" />;
    }
  };

  return (
    <div
      className="relative rounded-none sm:rounded-2xl overflow-hidden bg-malta-charcoal border-y sm:border border-malta-border shadow-card transition-all duration-300 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero Highlights and Motion Banners"
    >
      {/* Sliding Track Container with Increased Height for Prominent Image Visibility */}
      <div
        className="flex transition-transform duration-700 ease-out will-change-transform"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;

          return (
            <div
              key={slide.id}
              className="w-full shrink-0 relative min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] flex items-end sm:items-center"
            >
              {/* Slide Background Image - Clear, Vibrant & Crisp */}
              <div className="absolute inset-0 z-0">
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${
                    isActive ? 'scale-102' : 'scale-100'
                  }`}
                />
                {/* Light Scrim Gradient: Keep Image 80%+ Visible While Ensuring Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent sm:w-3/4 lg:w-3/5" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              </div>

              {/* Slide Content Layer - Reduced Text Size & Compact Glass Card */}
              <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-10 lg:px-12 py-5 sm:py-10">
                <div className="max-w-xl space-y-2.5 sm:space-y-4 p-3.5 sm:p-6 rounded-lg sm:rounded-2xl bg-black/45 sm:bg-black/35 backdrop-blur-md border border-white/15 shadow-xl">
                  {/* Badges & Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/95 text-malta-charcoal text-[10px] sm:text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
                      {getBadgeIcon(slide.badgeIcon)}
                      <span>{slide.badge}</span>
                    </div>

                    <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-malta-blue/90 text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wide border border-white/20">
                      {slide.tag}
                    </div>

                    {slide.isSponsored && (
                      <div className="inline-flex items-center px-1.5 py-0.5 rounded-xs sm:rounded text-[9px] uppercase font-bold tracking-widest bg-amber-400 text-malta-charcoal">
                        Ad
                      </div>
                    )}
                  </div>

                  {/* Slide Title - Reduced & Refined */}
                  <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-white font-heading tracking-tight leading-snug">
                    {slide.title}
                    {slide.highlightText && (
                      <span className="block text-malta-sand font-bold text-xs sm:text-base mt-0.5">
                        {slide.highlightText}
                      </span>
                    )}
                  </h3>

                  {/* Slide Description - Hidden on Mobile for clean, compact banner */}
                  <p className="hidden sm:block text-xs sm:text-sm text-gray-200 leading-relaxed max-w-md font-normal line-clamp-2">
                    {slide.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="pt-1 flex flex-wrap items-center gap-2">
                    {slide.primaryCta.isExternal ? (
                      <a
                        href={slide.primaryCta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          if (slide.bannerId) recordBannerClick(slide.bannerId);
                        }}
                        className="inline-flex items-center justify-center gap-1 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-md sm:rounded-btn bg-malta-blue text-white text-xs sm:text-sm font-bold shadow-md hover:bg-malta-blue-hover transition-all transform active:scale-98"
                      >
                        <span>{slide.primaryCta.label}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <Link
                        href={slide.primaryCta.href}
                        className="inline-flex items-center justify-center gap-1 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-md sm:rounded-btn bg-malta-blue text-white text-xs sm:text-sm font-bold shadow-md hover:bg-malta-blue-hover transition-all transform active:scale-98"
                      >
                        <span>{slide.primaryCta.label}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}

                    {slide.secondaryCta && (
                      <Link
                        href={slide.secondaryCta.href}
                        className="inline-flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-md sm:rounded-btn bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm text-xs sm:text-sm font-semibold border border-white/20 transition-all"
                      >
                        {slide.secondaryCta.label}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls: Left & Right Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Banner Slide"
        className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg transition-all transform hover:scale-110 active:scale-95 opacity-80 group-hover:opacity-100"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Banner Slide"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg transition-all transform hover:scale-110 active:scale-95 opacity-80 group-hover:opacity-100"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom Bar: Slide Indicator Dots & Counter (No Play/Pause Button) */}
      <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 z-20 px-6 sm:px-10 flex items-center justify-between">
        {/* Slide Counter */}
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-white/90 bg-black/45 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow-sm">
          <span className="text-malta-sand">0{currentIndex + 1}</span>
          <span className="text-white/40">/</span>
          <span>0{totalSlides}</span>
        </div>

        {/* Indicator Dots with Animated Progress */}
        <div className="flex items-center gap-1.5 bg-black/45 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-sm">
          {slides.map((_, idx) => {
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`relative h-1.5 rounded-full transition-all duration-300 ${
                  isCurrent ? 'w-6 bg-malta-sand' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
