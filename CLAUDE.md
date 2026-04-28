# Alex Appliance Repair Pro — Website Spec for Claude Code

## Project overview
A warm-earthy landing page for **Alex Appliance Repair Pro**, a residential appliance repair business based in Houston, TX. The site is a single-page HTML/CSS/JS website (no framework required).

---

## Brand identity

| Property     | Value                                      |
|--------------|--------------------------------------------|
| Brand name   | Alex Appliance Repair Pro                  |
| Tagline      | "Your home, working again."                |
| Location     | Houston, TX (serves greater Houston area)  |
| Phone        | (713) 555-0100                             |
| Tone         | Warm, trustworthy, competent, local        |
| Personality  | Like a knowledgeable neighbor — not corporate |

---

## Color palette

| Token         | Hex       | Usage                          |
|---------------|-----------|--------------------------------|
| `--amber`     | `#C17A3A` | Primary CTA, accents, icons    |
| `--amber-dk`  | `#9A5E24` | Hover states                   |
| `--amber-lt`  | `#EDD8BE` | Badges, chip backgrounds       |
| `--cream`     | `#F5EDE0` | Hero background, section fills |
| `--cream-dk`  | `#EAD9C3` | Chip borders                   |
| `--walnut`    | `#3D1F08` | Dark sections (trust bar, CTA) |
| `--espresso`  | `#2C1A0A` | Primary headings               |
| `--rust`      | `#6B4226` | Body copy, secondary text      |
| `--rust-lt`   | `#9A6B3E` | Eyebrows, labels, muted copy   |
| `--white`     | `#FFFDF9` | Card surfaces, nav background  |
| `--border`    | `rgba(161,107,56,0.2)` | All borders         |

---

## Typography

| Role         | Font                        | Size / Weight         |
|--------------|-----------------------------|-----------------------|
| Display/H1   | Playfair Display (serif)    | clamp(42px–64px) / 500|
| Section H2   | Playfair Display (serif)    | clamp(28px–38px) / 500|
| Body         | DM Sans (sans-serif)        | 16–17px / 400         |
| UI / Labels  | DM Sans (sans-serif)        | 11–14px / 400–500     |

Google Fonts import:
```
https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap
```

---

## Page structure

### 1. Nav (sticky)
- Logo: icon mark + "Alex Appliance Repair Pro" in serif + tagline sub-line
- Links: Services · How it works · Reviews · About
- CTA button: "Book a repair" → `#book`

### 2. Hero
- Left: live badge ("Same-day service available"), H1 with italic amber accent, subheadline, two CTAs ("Book a repair today" + "Call us now")
- Right: card showing 6 appliance chips (Washer, Fridge, Oven, Dishwasher, Dryer, Microwave) + phone number row
- Background: `--cream`

### 3. Trust bar
- Dark walnut background
- 4 stat tiles: 2,400+ repairs · 4.9 ★ rating · Same-day service · 90-day warranty

### 4. Services grid (id="services")
- 3-column grid (2-col on tablet, 1-col on mobile)
- 6 cards: Washing machines, Refrigerators, Ovens & ranges, Dishwashers, Dryers, Microwaves
- Each card: icon, name, one-liner description
- Hover: amber border + 3px lift

### 5. How it works (id="how-it-works")
- Cream background section
- 3-step horizontal layout with dashed connector line
- Steps: Book online or call → We come to you → Back to normal
- Numbered amber circles

### 6. Reviews (id="reviews")
- 2×2 grid of review cards (1-col on mobile)
- Each card: 5 stars, italic serif quote, avatar initials + name + location + appliance
- Reviewers: Maria T., James K., Sandra R., David L.

### 7. CTA section (id="book")
- Walnut dark background
- Large serif headline, subheadline, primary CTA button, disclaimer note

### 8. Footer
- Dark espresso background
- Logo text, nav links, copyright

---

## Animations

| Element      | Animation        | Delay   |
|--------------|-----------------|---------|
| Badge        | fadeIn           | 0s      |
| H1           | fadeUp           | 0.1s    |
| Subheadline  | fadeUp           | 0.2s    |
| CTAs         | fadeUp           | 0.35s   |
| Hero card    | fadeIn           | 0.5s    |
| Badge dot    | pulse (opacity)  | loop    |

---

## Responsive breakpoints

| Breakpoint | Changes |
|------------|---------|
| ≤ 900px    | Hide nav links; hero goes single-column; hide hero card; services 2-col; steps go vertical |
| ≤ 600px    | Services 1-col |

---

## Suggested next features to build

1. **Booking form modal** — triggered by "Book a repair today" CTA. Fields: name, phone, address, appliance type (dropdown), description, preferred date/time.
2. **Service area map** — embedded Google Map or illustrated coverage area highlighting Houston zip codes.
3. **FAQ accordion** — common questions (pricing, brands serviced, warranty details).
4. **Image gallery** — before/after repair photos.
5. **Contact page** — standalone `/contact.html` with full form + Google Maps embed.
6. **Admin quote tool** — internal page to generate PDF repair quotes by job type.

---

## File structure

```
alex-appliance-repair-pro/
├── index.html        ← Main website (single file, self-contained)
├── CLAUDE.md         ← This spec file for Claude Code
└── assets/           ← (future) images, icons, logo exports
```

---

## Notes for Claude Code

- The current `index.html` is fully self-contained (no external JS, fonts loaded via Google Fonts CDN).
- All colors are CSS custom properties on `:root` — change them in one place.
- Phone number `(713) 555-0100` is a placeholder — replace with the real number.
- The booking CTA (`#book`) currently scrolls to the CTA section — wire it to a real form or booking platform (e.g. Calendly, Jobber, Housecall Pro).
- Icons are inline SVG — no icon library dependency needed.
- To add pages: create new `.html` files and update nav links accordingly.
