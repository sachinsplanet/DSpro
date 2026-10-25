# Site-Wide Responsive Architecture & Layout Overhaul

This plan upgrades the Data Science Careers & Scope application into a fluid, touch-friendly, multi-device experience across small phones (`320px–430px`), tablets (`640px–1024px`), and widescreen desktops (`1280px+`), with special focus on the **03 / The Roles** showcase and interactive 3D visualizations.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following design and interaction decisions incorporate your confirmed preferences from our clarification step:

- **Confirmed Decision 1 (`03 / The Roles` Section Responsiveness)**: Both the interactive 7-role figurine showcase and the `03 / The roles` Career Opportunities directory will be re-engineered for fluid mobile, tablet, and desktop layouts so cards, search controls, accordions, figurines, and action triggers never clip or crowd.
- **Confirmed Decision 2 (3D Data Intelligence Pipeline Cards)**: On mobile viewports (`< 640px`), the 4 pipeline cards (`01 / Input`, `02 / Process`, `03 / Output`, `04 / Impact`) will stack cleanly in a structured 2x2 / 1-column grid directly below the 3D gyroscopic orb rather than overlapping the sphere, while preserving the floating 3D spatial arrangement on tablet and desktop screens.
- **Confirmed Decision 3 (DSCE 7-Role Figurine Carousel Upgrades)**:
  - **Touch Swipe Gestures**: Native horizontal touch-swipe recognition (`touchstart` / `touchend` delta detection) so mobile and tablet users can swipe left/right between the 7 figurines.
  - **Adaptive Height & Typography**: Multi-tier breakpoint scaling (`mobile < 640px`, `tablet 640px–1023px`, `desktop >= 1024px`) with balanced title sizing (`clamp`) so multi-word titles like *BUSINESS INTELLIGENCE ANALYST* and *MACHINE LEARNING ENGINEER* never overlap the character art.
  - **Stacked Non-Overlapping Bottom Controls**: Responsive control bar that stacks cleanly on narrow screens (`< 640px`) with full-width, 44px+ touch-friendly navigation and profile triggers.

---

## 1. Overview & Core Concept

- **What It Does**: Adapts every visual stage, interactive 3D/orbital model, carousel, accordion directory, timeline, and modal dialog to respond gracefully to viewport width, aspect ratio, and touch input.
- **Target Audience / Persona**: Students, educators, and evaluators viewing the presentation across smartphones, iPads/tablets, laptops, and projection screens.
- **Key Value**: Eliminates text collisions, cramped absolute-positioned cards, horizontal overflow, and desktop-only hover dependencies while preserving the site's cinematic editorial aesthetic.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Cinematic Hero & 3D Data Layer**: Users land on the full-viewport video hero with fluid display typography and scroll into the 3D Data Intelligence stage. On mobile, the 3D gyroscopic sphere renders cleanly at the top while the 4 interactive pipeline stages sit in a structured tap-friendly grid underneath.
  2. **03 / The Roles — Figurine Carousel & Career Opportunities Directory**:
     - In the **DSCE Figurine Carousel**, users can swipe horizontally on touchscreens or tap the circular arrow buttons to cycle through all 7 roles. The background title scales proportionally to the viewport width, and the bottom bar stacks cleanly on phones so the role counter and *Explore Role* CTA never collide.
     - In the **03 / The Roles Career Opportunities Directory**, the header and search bar flow naturally above the expandable role cards on mobile/tablet while remaining sticky on desktop. Role accordion rows adapt padding, badge wrapping, and the *Open Role Profile & 3D Model* CTA button for effortless one-thumb tapping on mobile.
  3. **Interactive Sections (What, Why, Industries, Future, Skills Toolkit, Career Journey, Footer)**:
     - The **Skills Toolkit** orbital radar scales its concentric rings and repositions its 4 interactive skill nodes on smaller viewports so they never clip off-screen.
     - The **5-Stage Career Journey** timeline transitions from a compact vertical step list on mobile to a 2-column grid on tablet and a 5-column horizontal timeline on desktop.
     - **Modals** (`RoleExplorerModal` and `JourneyModal`) use dynamic viewport height (`100dvh`) with comfortable mobile padding and sticky/accessible close and cycle controls.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: High-contrast editorial data-intelligence showcase.
  - *Color Palette & Mood*: Deep obsidian navy (`#050d1a` / `#08090d`), warm editorial parchment (`#f1efe8`), acid lime accent (`#d7ff54`), signal coral (`#ff806d`), and ice cyan (`#a8e7f9`).
  - *Typography & Hierarchy*: Fluid `clamp()` type scales for `Instrument Serif`, `Space Grotesk`, `Inter`, and `JetBrains Mono` with `text-wrap: balance` on display headings to prevent single-word orphans.
  - *Component Styling & Layout*: Minimum `16px` (`px-4 sm:px-6 md:px-8`) outer container padding across all sections and `>= 44px` touch target dimensions on mobile interactive buttons.

