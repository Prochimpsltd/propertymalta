export type PropertyPurpose = 'buy' | 'rent';

export type PropertyType =
  | 'Apartment'
  | 'Penthouse'
  | 'Maisonette'
  | 'Terraced House'
  | 'Townhouse'
  | 'Villa'
  | 'Character House'
  | 'Duplex'
  | 'Bungalow'
  | 'Commercial / Office'
  | 'Garage / Parking'
  | 'Plot / Land';

export type PropertyStatus = 'available' | 'under_offer' | 'sold' | 'rented' | 'inactive';

export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export type FurnishingStatus = 'Furnished' | 'Semi-Furnished' | 'Unfurnished';

export interface PropertyImage {
  id: string;
  url: string;
  isPrimary?: boolean;
  caption?: string;
}

export interface PropertyLocation {
  locality: string;
  region: 'Northern Harbour' | 'Southern Harbour' | 'Northern' | 'Western' | 'South Eastern' | 'Gozo & Comino';
  address?: string;
  lat: number;
  lng: number;
  isApproximate: boolean; // Privacy toggle for owners
}

export interface PropertyOwnerContact {
  name: string;
  phone: string;
  whatsappEnabled: boolean;
  whatsappNumber?: string;
  email: string;
  showEmailPublicly: boolean;
  preferredContact: 'whatsapp' | 'call' | 'email' | 'any';
}

export interface Property {
  id: string;
  referenceCode: string; // e.g. MLT-10482
  slug: string;
  title: string;
  description: string;
  purpose: PropertyPurpose;
  propertyType: PropertyType;
  price: number; // in Euros. If rent, per month.
  deposit?: number;
  bedrooms: number;
  bathrooms: number;
  internalArea: number; // in sqm
  externalArea: number; // in sqm
  floor?: number;
  totalFloors?: number;
  hasLift?: boolean;
  furnishing: FurnishingStatus;
  epcRating?: string;
  location: PropertyLocation;
  features: string[]; // ['Sea View', 'Swimming Pool', 'Garage', 'Balcony', 'Lift', 'Air Conditioning', 'Pet Friendly', 'Roof Terrace']
  images: PropertyImage[];
  videoUrl?: string;
  ownerContact: PropertyOwnerContact;
  userId: string;
  status: PropertyStatus;
  approvalStatus: ApprovalStatus;
  isFeatured: boolean;
  featuredExpiresAt?: string;
  featuredPlan?: 'standard' | '7days' | '14days' | '30days';
  viewsCount: number;
  enquiriesCount: number;
  whatsappClicksCount: number;
  callClicksCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Enquiry {
  id: string;
  propertyId: string;
  propertyReference: string;
  propertyTitle: string;
  propertyLocality: string;
  propertyPrice: number;
  propertyPurpose: PropertyPurpose;
  ownerUserId: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: string;
}

export interface BannerAd {
  id: string;
  title: string;
  advertiserName: string;
  category: 'bank' | 'insurance' | 'interior' | 'legal' | 'renovation' | 'agency';
  imageUrl: string;
  targetUrl: string;
  ctaText: string;
  placement: 'home_hero' | 'home_mid' | 'search_sidebar' | 'property_sidebar' | 'footer_top';
  impressionsCount: number;
  clicksCount: number;
  isActive: boolean;
  startDate: string;
  endDate: string;
}

export type UserRole = 'visitor' | 'owner' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  companyName?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface FilterCriteria {
  purpose: PropertyPurpose | 'all';
  propertyType: PropertyType | 'all';
  locality: string | 'all';
  minPrice: number | null;
  maxPrice: number | null;
  bedrooms: number | 'any';
  bathrooms: number | 'any';
  furnishing: FurnishingStatus | 'all';
  status: PropertyStatus | 'all';
  features: string[];
  searchQuery: string;
  sortBy: 'newest' | 'price_asc' | 'price_desc' | 'popular';
}
