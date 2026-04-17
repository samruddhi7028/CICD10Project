# Design Brief: Delicious Bites

## Tone & Purpose
Editorial minimalism with warmth. Recipe discovery platform celebrating food culture through clean typography, generous white space, and photography as hero. Think Bon Appétit, not rustic farmhouse.

## Differentiation
Warm terracotta-emerald palette (sophisticated, not cliché). Serif display font (editorial credibility) paired with clean sans-serif body (digital clarity). Every surface zone deliberately styled—no ghost text.

## Color Palette

| Token | OKLCH | Usage | Notes |
|-------|-------|-------|-------|
| Primary | 0.58 0.15 30 | Warm terracotta/rust | Food-forward, earthy |
| Secondary | 0.35 0.12 150 | Deep emerald | Refined accents, highlights |
| Accent | 0.72 0.18 55 | Warm amber/gold | CTAs, energy, highlights |
| Neutral (Light) | 0.98 0.02 100 | Cream/off-white | Soft, warm background |
| Text (Dark) | 0.18 0.02 0 | Deep charcoal | Readability, warmth |

## Typography

| Role | Font | Usage | Scale |
|------|------|-------|-------|
| Display | Fraunces (serif) | Headings, recipe titles | 32–48px |
| Body | General Sans (sans-serif) | Paragraphs, descriptions, UI | 14–16px |
| Mono | Geist Mono | Ingredient lists, code | 12–14px |

## Elevation & Depth
Minimal radius (4px). Depth via layered backgrounds, not shadows. Card surfaces elevated with subtle border on interaction.

## Structural Zones

| Zone | Background | Border | Treatment |
|------|-----------|--------|-----------|
| Header | Card (0.99) | Bottom border (0.88) | Logo in Fraunces, nav centered |
| Hero | Image overlay | None | Full-bleed food photography |
| Content | Background (0.98) | None | Clean white space |
| Recipe cards | Card (0.99) | Border (0.88) on hover | Lift on interaction |
| Footer | Secondary (0.35 0.12 150) | Top border (0.88) | Text inverted white |

## Spacing & Rhythm
Mobile-first: 16px base unit. Desktop: 24px gutters. Generous padding on cards (20–24px). Line-height 1.6 for readability.

## Component Patterns
- **Buttons**: Accent color (0.72 0.18 55) with rounded corners (4px), hover state darkens. CTAs in amber gold.
- **Recipe cards**: Cream background, minimal border, image on top, hover state lifts subtly.
- **Navigation**: Center-aligned on mobile, spreads on desktop. Links underline on hover.
- **Search**: Input with border, rounded corners (4px), focus ring in primary color.

## Motion
Smooth transitions (0.3s cubic-bezier(0.4, 0, 0.2, 1)) on all interactive elements. No bouncy animations. Fade-in on page load.

## Constraints
- No gradients except subtle card shadows via layering.
- No neon or glow effects.
- Photography is the hero—text overlays use dark overlay (0.18 0.02 0 / 60%).
- AA+ contrast enforced across all text/background pairs.

## Signature Detail
Full-bleed hero food photography with thin text overlay. Recipe cards feature ingredient lists in mono font for authenticity. Hover states reveal amber accent underlines on CTAs.
