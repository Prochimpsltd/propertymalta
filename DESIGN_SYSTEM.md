# Malta Property Marketplace — UI/UX Design Direction & Design System

## 1. Visual Identity & Brand Personality
* **Personality:** Minimal · Light · Mediterranean · Professional · Trustworthy · Modern
* **Brand Essence:** *Mediterranean warmth × modern SaaS usability × professional real estate*
* **Core Philosophy:**
  * Feels like **Malta itself**: limestone architecture, Mediterranean sunlight, sea blue, warm neutral tones, and clean contemporary interiors.
  * Avoid heavy gradients, excessive shadows, dark/black backgrounds, crowded cards, and visual noise.
  * Property photography is the visual hero.

---

## 2. Color Palette & Design Tokens

| Token Name | Purpose | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| `--bg-main` | Main background | `#FAFAF7` | Warm white page canvas |
| `--bg-surface` | Cards & Surfaces | `#FFFFFF` | Property cards, floating search boxes, modals |
| `--color-primary` | Mediterranean Blue | `#176B87` | Primary buttons, active tabs, links, key CTAs |
| `--color-secondary` | Soft Sea Blue | `#DDEFF3` | Pill badges, subtle highlights, active states |
| `--color-accent` | Limestone / Sand | `#E8D8BE` | Warm borders, subtle accent lines, filters |
| `--color-price` | Warm Sand Highlight | `#F3E6D2` | Price tag background badges |
| `--text-main` | Deep Charcoal | `#243238` | Primary headings, titles, prices |
| `--text-secondary` | Slate Grey | `#68777D` | Secondary body, metadata, captions |
| `--border-subtle` | Light Grey | `#E8ECEC` | Clean card and section dividers |
| `--color-success` | Soft Green | `#3E8064` | "Active", "Verified", "Available" status |

---

## 3. Typography Hierarchy
* **Font Families:** `Inter` / `Manrope` (Clean, legible, modern sans-serif)
* **Scale:**
  * **H1 (Hero / Main Page Title):** `40px – 52px` (Desktop) / `32px – 36px` (Mobile)
  * **H2 (Section Titles):** `28px – 36px`
  * **H3 / Card Titles:** `18px – 22px`
  * **Property Price:** `26px – 34px` (Bold, prominent)
  * **Body Text:** `15px – 17px` (Generous line height `1.6`)
  * **Badges / Metadata:** `12px – 13px` (Semibold, uppercase tracking)

---

## 4. Spacing & Radius System
* **Spacing Scale (8px Grid):** `8px`, `16px`, `24px`, `32px`, `48px`, `64px`, `80px`
* **Card Border Radius:** `12px – 16px`
* **Button Border Radius:** `8px – 10px` (Modest, professional, not excessively pill-shaped)
* **Shadows:** Minimal, soft elevation (`0 2px 8px rgba(36, 50, 56, 0.04)` to `0 8px 24px rgba(36, 50, 56, 0.08)`)

---

## 5. Component Specifications

### 5.1 Header & Navigation
* **Desktop:**
  * Clean white background with a subtle `#E8ECEC` bottom border.
  * Left: Crisp Brand Logo with subtle Malta icon/mark.
  * Center: Nav links (`Buy`, `Rent`, `Sell Property`, `Map Search`).
  * Right: Saved Favorites `♡`, `Sign In` / `Register`, Primary CTA `[List Your Property]`.
* **Mobile:**
  * Minimal header with Logo and Hamburger drawer trigger.
  * Visible / Sticky `List Property` action.

### 5.2 Homepage Hero & Floating Search
* Hero height: Balanced (not overly tall), featuring warm Mediterranean architectural/coastal imagery.
* Floating search box: Crisp white elevated card with direct `Buy | Rent` tab selector.
* Quick fields: `📍 Location`, `Property Type`, `€ Min`, `€ Max`, `[ Search Properties ]`.

### 5.3 Property Cards
* **Visual Proportions:** `4:3` or `3:2` image ratio.
* **Badges:** Subtle tags (`FOR SALE`, `FOR RENT`, `FEATURED`) in soft sea blue or warm sand.
* **Information Hierarchy (2-Second Scan Rule):**
  1. Large Property Photo + Favorite Heart `♡`
  2. Price (€)
  3. Property Title (e.g. *3 Bedroom Apartment*)
  4. Location (e.g. *📍 Sliema*)
  5. 3–4 Key Specs: `🛏 3` · `◻ 2` · `📐 125 m²`

### 5.4 Map Search Interface
* **Split View:** Property list on the left, synchronized interactive map on the right.
* **Clustered Markers:** Smooth grouping for dense areas (`23`, `48`, `126`) that break apart upon zoom.
* **Popup Card on Marker Click:** Photo thumbnail, price, title, location, direct "View Property →" link.

### 5.5 Property Details Page
* **Gallery:** Large hero image with 2 stacked side images on desktop; touch-swipe carousel on mobile.
* **Specs Matrix:** Clean grid with subtle line icons for bedrooms, bathrooms, internal/external size, floor, furnishing.
* **Owner Contact Panel (Desktop):**
  * Sticky side widget: `[ 📞 Call Owner ]`, `[ 💬 WhatsApp Owner ]`, `[ ✉ Send Enquiry ]`.
* **Mobile Sticky Action Bar:**
  * Fixed bottom bar with `📞 Call` | `💬 WhatsApp` | `✉ Enquire` for maximum mobile conversion.

### 5.6 Listing Wizard (Owner Experience)
* 6-step clean wizard:
  1. **Purpose:** Sell / Rent
  2. **Details:** Type, price, bedrooms, size, description, features
  3. **Photos:** Reorderable image uploader
  4. **Location & Privacy:** Map pin with `[x] Show exact location` vs `[ ] Show approximate location`
  5. **Contact Settings:** WhatsApp enable, phone, email preference
  6. **Promote & Publish:** Free standard vs. Featured boost packages

### 5.7 Banner Advertising Placements
* Unobtrusive, elegant ad slots with subtle "Advertisement" labels to preserve aesthetic integrity.

### 5.8 User & Owner Dashboard
* Simple tabbed dashboard: `My Properties`, `Enquiries`, `Saved Properties`, `Promotions`, `Payments`, `Profile`.
* Property management cards showing view counters, enquiry counts, and quick actions (Edit, Promote, Mark Status).

---

## 6. Homepage Section Flow
```text
1. Header
2. Hero + Floating Property Search
3. Featured Properties Carousel (Subtle Mediterranean badges)
4. Latest Properties Grid
5. Interactive Map / Explore Malta Section
6. Popular Locations Grid (Sliema, St Julian's, Gżira, Mosta, Naxxar, Valletta, Mellieħa, etc.)
7. "List Your Property" Owner CTA Banner
8. Curated Partner / Ad Banner
9. Footer
```
