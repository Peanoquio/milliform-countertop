// Image generation manifest for Milliform.
// Each entry maps to the exact path referenced in src/config/siteConfig.js,
// with a Nano Banana prompt and the target output dimensions (from the CSS
// aspect ratios). Edit prompts freely, then re-run `npm run gen:images`.

const STYLE_SCENE =
  'professional architectural interior photography, photorealistic, ultra detailed, ' +
  'natural daylight, clean minimalist premium kitchen, accurate realistic stainless steel, ' +
  'no people, no text, no watermark, no logos';

const STYLE_MACRO =
  'extreme close-up macro product photograph of a real stainless steel countertop surface, ' +
  'photorealistic, fills the entire frame, even soft studio lighting, high detail, ' +
  'no text, no watermark, no logos, no objects';

export const IMAGES = [
  // ---- Hero & editorial ----
  {
    file: 'hero.webp',
    label: 'Homepage hero (full-screen, darkened)',
    width: 2400,
    height: 1500,
    prompt:
      'Wide cinematic photograph of a luxury modern kitchen with a large bespoke brushed ' +
      'stainless steel island countertop as the centerpiece, warm ambient evening light, ' +
      'soft reflections across the steel, dark moody upscale interior. ' +
      STYLE_SCENE,
  },
  {
    file: 'workshop.webp',
    label: 'Homepage — "Your workhorse in the kitchen"',
    width: 1600,
    height: 1200,
    prompt:
      'Metal fabrication workshop interior: a craftsman station with a large stainless steel ' +
      'countertop sheet being worked, press brake and tools, warm industrial light, ' +
      'shallow depth of field, documentary style. ' +
      STYLE_SCENE,
  },
  {
    file: 'about-intro.webp',
    label: 'About — "Built around the weld" (portrait)',
    width: 1200,
    height: 1500,
    prompt:
      'Vertical close-up of skilled hands TIG-welding a seamless stainless steel countertop ' +
      'seam, soft blue welding glow, focused artisanal craftsmanship, premium documentary ' +
      'photography, shallow depth of field. photorealistic, no text, no watermark',
  },

  // ---- Finishes: The Confection Collection (3:2 macro) ----
  {
    file: 'finish-praline.webp',
    label: 'Praline Sand — Brushed Satin No. 4',
    width: 1200,
    height: 800,
    prompt:
      'Brushed satin stainless steel surface with a fine, uniform horizontal directional grain ' +
      'and a warm soft glow. ' +
      STYLE_MACRO,
  },
  {
    file: 'finish-creme.webp',
    label: 'Crème Silt — long-grain Hairline',
    width: 1200,
    height: 800,
    prompt:
      'Stainless steel with an ultra-fine, long-grain hairline finish, subtle silky sheen, ' +
      'very smooth and refined. ' +
      STYLE_MACRO,
  },
  {
    file: 'finish-brulee.webp',
    label: 'Brûlée Mirror — Mirror Polish No. 8',
    width: 1200,
    height: 800,
    prompt:
      'Flawless mirror-polished stainless steel, highly reflective like a dark mirror, ' +
      'soft smooth gradient reflections, glossy. ' +
      STYLE_MACRO,
  },
  {
    file: 'finish-vanilla.webp',
    label: 'Vanilla Dust — fine Bead Blast',
    width: 1200,
    height: 800,
    prompt:
      'Fine bead-blasted matte stainless steel, soft powdery non-reflective velvety texture, ' +
      'pale even tone. ' +
      STYLE_MACRO,
  },
  {
    file: 'finish-streusel.webp',
    label: 'Streusel Stone — Embossed Linen texture',
    width: 1200,
    height: 800,
    prompt:
      'Stainless steel with a three-dimensional embossed linen woven texture pattern, ' +
      'raking light revealing the relief and depth. ' +
      STYLE_MACRO,
  },
  {
    file: 'finish-toffee.webp',
    label: 'Toffee Bedrock — hand-aged Patina',
    width: 1200,
    height: 800,
    prompt:
      'Hand-aged patina stainless steel with warm mottled bronze and toffee-brown tones, ' +
      'organic depth and character, artisanal weathered finish. ' +
      STYLE_MACRO,
  },
  {
    file: 'finish-cocoa.webp',
    label: 'Cocoa Onyx — Black PVD',
    width: 1200,
    height: 800,
    prompt:
      'Deep matte black PVD-coated stainless steel, rich cocoa-black tone with a subtle sheen, ' +
      'smooth and dramatic. ' +
      STYLE_MACRO,
  },
  {
    file: 'finish-mocha.webp',
    label: 'Mocha Granite — 316 Marine Grade',
    width: 1200,
    height: 800,
    prompt:
      'Marine-grade 316 stainless steel with a warm granular, lightly textured finish, ' +
      'subtle speckle like fine stone, durable look. ' +
      STYLE_MACRO,
  },

  // ---- Selected Work (4:3 finished installs) ----
  {
    file: 'project-tanglin.webp',
    label: 'Tanglin Residence (Residential)',
    width: 1600,
    height: 1200,
    prompt:
      'Modern luxury kitchen with a four-metre brushed stainless steel island featuring an ' +
      'integrated seamless double sink and waterfall edges, bright natural daylight, ' +
      'Scandinavian interior. ' +
      STYLE_SCENE,
  },
  {
    file: 'project-forge.webp',
    label: 'Forge & Vine Bar (Hospitality)',
    width: 1600,
    height: 1200,
    prompt:
      'Stylish cocktail bar with a long stainless steel back bar counter and a ' +
      'mirror-polished front fascia, moody warm ambient lighting, upscale hospitality interior. ' +
      STYLE_SCENE,
  },
  {
    file: 'project-helix.webp',
    label: 'Helix Diagnostics Lab (Commercial)',
    width: 1600,
    height: 1200,
    prompt:
      'Clean modern laboratory with continuous stainless steel benching along the wall, ' +
      'low-glare matte surface, bright clinical lighting. ' +
      STYLE_SCENE,
  },
  {
    file: 'project-katong.webp',
    label: 'Katong Loft Kitchen (Residential)',
    width: 1600,
    height: 1200,
    prompt:
      'Compact modern galley kitchen with an L-shaped textured stainless steel countertop, ' +
      'integrated drainer and a folded upstand splashback, bright natural light. ' +
      STYLE_SCENE,
  },
];

export default IMAGES;
