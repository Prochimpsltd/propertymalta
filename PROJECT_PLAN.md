# Malta Property Marketplace — Project Plan & Specification

## Concept Overview
A direct-to-owner **Property Marketplace for Malta** where property owners can list properties directly and potential buyers/renters can contact owners directly without intermediary friction.

### Core User Flows
1. **Discovery Flow:**
   `Home → Search / Filters / Map → Property Details → Contact Owner (Call / WhatsApp / Email Enquiry)`
2. **Owner Listing Flow:**
   `Home → List Your Property (Wizard) → Admin Approval → Published → Optional Paid Promotion (Featured / Boost)`

### UI/UX Design Direction
* For complete color palette, tokens, typography, component specs, and Mediterranean aesthetic guidelines, refer to [DESIGN_SYSTEM.md](file:///h:/Malta%20Property/DESIGN_SYSTEM.md).

---

## 1. Homepage Structure
* **Primary Modes:** Direct switcher for **Buy | Rent | Sell**
* **Hero Search Filter:**
  * Location / Area (e.g., Valletta, Sliema, St Julian's, Mosta, etc.)
  * Property Type (Apartment, Penthouse, Maisonette, Villa, House, Office, Garage, Land)
  * Purpose (Buy / Rent)
  * Price Range (Min Price – Max Price in €)
  * Bedrooms (1, 2, 3, 4+)
  * Bathrooms (1, 2, 3+)
  * Submit Search CTA
* **Homepage Sections:**
  * Featured Properties (Paid Boosted Listings)
  * Latest Properties
  * Properties Near You / Interactive Map Preview
  * Popular Areas / Localities in Malta
  * Banner Advertisements
  * Call to Action for Property Owners ("Sell or Rent Your Property For Free")

---

## 2. Property Search & Discovery
* **View Modes:** Toggle between **List View**, **Grid View**, and **Interactive Split/Full Map View**.
* **Filter Criteria:**
  * **Purpose:** Buy / Rent
  * **Property Type:** Apartment, Maisonette, Terraced House, Townhouse, Villa, Penthouse, Duplex, Bungalow, Office, Garage, Land
  * **Location:** All Malta & Gozo localities
  * **Price Range:** Dynamic slider / Min & Max inputs
  * **Bedrooms:** Any, 1, 2, 3, 4+
  * **Bathrooms:** Any, 1, 2, 3+
  * **Furnishing:** Furnished / Semi-Furnished / Unfurnished
  * **Status:** Available / Under Offer / Sold / Rented
  * **Key Features/Amenities:** Sea View, Swimming Pool, Garage/Parking, Balcony/Terrace, Garden, Lift, Air Conditioning, Pet Friendly, Roof Access, Fireplace, etc.
  * **Sorting:** Newest, Price (Low to High), Price (High to Low), Most Popular.

---

## 3. Map-Based Property Search
* Real-time property markers displaying price tags.
* Clustered pins for dense areas that expand on zoom/click.
* Marker Click Modal / Popup:
  * Thumbnail photo
  * Price (€)
  * Bedroom / Bathroom / Property Type summary
  * Locality / Town
  * "View Property →" direct link
* Map bounds sync: Search results update dynamically as the user pans and zooms.
* **Privacy Toggle for Owners:**
  * **Exact location** (precise pin for commercial/selected residential)
  * **Approximate location** (locality-level or radius circle for residential privacy)

---

## 4. Property Details Page
Designed for maximum conversion and engagement:
* **Header & Overview:** Title, Reference Number (e.g., `MLT-10482`), Price, Locality, Status badge.
* **Media Gallery:** High-resolution image carousel, thumbnail strip, full-screen lightbox modal, optional video walk-through.
* **Key Specs Matrix:** Bedrooms, Bathrooms, Internal/External Area (sqm), Floor level, Total floors, Lift access, EPC/Energy rating, Furnishing status.
* **Detailed Description:** Formatted markdown/rich text.
* **Features & Amenities List:** Visual icon grid of features.
* **Location & Map View:** Interactive map showing exact or approximate neighborhood location.
* **Action CTAs (High Prominence):**
  * 📞 **Call Owner** (direct click-to-call)
  * 💬 **WhatsApp Owner** (pre-filled text: *"Hello, I am interested in property MLT-10482 in Sliema. Is it still available?"*)
  * ✉️ **Direct Lead / Enquiry Form:** Name, Mobile, Email, Custom Message (notifies owner immediately without exposing owner email publicly).
  * ❤️ **Save / Favorite** button
  * 🔗 **Share Property** (Copy link, Facebook, WhatsApp)

---

## 5. Listing Wizard (Add Property)
Step-by-step wizard for property owners:
* **Step 1: Purpose & Category**
  * Select Buy / Rent
  * Select Property Category & Sub-type
* **Step 2: Property Details**
  * Title, Price (€ / € per month), Deposit (for rentals), Bedrooms, Bathrooms, Floor, Internal/External Size ($m^2$), Furnishing, Detailed Description, Feature checklist.
* **Step 3: Media Upload**
  * Main cover photo, gallery images (reorderable), optional YouTube/video tour link.
* **Step 4: Location & Privacy**
  * Address lookup / Locality selection
  * Pin drop on interactive map
  * Privacy choice: `[x] Show exact location` vs `[ ] Show approximate location`
* **Step 5: Owner Contact Settings**
  * Mobile phone number
  * WhatsApp enabled (Yes/No & number)
  * Public email vs. Enquiry form only
  * Preferred contact method (WhatsApp / Call / Email)
* **Step 6: Review, Plan & Publish**
  * Choose Free Standard Listing vs. Featured Boost (7 / 14 / 30 days)
  * Submission → Admin Moderation Queue (or auto-publish based on setting)

---

## 6. User Roles & Permissions

### 1. Visitor / Buyer / Renter
* Browse, filter, and map search properties
* View property details and galleries
* Contact owners via Call, WhatsApp, or Enquiry Form
* Save favorite properties to local storage or account
* Share properties

### 2. Property Owner
* Account registration and profile management
* Manage listings (Add, Edit, Pause, Mark as Sold/Rented, Delete)
* Photo and media management
* View enquiries received from prospective buyers/renters
* Track listing analytics (Impressions, Page Views, WhatsApp clicks, Phone calls)
* Upgrade/Boost listings to Featured

### 3. Administrator
* Full Moderation Dashboard:
  * Approve, reject, or request revisions on pending property submissions
  * Edit, flag, or remove any property listing
* User and Owner Management (Verify, suspend, inspect)
* Featured Campaigns & Payment Management
* Banner Ad Management (Create campaigns, assign positions, upload creatives, track clicks/impressions)
* Locations and Categories taxonomy editor
* System Analytics & Revenue overview

---

## 7. Monetisation & Revenue Engine

### 1. Featured Property Listings (Paid Boosts)
* Promoted placement in search results and homepage carousel
* Distinctive "Featured" badge and highlighted map markers
* Admin-configurable durations and price points (e.g., 7 Days: €10, 14 Days: €18, 30 Days: €30)

### 2. Banner Advertising System
* Ad positions: Homepage Hero/Mid-page, Search Results interstitial/sidebar, Property details banner, Category headers.
* Target audience: Estate agents, banks/mortgages, furniture/interior stores, insurance, legal/notary, moving companies.
* Campaign metrics: Start/end dates, impression limits, click tracking, budget management.

### 3. Business / Agency Subscriptions (Future Phase)
* Tiered agency packages (Basic / Professional / Premium) with multi-agent management, XML/feed imports, and branded agency profiles.

---

## 8. Technical Architecture

### Frontend: Next.js / Modern React
* SSR / SSG for SEO optimization and fast loading.
* Fully responsive, mobile-first design with sticky contact bars on mobile.
* Client-side state management for filters, favorites, and interactive map sync.
* UI system: Clean, modern aesthetics with responsive grids, modals, and smooth animations.

### Backend: RESTful API (Laravel / Node.js)
* **Auth:** Token-based authentication (Sanctum/JWT), Role-Based Access Control (RBAC).
* **Endpoints:**
  * `/api/properties` (CRUD, filtering, search, geo-query)
  * `/api/properties/{id}/enquire` (Lead generation)
  * `/api/properties/{id}/view` (Analytics counter)
  * `/api/admin/*` (Moderation, users, banners, finance, reports)
  * `/api/featured-plans` & `/api/payments` (Stripe/Payment gateway integration)
  * `/api/banners` (Ad display and click tracking)

### Database Schema (MySQL / PostgreSQL)
* `users` (id, name, email, phone, role, password, avatar, created_at)
* `properties` (id, reference_code, user_id, purpose, property_type, price, bedrooms, bathrooms, size_internal, size_external, floor, furnished, locality, lat, lng, is_approximate_location, status, is_featured, featured_until, view_count, created_at)
* `property_images` (id, property_id, url, is_primary, order)
* `property_features` (id, property_id, feature_key)
* `property_enquiries` (id, property_id, sender_name, sender_email, sender_phone, message, status, created_at)
* `banner_ads` (id, title, advertiser_name, image_url, target_url, placement, start_date, end_date, impressions_count, clicks_count, is_active)
* `payments` (id, user_id, property_id, amount, currency, status, payment_gateway_ref, type, created_at)
* `favorites` (id, user_id, property_id, created_at)

---

## 9. SEO & Performance Strategy
* Dynamic URL slugs: `/property/{bedrooms}-bedroom-{property-type}-for-{purpose}-{locality}-{reference_code}`
* Location Landing Pages: `/properties-for-sale/{locality}`, `/properties-for-rent/{locality}`
* OpenGraph & Twitter Cards with property photos and price for high-converting social sharing.
* Schema.org Structured Data (`RealEstateListing`, `SingleFamilyResidence`, `Apartment`) for rich Google search snippets.

---

## 10. Implementation Phases (MVP Roadmap)

### Phase 1: Core Marketplace & Search (MVP)
1. Setup Project Architecture & Database Schema
2. UI/UX Foundation (Tailored Theme, Navigation, Mobile Layout)
3. Property Search Engine with Multi-Filter & Map Integration
4. Property Details Page with Photo Gallery & WhatsApp/Call/Enquiry triggers
5. Multi-Step Owner Property Listing Wizard
6. User Authentication & Owner Dashboard (Manage listings & incoming leads)
7. Admin Moderation & Approval Panel
8. Featured Property & Banner Ad Placement System

### Phase 2: Payment Integration & Enhanced Monetisation
* Stripe / Revolut payment integration for instant listing boost
* Self-service advertiser banner portal

### Phase 3: Advanced Ecosystem
* Agency Accounts & Bulk Import
* Automated property availability check reminders (30-day ping)
* Saved searches with email/instant alerts
