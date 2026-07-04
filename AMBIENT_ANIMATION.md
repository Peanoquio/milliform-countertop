# Ambient Background Animation

## Overview

The site includes a dynamic ambient background animation that adds depth and visual interest to the dark theme. The animation features three large, pulsating gradient orbs that drift randomly around the viewport with synchronized glow effects. The animation combines:

- **Pulsating glow** — Orbs brighten and dim while growing/shrinking
- **Random drift** — Each orb moves unpredictably via staggered animations
- **Dynamic shadows** — Drop shadows intensify with the pulsation

## Features

- **Dual Animation System**: Float animations (pulsation) + Drift animations (random movement)
- **Pulsating Glow**: Orbs glow and dim with synchronized brightness and scale changes
- **Random Movement**: Each orb follows its own chaotic drift pattern (45-52s cycles)
- **Theme-Aware**: Uses accent and secondary colors from the active theme
- **Highly Visible**: Bright opacity (0.55), large orbs (700-900px), strong shadows (25-42px)
- **Configurable**: Can be toggled on/off via the animation config
- **Performance Optimized**: Uses GPU acceleration (`will-change`, `mix-blend-mode`)
- **Mobile-Responsive**: Automatically disabled on tablets (≤1024px) and phones (≤768px) to preserve battery and performance
- **Accessibility**: Respects `prefers-reduced-motion` user preference

## Configuration

### Enable/Disable Ambient Animation

Edit `src/config/siteConfig.js`:

```javascript
export const animationConfig = {
  enabled: true,                    // Master switch for ALL animations
  ambientAnimation: true,           // Ambient background animation toggle
  // ... other animation settings
};
```

**Toggle Options:**

| Master Switch | Ambient Toggle | Result |
|---|---|---|
| `enabled: false` | `ambientAnimation: true` | Animation **disabled** (master takes priority) |
| `enabled: true` | `ambientAnimation: false` | Animation **disabled** |
| `enabled: true` | `ambientAnimation: true` | Animation **enabled** ✓ |

### Behavior by Setting

```javascript
// Disable all animations (including ambient)
export const animationConfig = {
  enabled: false,
  ambientAnimation: true,  // Ignored when enabled: false
  // ...
};

// Enable all animations including ambient
export const animationConfig = {
  enabled: true,
  ambientAnimation: true,  // ✓ Ambient animation active
  // ...
};

// Enable other animations but disable ambient
export const animationConfig = {
  enabled: true,
  ambientAnimation: false,  // Ambient animation disabled
  pageTransitions: true,    // But other animations work
  // ...
};
```

## Technical Details

### Component Structure

```
App.js
  ↓
AmbientBackground.js (renders if enabled)
  ├─ ambient-orb-1 (Accent color, 800px, dual animation)
  │  ├─ float-1 (28s pulsation cycle)
  │  └─ drift-1 (45s random movement)
  ├─ ambient-orb-2 (Secondary color, 900px, dual animation)
  │  ├─ float-2 (32s pulsation cycle, delayed -8s)
  │  └─ drift-2 (52s random movement, delayed -12s)
  ├─ ambient-orb-3 (Accent color, 700px, dual animation)
  │  ├─ float-3 (26s pulsation cycle, delayed -15s)
  │  └─ drift-3 (48s random movement, delayed -18s)
  └─ ambient-gradient (15s animation cycle)
```

### Animation Details

**Orb 1 (Accent Color)**
- Size: 800px diameter
- Float cycle: 28s (pulsation + scale)
- Drift cycle: 45s (random movement)
- Opacity range: 0.38–0.65
- Shadow range: 10–40px drop-shadow

**Orb 2 (Secondary Color)**
- Size: 900px diameter
- Float cycle: 32s (pulsation + scale)
- Drift cycle: 52s (random movement)
- Delay: -8s (float), -12s (drift)
- Opacity range: 0.38–0.67
- Shadow range: 10–42px drop-shadow

**Orb 3 (Accent Color)**
- Size: 700px diameter
- Float cycle: 26s (pulsation + scale)
- Drift cycle: 48s (random movement)
- Delay: -15s (float), -18s (drift)
- Opacity range: 0.39–0.64
- Shadow range: 11–38px drop-shadow

