export interface ExperienceItem {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  duration: string;
  bestTime: string;
  highlights: string[];
}

export const experiencesData: ExperienceItem[] = [
  {
    id: 'paddy-farming',
    slug: 'paddy-farming',
    title: 'Traditional Rice Farming & Paddy Field Experience',
    shortTitle: 'Paddy Field Farming',
    category: 'Agrarian Heritage',
    tagline: 'Wander emerald rice fields, touch the soil, and participate in centuries-old Kerala paddy cultivation.',
    description:
      'Step barefoot onto the lush earthen bunds surrounding Idanazhi. Guided by local farmers, learn the rhythms of heirloom rice farming, plant seedlings in natural mud beds, and discover how traditional water-harvesting sustains this fertile paradise. Conclude with tender coconut water and steaming spiced tea served in clay kulhars.',
    image: '/images/experiences/paddy-farming-experience.jpg',
    duration: '2.5 Hours',
    bestTime: 'Early Morning (6:30 AM – 9:00 AM) or Golden Hour',
    highlights: [
      'Guided walk along emerald terraced paddy bunds',
      'Hands-on planting or harvesting with heirloom paddy seeds',
      'Fresh tender coconut and earthen chai on the farm',
      'Learn age-old regenerative farming and irrigation lore',
    ],
  },
  {
    id: 'kumbidi-village',
    slug: 'kumbidi-village',
    title: 'Kumbidi Village Cultural Experience',
    shortTitle: 'Kumbidi Village Life',
    category: 'Rural Immersion',
    tagline: 'Stroll red-earth lanes, visit artisanal potters and handlooms, and live the peaceful rhythm of historic Kumbidi.',
    description:
      'Immerse yourself in the authentic life of Kumbidi village, an ancient cultural enclave nestled along the river plains. Meet generational terracotta artisans, witness palm-leaf weaving, visit historic ancestral illams, and share stories with local village elders in a quiet setting untouched by urban hurry.',
    image: '/images/experiences/kumbidi-village-experience.jpg',
    duration: '3.5 Hours',
    bestTime: 'Morning or Late Afternoon',
    highlights: [
      'Walking tour of historic Kumbidi village lanes and courtyards',
      'Pottery wheel demonstration with generational master potters',
      'Traditional palm thatch weaving and artisan crafts',
      'Authentic Kerala home hospitality and snacks',
    ],
  },
  {
    id: 'temple-heritage',
    slug: 'temple-heritage',
    title: 'Sacred Temple Architecture & Heritage Experience',
    shortTitle: 'Temple Experience',
    category: 'Spiritual & Heritage',
    tagline: 'Discover timeless Thachu Shastra architecture, glowing oil lamps, and sacred Vedic traditions.',
    description:
      'Guruvayoor and its surrounding hamlets host some of the most revered and architecturally breathtaking temple sanctums in South India. Accompanied by an insightful cultural guide, explore ancient woodcarvings, sacred temple ponds, the evening glow of thousands of brass nilavilakkus, and the meditative resonance of classical Sopana Sangeetham.',
    image: '/images/experiences/temple-heritage-experience.jpg',
    duration: '2 to 3 Hours',
    bestTime: 'Dawn Nirmalyam or Twilight Deeparadhana',
    highlights: [
      'Visits to historic temple precincts and carved wood sanctums',
      'Witness sacred twilight lamp lighting (Deeparadhana)',
      'Insights into Thachu Shastra traditional Vastu architecture',
      'Temple musical traditions and Sopana Sangeetham history',
    ],
  },
  {
    id: 'fishing-harbor',
    slug: 'fishing-harbor',
    title: 'Fishing Harbor & Live Fishing Experience',
    shortTitle: 'Fishing Harbor & Live Fishing',
    category: 'Coastal & River',
    tagline: 'Sail in wooden country canoes at dawn, cast traditional throw-nets, and experience the vibrant coastal harbor.',
    description:
      'Before sunrise, board traditional wooden canoes on the calm river backwaters leading to the coastal harbor. Watch local fishermen maneuver traditional Chinese fishing nets, cast hand-woven throw nets into the mist, and observe the lively morning sea-catch auction as dawn breaks in golden shades across the water.',
    image: '/images/experiences/fishing-harbor-experience.jpg',
    duration: '3 Hours',
    bestTime: 'Dawn Expedition (5:30 AM – 8:30 AM)',
    highlights: [
      'Dawn wooden canoe cruise along calm backwaters and estuaries',
      'Hands-on live cast-net fishing guided by local fishermen',
      'Spectate the bustling morning harbor arrival and auction',
      'Option to select fresh catch for private estate lunch preparation',
    ],
  },
];
