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
  heroHeadline?: string;
  poeticQuote?: string;
  vignette1?: string;
  vignette2?: string;
  vignette3?: string;
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
    id: 'cooking-classes',
    slug: 'cooking-classes',
    title: 'Traditional Kerala Cooking Classes',
    shortTitle: 'Cooking Classes',
    subtitle: 'Culinary Heritage & Hearthside Secrets',
    description:
      'Master the sacred culinary traditions of Kerala, cooking in seasoned earthen pots with farm-fresh spices and organic estate harvest.',
    longDescription:
      'Step into our heritage nalukettu kitchen alongside seasoned home cooks and master chefs. Grind fresh spices on ancestral stone mills, extract virgin coconut milk, and craft quintessential Malabar curries and festive Sadhya delicacies over wood-fired hearths.',
    href: '/experiences#cooking-classes',
    image: '/images/experiences/kerala-sadhya-dining.jpg',
    heroHeadline:
      'Uncover ancestral culinary secrets handed down through generations, cooking in earthen pots over wood fires with estate spices',
    poeticQuote:
      'At Idanazhi, every pinch of stone-ground spice carries the history of ancient trade winds and the generous hearth of a Kerala home.',
    vignette1: '/images/weddings/spaces/space-dinner-3.jpg',
    vignette2: '/images/weddings/spaces/space-dinner-1.jpg',
    vignette3: '/images/weddings/kerala-courtyard-planter.jpg',
    highlights: [
      'Stone grinding of heirloom spice blends',
      'Clay pot wood-fire cooking masterclass',
      'Traditional Sadhya leaf dining banquet',
      'Harvesting organic spices from the estate garden',
    ],
    duration: '3 Hours',
    bestTime: 'Morning or Early Evening (10:30 AM or 4:30 PM)',
  },
  {
    id: 'working-fields',
    slug: 'working-fields',
    title: 'Fieldwork & Working in the Fields',
    shortTitle: 'Working in the Fields',
    subtitle: 'Hands-on Agrarian Immersion',
    description:
      'Join village elders in participatory farming activities—mud ploughing, irrigation channel guidance, and coconut grove harvesting.',
    longDescription:
      'Feel the grounding energy of the earth beneath your feet. Work hand-in-hand with Kumbidi farmers in daily agrarian tasks: preparing muddy furrows, guiding water from river channels, cultivating organic vegetables, and gathering seasonal tree fruits.',
    href: '/experiences#working-fields',
    image: '/images/experiences/working-fields.jpg',
    heroHeadline:
      'Participate in real fieldwork alongside village elders, feeling the cool fertile clay between your toes as you nurture the land',
    poeticQuote:
      'True luxury is the quiet dignity of agrarian work—hands in the soil, sunlight on the water, and the timeless rhythm of the seasons.',
    vignette1: '/images/experiences/paddy-farming-experience.jpg',
    vignette2: '/images/weddings/spaces/space-outdoor-1.jpg',
    vignette3: '/images/stay/heritage-veranda-hero.jpg',
    highlights: [
      'Hands-on mud field preparation & seedling care',
      'Traditional water channel flow management',
      'Coconut harvesting and husk peeling demonstration',
      'Midday shade tea served in traditional terracotta cups',
    ],
    duration: '2.5 Hours',
    bestTime: 'Early Morning (7:00 AM - 9:30 AM)',
  },
  {
    id: 'rice-farming',
    slug: 'rice-farming',
    title: 'Paddy Field & Traditional Rice Farming',
    shortTitle: 'Traditional Rice Farming',
    subtitle: 'Ancestral Agrarian Heritage',
    description:
      'Immerse in time-honoured Kerala agricultural heritage, walking through emerald paddy fields, seedling transplanting, and harvest rituals.',
    longDescription:
      'Step barefoot into the fertile soil of Kerala’s ancestral paddy fields. Guided by local farming elders, participate in traditional seedling transplanting, water wheel irrigation, and organic grain harvesting, connecting deeply with the land that sustains us.',
    href: '/experiences#rice-farming',
    image: '/images/experiences/paddy-farming-experience.jpg',
    heroHeadline:
      'Step barefoot into fertile ancestral soil, learning the time-honoured art of seedling transplantation and the poetry of green fields',
    poeticQuote:
      'Here, rice farming is not an occupation; it is a sacred conversation with the rain, the soil, and centuries of ancestral wisdom.',
    vignette1: '/images/experiences/paddy-farming-experience.jpg',
    vignette2: '/images/weddings/spaces/space-outdoor-1.jpg',
    vignette3: '/images/weddings/spaces/stay3.png',
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
    shortTitle: 'Kumbidi Village Walk',
    subtitle: 'Authentic Rural Living & Craftsmanship',
    description:
      'Wander through the tranquil lanes of Kumbidi village, meeting local weavers, pottery masters, and experiencing genuine rural Kerala warmth.',
    longDescription:
      'Kumbidi is a living tapestry of rural Kerala culture nestled alongside the Bharathapuzha river basin. Discover clay pottery workshops, traditional handloom weaving, serene temple paths, and warm family homes where authentic chai and snacks are shared.',
    href: '/experiences#kumbidi-village',
    image: '/images/experiences/kumbidi-village-experience.jpg',
    heroHeadline:
      'Wander through the tranquil lanes of Kumbidi, meeting master weavers, pottery artisans at their wheels, and native village storytellers',
    poeticQuote:
      'In Kumbidi village, neighbors greet you as family, and ancient crafts are practiced with quiet grace beneath swaying palm canopies.',
    vignette1: '/images/weddings/architecture-corridor.jpg',
    vignette2: '/images/weddings/spaces/stay2.png',
    vignette3: '/images/weddings/architecture-4.jpg',
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
    shortTitle: 'Temple Sanctum',
    subtitle: 'Vedic Sanctums, Rituals & Architecture',
    description:
      'Witness sacred temple architecture, the resonance of morning brass oil lamps, ceremonial pujan, and timeless spiritual peace.',
    longDescription:
      'Kerala’s ancient temple architecture reflects cosmic geometry and deep silence. Accompany our resident cultural custodian to historical temple sanctums, observe the sacred lighting of brass oil lamps (Deeparadhana), and listen to resonant Sopana Sangeetham melodies.',
    href: '/experiences#temple-experience',
    image: '/images/experiences/temple-heritage-experience.jpg',
    heroHeadline:
      'Experience the profound peace of centuries-old temple sanctums, resonating with Vedic chants, brass oil lamps, and sacred silence',
    poeticQuote:
      'The chime of evening sanctum bells dissolves the noise of the outside world, leaving only stillness, devotion, and golden lamplight.',
    vignette1: '/images/weddings/pair-pujan.jpg',
    vignette2: '/images/weddings/stage-heritage-mandapam.jpg',
    vignette3: '/images/weddings/architecture-1.jpg',
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
    shortTitle: 'Live Fishing & Harbor',
    subtitle: 'Riverbank Casting & Dawn Watercraft',
    description:
      'Experience live riverbank fishing, traditional casting net craft, and the brisk dawn arrival of traditional wooden watercraft.',
    longDescription:
      'Join artisanal fishermen at the break of dawn as the morning mist lifts over the water. Learn the delicate physics of casting a traditional circular net (Cheena Vala and Veechu Vala), watch wooden boatmen glide through calm backwaters, and inspect the fresh catch of river pearl spot (Karimeen).',
    href: '/experiences#fishing-harbor',
    image: '/images/experiences/fishing-harbor-experience.jpg',
    heroHeadline:
      'Cast traditional nets from tranquil riverbanks and glide on wooden watercraft as dawn breaks across Kerala’s serene waterways',
    poeticQuote:
      'At first light, the river reflects the awakening sky, and patient casting nets bring forth the living bounty of the backwaters.',
    vignette1: '/images/weddings/stage-coastal-mandapam.jpg',
    vignette2: '/images/weddings/spaces/space-dinner-4.jpg',
    vignette3: '/images/weddings/spaces/stage-3.jpg',
    highlights: [
      'Live net-casting demonstration with master fishermen',
      'Wooden canoe excursion along calm river shores',
      'Witness fresh catch sorting and indigenous species',
      'Chef-curated live freshwater fish preparation demonstration',
    ],
    duration: '2.5 Hours',
    bestTime: 'Sunrise (6:00 AM - 8:30 AM)',
  },
  {
    id: 'nearby-tours',
    slug: 'nearby-tours',
    title: 'Curated Tours to Nearby Places',
    shortTitle: 'Nearby Places & Excursions',
    subtitle: 'Heritage Trails & Scenic Day Trips',
    description:
      'Embark on curated day trips to historical monuments, ancient river ghats, and hidden cultural treasures across Thrissur and Malabar.',
    longDescription:
      'Explore the storied geography of central Kerala. From the sacred riverbanks of the Bharathapuzha to ancient heritage illams, Kathakali academies, weaving villages, and secluded scenic hills, our private guided excursions reveal the authentic heartbeat of the region.',
    href: '/experiences#nearby-tours',
    image: '/images/weddings/heritage-manor-facade.jpg',
    heroHeadline:
      'Embark on curated excursions to historical river ghats, ancient illams, and secluded cultural treasures across central Kerala',
    poeticQuote:
      'Every trail winding out from Idanazhi leads toward an older India—where rivers tell stories and centuries-old trees shelter ancient shrines.',
    vignette1: '/images/weddings/architecture-corridor.jpg',
    vignette2: '/images/experiences/reset-wellness.jpg',
    vignette3: '/images/stay/swimming-pool.jpg',
    highlights: [
      'Private chauffeur & cultural historian guide',
      'Visits to Kerala Kalamandalam & heritage illams',
      'Sunset picnic along the Bharathapuzha riverbank',
      'Bespoke itineraries tailored to your pace and interests',
    ],
    duration: 'Half Day or Full Day (4 - 7 Hours)',
    bestTime: 'Morning Departure (8:30 AM)',
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
