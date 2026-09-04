import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, purpose: 'buy' | 'rent' = 'buy'): string {
  const formatted = new Intl.NumberFormat('en-MT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);

  if (purpose === 'rent') {
    return `${formatted} / mo`;
  }
  return formatted;
}

export function formatArea(internalSqm: number, externalSqm: number = 0): string {
  const total = internalSqm + externalSqm;
  if (externalSqm > 0) {
    return `${internalSqm} m² (+${externalSqm} m² ext)`;
  }
  return `${total} m²`;
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

export function generateWhatsAppUrl(phone: string, refCode: string, title: string, locality: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const message = encodeURIComponent(
    `Hello, I am interested in property ${refCode} (${title}) in ${locality}, Malta. Is it still available?`
  );
  return `https://wa.me/${cleanPhone}?text=${message}`;
}