- **Interactive Feedback & Motion**:
  - Touch-swipe threshold (`40px` horizontal delta) triggers the 650ms cubic-bezier figurine transition.
  - Tap-to-toggle support on all hover-driven cards (`WhatIsDataScience`, `WhyImportant`, `Industries`, `FutureScope`, `SkillsToolkit`) so mobile users get the exact same rich visual feedback as desktop cursor users.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Hybrid Responsive Layout for 3D & Orbital Stages**
  - *Chosen Approach*: Keep absolute 3D floating coordinates on `sm`/`md+` screens where spatial room exists, and switch to a clean flex/grid card layout below the 3D orb on `< 640px` viewports.
  - *Why*: Four `15rem` cards cannot fit around a `13rem` sphere inside a `360px` mobile screen without obscuring the sphere or truncating text. Stacking below on mobile guarantees 100% legibility and comfortable tap targets.
  - *Alternatives Considered*: Scaling the entire 3D stage down via CSS `transform: scale(0.55)`, which makes 11px body text unreadable on phones.

- **Decision 2: Three-Tier Breakpoint Engine in `DSCECareerCarousel`**
  - *Chosen Approach*: Track `viewportTier` (`'mobile' | 'tablet' | 'desktop'`) alongside touch swipe handlers and responsive bottom control stacking.
  - *Why*: Tablets (`640px–1023px`) need intermediate figurine scale (`1.42`) and lateral offsets (`25% / 75%`) so side figurines remain visible without crowding the center character.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        App Root (Viewport & Scroll)                     │
│  • Scroll progress bar & pointer/touch coordinate normalization         │
│  • Modal state orchestration (Selected Role & Journey Topic)            │
└───────────────┬─────────────────────────────────────────┬───────────────┘
                │                                         │
                ▼                                         ▼
┌───────────────────────────────────────┐ ┌───────────────────────────────┐
│   Hero & 3D Data Intelligence Stage   │ │   03 / The Roles Ecosystem    │
│  ┌─────────────────────────────────┐  │ │  ┌─────────────────────────┐  │
│  │ Video Hero & Navigation Bar     │  │ │  │ DSCE Figurine Carousel  │  │
│  │ • Fluid clamp() headlines       │  │ │  │ • Touch swipe handlers  │  │
│  └─────────────────────────────────┘  │ │  │ • 3-tier slot geometry  │  │
│  ┌─────────────────────────────────┐  │ │  │ • Stacked mobile bar    │  │
│  │ 3D Gyroscopic Core + 4 Tags     │  │ │  └────────────┬────────────┘  │
│  │ • Desktop/Tablet: Floating 3D   │  │ │               │ Syncs Role    │
│  │ • Mobile (<640px): Stacked Grid │  │ │  ┌────────────▼────────────┐  │
│  └─────────────────────────────────┘  │ │  │ Career Opportunities    │  │
└───────────────────────────────────────┘ │  │ • Responsive search bar │  │
                                          │  │ • Touch-friendly cards  │  │
                                          │  └─────────────────────────┘  │
                                          └───────────────┬───────────────┘
                                                          │
                ┌─────────────────────────────────────────┘
                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│           Content Sections & Responsive Deep-Profile Modals             │
│  • What / Why / Industries / Future: Tap + Hover state parity           │
│  • Skills Toolkit: Scaled orbital radar & 1→2→3 col responsive grid     │
│  • Career Journey: 1-col (mobile) → 2-col (tablet) → 5-col (desktop)    │
│  • RoleExplorerModal & JourneyModal: 100dvh safe-area scroll & nav      │
└─────────────────────────────────────────────────────────────────────────┘
```

- **Interactive Component & State Mapping**:
  - **DSCE Career Carousel**:
    - `touchStartX` / `touchStartY` refs capture pointer/touch start coordinates; `onTouchEnd` computes horizontal delta (`dx`) vs vertical delta (`dy`) and invokes `navigate('next' | 'prev')` when `|dx| > 40` and `|dx| > |dy|`.
    - `viewportTier` state updates on window resize (`< 640px` mobile, `640px–1023px` tablet, `>= 1024px` desktop) to compute figurine `scale`, `height`, `bottom`, and `left` percentages.
    - Bottom control bar switches from `flex-col gap-3 items-stretch` on mobile to `sm:flex-row sm:justify-between sm:items-center` on larger screens.
  - **03 / The Roles (`CareerOpportunities`)**:
    - Responsive header & filter bar with full-width search input on mobile/tablet, clear filter button with `44px` tap target, and responsive role count summary.
    - Role accordion cards refine mobile padding (`p-4 sm:p-6`), wrap skill/tool tags cleanly, and make the *Open Role Profile & 3D Model* button full-width on narrow mobile screens (`w-full sm:w-auto justify-center`).
  - **3D Data Intelligence (`Hero`)**:
    - Renders the 3D sphere container at an adaptive height (`h-[21rem] sm:h-[33rem] lg:h-[38rem]`).
    - On `< 640px`, renders the 4 pipeline tags in a clean `grid-cols-1 xs:grid-cols-2 gap-2.5 mt-4` container below the sphere; on `>= 640px`, positions them in 3D space around the sphere.
  - **Core Content Sections (`WhatIsDataScience`, `WhyImportant`, `Industries`, `FutureScope`, `SkillsToolkit`, `CareerJourney`, `Footer`)**:
    - Standardizes vertical section rhythm (`py-16 sm:py-20 md:py-24`) and responsive typography so no heading or card overflows on `320px+` screens.
    - Adds tap-selection support (`onClick`) to `WhyImportant`, `Industries`, `FutureScope`, and `SkillsToolkit` cards for mobile/tablet parity.
