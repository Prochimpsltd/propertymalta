'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Property, Enquiry, BannerAd, UserProfile, UserRole } from '@/types';
import { INITIAL_PROPERTIES } from '@/lib/data/properties';
import { INITIAL_BANNERS } from '@/lib/data/banners';

const MOCK_USERS: Record<UserRole, UserProfile> = {
  visitor: {
    id: 'user-visitor-1',
    name: 'Sarah Grech',
    email: 'sarah.grech@gmail.com',
    phone: '+356 7900 1122',
    role: 'visitor',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    companyName: 'Private Property Buyer',
    isVerified: true,
    createdAt: '2026-08-01',
  },
  owner: {
    id: 'user-owner-1',
    name: 'Joseph Camilleri',
    email: 'joseph.c@maltaowner.com',
    phone: '+356 7912 3456',
    role: 'owner',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    companyName: 'Private Property Owner & Landlord',
    isVerified: true,
    createdAt: '2026-07-15',
  },
  admin: {
    id: 'user-admin-1',
    name: 'Joseph Camilleri',
    email: 'joseph.c@maltaowner.com',
    phone: '+356 7912 3456',
    role: 'owner',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    companyName: 'Private Property Owner',
    isVerified: true,
    createdAt: '2026-01-01',
  },
};

const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-1',
    propertyId: 'prop-1',
    propertyReference: 'MLT-10482',
    propertyTitle: '3 Bedroom Seafront Luxury Apartment with Panoramic Bay Views',
    propertyLocality: 'Sliema',
    propertyPrice: 485000,
    propertyPurpose: 'buy',
    ownerUserId: 'user-owner-1',
    senderName: 'David Attard',
    senderEmail: 'david.attard@gmail.com',
    senderPhone: '+356 9911 2233',
    message: 'Hello Joseph, I saw your seafront apartment in Sliema and would like to arrange a viewing this Saturday morning if possible. Are the garage spaces included in the price?',
    status: 'new',
    createdAt: '2026-09-03T14:20:00Z',
  },
  {
    id: 'enq-2',
    propertyId: 'prop-4',
    propertyReference: 'MLT-10525',
    propertyTitle: 'Spectacular 4 Bedroom Detached Villa with Pool & Sea Views',
    propertyLocality: 'Mellieħa',
    propertyPrice: 1150000,
    propertyPurpose: 'buy',
    ownerUserId: 'user-owner-1',
    senderName: 'Marcus Lindholm',
    senderEmail: 'marcus.l@nordicinvest.se',
    senderPhone: '+46 70 123 4567',
    message: 'Good day, relocating to Malta with my family next month. Is this villa freehold and when would it be available for completion?',
    status: 'read',
    createdAt: '2026-09-02T10:15:00Z',
  },
];

interface PropertyContextType {
  properties: Property[];
  enquiries: Enquiry[];
  favorites: string[];
  banners: BannerAd[];
  currentUser: UserProfile;
  isLoaded: boolean;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  toggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  addProperty: (newProp: Partial<Property>) => Property;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  approveProperty: (id: string) => void;
  rejectProperty: (id: string) => void;
  boostProperty: (id: string, plan: '7days' | '14days' | '30days') => void;
  sendEnquiry: (enquiry: Omit<Enquiry, 'id' | 'status' | 'createdAt'>) => void;
  updateEnquiryStatus: (id: string, status: 'new' | 'read' | 'replied' | 'archived') => void;
  recordPropertyView: (propertyId: string) => void;
  recordWhatsAppClick: (propertyId: string) => void;
  recordCallClick: (propertyId: string) => void;
  recordBannerClick: (bannerId: string) => void;
  recordBannerImpression: (bannerId: string) => void;
  setCurrentUserRole: (role: UserRole) => void;
  addBanner: (banner: Omit<BannerAd, 'id' | 'impressionsCount' | 'clicksCount'>) => void;
  toggleBannerStatus: (id: string) => void;
  deleteBanner: (id: string) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(INITIAL_ENQUIRIES);
  const [favorites, setFavorites] = useState<string[]>(['prop-1', 'prop-3']);
  const [banners, setBanners] = useState<BannerAd[]>(INITIAL_BANNERS);
  const [currentUserRole, setCurrentUserRoleState] = useState<UserRole>('owner');
  const [userProfile, setUserProfile] = useState<UserProfile>(MOCK_USERS.owner);
  const [isLoaded, setIsLoaded] = useState(false);

