export interface WeddingEditorialCard {
  type: 'editorial';
  eyebrow: string;
  copy: string;
  linkText: string;
  linkHref: string;
}

export interface WeddingPhotoCard {
  type: 'photo';
  image: string;
  alt: string;
  overlayLabel: string;
}

export type WeddingCard = WeddingEditorialCard | WeddingPhotoCard;

export interface WeddingSectionData {
  eyebrow?: string;
  heading: string;
  description?: string;
  ctaText: string;
  ctaHref: string;
  cards: WeddingCard[];
}

export const weddingIntroData: WeddingSectionData = {
  eyebrow: 'WEDDING EXPERIENCES',
  heading: 'A Timeless Setting for Your Most\nMeaningful Moments',
  description:
    "Rooted in heritage and shaped by timeless character,\nIDANAZHI offers an extraordinary setting to bring your closest people together\nand celebrate life's most meaningful beginnings.",
  ctaText: 'DISCOVER WEDDINGS',
  ctaHref: '/celebrations',
  cards: [
    {
      type: 'photo',
      image: '/images/weddings/stage-heritage-mandapam.jpg',
      alt: 'Traditional Kerala wedding mandapam stage adorned with marigold malas, carved teakwood pillars, and brass oil lamps without people',
      overlayLabel: 'Heritage Mandapam',
    },
    {
      type: 'photo',
      image: '/images/weddings/stage-coastal-mandapam.jpg',
      alt: 'Scenic open-air waterfront wedding stage canopy draped in lush ivory flowers with a rose petal pathway without people',
      overlayLabel: 'Open-Air Stage',
    },
    {
      type: 'photo',
      image: '/images/weddings/stage-grand-reception.jpg',
      alt: 'Grand luxury ballroom wedding reception stage illuminated by crystal chandeliers and a cascading floral wall without people',
      overlayLabel: 'Grand Reception Stage',
    },
    {
      type: 'photo',
      image: '/images/weddings/spaces/space-dinner-2.jpg',
      alt: 'Scenic lakeside wedding lawn ceremony setting with floral adorned chairs overlooking the water without people',
      overlayLabel: 'Lakeside Floral Lawn',
    },
    {
      type: 'photo',
      image: '/images/weddings/spaces/stage-decor-wiki.jpg',
      alt: 'Traditional South Indian wedding stage mandapam adorned with fresh marigold garlands and banana stem pillars without people',
      overlayLabel: 'Courtyard Floral Mandap',
    },
    {
      type: 'photo',
      image: '/images/weddings/spaces/space-dinner-3.jpg',
      alt: 'Elegant garden gazebo wedding ceremony stage with floral pillars and white draped aisle seating without people',
      overlayLabel: 'Garden Gazebo Pavilion',
    },
    {
      type: 'photo',
      image: '/images/weddings/spaces/space-dinner-1.jpg',
      alt: 'Luxury wedding banquet feast table decorated with lush floral centerpieces and fine glassware without people',
      overlayLabel: 'Imperial Banquet Feast',
    },
  ],
};
