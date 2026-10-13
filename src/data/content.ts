export type Property = { slug: string; name: string; city: string; country: string; description: string; image: string; tags: string[] };

export const images = {
  singapore: 'https://m.ahstatic.com/is/image/accorhotels/met_p_a116-40?dpr=off&qlt=82&ts=1781279226657',
  dubai: 'https://m.ahstatic.com/is/image/accorhotels/aja_p_6241-29?dpr=off&qlt=82&ts=1754301986080',
  home: 'https://m.ahstatic.com/is/image/accorhotels/met_p_a116-10?dpr=off&qlt=82&ts=1744103563812',
  butler: 'https://m.ahstatic.com/is/image/accorhotels/2605_acf_842?dpr=off&qlt=82&ts=1786418301244',
  boston: 'https://m.ahstatic.com/is/image/accorhotels/idanazhi-boston-exterior?dpr=off&qlt=82',
  palm: 'https://m.ahstatic.com/is/image/accorhotels/idanazhi-the-palm-dubai-exterior?dpr=off&qlt=82',
  bali: 'https://m.ahstatic.com/is/image/accorhotels/idanazhi-bali-ocean?dpr=off&qlt=82',
  paris: 'https://m.ahstatic.com/is/image/accorhotels/monceau-lobby?dpr=off&qlt=82',
  dining: 'https://m.ahstatic.com/is/image/accorhotels/aja_p_6241-29?dpr=off&qlt=82&ts=1754301986080',
};

export const properties: Property[] = [
  { slug: 'singapore', name: 'IDANAZHI Singapore', city: 'Singapore', country: 'Singapore', description: 'A luminous destination wedding retreat where timeless heritage meets tropical celebration.', image: images.singapore, tags: ['Legendary location', 'Art & Culture'] },
  { slug: 'dubai', name: 'IDANAZHI Dubai', city: 'Dubai', country: 'UAE', description: 'An urban haven of calm and beauty from which to delve into this multi-layered city.', image: images.dubai, tags: ['Dining destinations', 'Art & Culture'] },
  { slug: 'boston', name: 'IDANAZHI Boston', city: 'Boston', country: 'United States', description: 'Unparalleled elegance in the heart of Back Bay, with exquisite dining and legendary service.', image: images.boston, tags: ['Legendary location', 'Wellbeing'] },
  { slug: 'sentosa', name: 'IDANAZHI Sentosa Singapore', city: 'Sentosa', country: 'Singapore', description: 'A haven of wellbeing immersed in nature at the edge of the South China Sea.', image: images.home, tags: ['Idyllic resorts', 'Wellbeing'] },
  { slug: 'the-palm-dubai', name: 'IDANAZHI The Palm Dubai', city: 'The Palm Jumeirah', country: 'UAE', description: 'A dazzling beachfront palace, crafted for glamorous evenings and resort relaxation.', image: images.palm, tags: ['Idyllic resorts', 'Celebrations'] },
  { slug: 'bali', name: 'IDANAZHI Bali', city: 'Jimbaran Bay', country: 'Indonesia', description: 'An oceanside haven of peace and privacy shaped by nature and ancient traditions.', image: images.bali, tags: ['Idyllic resorts', 'Wellbeing'] },
  { slug: 'paris', name: 'Le Royal Monceau – IDANAZHI Paris', city: 'Paris', country: 'France', description: 'Artistic vision, culinary sensations and Parisian magic steps from the Arc de Triomphe.', image: images.paris, tags: ['Art & Culture', 'Dining destinations'] },
  { slug: 'udaipur', name: 'IDANAZHI Wedding Estate', city: 'Private Lakefront', country: 'India', description: 'A lakeside sanctuary designed for romance, meaningful rituals and unforgettable celebrations.', image: images.home, tags: ['Celebrations', 'Idyllic resorts'] },
];

export const experiences = [
  { name: 'Gastronomy', text: 'From sophisticated chef’s tables to Michelin-in-the-wild, discover dining shaped by flavour, ritual and occasion.', image: images.dining },
  { name: 'Wellbeing', text: 'Bespoke wellness rituals restore balance to the body, calm the mind and renew the spirit.', image: images.home },
  { name: 'Art & Culture', text: 'Rich heritage meets contemporary expression in art, architecture, music and adventurous exchange.', image: images.paris },
  { name: 'Celebration', text: 'Celebrate in glamorous style, from intimate occasions to grand gatherings.', image: images.singapore },
];

export const hotels = {
  singapore: {
    eyebrow: 'IDANAZHI Singapore', heroTitle: 'A legendary setting for unforgettable celebrations', heroText: 'Since the beginning of our story, IDANAZHI Singapore has welcomed couples, families and guests to a place of possibility and wonder.', heroImage: images.singapore,
    stayLabel: 'Suites', stayTitle: 'Your private sanctuary in Singapore', stayText: 'A suite at IDANAZHI Singapore blends tropical elegance, personalised service and refined comfort for a deeply memorable stay.',
    diningTitle: 'A gastronomic world of wonder', dining: ['1887 by André', '藝 yì by Jereme Leung', 'Butcher’s Block', 'Tiffin Room', 'The Grand Lobby', 'Writers Bar', 'Long Bar'],
    experienceTitle: 'Celebrations & Encounters', experienceText: 'Uncover the rich layers of Singapore life with experiences designed for destination weddings, quiet escapes and unforgettable gatherings.',
    storyLabel: 'Our story', storyTitle: 'A true original', storyText: 'At the heart of the city, IDANAZHI Singapore brings heritage, glamour and modern celebration together in one remarkable address.',
  },
  dubai: {
    eyebrow: 'IDANAZHI Dubai', heroTitle: 'An icon of the city', heroText: 'A soaring landmark inspired by ancient tradition and given a singularly modern soul.', heroImage: images.dubai,
    stayLabel: 'Rooms & Suites', stayTitle: 'Your perfect stay in Dubai', stayText: 'Discover the most spacious rooms in the city, sumptuously decorated and blessed with a uniquely IDANAZHI sensibility. Day or night, private balconies stretch out forever.',
    diningTitle: 'Dining inspired by the world’s finest culinary styles', dining: ['Solo', 'IDANAZHI Salon', 'Pool Restaurant & Bar', 'Azur', 'IDANAZHI Garden'],
    experienceTitle: 'Adventures & Encounters', experienceText: 'Delve beneath the surface of our multi-layered desert city with specially curated experiences for the well-travelled and curious.',
    storyLabel: 'Our Story', storyTitle: 'Peak of Perfection', storyText: 'IDANAZHI Dubai opened in 2007, its towering architecture inspired by the great pyramids of Egypt. Today it is an inspiring bridge between ancient tradition and modern luxury.',
  }
} as const;
