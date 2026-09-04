import React from 'react';
import Link from 'next/link';
import { Home, ShieldCheck, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

export function Footer() {
  const localities = [
    'Sliema',
    "St Julian's",
    'Valletta',
    'Gżira',
    'Mosta',
    'Naxxar',
    'Mellieħa',
    'Swieqi',
    'Marsaskala',
    'Victoria (Gozo)',
  ];

  const propertyTypes = [
    'Apartments for Sale',
    'Penthouses for Sale',
    'Maisonettes for Sale',
    'Villas & Farmhouses',
    'Apartments for Rent',
    'Penthouses for Rent',
    'Commercial & Offices',
  ];

  return (
    <footer className="bg-white border-t border-malta-border pt-8 sm:pt-14 pb-24 md:pb-10 text-malta-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 pb-8 sm:pb-12 border-b border-malta-border">
          {/* Col 1: Brand Info — full width on mobile */}
          <div className="col-span-2 lg:col-span-2 space-y-3 sm:space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md sm:rounded-btn bg-malta-blue flex items-center justify-center text-white font-bold">
                <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-lg sm:text-xl font-extrabold text-malta-charcoal font-heading">
                Malta<span className="text-malta-blue">Property</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-malta-slate max-w-sm leading-relaxed">
              <span className="hidden sm:inline">The direct-to-owner property marketplace in Malta. Connect directly with Maltese homeowners and landlords with zero commission fees, instant WhatsApp communication, and verified property listings.</span>
              <span className="sm:hidden">Direct-to-owner property marketplace in Malta. Zero commission fees & verified listings.</span>
            </p>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-malta-green bg-malta-green-light px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-btn w-fit font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Direct Owner Verified</span>
            </div>
          </div>

          {/* Col 2: Popular Localities */}
          <div>
            <h3 className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-malta-charcoal mb-2.5 sm:mb-3.5 font-heading">
              Popular Areas
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-malta-slate">
              {localities.slice(0, 5).map((loc) => (
                <li key={loc}>
                  <Link
                    href={`/search?locality=${encodeURIComponent(loc)}`}
                    className="hover:text-malta-blue transition-colors"
                  >
                    <span className="hidden sm:inline">Properties in </span>{loc}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/search" className="text-malta-blue text-[10px] sm:text-xs font-semibold hover:underline inline-flex items-center gap-1">
                  View All <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h3 className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-malta-charcoal mb-2.5 sm:mb-3.5 font-heading">
              Categories
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-malta-slate">
              {propertyTypes.slice(0, 5).map((type) => (
                <li key={type}>
                  <Link
                    href={`/search?type=${encodeURIComponent(type.split(' ')[0])}`}
                    className="hover:text-malta-blue transition-colors"
                  >
                    {type}
                  </Link>
                </li>
              ))}
              {propertyTypes.length > 5 && (
                <li className="hidden sm:list-item">
                  {propertyTypes.slice(5).map((type) => (
                    <Link
                      key={type}
                      href={`/search?type=${encodeURIComponent(type.split(' ')[0])}`}
                      className="hover:text-malta-blue transition-colors block py-1"
                    >
                      {type}
                    </Link>
                  ))}
                </li>
              )}
            </ul>
          </div>

          {/* Col 4: Platform & Support — full width on mobile */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-malta-charcoal mb-2.5 sm:mb-3.5 font-heading">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-1.5 sm:gap-2 text-xs sm:text-sm text-malta-slate">
              <li>
                <Link href="/list-property" className="text-malta-blue font-semibold hover:underline">
                  List Property Free
                </Link>
              </li>
              <li>
                <Link href="/search?view=map" className="hover:text-malta-blue transition-colors">
                  Map Search
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-malta-blue transition-colors">
                  Owner Dashboard
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-malta-blue transition-colors">
                  Saved Properties
                </Link>
              </li>
              <li>
                <Link href="/advertising" className="hover:text-malta-blue transition-colors">
                  Advertise
                </Link>
              </li>
              <li>
                <Link href="/verified-agents" className="hover:text-malta-blue transition-colors">
                  Verified Agents
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-5 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-xs text-malta-slate gap-2 sm:gap-4">
          <p>© {new Date().getFullYear()} Malta Property Marketplace.</p>
          <div className="flex items-center space-x-4 sm:space-x-6">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-malta-blue" />
              Malta
            </span>
            <Link href="/terms" className="hover:text-malta-blue transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-malta-blue transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
