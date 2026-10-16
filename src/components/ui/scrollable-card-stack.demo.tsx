"use client";

import ScrollableCardStack from "@/components/ui/scrollable-card-stack";

export default function ScrollableCardStackDemo() {
  const cardData = [
    {
      avatar:
        "https://cdn.21st.dev/assets/localized/9902214a2e4298b9bfea44d6804399c778030ae8404ebd42c9e6a3051a68a69c.jpg",
      handle: "@educalvolpz",
      href: "https://x.com/educalvolpz",
      id: "siriorb",
      image:
        "https://cdn.21st.dev/assets/localized/fc3e4f81bf5915ee28ec5a5e0674f29e04fe160c3ee6e2d1a95c1d47f0200960.webp",
      name: "Eduardo Calvo",
    },
    {
      avatar:
        "https://cdn.21st.dev/assets/localized/65ce49dae9c789b8a58d0e7f978da78fc05536a61bedda6220f9093ec91feb9d.jpg",
      handle: "@drewcano",
      href: "https://x.com/drewcano",
      id: "richpopover",
      image:
        "https://cdn.21st.dev/assets/localized/cf2a8e2f2d3116fd6b57487235a08f42aba1556954f10fa183d47e0892e8a5dc.jpg",
      name: "Drew Cano",
    },
    {
      avatar:
        "https://cdn.21st.dev/assets/localized/bd4a03949cffc3fa4dc8176aa613c9edf61185978f3f5495ff670b99bfa70d94.jpg",
      handle: "@marcusjohnson",
      href: "https://x.com/marcusjohnson",
      id: "sparkbites",
      image:
        "https://cdn.21st.dev/assets/localized/053d448954642091dcbeaf91853f5110142ecc9cbb764f3d135936b521c97045.webp",
      name: "Marcus Johnson",
    },
    {
      avatar:
        "https://cdn.21st.dev/assets/localized/e0d036b61b51d842fa7ee45f4296a39fd45c665a3243dae603b0c3a4c1d82125.jpg",
      handle: "@emilyrodriguez",
      href: "https://x.com/emilyrodriguez",
      id: "svgl",
      image:
        "https://cdn.21st.dev/assets/localized/79e3dcf03f09ea820112f67a426a81c54283c671b7e282ee29aecdab5d65e2e5.webp",
      name: "Emily Rodriguez",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-md py-10">
      <ScrollableCardStack
        cardHeight={200}
        className="mx-auto"
        items={cardData}
        perspective={1200}
        transitionDuration={200}
      />
    </div>
  );
}
