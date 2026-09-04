'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { Property } from '@/types';

const PropertyMap = dynamic(() => import('./PropertyMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[350px] bg-malta-warm rounded-card border border-malta-border flex items-center justify-center text-malta-slate text-sm">
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 border-2 border-malta-blue border-t-transparent rounded-full animate-spin"></span>
        <span>Loading Malta Map...</span>
      </div>
    </div>
  ),
});

interface MapWrapperProps {
  properties: Property[];
  selectedPropertyId?: string | null;
  onSelectProperty?: (id: string) => void;
  singlePropertyMode?: boolean;
}

export function MapWrapper(props: MapWrapperProps) {
  return <PropertyMap {...props} />;
}
