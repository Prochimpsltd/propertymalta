# 🧠 Malta Property — Project Brain

> Last updated: 2026-09-07

---

## 📌 Project Overview

**Malta Property Marketplace** is a direct-to-owner property listing platform for Malta. Users can buy, rent, or list properties without agent commissions. The platform features verified listings, WhatsApp-based direct contact, interactive map search, and a premium mobile-first UI.

**Tech Stack:** Next.js 15 + React 19 + TypeScript + Tailwind CSS + Leaflet Maps

---

## 📂 Project Structure

```
h:\Malta Property\
├── brain.md              ← This file (project memory)
├── .gitignore
└── website\              ← Full Next.js application
    ├── app\              ← Pages & routes
    │   ├── page.tsx              (Homepage)
    │   ├── layout.tsx            (Root layout)
    │   ├── globals.css           (Global styles & design tokens)
    │   ├── search\page.tsx       (Property search + filters)
    │   ├── property\[slug]\page.tsx  (Property detail)
    │   ├── list-property\page.tsx    (List property form)
    │   ├── dashboard\page.tsx        (User dashboard)
    │   ├── verified-agents\page.tsx  (Verified agents page)
    │   ├── promote\page.tsx          (Promote property page)
    │   ├── advertising\page.tsx      (Ads partnership page)
    │   ├── favorites\page.tsx        (Saved properties)
    │   └── admin\page.tsx            (Admin panel - hidden from nav)
    ├── components\
    │   ├── layout\
    │   │   ├── Header.tsx            (Top nav bar)
    │   │   ├── Footer.tsx            (Site footer)
    │   │   ├── MobileFooterNav.tsx   (Sticky mobile bottom nav)
    │   │   └── RoleSwitcher.tsx      (Role switcher component)
    │   ├── ui\
    │   │   ├── PropertyCard.tsx      (Property listing card)
    │   │   ├── HeroMotionBanner.tsx  (Hero sliding banners)
    │   │   ├── BannerCard.tsx        (Ad banner component)
    │   │   └── EnquiryModal.tsx      (Property enquiry modal)
    │   └── map\
    │       ├── MapWrapper.tsx        (Map lazy loader)
    │       └── PropertyMap.tsx       (Leaflet map component)
    ├── lib\
    │   ├── context\PropertyContext.tsx  (Global state provider)
    │   ├── data\
    │   │   ├── properties.ts         (Property data + localities)
    │   │   └── banners.ts            (Banner/ad data)
    │   └── utils.ts                  (Utility functions)
    ├── types\index.ts                (TypeScript interfaces)
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.js
    ├── next.config.mjs
    ├── postcss.config.js
    ├── DESIGN_SYSTEM.md
    └── PROJECT_PLAN.md
```

---

## 🔗 Git Information

| Field        | Value                                                        |
|-------------|--------------------------------------------------------------|
| **Repository** | https://github.com/Prochimpsltd/propertymalta.git          |
| **Branch**     | `main`                                                     |
| **First Push** | 2026-09-04                                                 |

**Quick push command:**
```bash
cd "h:\Malta Property"
git add -A && git commit -m "update" && git push origin main
```

---

## 🛠️ Recent Work Log

### Session: 2026-09-07

#### ✅ Completed Tasks

1. **Vercel Deployment Build Error Fixes**
   - Fixed TypeScript error in `app/page.tsx`: replaced `p.specs.bedrooms` / `p.specs.bathrooms` with direct `p.bedrooms` / `p.bathrooms`
   - Fixed undefined identifier error in `lib/context/PropertyContext.tsx`: replaced `currentUser` with `userProfile`
   - Added `*.tsbuildinfo` to `.gitignore`
   - Tested local production build (`npm run build`) — compiled and generated all 12 static & dynamic routes cleanly (0 errors)

### Session: 2026-09-04

#### ✅ Completed Tasks

1. **Property Card Redesign**
   - Removed redundant bed/bath/area row from card footer
   - Mobile: 2 properties per row (`grid-cols-2`)
   - Mobile: Hidden FOR SALE / FOR RENT / FEATURED badges
   - Featured properties get warm amber background tint (`#FEF9EE`) instead of badge
   - Reduced border radius on mobile (`rounded-lg sm:rounded-card`)