  // Hydrate from localStorage on client mount
  useEffect(() => {
    try {
      const storedProps = localStorage.getItem('malta_properties');
      if (storedProps) {
        setProperties(JSON.parse(storedProps));
      } else {
        localStorage.setItem('malta_properties', JSON.stringify(INITIAL_PROPERTIES));
      }

      const storedEnquiries = localStorage.getItem('malta_enquiries');
      if (storedEnquiries) {
        setEnquiries(JSON.parse(storedEnquiries));
      } else {
        localStorage.setItem('malta_enquiries', JSON.stringify(INITIAL_ENQUIRIES));
      }

      const storedFavs = localStorage.getItem('malta_favorites');
      if (storedFavs) {
        setFavorites(JSON.parse(storedFavs));
      }

      const storedBanners = localStorage.getItem('malta_banners');
      if (storedBanners) {
        setBanners(JSON.parse(storedBanners));
      } else {
        localStorage.setItem('malta_banners', JSON.stringify(INITIAL_BANNERS));
      }

      const storedProfile = localStorage.getItem('malta_user_profile');
      if (storedProfile) {
        setUserProfile(JSON.parse(storedProfile));
      }

      const storedRole = localStorage.getItem('malta_user_role') as UserRole;
      if (storedRole && MOCK_USERS[storedRole]) {
        setCurrentUserRoleState(storedRole);
        if (!storedProfile) {
          setUserProfile(MOCK_USERS[storedRole]);
        }
      }
    } catch (e) {
      console.error('Error hydrating localStorage state', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync back to localStorage
  const saveProperties = (updated: Property[]) => {
    setProperties(updated);
    try {
      localStorage.setItem('malta_properties', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to persist properties', e);
    }
  };

  const saveEnquiries = (updated: Enquiry[]) => {
    setEnquiries(updated);
    try {
      localStorage.setItem('malta_enquiries', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to persist enquiries', e);
    }
  };

  const saveFavorites = (updated: string[]) => {
    setFavorites(updated);
    try {
      localStorage.setItem('malta_favorites', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to persist favorites', e);
    }
  };

  const saveBanners = (updated: BannerAd[]) => {
    setBanners(updated);
    try {
      localStorage.setItem('malta_banners', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to persist banners', e);
    }
  };

  const toggleFavorite = (propertyId: string) => {
    const updated = favorites.includes(propertyId)
      ? favorites.filter((id) => id !== propertyId)
      : [...favorites, propertyId];
    saveFavorites(updated);
  };

  const isFavorite = (propertyId: string) => favorites.includes(propertyId);

  const addProperty = (newPropData: Partial<Property>): Property => {
    const randNum = Math.floor(10000 + Math.random() * 90000);
    const refCode = `MLT-${randNum}`;
    const slugTitle = (newPropData.title || 'Property')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const slug = `${slugTitle}-${refCode.toLowerCase()}`;

    const createdProp: Property = {
      id: `prop-${Date.now()}`,
      referenceCode: refCode,
      slug,
      title: newPropData.title || 'Untitled Property',
      description: newPropData.description || '',
      purpose: newPropData.purpose || 'buy',
      propertyType: newPropData.propertyType || 'Apartment',
      price: newPropData.price || 0,
      deposit: newPropData.deposit,
      bedrooms: newPropData.bedrooms ?? 2,
      bathrooms: newPropData.bathrooms ?? 1,
      internalArea: newPropData.internalArea ?? 100,
      externalArea: newPropData.externalArea ?? 15,
      floor: newPropData.floor ?? 1,
      totalFloors: newPropData.totalFloors ?? 4,
      hasLift: newPropData.hasLift ?? true,
      furnishing: newPropData.furnishing || 'Furnished',
      epcRating: newPropData.epcRating || 'B',
      location: newPropData.location || {
        locality: 'Sliema',
        region: 'Northern Harbour',
        lat: 35.9122,
        lng: 14.5042,
        isApproximate: false,
      },
      features: newPropData.features || ['Balcony', 'Lift'],
      images: newPropData.images && newPropData.images.length > 0 ? newPropData.images : [
        {
          id: `img-${Date.now()}`,
          url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          isPrimary: true,
        },
      ],
      ownerContact: newPropData.ownerContact || {
        name: userProfile.name,
        phone: userProfile.phone,
        whatsappEnabled: true,
        whatsappNumber: userProfile.phone.replace(/\s+/g, ''),
        email: userProfile.email,
        showEmailPublicly: false,
        preferredContact: 'whatsapp',
      },
      userId: userProfile.id,
      status: 'available',
      approvalStatus: currentUserRole === 'admin' ? 'approved' : 'pending',
      isFeatured: Boolean(newPropData.isFeatured),
      featuredPlan: newPropData.featuredPlan,
      viewsCount: 0,
      enquiriesCount: 0,
      whatsappClicksCount: 0,
      callClicksCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [createdProp, ...properties];
    saveProperties(updated);
    return createdProp;
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    const updated = properties.map((p) =>
      p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
    );
    saveProperties(updated);
  };

  const deleteProperty = (id: string) => {
    const updated = properties.filter((p) => p.id !== id);
    saveProperties(updated);
  };

  const approveProperty = (id: string) => {
    updateProperty(id, { approvalStatus: 'approved' });
  };

  const rejectProperty = (id: string) => {
    updateProperty(id, { approvalStatus: 'rejected' });
  };

  const boostProperty = (id: string, plan: '7days' | '14days' | '30days') => {
    const daysMap = { '7days': 7, '14days': 14, '30days': 30 };
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + daysMap[plan]);

    updateProperty(id, {
      isFeatured: true,
      featuredPlan: plan,
      featuredExpiresAt: expiry.toISOString(),
    });
  };

  const sendEnquiry = (enquiryData: Omit<Enquiry, 'id' | 'status' | 'createdAt'>) => {
    const newEnq: Enquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    saveEnquiries([newEnq, ...enquiries]);

    // Increment property enquiry counter
    const prop = properties.find((p) => p.id === enquiryData.propertyId);
    if (prop) {
      updateProperty(prop.id, { enquiriesCount: (prop.enquiriesCount || 0) + 1 });
    }
  };

  const updateEnquiryStatus = (id: string, status: 'new' | 'read' | 'replied' | 'archived') => {
    const updated = enquiries.map((e) => (e.id === id ? { ...e, status } : e));
    saveEnquiries(updated);
  };

  const recordPropertyView = (propertyId: string) => {
    setProperties((prev) => {
      const updated = prev.map((p) =>
        p.id === propertyId ? { ...p, viewsCount: (p.viewsCount || 0) + 1 } : p
      );
      try {
        localStorage.setItem('malta_properties', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const recordWhatsAppClick = (propertyId: string) => {
    setProperties((prev) => {
      const updated = prev.map((p) =>
        p.id === propertyId
          ? { ...p, whatsappClicksCount: (p.whatsappClicksCount || 0) + 1 }
          : p
      );
      try {
        localStorage.setItem('malta_properties', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const recordCallClick = (propertyId: string) => {
    setProperties((prev) => {
      const updated = prev.map((p) =>
        p.id === propertyId
          ? { ...p, callClicksCount: (p.callClicksCount || 0) + 1 }
          : p
      );
      try {
        localStorage.setItem('malta_properties', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const recordBannerClick = (bannerId: string) => {
    setBanners((prev) => {
      const updated = prev.map((b) =>
        b.id === bannerId ? { ...b, clicksCount: (b.clicksCount || 0) + 1 } : b
      );
      try {
        localStorage.setItem('malta_banners', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const recordBannerImpression = (bannerId: string) => {
    setBanners((prev) => {
      const updated = prev.map((b) =>
        b.id === bannerId ? { ...b, impressionsCount: (b.impressionsCount || 0) + 1 } : b
      );
      try {
        localStorage.setItem('malta_banners', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem('malta_user_profile', JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving user profile', e);
      }
      return updated;
    });
  };

  const setCurrentUserRole = (role: UserRole) => {
    setCurrentUserRoleState(role);
    try {
      localStorage.setItem('malta_user_role', role);
      if (MOCK_USERS[role]) {
        setUserProfile(MOCK_USERS[role]);
        localStorage.setItem('malta_user_profile', JSON.stringify(MOCK_USERS[role]));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addBanner = (bannerData: Omit<BannerAd, 'id' | 'impressionsCount' | 'clicksCount'>) => {
    const newBanner: BannerAd = {
      ...bannerData,
      id: `banner-${Date.now()}`,
      impressionsCount: 0,
      clicksCount: 0,
    };
    saveBanners([newBanner, ...banners]);
  };

  const toggleBannerStatus = (id: string) => {
    const updated = banners.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b));
    saveBanners(updated);
  };

  const deleteBanner = (id: string) => {
    const updated = banners.filter((b) => b.id !== id);
    saveBanners(updated);
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        enquiries,
        favorites,
        banners,
        currentUser: userProfile,
        isLoaded,
        updateUserProfile,
        toggleFavorite,
        isFavorite,
        addProperty,
        updateProperty,
        deleteProperty,
        approveProperty,
        rejectProperty,
        boostProperty,
        sendEnquiry,
        updateEnquiryStatus,
        recordPropertyView,
        recordWhatsAppClick,
        recordCallClick,
        recordBannerClick,
        recordBannerImpression,
        setCurrentUserRole,
        addBanner,
        toggleBannerStatus,
        deleteBanner,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
}
