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
  heading: string;
  ctaText: string;
  ctaHref: string;
  cards: WeddingCard[];
}

export const weddingIntroData: WeddingSectionData = {
  heading: 'A Timeless Setting for Your Most Meaningful Moments',
  ctaText: 'Discover Weddings',
  ctaHref: '/hotels-resorts/#celebration',
  cards: [
    {
      type: 'editorial',
      eyebrow: 'CELEBRATIONS AT IDANAZHI',
      copy: "Some moments deserve more than an ordinary venue. Rooted in heritage and shaped by timeless character, Idanazhi offers a distinctive setting to bring your closest people together and celebrate life's most meaningful beginnings.",
      linkText: 'Explore the experience',
      linkHref: '/singapore/experiences/',
    },
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
  ],
};
