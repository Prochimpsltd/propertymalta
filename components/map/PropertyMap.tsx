'use client';

import React, { useEffect, useState } from 'react';
import { Property } from '@/types';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import 'leaflet/dist/leaflet.css';

interface PropertyMapProps {
  properties: Property[];
  selectedPropertyId?: string | null;
  onSelectProperty?: (id: string) => void;
  singlePropertyMode?: boolean;
}

export default function PropertyMap({
  properties,
  selectedPropertyId,
  onSelectProperty,
  singlePropertyMode = false,
}: PropertyMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-full bg-malta-warm flex items-center justify-center text-malta-slate text-sm">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-malta-blue border-t-transparent rounded-full animate-spin"></span>
          <span>Loading Malta Interactive Map...</span>
        </div>
      </div>
    );
  }

  // Dynamic import of React Leaflet inside client-only scope
  const { MapContainer, TileLayer, Marker, Popup, Circle } = require('react-leaflet');
  const L = require('leaflet');

  // Fix Leaflet default icon paths in Next.js
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });

  const centerLat = singlePropertyMode && properties.length === 1
    ? properties[0].location.lat
    : 35.9122;
  const centerLng = singlePropertyMode && properties.length === 1
    ? properties[0].location.lng
    : 14.485;
  const initialZoom = singlePropertyMode ? 14 : 12;

  const createPriceIcon = (price: number, purpose: string, isSelected: boolean) => {
    const formatted =
      price >= 1000000
        ? `€${(price / 1000000).toFixed(1)}M`
        : price >= 1000
        ? `€${Math.round(price / 1000)}k`
        : `€${price}`;

    const label = purpose === 'rent' ? `${formatted}/m` : formatted;

    return L.divIcon({
      className: 'custom-leaflet-pin',
      html: `
        <div class="custom-map-marker ${isSelected ? 'active' : ''}">
          <span>${label}</span>
        </div>
      `,
      iconSize: [60, 28],
      iconAnchor: [30, 14],
    });
  };

  return (
    <div className="relative w-full h-full min-h-[350px] rounded-card overflow-hidden border border-malta-border shadow-soft">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={initialZoom}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {properties.map((prop) => {
          const isSelected = selectedPropertyId === prop.id;
          const icon = createPriceIcon(prop.price, prop.purpose, isSelected);
          const primaryImg =
            prop.images.find((i) => i.isPrimary)?.url || prop.images[0]?.url;

          return (
            <React.Fragment key={prop.id}>
              {/* If owner chose approximate location, render a privacy boundary circle */}
              {prop.location.isApproximate && (
                <Circle
                  center={[prop.location.lat, prop.location.lng]}
                  radius={450}
                  pathOptions={{
                    color: '#176B87',
                    fillColor: '#DDEFF3',
                    fillOpacity: 0.35,
                    weight: 1.5,
                    dashArray: '4, 6',
                  }}
                />
              )}

              <Marker
                position={[prop.location.lat, prop.location.lng]}
                icon={icon}
                eventHandlers={{
                  click: () => onSelectProperty && onSelectProperty(prop.id),
                }}
              >
                <Popup className="custom-popup" maxWidth={280}>
                  <div className="w-64 bg-white overflow-hidden rounded-card">
                    <div className="relative aspect-[4/3] w-full bg-gray-100">
                      <img
                        src={primaryImg}
                        alt={prop.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-white/95 text-malta-charcoal shadow-sm">
                          {prop.purpose === 'buy' ? 'For Sale' : 'For Rent'}
                        </span>
                      </div>
                    </div>

                    <div className="p-3">
                      <div className="text-base font-extrabold text-malta-charcoal font-heading">
                        {formatPrice(prop.price, prop.purpose)}
                      </div>
                      <h4 className="text-xs font-semibold text-malta-charcoal line-clamp-1 mt-0.5">
                        {prop.title}
                      </h4>
                      <p className="text-[11px] text-malta-slate mt-0.5">
                        📍 {prop.location.locality}, Malta
                      </p>

                      <div className="mt-2 pt-2 border-t border-malta-border flex items-center justify-between text-[11px] text-malta-slate font-medium">
                        <span>🛏 {prop.bedrooms} Beds</span>
                        <span>◻ {prop.bathrooms} Baths</span>
                        <span>📐 {prop.internalArea} m²</span>
                      </div>

                      <div className="mt-3">
                        <Link
                          href={`/property/${prop.slug}`}
                          className="block w-full py-1.5 text-center rounded-btn bg-malta-blue text-white text-xs font-bold hover:bg-malta-blue-hover transition-colors"
                        >
                          View Property →
                        </Link>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapContainer>

      {/* Map helper legend */}
      <div className="absolute bottom-3 left-3 z-[400] bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-btn border border-malta-border text-[11px] text-malta-slate shadow-sm hidden sm:flex items-center gap-3">
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-malta-blue inline-block"></span>
          Exact Location
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-malta-sky border border-malta-blue inline-block"></span>
          Approximate Area (Owner Privacy)
        </span>
      </div>
    </div>
  );
}