**Base Settings**
- Base opacity: 0.55
- Blur: 40px (sharp enough to see, soft enough to blend)
- Blend Mode: `lighten` (color-boosting)
- Movement range: ±200–220px horizontally & vertically

### Pulsation System

The pulsating glow effect combines multiple CSS properties:
- **Opacity**: Oscillates between 0.32–0.67 (8 pulses per cycle)
- **Scale**: Grows and shrinks from 0.85 to 1.25 synchronized with brightness
- **Drop Shadow**: Intensifies from 8–10px to 40–42px at peak brightness
- **Smooth easing**: `cubic-bezier(0.42, 0, 0.58, 1)` for natural feel

### Drift System

Random movement is achieved via separate, longer drift animations:
- **Staggered cycles**: 45–52 seconds (longer than float cycles 26–32s)
- **Staggered start times**: -8s, -12s delays prevent synchronization
- **6–7 waypoints per cycle**: Creates organic, unpredictable paths
- **Movement envelope**: ±200–220px radius from center position
- **Easing**: `ease-in-out` for natural acceleration/deceleration

### Performance Characteristics

- **GPU Accelerated**: Uses `will-change: transform, filter` for hardware acceleration
- **Fixed Positioning**: Renders once, doesn't reflow on content changes
- **Z-Index**: -1 (always behind content)
- **Pointer Events**: None (doesn't interfere with clicks)
- **Accessibility**: `aria-hidden="true"` (hidden from screen readers)
- **Dual animations**: Float and drift run independently without blocking

## Visual Effect

The animation creates multiple visual effects working in concert:

**Pulsating Glow**
- Orbs brighten and dim in synchronized rhythm (8 pulses per float cycle)
- Combined with scale changes (0.85–1.25) for organic "breathing" effect
- Drop shadows intensify with brightness, creating dynamic illumination
- Peak glow creates bright "breathing" moments of visual energy

**Random Drift**
- Each orb follows its own chaotic, 45-52 second drift pattern
- Staggered start times prevent synchronized movement
- Movement ranges ±200-220px, covering significant viewport area
- Creates organic, unpredictable motion (not repeating patterns)

**Combined Effects**
- **Depth**: Layered, pulsating orbs suggest 3D atmospheric light
- **Energy**: Visible, bright movement adds dynamism without distraction
- **Color harmony**: Theme colors amplified by glow effects
- **Ambient lighting**: Large, glowing orbs feel like living light sources filling space

## Customization

To modify the animation appearance, edit `src/components/AmbientBackground.css`:

### Adjust Overall Brightness

```css
.ambient-orb {
  opacity: 0.65;  /* Increase from 0.55 for brighter effect */
}
```

### Change Float Animation Speed (Pulsation)

```css
.ambient-orb-1 {
  animation: float-1 35s cubic-bezier(0.42, 0, 0.58, 1) infinite,
             drift-1 45s ease-in-out infinite;
  /* Slower pulsation: 35s instead of 28s */
}
```

### Change Drift Animation Speed (Random Movement)

```css
.ambient-orb-1 {
  animation: float-1 28s cubic-bezier(0.42, 0, 0.58, 1) infinite,
             drift-1 60s ease-in-out infinite;  /* Slower drift: 60s instead of 45s */
}
```

### Adjust Blur and Glow Intensity

```css
.ambient-orb {
  filter: blur(60px);  /* More blur for softer appearance (from 40px) */
  opacity: 0.40;       /* Reduce brightness for subtler glow */
}

/* Adjust drop-shadow in keyframe animations */
@keyframes float-1 {
  25% {
    filter: blur(60px) drop-shadow(0 0 50px rgba(135, 135, 135, 0.8));
    /* Increase shadow intensity */
  }
}
```

### Adjust Movement Range (Random Drift)

Drift animations use `translateX()` and `translateY()` at various keyframe points:

```css
@keyframes drift-1 {
  15% {
    transform: translateX(200px) translateY(-240px);  /* Increase from 120px/-180px */
  }
  /* ... other keyframes ... */
}
```

### Add or Remove Orbs

Edit `AmbientBackground.js`:

```javascript
<div className="ambient-orb ambient-orb-4" />  // Add new orb
```

Then create corresponding CSS animations (float-4 and drift-4) in `AmbientBackground.css`.

## Mobile & Responsive Behavior

### Automatic Disabling on Mobile Devices

The ambient animation is **automatically disabled** on smaller screens for performance and battery optimization:

| Device Type | Breakpoint | Animation Status |
|---|---|---|
| Desktop | > 1024px | ✓ **Enabled** (full animation) |
| Tablet | 768px - 1024px | ✗ **Disabled** (hidden with CSS) |
| Mobile | < 768px | ✗ **Disabled** (hidden with CSS) |

**CSS Breakpoints:**
```css
/* Tablets and above - disable for performance */
@media (max-width: 1024px) {
  .ambient-background {
    display: none;
  }
}

/* Phones - completely hide */
@media (max-width: 768px) {
  .ambient-background {
    display: none !important;
  }
}
```

### Accessibility: Reduced Motion Preference

The animation respects the `prefers-reduced-motion` media query:

```css
@media (prefers-reduced-motion: reduce) {
  .ambient-orb {
    animation: none !important;
  }
}
```

Users who enable "Reduce motion" in their OS settings will see the animation disabled automatically, regardless of device.

## Browser Support

- Chrome/Edge: Full support with GPU acceleration (desktop only)
- Firefox: Full support with GPU acceleration (desktop only)
- Safari: Full support with GPU acceleration (desktop only)
- Mobile devices: Animation disabled by default for performance
- Reduced motion preference: Respected on all platforms

## Accessibility

- Respects `prefers-reduced-motion` via CSS media queries
- Hidden from screen readers with `aria-hidden="true"`
- Doesn't interfere with navigation or interactive elements
- Gracefully degrades on older browsers (just renders as static orbs)

## Troubleshooting

### Animation not appearing

1. Check `animationConfig.enabled = true`
2. Check `animationConfig.ambientAnimation = true`
3. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
4. Verify browser supports CSS animations (all modern browsers)
5. Check console for JavaScript errors
6. Verify CSS variables are being applied (check DevTools computed styles)

### Animation appears static or not moving

If orbs appear but don't move/pulsate:
1. Verify `float-1`, `float-2`, `float-3` animations are defined
2. Verify `drift-1`, `drift-2`, `drift-3` animations are defined
3. Check that keyframe animations haven't been accidentally removed
4. Verify `will-change: transform, filter` is set on `.ambient-orb`

### Animation causing performance issues

1. **Check if on mobile**: Animation is already disabled on tablets (≤1024px) and phones (≤768px)
2. **On desktop with performance issues**:
   - Reduce opacity in `.ambient-orb` (from 0.55 → 0.35)
   - Increase blur amount in `.ambient-orb` (from 40px → 80px)
   - Reduce drop-shadow intensity (smaller px values in @keyframes)
   - Reduce orb sizes (make 700px, 800px, 900px smaller)
3. **Force disable animation**: Lower breakpoint threshold:
   ```css
   @media (max-width: 1200px) {  /* Changed from 1024px */
     .ambient-background {
       display: none;
     }
   }
   ```

### Animation movement is too fast/slow

Adjust drift animation durations in each orb class:
```css
.ambient-orb-1 {
  animation: float-1 28s ... infinite,
             drift-1 60s ease-in-out infinite;  /* Increase 45s → 60s for slower drift */
}
```

### Pulsation not visible or too subtle

1. Increase base opacity: 0.55 → 0.65
2. Increase peak opacity in @keyframes: 0.65 → 0.75
3. Increase drop-shadow intensity at peaks (40px → 50px)
4. Reduce blur amount: 40px → 30px (sharper, more visible)

### Colors not matching theme

The component automatically uses theme colors via CSS variables. If colors seem wrong:

1. Verify theme is properly loaded (`animationConfig.enabled`)
2. Check `colors.accent` and `colors.secondary` in active theme
3. Verify CSS variables are passed to parent: `--accent-color`, `--secondary-color`
4. Try increasing opacity to make colors more visible

## Related Files

- `src/components/AmbientBackground.js` — Component logic
- `src/components/AmbientBackground.css` — Animation styles
- `src/config/siteConfig.js` — `animationConfig.ambientAnimation`
- `src/App.js` — Component integration
