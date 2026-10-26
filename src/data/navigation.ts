export interface ExperienceSubCategory {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  longDescription: string;
  href: string;
  image: string;
  highlights: string[];
  duration?: string;
  bestTime?: string;
}

export interface NavItem {
  id: string;
  label: string;
  title: string;
  href: string;
  badge?: string;
  subCategories?: ExperienceSubCategory[];
}

/**
 * Sub-categories under Experience.
 * Designed to be easily extensible: simply add a new object to this array
 * and it will automatically appear in navigation dropdowns, mobile drawers,
 * and experience landing pages.
 */
export const experienceSubCategories: ExperienceSubCategory[] = [
  {
    id: 'rice-farming',
    slug: 'rice-farming',
    title: 'Paddy Field & Traditional Rice Farming',
    shortTitle: 'Traditional Rice Farming',
    subtitle: 'Ancestral Agrarian Heritage',
    description:
      'Immerse in time-honoured Kerala agricultural heritage, walking through emerald paddy fields, mud-ploughing traditions, and seasonal harvest rituals.',
    longDescription:
      'Step barefoot into the fertile soil of Kerala’s ancestral paddy fields. Guided by local farming elders, participate in traditional seedling transplanting, water wheel irrigation, and organic grain harvesting, connecting deeply with the land that sustains us.',
    href: '/experiences#rice-farming',
    image: '/images/experiences/paddy-farming-experience.jpg',
    highlights: [
      'Hands-on traditional seedling transplantation',
      'Guided walk through ancient water channels',
      'Heirloom grain tasting & agrarian storytelling',
      'Refreshments of fresh tender coconut water',
    ],
    duration: '2.5 Hours',
    bestTime: 'Early Morning (6:30 AM - 9:00 AM)',
  },
  {
    id: 'kumbidi-village',
    slug: 'kumbidi-village',
    title: 'Kumbidi Village Experience',
    shortTitle: 'Kumbidi Village Experience',
    subtitle: 'Authentic Rural Living & Craftsmanship',
    description:
      'Wander through the tranquil lanes of Kumbidi village, meeting local weavers, pottery masters, and experiencing genuine rural Kerala warmth.',
    longDescription:
      'Kumbidi is a living tapestry of rural Kerala culture nestled alongside the Bharathapuzha river basin. Discover clay pottery workshops, traditional handloom weaving, serene temple paths, and warm family homes where authentic chai and snacks are shared.',
    href: '/experiences#kumbidi-village',
    image: '/images/experiences/kumbidi-village-experience.jpg',
    highlights: [
      'Interactive clay pottery wheel demonstration',
      'Handloom weaving atelier visit',
      'Traditional village tea stall (Chayakada) visit',
      'Storytelling with Kumbidi native elders',
    ],
    duration: '3 Hours',
    bestTime: 'Morning or Late Afternoon (3:30 PM - 6:30 PM)',
  },
  {
    id: 'temple-experience',
    slug: 'temple-experience',
    title: 'Sacred Temple Experience',
    shortTitle: 'Temple Experience',
    subtitle: 'Vedic Sanctums, Rituals & Architecture',
    description:
      'Witness sacred temple architecture, the resonance of morning oil lamps, ceremonial pujan, and timeless spiritual peace.',
    longDescription:
      'Kerala’s ancient temple architecture reflects cosmic geometry and deep silence. Accompany our resident cultural custodian to historical temple sanctums, observe the sacred lighting of a thousand brass oil lamps (Deeparadhana), and listen to resonant Sopana Sangeetham melodies.',
    href: '/experiences#temple-experience',
    image: '/images/experiences/temple-heritage-experience.jpg',
    highlights: [
      'Architectural tour of ancient teak gopurams',
      'Vedic chanting & morning Deeparadhana blessings',
      'Prasadam tasting prepared by heritage temple cooks',
      'Insight into sacred Nalukettu cosmological alignment',
    ],
    duration: '2 Hours',
    bestTime: 'Dawn (6:00 AM - 8:00 AM) or Twilight (6:00 PM - 7:30 PM)',
  },
  {
    id: 'fishing-harbor',
    slug: 'fishing-harbor',
    title: 'Fishing Harbor & Live Fishing Experience',
    shortTitle: 'Live Fishing Experience',
    subtitle: 'Riverbank Casting & Dawn Watercraft',
    description:
      'Experience live riverbank fishing, traditional casting net craft, and the brisk dawn arrival of traditional wooden watercraft.',
    longDescription:
      'Join artisanal fishermen at the break of dawn as the morning mist lifts over the water. Learn the delicate physics of casting a traditional circular net (Cheena Vala and Veechu Vala), watch wooden boatmen glide through calm backwaters, and inspect the fresh catch of river pearl spot (Karimeen).',
    href: '/experiences#fishing-harbor',
    image: '/images/experiences/fishing-harbor-experience.jpg',
    highlights: [
      'Live net-casting demonstration with master fishermen',
      'Wooden canoe excursion along calm river shores',
      'Witness fresh catch sorting and indigenous species',
      'Chef-curated live freshwater fish preparation demonstration',
    ],
    duration: '2.5 Hours',
    bestTime: 'Sunrise (6:00 AM - 8:30 AM)',
  },
];

/**
 * Main navigation items for Idanazhi.
 * Order: Stay, Experience (with subcategories), Events.
 */
export const mainNavLinks: NavItem[] = [
  {
    id: 'stay',
    label: 'STAY',
    title: 'Stay',
    href: '/stay',
  },
  {
    id: 'experience',
    label: 'EXPERIENCE',
    title: 'Experience',
    href: '/experiences',
    subCategories: experienceSubCategories,
  },
  {
    id: 'events',
    label: 'EVENTS',
    title: 'Events',
    href: '/events',
  },
];
