"use client";

import { 
  GridBody,
  DraggableContainer,
  GridItem, 
} from "@/components/ui/infinite-drag-scroll";

const demoImages = [
  {
    id: 1,
    alt: "Silhouette of a traditional Japanese pagoda at sunset",
    src: "https://cdn.21st.dev/assets/mirror/e6/e6058873594c38764129c144e6f62b07f97ce886c0b91df4eee5f43e2a74e663.jpg",
  },
  {
    id: 2,
    alt: "Himeji Castle on a clear day",
    src: "https://cdn.21st.dev/assets/mirror/3b/3ba6aa81a96bc2b797fe52e3b179ae55ed700dfe3ba4f4d2d6c64d7a3988fd67.jpg",
  },
  {
    id: 3,
    alt: "Red Car",
    src: "https://cdn.21st.dev/assets/mirror/95/952c990d4c18e7eb765d62d663b98876c4c2b85deb32b7e401225187ba8181d3.jpg",
  },
  {
    id: 4,
    alt: "Woman in kimono standing beside a traditional Japanese house",
    src: "https://cdn.21st.dev/assets/mirror/d4/d40afab29f29f340e5b47cac0576f16b5fc0bd576775ffbfe5043c86bc6b8564.jpg",
  },
  {
    id: 5,
    alt: "Group of men in black suits inside a hallway",
    src: "https://cdn.21st.dev/assets/mirror/fb/fbfaed83055d868a04fac72b73e3595a286aa3b40697e6ba3fa71d83394a2801.jpg",
  },
  {
    id: 6,
    alt: "Crowd walking through a street decorated with red lanterns",
    src: "https://cdn.21st.dev/assets/mirror/be/be090f4790d5a7fea7580bc7dfa1c6769d92570bb37d140648a9f09062085c1a.jpg",
  },
  {
    id: 7,
    alt: "Timelapse of traffic lights and buildings at night",
    src: "https://cdn.21st.dev/assets/mirror/c0/c060f4c545fb942b694170efceb9974868d1d24b0da23a2d2b62222d1b0d626f.jpg",
  },
  {
    id: 8,
    alt: "Close-up of orange and black wooden torii gate posts",
    src: "https://cdn.21st.dev/assets/mirror/f0/f0bc1b7e09e979fee3846a31c681ef75443c9370e33ea690e8cb915ab3b27178.jpg",
  },
  {
    id: 9,
    alt: "Historic building with brown and white stone exterior in daylight",
    src: "https://cdn.21st.dev/assets/mirror/d6/d64bcae2c49e505580e769f9ea5ca8cabb58df60df2ca2db32b9cf8d09e6d5a5.jpg",
  },
  {
    id: 10,
    alt: "Lantern glowing on a quiet street at night",
    src: "https://cdn.21st.dev/assets/mirror/c9/c9056cca45f11b57c8b46e962c02f1c748d06a1da9ac835d97818cdeedc4e5d4.jpg",
  },
  {
    id: 11,
    alt: "View of Osaka Castle with clear sky backdrop",
    src: "https://cdn.21st.dev/assets/mirror/71/7143ed91e23237e0ef962d7cc1886d0536038c3cc940d4a1e9e02058742570f6.jpg",
  },
  {
    id: 12,
    alt: "Pagoda silhouetted during golden hour",
    src: "https://cdn.21st.dev/assets/mirror/e6/e6058873594c38764129c144e6f62b07f97ce886c0b91df4eee5f43e2a74e663.jpg",
  },
  {
    id: 13,
    alt: "Himeji Castle seen from a distance",
    src: "https://cdn.21st.dev/assets/mirror/3b/3ba6aa81a96bc2b797fe52e3b179ae55ed700dfe3ba4f4d2d6c64d7a3988fd67.jpg",
  },
  {
    id: 14,
    alt: "Torii gate pillars in vibrant orange and black",
    src: "https://cdn.21st.dev/assets/mirror/f0/f0bc1b7e09e979fee3846a31c681ef75443c9370e33ea690e8cb915ab3b27178.jpg",
  },
  {
    id: 15,
    alt: "Traditional Japanese home under daylight",
    src: "https://cdn.21st.dev/assets/mirror/d4/d40afab29f29f340e5b47cac0576f16b5fc0bd576775ffbfe5043c86bc6b8564.jpg",
  },
  {
    id: 16,
    alt: "Women wearing kimono beside wooden house",
    src: "https://cdn.21st.dev/assets/mirror/d4/d40afab29f29f340e5b47cac0576f16b5fc0bd576775ffbfe5043c86bc6b8564.jpg",
  },
  {
    id: 17,
    alt: "People passing under hanging red lanterns at dusk",
    src: "https://cdn.21st.dev/assets/mirror/be/be090f4790d5a7fea7580bc7dfa1c6769d92570bb37d140648a9f09062085c1a.jpg",
  },
  {
    id: 18,
    alt: "Stepping stone path winding through lush forest",
    src: "https://cdn.21st.dev/assets/mirror/98/989f363e95ff89bc2f76ce9c7cf2fdfd2d2f4b7ed466b8afca2b5cb9913675c4.jpg",
  },
];

export const DemoOne = () => {
  return (
    <DraggableContainer variant="masonry">
      <GridBody>
        {demoImages.map((image) => (
          <GridItem
            key={image.id}
            className="relative h-54 w-36 md:h-96 md:w-64"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="pointer-events-none absolute h-full w-full object-cover"
            />
          </GridItem>
        ))}
      </GridBody>
    </DraggableContainer>
  );
};

export default DemoOne;
