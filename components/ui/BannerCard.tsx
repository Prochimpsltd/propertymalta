'use client';

import React, { useEffect } from 'react';
import { BannerAd } from '@/types';
import { useProperties } from '@/lib/context/PropertyContext';
import { ExternalLink, Sparkles } from 'lucide-react';

interface BannerCardProps {
  banner: BannerAd;
  layout?: 'horizontal' | 'compact' | 'sidebar';
}

export function BannerCard({ banner, layout = 'horizontal' }: BannerCardProps) {
  const { recordBannerClick, recordBannerImpression } = useProperties();

  useEffect(() => {
    recordBannerImpression(banner.id);
  }, [banner.id]);

  const handleClick = () => {
    recordBannerClick(banner.id);
  };

  if (layout === 'sidebar') {
    return (
      <div className="bg-gradient-to-br from-white to-malta-warm rounded-card border border-malta-border overflow-hidden p-4 shadow-soft">
        <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-malta-slate mb-2">
          <span>Sponsored Partner</span>
          <span className="text-gray-400">Ad</span>
        </div>
        <div className="relative aspect-video w-full rounded-btn overflow-hidden mb-3 bg-gray-100">
          <img
            src={banner.imageUrl}
            alt={banner.title}
            className="w-full h-full object-cover"
          />
        </div>
        <h4 className="text-sm font-bold text-malta-charcoal leading-snug mb-1">
          {banner.title}
        </h4>
        <p className="text-xs text-malta-slate mb-3">{banner.advertiserName}</p>
        <a
          href={banner.targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-btn bg-malta-blue text-white text-xs font-semibold hover:bg-malta-blue-hover transition-colors"
        >
          <span>{banner.ctaText}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-malta-sky-light via-white to-malta-sand/20 rounded-card border border-malta-border p-5 sm:p-6 shadow-soft relative overflow-hidden">
      <div className="absolute top-2.5 right-3 text-[10px] uppercase font-bold tracking-wider text-malta-slate/80">
        Advertisement
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-card overflow-hidden bg-gray-100 shrink-0 shadow-sm">
            <img
              src={banner.imageUrl}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-malta-blue uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{banner.advertiserName}</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-malta-charcoal font-heading leading-tight">
              {banner.title}
            </h4>
          </div>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          <a
            href={banner.targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 rounded-btn bg-malta-blue text-white text-sm font-bold hover:bg-malta-blue-hover shadow-sm transition-all"
          >
            <span>{banner.ctaText}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
