import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Phone,
  MessageSquare,
  Building,
  Award,
  Star,
  Users,
  Search,
  ArrowRight,
} from 'lucide-react';

interface VerifiedAgent {
  id: string;
  name: string;
  company: string;
  licenseNumber: string;
  photoUrl: string;
  phone: string;
  locality: string;
  specialization: string;
  rating: number;
  reviewsCount: number;
  activeListingsCount: number;
  experienceYears: number;
}

const VERIFIED_AGENTS: VerifiedAgent[] = [
  {
    id: 'agent-1',
    name: 'Mark Vella',
    company: 'Valletta Prime Real Estate',
    licenseNumber: 'MLT-LIC-2041',
    photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    phone: '+356 7922 4455',
    locality: 'Valletta & Floriana',
    specialization: 'Historic Palazzos & Seafront Penthouses',
    rating: 4.9,
    reviewsCount: 38,
    activeListingsCount: 14,
    experienceYears: 12,
  },
  {
    id: 'agent-2',
    name: 'Elena Borg',
    company: 'Sliema Waterfront Homes',
    licenseNumber: 'MLT-LIC-1890',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    phone: '+356 7944 1122',
    locality: 'Sliema & St Julian’s',
    specialization: 'Luxury Marina Apartments & Rentals',
    rating: 5.0,
    reviewsCount: 52,
    activeListingsCount: 22,
    experienceYears: 9,
  },
  {
    id: 'agent-3',
    name: 'Anthony Camilleri',
    company: 'Gozo Island Sanctuary Realty',
    licenseNumber: 'MLT-LIC-3024',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    phone: '+356 7988 9900',
    locality: 'Victoria (Gozo) & Xagħra',
    specialization: 'Character Farmhouses & Rustic Villas',
    rating: 4.8,
    reviewsCount: 29,
    activeListingsCount: 11,
    experienceYears: 15,
  },
  {
    id: 'agent-4',
    name: 'Martina Zammit',
    company: 'Central Malta Properties',
    licenseNumber: 'MLT-LIC-2715',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    phone: '+356 7933 6677',
    locality: 'Mosta, Naxxar & Attard',
    specialization: 'Modern Maisonettes & Terraced Houses',
    rating: 4.9,
    reviewsCount: 44,
    activeListingsCount: 18,
    experienceYears: 8,
  },
];

export default function VerifiedAgentsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-malta-green-light text-malta-green text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          Maltese Licensed & Verified Agents
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-malta-charcoal font-heading">
          Connect with Verified Real Estate Professionals
        </h1>
        <p className="text-base text-malta-slate leading-relaxed">
          Every agent listed below holds a verified government real estate license, verified identity, and proven track record of transparent Maltese property transactions.
        </p>
      </div>

      {/* Trust Criteria */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-card border border-malta-border p-6 shadow-soft space-y-2">
          <div className="w-10 h-10 rounded-btn bg-malta-sky flex items-center justify-center text-malta-blue mb-3">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-malta-charcoal font-heading">
            100% Government Licensed
          </h3>
          <p className="text-xs text-malta-slate leading-relaxed">
            All agents are fully compliant with Malta’s Real Estate Licensing Act and property regulations.
          </p>
        </div>

        <div className="bg-white rounded-card border border-malta-border p-6 shadow-soft space-y-2">
          <div className="w-10 h-10 rounded-btn bg-malta-sky flex items-center justify-center text-malta-blue mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-malta-charcoal font-heading">
            Direct & Transparent Pricing
          </h3>
          <p className="text-xs text-malta-slate leading-relaxed">
            Clear commission disclosures, zero hidden fees, and verified property ownership documentation.
          </p>
        </div>

        <div className="bg-white rounded-card border border-malta-border p-6 shadow-soft space-y-2">
          <div className="w-10 h-10 rounded-btn bg-malta-sky flex items-center justify-center text-malta-blue mb-3">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-malta-charcoal font-heading">
            Fast WhatsApp & Call Response
          </h3>
          <p className="text-xs text-malta-slate leading-relaxed">
            Instant communication for scheduling viewings, asking questions, and getting property dossiers.
          </p>
        </div>
      </div>

      {/* Agents Directory */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-malta-charcoal font-heading">
              Featured Verified Agents
            </h2>
            <p className="text-sm text-malta-slate">
              Active specialists with direct access to top Maltese properties
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VERIFIED_AGENTS.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-card border border-malta-border overflow-hidden shadow-soft hover:shadow-hover transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
                  <img
                    src={agent.photoUrl}
                    alt={agent.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-malta-green shadow-sm backdrop-blur-sm">
                      <ShieldCheck className="w-3 h-3" />
                      Verified
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div>
                    <h3 className="text-base font-bold text-malta-charcoal font-heading">
                      {agent.name}
                    </h3>
                    <p className="text-xs text-malta-blue font-semibold">{agent.company}</p>
                    <p className="text-[11px] font-mono text-malta-slate">
                      License: {agent.licenseNumber}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-malta-border text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-malta-slate">
                      <MapPin className="w-3.5 h-3.5 text-malta-blue shrink-0" />
                      <span className="line-clamp-1">{agent.locality}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-malta-slate">
                      <Building className="w-3.5 h-3.5 text-malta-blue shrink-0" />
                      <span className="line-clamp-1">{agent.specialization}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-malta-slate pt-2 border-t border-malta-border">
                    <span className="flex items-center gap-1 font-bold text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {agent.rating} ({agent.reviewsCount})
                    </span>
                    <span>{agent.activeListingsCount} Active Listings</span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 space-y-2">
                <a
                  href={`https://wa.me/${agent.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(agent.name)},%20I%20found%20your%20profile%20on%20Malta%20Property.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-btn bg-[#25D366] text-white text-xs font-bold hover:bg-[#1EBE5B] transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp {agent.name.split(' ')[0]}</span>
                </a>
                <Link
                  href={`/search?locality=${encodeURIComponent(agent.locality.split('&')[0].trim())}`}
                  className="flex items-center justify-center gap-1.5 w-full py-2 rounded-btn bg-malta-warm hover:bg-malta-sky text-malta-charcoal hover:text-malta-blue border border-malta-border text-xs font-semibold transition-colors"
                >
                  <span>View Agent Listings</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Become Verified Agent CTA */}
      <div className="bg-gradient-to-r from-malta-blue to-malta-navy text-white rounded-card p-8 sm:p-10 shadow-card text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold font-heading">
          Are you a licensed property specialist in Malta?
        </h2>
        <p className="text-sm text-gray-200 max-w-xl mx-auto">
          Get verified on Malta's fastest-growing property marketplace. Showcase your brand and receive direct enquiries from qualified local and international buyers.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/advertising"
            className="px-6 py-3 rounded-btn bg-white text-malta-charcoal font-bold text-sm shadow-md hover:bg-malta-sand transition-all"
          >
            Apply for Agent Verification
          </Link>
          <Link
            href="/list-property"
            className="px-6 py-3 rounded-btn bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors"
          >
            List Properties Direct
          </Link>
        </div>
      </div>
    </div>
  );
}
