// =============================================================================
//  MILLIFORM — SINGLE SOURCE OF TRUTH
// -----------------------------------------------------------------------------
//  Edit this file to re-skin the entire site. No other file needs touching for
//  content, colours, fonts, contact details, or page copy.
//
//  Design language: warm-minimalist (inspired by multi-form.co.uk) with a
//  dessert / stone / sand / dust naming theme across the finishes.
//
//  Tips:
//    • tel:/mailto: links must contain NO spaces
//    • every collection item's `category` must appear in `collections.filters`
//    • every navigation `path` must match a <Route> in src/App.js
//    • image paths are relative to /public  (e.g. '/images/hero.webp')
//    • switch the whole palette with ACTIVE_THEME below ('light' | 'dark')
// =============================================================================

import { imagePath } from '../utils/imageUtils';
import heroImagesData from './heroImages.json';

// --- BRANDING & SEO ---------------------------------------------------------
export const siteInfo = {
  companyName: 'MILLIFORM',
  tagline: 'Stainless steel, sculpted to the millimetre.',
  description:
    'Milliform designs and fabricates bespoke stainless steel countertops — hygienic, durable and tailor-made to last. Laser-cut and hand-welded to the millimetre for kitchens, bars and commercial spaces.',
  meta: {
    title: 'Milliform — Bespoke Stainless Steel Countertops',
    description:
      'Tailor-made stainless steel countertops, engineered to last. Pore-free, rust-, heat- and impact-resistant surfaces, hand-welded to the millimetre.',
    keywords:
      'stainless steel countertops, bespoke worktops, hygienic surfaces, durable countertops, custom metal surfaces, seamless welded sink, commercial kitchen, marine-grade steel',
  },
};

// --- THEME SELECTION --------------------------------------------------------
//  'light'       = warm sand minimalist (default, matches the reference design)
//  'darkDesert'  = dramatic charcoal & brass
//  'darkNight'   = cool greys with Spartan typography
export const ACTIVE_THEME = 'darkNight';

// Warm "sand" minimalist — high contrast, very readable
export const lightTheme = {
  name: 'Light',
  colors: {
    primary: '#1c1a17',
    secondary: '#6b655c',
    accent: '#a07b4f', // warm caramel / bronze
    textPrimary: '#1c1a17', // ~15.8:1 on the sand background
    textSecondary: '#5c574f', // ~7.4:1 — comfortably above AA for body text
    textLight: '#8a8377',
    background: '#faf7f2', // warm off-white "sand"
    backgroundAlt: '#f0eae0', // toasted sand
    white: '#ffffff',
    border: '#e3dccf',
    overlay: 'rgba(28, 26, 23, 0.62)',
  },
};

// Dramatic dark — charcoal steel & brushed brass
export const darkDesertTheme = {
  name: 'Dark Desert',
  colors: {
    primary: '#f2f0ec',
    secondary: '#9a948a',
    accent: '#c2a878',
    textPrimary: '#f4f2ee',
    textSecondary: '#b3ada3',
    textLight: '#7c766c',
    background: '#121110',
    backgroundAlt: '#1b1917',
    white: '#ffffff',
    border: '#2e2b27',
    overlay: 'rgba(0, 0, 0, 0.74)',
  },
};

// Dark night-inspired — cool greys with Spartan typography
export const darkNightTheme = {
  name: 'Dark Night',
  colors: {
    primary: '#d6d5d3',
    secondary: '#8b8680',
    accent: '#878787',
    textPrimary: '#e1dad7',
    textSecondary: '#bebebe',
    textLight: '#6f6a63',
    background: '#0f0f0f',
    backgroundAlt: '#181815',
    white: '#ffffff',
    border: '#2a2925',
    overlay: 'rgba(0, 0, 0, 0.80)',
  },
  fonts: {
    heading: "'Spartan', -apple-system, BlinkMacSystemFont, sans-serif",
    body: "'Spartan', -apple-system, BlinkMacSystemFont, sans-serif",
    accent: "'Spartan', -apple-system, BlinkMacSystemFont, sans-serif",
  },
};

const THEMES = { light: lightTheme, darkDesert: darkDesertTheme, darkNight: darkNightTheme };
export const theme = THEMES[ACTIVE_THEME] || lightTheme;

export const getTheme = (themeName) => THEMES[themeName] || lightTheme;