2. **Admin Panel Removal from Navigation**
   - Removed admin link from header menu
   - Admin page still exists at `/admin` but is no longer publicly linked

3. **Header Menu Update**
   - Menu shows: Properties, Verified Agents, Map Search, Ads Partnership

4. **Top Admin Bar Removal**
   - Removed the charcoal admin moderator bar from the top of the site

5. **Promote Page Fix**
   - Fixed promote page layout and rendering issues

6. **User Dashboard Redesign**
   - Professional dashboard layout with user info (name, email, phone, photo)
   - Organized sections for listings, favorites, and verification status

7. **"Promote This Property" Button**
   - Added promote button to property detail pages

8. **Mobile Hero Banner**
   - Full width on mobile (no side padding)
   - Hidden banner description paragraph on mobile

9. **Mobile Footer Navbar**
   - Sticky bottom navigation: Home, Properties, List Free, Map, Agents, Dashboard
   - Elevated "List Free" button with special styling
   - Auto-hides on property detail pages
   - Z-index fix for modals (`z-[100]`) above footer nav (`z-30`)

10. **Mobile Filter Modal Sheet**
    - Location/Area and Property Type dropdowns open as bottom modal sheet on mobile
    - Matches search page filter drawer design
    - Searchable locality picker with chips
    - Property type selection chips
    - Bedrooms & Bathrooms filters (Any, 1+, 2+, 3+, 4+)
    - Min/Max price range inputs
    - Buy/Rent toggle
    - Pinned sticky action bar with Reset + Search (X Found) buttons
    - Live matching properties counter

11. **Footer Mobile Redesign**
    - 2-column grid layout on mobile
    - Compact typography (10px headings, xs body)
    - Shortened brand description on mobile
    - Quick Links as 2-col grid spanning full width
    - Bottom padding (`pb-24`) to clear sticky mobile nav
    - Condensed sub-footer with Terms/Privacy links

12. **Project Restructuring**
    - Moved all website files into `website/` subfolder
    - Clean project root with just `website/`, `.gitignore`, and `brain.md`

13. **Git Setup & Push**
    - Initialized git repo
    - Created `.gitignore` (excludes node_modules, .next, env files)
    - Pushed to GitHub: `Prochimpsltd/propertymalta`

---

## 🚀 How to Run

```bash
cd "h:\Malta Property\website"
npm install
npm run dev
# → http://localhost:3000
```

---

## 🎨 Design System

- **Primary Blue:** `#1B6B93` (malta-blue)
- **Navy:** `#0A2647` (malta-charcoal)
- **Warm BG:** `#FAFAF7` (malta-warm)
- **Green:** `#27AE60` (malta-green)
- **Featured tint:** `#FEF9EE`
- **Font:** Outfit (headings) + Inter (body)
- **Border Radius:** `rounded-lg` mobile / `rounded-card` (12px) desktop
- **Cards:** White bg, `shadow-card`, `border-malta-border`

---

## 📝 Key Pages

| Route                | Description                          |
|---------------------|--------------------------------------|
| `/`                 | Homepage with hero banner + search   |
| `/search`           | Property search with filters + map   |
| `/property/[slug]`  | Property detail page                 |
| `/list-property`    | Free property listing form           |
| `/dashboard`        | User dashboard                       |
| `/verified-agents`  | Verified agents directory            |
| `/promote`          | Promote/boost property listing       |
| `/advertising`      | Ads partnership info                 |
| `/favorites`        | Saved/bookmarked properties          |
| `/admin`            | Admin panel (hidden from nav)        |

---

## 💡 Notes & Decisions

- **No backend yet** — all data is client-side in `lib/data/properties.ts`
- **No auth** — dashboard uses mock user data from PropertyContext
- **Leaflet** for maps (free, no API key needed)
- **Mobile-first** — all components designed for 412px width first, then scale up
- **WhatsApp integration** — direct contact buttons on property detail pages
- Native `<select>` replaced with custom modal sheets on mobile for premium UX
