import React from 'react';
import Link from 'next/link';
import { Sparkles, Layers, Eye, MousePointerClick, ShieldCheck, Mail, ArrowRight } from 'lucide-react';

export default function AdvertisingPage() {
  const adPlacements = [
    {
      title: 'Homepage Top Hero Banner',
      desc: 'Maximum visibility placed directly beneath the hero search bar. Seen by 100% of platform visitors.',
      views: '50,000+ monthly impressions',
      suitableFor: 'Banks, Mortgage Brokers, Major Developers',
    },
    {
      title: 'Search Results Sidebar Ad',
      desc: 'Targeted placement beside dynamic property search results as buyers filter by locality and budget.',
      views: '35,000+ monthly impressions',
      suitableFor: 'Legal / Notary services, Home insurance, Moving logistics',
    },
    {
      title: 'Property Details In-Page Sponsor',
      desc: 'High-intent placement directly alongside property specs when visitors are actively contacting owners.',
      views: '25,000+ monthly impressions',
      suitableFor: 'Interior designers, Furniture stores, Kitchen showrooms',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-malta-sky text-malta-navy text-xs font-bold uppercase tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-malta-blue" />
          Partner Advertising Solutions
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-malta-charcoal font-heading">
          Promote Your Business on Malta's Fastest Growing Property Marketplace
        </h1>
        <p className="text-base text-malta-slate leading-relaxed">
          Reach thousands of Maltese property buyers, tenants, and homeowners at the exact moment they make major lifestyle and financial decisions.
        </p>
      </div>

      {/* Placements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {adPlacements.map((p) => (
          <div
            key={p.title}
            className="bg-white rounded-card border border-malta-border p-6 shadow-soft space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-btn bg-malta-sky flex items-center justify-center text-malta-blue">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-malta-charcoal font-heading leading-snug">
                {p.title}
              </h3>
              <p className="text-xs text-malta-slate leading-relaxed">{p.desc}</p>
            </div>

            <div className="pt-4 border-t border-malta-border space-y-2 text-xs">
              <div className="font-semibold text-malta-charcoal">
                📊 {p.views}
              </div>
              <div className="text-malta-slate">
                Best for: <strong className="text-malta-charcoal">{p.suitableFor}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact to advertise */}
      <div className="bg-gradient-to-r from-malta-blue to-malta-navy text-white rounded-card p-8 sm:p-12 shadow-card text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">
          Ready to launch your advertising campaign?
        </h2>
        <p className="text-sm text-gray-200 max-w-lg mx-auto">
          Contact our advertising team for custom banner packages, performance analytics, and tailored Maltese real estate audience segments.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="mailto:advertising@maltaproperty.mt?subject=Advertising enquiry"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-btn bg-white text-malta-charcoal font-bold text-sm hover:bg-malta-sand transition-colors"
          >
            <Mail className="w-4 h-4 text-malta-blue" />
            <span>Contact Advertising Team</span>
          </a>
          <Link
            href="/admin"
            className="px-6 py-3 rounded-btn bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors"
          >
            Manage Existing Ads
          </Link>
        </div>
      </div>
    </div>
  );
}