// --- ANIMATION TOGGLES ------------------------------------------------------
export const animationConfig = {
  enabled: true, // master switch — set false to kill all motion
  pageTransitions: true,
  hoverEffects: true,
  scrollAnimations: true,
  modalAnimations: true,
  navigationAnimations: true,
  ambientAnimation: true, // subtle floating orbs in background
  speeds: { fast: 200, normal: 340, slow: 560, verySlow: 900 }, // ms
  easing: {
    default: 'cubic-bezier(0.22, 1, 0.36, 1)', // expressive ease-out
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
};

// --- TYPOGRAPHY (names must match the <link> in public/index.html) ----------
export const typography = {
  fonts: {
    heading: "'Bodoni Moda', 'Times New Roman', serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    accent: "'Cormorant Garamond', Georgia, serif",
  },
};

// --- CONTACT ----------------------------------------------------------------
export const contactInfo = {
  address: {
    street: '14 Forge Lane',
    unit: 'Unit 3, Brookvale Works',
    city: 'Singapore',
    postalCode: '569876',
    full: '14 Forge Lane, Unit 3, Brookvale Works, Singapore 569876',
  },
  phone: { display: '+65 6543 2100', link: 'tel:+6565432100' },
  email: { display: 'studio@milliform.co', link: 'mailto:studio@milliform.co' },
  // Google Maps > Share > Embed a map > copy the src URL
  map: {
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127639.0!2d103.8198!3d1.3521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMS4zNTIxLCAxMDMuODE5OA!5e0!3m2!1sen!2ssg!4v1700000000000',
  },
  hours: {
    weekday: 'Mon – Fri · 9:00 – 18:00',
    saturday: 'Sat · 10:00 – 15:00 (by appointment)',
    sunday: 'Sun · Closed',
  },
  social: {
    instagram: 'https://instagram.com/milliform',
    // linkedin: 'https://linkedin.com/company/milliform',
    whatsapp: 'https://wa.me/6565432100',
  },
};

// --- HOMEPAGE ---------------------------------------------------------------
export const homepage = {
  hero: {
    title: 'Tailor-made and timeless',
    subtitle:
      'Bespoke stainless steel countertops — pore-free, seamless and built to outlast the room they live in.',
    video: { enabled: false, mp4: '', poster: '', autoplay: true, loop: true, muted: true },
    images: heroImagesData.heroImages.map(imagePath),
    imageTransitionInterval: 6000,
    buttons: [
      { text: 'Explore the Collection', link: '/collections', type: 'primary' },
      { text: 'Request a Quote', link: '/contact', type: 'outline' },
    ],
  },
  // Editorial intro (mirrors Multiform's "Trends That Last" block)
  aboutPreview: {
    title: 'Your workhorse in the kitchen',
    paragraphs: [
      'Every Milliform surface begins as a flat sheet of premium chrome-nickel steel and ends as a single, seamless worktop — laser-cut, precision-folded and hand-welded in our own atelier to the millimetre.',
      'We don\'t stock catalogue sizes. We measure your space, model it digitally, and fabricate one continuous piece that fits it exactly — bowls and drainers welded in by hand, with no rim to trap grime.',
    ],
    image: imagePath('/images/workshop.webp'),
    buttonText: 'Our craft',
    buttonLink: '/about',
  },
  featuredCollections: [
    {
      id: 1,
      name: 'Praline Sand',
      description: 'Our signature fine brushed grain — warm, forgiving and quietly timeless.',
      image: imagePath('/images/finishes/finish-praline.webp'),
    },
    {
      id: 3,
      name: 'Brûlée Mirror',
      description: 'A flawless, glazed reflective surface for statement islands and bars.',
      image: imagePath('/images/finishes/finish-brulee.webp'),
    },
    {
      id: 4,
      name: 'Vanilla Dust',
      description: 'A soft, powdery matte that shrugs off fingerprints and everyday wear.',
      image: imagePath('/images/finishes/finish-vanilla.webp'),
    },
  ],
  // Franke-inspired pillars: quality, durability, hygiene, design
  features: [
    {
      icon: '◈',
      title: 'Pore-free hygiene',
      description: 'A non-porous surface with antibacterial protection — no pores, no bacteria hotspots.',
    },
    {
      icon: '✦',
      title: 'Built to endure',
      description: 'Rust-, heat- and impact-resistant. Resists staining and corrosion for decades.',
    },
    {
      icon: '▲',
      title: 'Millimetre precision',
      description: 'Site-templated, laser-cut and folded to ±0.5 mm. Seamless welds, ground invisible.',
    },
    {
      icon: '♻',
      title: 'Sustainable by nature',
      description: 'Over 80% recycled steel — and 100% recyclable at the end of its long life.',
    },
  ],
  cta: {
    title: 'Have a space in mind?',
    description:
      'Send us drawings or a few photos with rough dimensions. We\'ll come back with finish options and an estimate.',
    buttonText: 'Start your project',
    buttonLink: '/contact',
  },
};

// --- COLLECTIONS (filterable grid of finishes) ------------------------------
//  Dessert × stone / rock / sand / dust naming theme.
//  Each `name` is the marketing name; `spec` is the technical finish.
export const collections = {
  title: 'The Confection Collection',
  subtitle:
    'Eight signature finishes, each available on any countertop. Every one is the same hygienic, durable steel — only the surface changes. Filter by texture or use.',
  filters: ['All', 'Brushed', 'Polished', 'Textured', 'Specialist'],
  items: [
    {
      id: 1,
      name: 'Praline Sand',
      spec: 'Brushed Satin · No. 4',
      category: 'Brushed',
      description:
        'A fine, uniform directional grain with a warm satin glow. The default choice for working kitchens — it forgives everyday marks and ages gracefully.',
      image: imagePath('/images/finishes/finish-praline.webp'),
      features: ['Fine hairline grain', 'Hides fingerprints', 'Most popular'],
    },
    {
      id: 2,
      name: 'Crème Silt',
      spec: 'Long-grain Hairline',
      category: 'Brushed',
      description:
        'An ultra-fine, long-grain brush — softer and more refined than a standard satin. A whisper of sheen across a calm, continuous surface.',
      image: imagePath('/images/finishes/finish-creme.webp'),
      features: ['Long directional grain', 'Subtle sheen', 'Premium'],
    },
    {
      id: 3,
      name: 'Brûlée Mirror',
      spec: 'Mirror Polish · No. 8',
      category: 'Polished',
      description:
        'A flawless, glazed reflective finish polished to a deep shine. A dramatic statement for islands, bars and feature walls.',
      image: imagePath('/images/finishes/finish-brulee.webp'),
      features: ['High reflectivity', 'Statement piece', 'Shows marks'],
    },
    {
      id: 4,
      name: 'Vanilla Dust',
      spec: 'Fine Bead Blast',
      category: 'Textured',
      description:
        'A soft, powdery matte created with fine glass-bead media. Gentle on the eye and exceptional at masking fingerprints and light scuffs.',
      image: imagePath('/images/finishes/finish-vanilla.webp'),
      features: ['Velvet matte', 'Fingerprint resistant', 'Contemporary'],
    },
    {
      id: 5,
      name: 'Streusel Stone',
      spec: 'Embossed Linen Texture',
      category: 'Textured',
      description:
        'A rolled three-dimensional weave that scatters light and disguises wear. A tactile, crumbled-stone surface that stays beautiful under heavy use.',
      image: imagePath('/images/finishes/finish-streusel.webp'),
      features: ['3D embossed pattern', 'Hides scratches', 'Tactile'],
    },
    {
      id: 6,
      name: 'Toffee Bedrock',
      spec: 'Hand-aged Patina',
      category: 'Specialist',
      description:
        'A hand-finished, mottled patina with the depth and warmth of weathered rock. Every panel is one of a kind and develops character over time.',
      image: imagePath('/images/finishes/finish-toffee.webp'),
      features: ['Hand-finished', 'One of a kind', 'Living surface'],
    },
    {
      id: 7,
      name: 'Cocoa Onyx',
      spec: 'Black PVD Coating',
      category: 'Specialist',
      description:
        'A physical-vapour-deposited coating in deep matte cocoa-black. Scratch-hard, fingerprint-resistant and unmistakably dramatic.',
      image: imagePath('/images/finishes/finish-cocoa.webp'),
      features: ['Coloured steel', 'Ultra-hard coating', 'Dramatic'],
    },
    {
      id: 8,
      name: 'Mocha Granite',
      spec: '316 Marine Grade',
      category: 'Specialist',
      description:
        'Our toughest surface — marine-grade 316 steel with a warm granular finish. Salt-, chemical- and corrosion-proof for bars, labs and the outdoors.',
      image: imagePath('/images/finishes/finish-mocha.webp'),
      features: ['316 marine grade', 'Chemical resistant', 'Hospitality & lab'],
    },
  ],
};

// --- PROJECTS (cards that open a detail modal) ------------------------------
export const projects = {
  title: 'Selected Work',
  subtitle: 'A few of the kitchens, bars and laboratories we\'ve fabricated.',
  items: [
    {
      id: 1,
      title: 'Tanglin Residence',
      category: 'Residential',
      location: 'Singapore',
      year: '2025',
      description:
        'A four-metre island in Praline Sand with a seamless integrated double sink and folded waterfall ends — one continuous, pore-free surface.',
      image: imagePath('/images/projects/tanglin/project-tanglin.webp'),
      details: [
        '4.0 m single-piece island top',
        'Hand-welded integrated double bowl',
        'Waterfall ends folded from one sheet',
        'Finish: Praline Sand (Brushed No. 4)',
      ],
    },
    {
      id: 2,
      title: 'Forge & Vine Bar',
      category: 'Hospitality',
      location: 'Singapore',
      year: '2024',
      description:
        'A nine-metre back bar in Mocha Granite marine-grade steel with welded drip trays, speed rails and a Brûlée Mirror front fascia.',
      image: imagePath('/images/projects/forge/project-forge.webp'),
      details: [
        '9 m run across three sections',
        '316 marine-grade steel (Mocha Granite)',
        'Welded drip channels + speed rails',
        'Brûlée Mirror polished fascia',
      ],
    },
    {
      id: 3,
      title: 'Helix Diagnostics Lab',
      category: 'Commercial',
      location: 'Singapore',
      year: '2024',
      description:
        'Cleanroom-grade benching with coved, crevice-free welds for a molecular diagnostics facility — absolutely hygienic and easy to sanitise.',
      image: imagePath('/images/projects/helix/project-helix.webp'),
      details: [
        '22 m of continuous benching',
        'Coved, crevice-free internal welds',
        'Chemical-resistant 316L steel',
        'Vanilla Dust low-glare finish',
      ],
    },
    {
      id: 4,
      title: 'Katong Loft Kitchen',
      category: 'Residential',
      location: 'Singapore',
      year: '2023',
      description:
        'A compact galley in Streusel Stone — durable, warm under light and forgiving of daily use, with a folded upstand splashback.',
      image: imagePath('/images/projects/katong/project-katong.webp'),
      details: [
        'L-shaped run with integrated drainer',
        'Streusel Stone embossed texture',
        'Folded upstand splashback',
        'Concealed cable cut-outs',
      ],
    },
  ],
};

// --- ABOUT ------------------------------------------------------------------
export const about = {
  title: 'About Milliform',
  subtitle: 'Metalworkers who happen to make countertops.',
  introduction: {
    title: 'Built around the weld',
    paragraphs: [
      'Milliform began in a two-bay workshop with a press brake, a TIG torch and a conviction that a countertop should be one continuous surface — not a slab dropped onto a cabinet.',
      'True to that legacy, every piece is templated, modelled and fabricated in-house using laser technology and millimetre precision. Bowls and sinks are seamlessly welded by hand. Nothing is outsourced; nothing is catalogue-standard.',
      'The result is a surface that fits your room exactly, stays hygienic for life, and is built — like the best things — to last.',
    ],
    image: imagePath('/images/about-intro.webp'),
  },
  timeline: [
    { year: '2014', title: 'The first bench', description: 'Founded as a two-person metal shop fabricating restaurant prep benches.' },
    { year: '2017', title: 'Going bespoke', description: 'First fully integrated residential island — sink, top and waterfall in one weld.' },
    { year: '2020', title: 'Laser & CNC', description: 'Invested in fibre-laser cutting and CNC folding for ±0.5 mm tolerances.' },
    { year: '2025', title: 'The Confection Collection', description: 'Launched eight signature finishes, including in-house PVD, bead-blast and hand-patina.' },
  ],
  values: [
    { icon: '◈', title: 'One piece, one weld', description: 'We engineer surfaces to be seamless and pore-free — not assembled from parts.' },
    { icon: '✦', title: 'Measured, not assumed', description: 'Every job is site-templated and digitally modelled before a single sheet is cut.' },
    { icon: '♻', title: 'Made to outlast', description: 'Recycled, recyclable, marine-grade steel with food-safe welds — built for decades.' },
  ],
  team: { title: 'The workshop', description: 'A small team of fabricators, welders and a CAD technician.', showTeam: false },
};

// --- NAVIGATION (path must match a <Route> in App.js) -----------------------
export const navigation = {
  mainMenu: [
    { name: 'Home', path: '/' },
    { name: 'Finishes', path: '/collections' },
    { name: 'Work', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ],
  footerLinks: {
    company: [
      { name: 'About', path: '/about' },
      { name: 'Selected Work', path: '/projects' },
      { name: 'Contact', path: '/contact' },
    ],
    services: [
      { name: 'The Collection', path: '/collections' },
      { name: 'Request a Quote', path: '/contact' },
    ],
    resources: [],
  },
};

// --- IMAGES -----------------------------------------------------------------
export const images = {
  logo: null, // set to '/images/logo.svg' to use an image logo instead of text
  placeholder: imagePath('/images/placeholder.webp'),
  textures: { hero: null, section: null },
};

// --- DEFAULT AGGREGATE ------------------------------------------------------
const config = {
  siteInfo,
  theme,
  ACTIVE_THEME,
  animationConfig,
  typography,
  contactInfo,
  homepage,
  collections,
  projects,
  about,
  navigation,
  images,
};

export default config;
