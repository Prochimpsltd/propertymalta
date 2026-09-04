'use client';

import React from 'react';
import { useProperties } from '@/lib/context/PropertyContext';
import { UserRole } from '@/types';
import { ShieldCheck, UserCheck, Eye } from 'lucide-react';

export function RoleSwitcher() {
  const { currentUser, setCurrentUserRole } = useProperties();

  const roles: { role: UserRole; label: string; icon: React.ReactNode; badge: string }[] = [
    {
      role: 'visitor',
      label: 'Visitor Mode',
      icon: <Eye className="w-3.5 h-3.5" />,
      badge: 'Public Marketplace',
    },
    {
      role: 'owner',
      label: 'Property Owner',
      icon: <UserCheck className="w-3.5 h-3.5" />,
      badge: 'Owner Portal',
    },
    {
      role: 'admin',
      label: 'Admin Moderator',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      badge: 'Full Access',
    },
  ];

  return (
    <div className="bg-malta-charcoal text-white text-xs py-1.5 px-4 border-b border-malta-charcoal/30">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-malta-green animate-pulse"></span>
          <span className="text-gray-300 font-medium">Malta Property Engine</span>
          <span className="text-gray-500 hidden sm:inline">|</span>
          <span className="text-gray-400 hidden sm:inline">
            Active: <strong className="text-white">{currentUser.name}</strong> ({currentUser.role})
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 text-[11px] mr-1 hidden md:inline">Simulate Role:</span>
          {roles.map(({ role, label, icon }) => (
            <button
              key={role}
              onClick={() => setCurrentUserRole(role)}
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-all ${
                currentUser.role === role
                  ? 'bg-malta-blue text-white shadow-sm ring-1 ring-white/30'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
