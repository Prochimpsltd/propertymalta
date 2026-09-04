'use client';

import React, { useState } from 'react';
import { Property } from '@/types';
import { useProperties } from '@/lib/context/PropertyContext';
import { X, Send, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface EnquiryModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export function EnquiryModal({ property, isOpen, onClose }: EnquiryModalProps) {
  const { sendEnquiry, currentUser } = useProperties();
  const [name, setName] = useState(currentUser.name || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [message, setMessage] = useState(
    `Hello ${property.ownerContact.name}, I am interested in your property ${property.referenceCode} (${property.title}) in ${property.location.locality}. Could you please share more details or arrange a viewing?`
  );
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      sendEnquiry({
        propertyId: property.id,
        propertyReference: property.referenceCode,
        propertyTitle: property.title,
        propertyLocality: property.location.locality,
        propertyPrice: property.price,
        propertyPurpose: property.purpose,
        ownerUserId: property.userId,
        senderName: name,
        senderEmail: email,
        senderPhone: phone,
        message,
      });

      setIsSending(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-card shadow-2xl border border-malta-border overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-malta-border bg-malta-warm">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-malta-sky flex items-center justify-center text-malta-blue">
                <Mail className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-malta-charcoal font-heading">
                Direct Owner Enquiry
              </h3>
            </div>
            <p className="text-xs text-malta-slate mt-0.5">
              Contacting {property.ownerContact.name} ({property.referenceCode})
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-malta-slate hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-malta-green-light text-malta-green flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-malta-charcoal font-heading">
                Enquiry Sent Successfully!
              </h4>
              <p className="text-sm text-malta-slate max-w-sm mx-auto">
                Your message has been directly delivered to <strong>{property.ownerContact.name}</strong>. The owner will respond to you via email or phone.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-btn bg-malta-blue text-white font-semibold text-sm hover:bg-malta-blue-hover transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Property Summary Pill */}
              <div className="p-3 rounded-btn bg-malta-sky-light border border-malta-sky flex items-center justify-between text-xs">
                <span className="font-semibold text-malta-charcoal truncate pr-2">
                  {property.title}
                </span>
                <span className="font-bold text-malta-blue shrink-0">
                  {formatPrice(property.price, property.purpose)}
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-malta-charcoal uppercase tracking-wider mb-1">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Borg"
                  className="w-full px-3.5 py-2.5 rounded-btn border border-malta-border text-sm text-malta-charcoal focus:outline-none focus:ring-2 focus:ring-malta-blue/30 focus:border-malta-blue"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-malta-charcoal uppercase tracking-wider mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-3.5 py-2.5 rounded-btn border border-malta-border text-sm text-malta-charcoal focus:outline-none focus:ring-2 focus:ring-malta-blue/30 focus:border-malta-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-malta-charcoal uppercase tracking-wider mb-1">
                    Mobile / WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+356 7912 3456"
                    className="w-full px-3.5 py-2.5 rounded-btn border border-malta-border text-sm text-malta-charcoal focus:outline-none focus:ring-2 focus:ring-malta-blue/30 focus:border-malta-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-malta-charcoal uppercase tracking-wider mb-1">
                  Your Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-btn border border-malta-border text-sm text-malta-charcoal focus:outline-none focus:ring-2 focus:ring-malta-blue/30 focus:border-malta-blue resize-none"
                />
              </div>

              <div className="flex items-center gap-2 text-[11px] text-malta-slate pt-1">
                <ShieldCheck className="w-4 h-4 text-malta-green shrink-0" />
                <span>Your contact details are securely sent only to the verified property owner.</span>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-btn text-sm font-medium text-malta-slate hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSending}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-btn bg-malta-blue text-white font-semibold text-sm hover:bg-malta-blue-hover transition-all shadow-sm disabled:opacity-50"
                >
                  {isSending ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Enquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
