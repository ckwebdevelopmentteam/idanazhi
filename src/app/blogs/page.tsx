'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Search, Clock, Calendar, Tag, X, Share2, BookOpen, Check } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  category: 'Heritage & Architecture' | 'Weddings & Celebrations' | 'Gastronomy' | 'Ayurveda & Living';
  image: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  excerpt: string;
  content: {
    lead: string;
    sections: {
      heading: string;
      paragraphs: string[];
      quote?: string;
    }[];
  };
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 'nalukettu-architecture',
    title: 'The Architecture of Nalukettu: Why Open Courtyards Define Kerala Living',
    subtitle: 'Sacred geometry, central rain-courts, and natural timber cooling in traditional illams',
    category: 'Heritage & Architecture',
    image: '/images/weddings/architecture-corridor.jpg',
    readTime: '6 min read',
    date: 'October 14, 2026',
    author: {
      name: 'K. R. Menon',
      role: 'Heritage Architectural Historian',
    },
    excerpt:
      'Long before modern eco-architecture became a global necessity, the ancient master builders of Kerala engineered timber homes that breathed with the monsoon breezes and celebrated the morning sun through central sky-wells.',
    content: {
      lead:
        'To step across the threshold of a traditional Nalukettu is to enter a world where the boundary between interior shelter and the living sky ceases to exist. Built in strict accordance with the ancient canons of Thachu Shastra (the science of carpentry and sacred vastu), these heritage homesteads are symphonies of teak, laterite, clay tile, and unhurried stillness.',
      sections: [
        {
          heading: 'The Heartbeat: The Nadumuttam Courtyard',
          paragraphs: [
            'At the literal and spiritual center of every Nalukettu sits the Nadumuttam—an open-to-sky inner courtyard surrounded by four wings (Nalu Kettu). During summer months, hot air rises through the open sky-well, drawing cool air in through the low-slung shaded verandahs.',
            'When the Southwest monsoon breaks across Kerala, the Nadumuttam transforms into a living spectacle. Rainwater cascades in crystalline sheets from the copper-edged eaves straight onto the sunken central stone floor, filling the home with the deep, grounding aroma of wet earth and weathered timber.',
          ],
          quote:
            'A Nalukettu does not wall out nature; it invites the monsoon, the stars, and the tropical breeze to take their rightful place at the family table.',
        },
        {
          heading: 'Living Timber: An Ancient Microclimate',
          paragraphs: [
            'Unlike concrete, which traps radiant heat, the seasoned teakwood and rosewood pillars of Idanazhi age gracefully, maintaining a gentle thermal balance. The high gabled roofs, lined with traditional terracotta Mangalore tiles, create an insulating air cushion that keeps rooms cool without artificial conditioning.',
            'Every carved capital, latch, and wooden shutter tells the story of an artisan who worked not against nature, but in reverence to its rhythms.',
          ],
        },
      ],
    },
    tags: ['Nalukettu', 'Kerala Architecture', 'Nadumuttam', 'Heritage Teak', 'Eco Living'],
  },
  {
    id: 'sacred-mandapams',
    title: 'Sacred Mandapams & Temple Weddings: Grace in Every Ritual',
    subtitle: 'From the resonant Nadaswaram to fragrant jasmine garlands, the choreography of Kerala vows',
    category: 'Weddings & Celebrations',
    image: '/images/weddings/stage-heritage-mandapam.jpg',
    readTime: '5 min read',
    date: 'October 08, 2026',
    author: {
      name: 'Ananya Varma',
      role: 'Head of Ceremonies, Idanazhi',
    },
    excerpt:
      'From the auspicious morning Nadaswaram notes to the delicate fragrance of crushed jasmine garlands, discover the timeless choreography of authentic Kerala matrimonial rituals.',
    content: {
      lead:
        'A Kerala wedding is an ode to understated grandeur. Unlike flamboyant modern spectacles, a traditional wedding in Guruvayoor is brief, deeply sacred, and luminous with spiritual intention. At Idanazhi, we honor this sanctity while framing it in an environment of bespoke heritage luxury.',
      sections: [
        {
          heading: 'The Sacred Pillars of the Mandapam',
          paragraphs: [
            'The wedding mandapam is far more than a decorative stage. Raised on a sacred platform, it represents the universe in miniature. Hand-carved teak pillars are adorned with banana saplings symbolizing fertility, fresh mango leaves warding off discord, and cascades of fresh white marigolds and wild jasmine.',
            'At the center stands the towering brass Nilavilakku (traditional oil lamp), whose sesame-oil flame is lit to dispel darkness and witness the holy union.',
          ],
          quote:
            'When the golden Thali is tied to the rhythm of temple drums, two family lineages are joined with the blessing of generations.',
        },
        {
          heading: 'Kasavu Splendor and Sacred Simplicity',
          paragraphs: [
            'Draped in handwoven Kerala Kasavu silk with real gold zari borders, the bride brings an ethereal glow to the morning rites. The ceremony itself is refreshingly poetic: the Pudavamuri (gifting of the ceremonial cloth), the exchange of floral garlands, and the circular procession around the lamp.',
          ],
        },
      ],
    },
    tags: ['Temple Weddings', 'Kerala Rituals', 'Mandapam', 'Guruvayoor', 'Kasavu Silk'],
  },
  {
    id: 'sacred-sadhya',
    title: 'The Sacred Sadhya: A 28-Dish Journey of Farm-to-Table Gastronomy',
    subtitle: 'The sacred geometry of the banana leaf and the Ayurvedic balance of six tastes',
    category: 'Gastronomy',
    image: '/images/experiences/savour-dining.jpg',
    readTime: '7 min read',
    date: 'September 29, 2026',
    author: {
      name: 'Chef Sreekumar',
      role: 'Master of Traditional Kerala Culinary Arts',
    },
    excerpt:
      'Served on tender emerald banana leaves, each dish in a traditional Sadhya is positioned according to ancient Ayurvedic principles of the six tastes (Shadrasa).',
    content: {
      lead:
        'In Kerala, the Sadhya is not merely a feast; it is a ritual of abundance, gratitude, and communal harmony. At Idanazhi, every single ingredient is harvested from our organic heirloom garden plots and local farming cooperatives in Guruvayoor.',
      sections: [
        {
          heading: 'The Sacred Placement on the Leaf',
          paragraphs: [
            'The plantain leaf is laid with its narrow tip pointing to the guest’s left. From top-left to bottom-right, up to twenty-eight distinct preparations find their ordained home.',
            'Salt sits at the extreme corner, followed by sharp lemon pickles and ginger Inji Puli to stimulate digestive fire (Agni). Creamy Avial with fresh garden gourds, comforting Olan stewed in rich first-press coconut milk, and tangy Pachadi provide textural melody.',
          ],
          quote:
            'A true Sadhya leaves the body nourished, the mind peaceful, and the heart overflowing with joy.',
        },
        {
          heading: 'The Grand Finale: Payasam',
          paragraphs: [
            'No Sadhya concludes without the sweet benediction of Payasam. From the velvety Ada Pradhaman cooked slowly with aged Malabar jaggery and coconut milk to the golden Palada bubbling with reduced dairy, each spoonful is an heirloom recipe preserved across generations.',
          ],
        },
      ],
    },
    tags: ['Sadhya Feast', 'Kerala Cuisine', 'Ayurvedic Food', 'Farm to Table', 'Payasam'],
  },
  {
    id: 'ayurvedic-living',
    title: 'The Art of Slow Living: Morning Dew, Herbal Oils, and Unhurried Days',
    subtitle: 'Restoring natural circadian rhythms through ancestral wellness and morning temple bells',
    category: 'Ayurveda & Living',
    image: '/images/experiences/reset-wellness.jpg',
    readTime: '4 min read',
    date: 'September 18, 2026',
    author: {
      name: 'Dr. Lakshmi Nambisan',
      role: 'Resident Ayurvedic Physician',
    },
    excerpt:
      'In a world that never stops moving, the true luxury is time itself. How waking to temple chimes and warm herbal infusions restores deep internal equilibrium.',
    content: {
      lead:
        'At Idanazhi, time does not race forward; it unfurls like a lotus in the morning breeze. We practice the art of Dinacharya—the classical Ayurvedic daily routine that grounds the body and steadies the racing mind.',
      sections: [
        {
          heading: 'Awakening in the Brahma Muhurta',
          paragraphs: [
            'Just before dawn, the farm stay awakens to the distant, melodic cadence of Guruvayoor temple bells. The morning air is crisp with dewdrops hanging from betel nut palms. Guests are offered warm infusions of vetiver (Ramacham) and dry ginger to cleanse and invigorate.',
            'Gentle warm-oil abhyanga treatments follow in our open-air wooden wellness sanctuary, using authentic medicated oils prepared with herbs grown on our soil.',
          ],
          quote:
            'Healing begins the moment you stop rushing through life and begin listening to your breath.',
        },
        {
          heading: 'The Quiet Magic of the Corridors',
          paragraphs: [
            'Afterwards, lounging in the colonnaded Idanazhi passageway with an unhurried book or resting your eyes on the central water basin brings a stillness that city life has long forgotten.',
          ],
        },
      ],
    },
    tags: ['Ayurveda', 'Slow Living', 'Dinacharya', 'Wellness', 'Mindfulness'],
  },
  {
    id: 'ancestral-illams',
    title: 'The Grand Illams of Kerala: A Tapestry of Legend and Woodcraft',
    subtitle: 'The architectural lore of Kerala aristocratic manors and secret granary vaults',
    category: 'Heritage & Architecture',
    image: '/images/weddings/architecture-1.jpg',
    readTime: '5 min read',
    date: 'September 05, 2026',
    author: {
      name: 'Heritage Guild of Kerala',
      role: 'Cultural Documentarians',
    },
    excerpt:
      'A journey through the grand gables, wooden machus, and secret corridors of central Kerala’s most revered ancestral manors.',
    content: {
      lead:
        'The historic illams of Valluvanad and Thrissur stand as proud sentinels of Kerala’s architectural zenith, with imposing multi-tiered wooden gables and sweeping courtyard expanses that inspired many of the design motifs that grace Idanazhi today.',
      sections: [
        {
          heading: 'Mastery of the Traditional Thachan',
          paragraphs: [
            'The carpenter-architects of medieval Kerala used no iron nails in their timber joinery. Beams were fitted with tongue-and-groove precision, pegged with seasoned hardwood that tightened when swollen by monsoon humidity.',
            'From the massive wooden grain chests (Pathayam) to the carved ceiling rosettes featuring celestial motifs, every corner is a testament to human hands crafting enduring heritage.',
          ],
          quote:
            'To dwell inside a heritage mana is to be held by centuries of craftsmanship and quiet dignity.',
        },
      ],
    },
    tags: ['Ancestral Manors', 'Thachan Craft', 'Kerala History', 'Traditional Architecture'],
  },
  {
    id: 'starlit-banquets',
    title: 'Starlit Banquets: Designing Intimate Evening Feasts in Heritage Lawns',
    subtitle: 'Candlelight, brass Urulis, and evening gatherings under the swaying coconut canopy',
    category: 'Weddings & Celebrations',
    image: '/images/weddings/spaces/space-dinner-1.jpg',
    readTime: '4 min read',
    date: 'August 24, 2026',
    author: {
      name: 'Pooja Krishnan',
      role: 'Celebration Stylist',
    },
    excerpt:
      'When twilight falls over Guruvayoor, fairy lights interlace with coconut palm fronds, turning the outdoor lawns into an enchanted fairytale feast.',
    content: {
      lead:
        'While morning ceremonies are steeped in sacred tradition, evening celebrations at Idanazhi take on an intimate, starlit enchantment. Here, long banquet tables stretch beneath tropical canopies, lit by warm candlelight and traditional brass lamps.',
      sections: [
        {
          heading: 'Atmospheric Tablescapes',
          paragraphs: [
            'We believe true luxury is tactile. Crisp linen runners, heavy hand-hammered brass cutlery, terracotta accents, and fragrant tuberoses create an ambiance that is both grounded and effortlessly sophisticated.',
            'Acoustic classical fusion musicians play in the pavilion while guests savor bespoke coastal delicacies and slow-cooked earthen pot specialties.',
          ],
          quote:
            'The most enduring memories are forged when twilight turns to starlight and shared laughter fills the night air.',
        },
      ],
    },
    tags: ['Evening Celebrations', 'Outdoor Banquets', 'Tablescapes', 'Idanazhi Nights'],
  },
];

const categories = [
  'All Stories',
  'Heritage & Architecture',
  'Weddings & Celebrations',
  'Gastronomy',
  'Ayurveda & Living',
] as const;

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Stories');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [copied, setCopied] = useState(false);

  // Sync with URL query parameter on mount and popstate
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const storyId = params.get('story');
      if (storyId) {
        const found = blogPosts.find((p) => p.id === storyId);
        if (found) {
          setActiveArticle(found);
          return;
        }
      }
      setActiveArticle(null);
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  // Lock body scroll when reader modal is active
  useEffect(() => {
    if (activeArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeArticle]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeArticle) {
        closeArticle();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeArticle]);

  const openArticle = (post: BlogPost) => {
    setActiveArticle(post);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('story', post.id);
      window.history.pushState({}, '', url.toString());
    }
  };

  const closeArticle = () => {
    setActiveArticle(null);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('story');
      window.history.pushState({}, '', url.toString());
    }
  };

  const handleShare = (post?: BlogPost) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      const origin = window.location.origin;
      const shareUrl = post ? `${origin}/blogs?story=${post.id}` : window.location.href;
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Filtered stories based on category & search
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All Stories' || post.category === selectedCategory;
      const matchesQuery =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const isDefaultView = selectedCategory === 'All Stories' && !searchQuery;
  const featuredPost = filteredPosts[0] || blogPosts[0];
  // Avoid duplicate: when featuredPost is displayed at top, grid starts from index 1
  const displayPosts = isDefaultView ? filteredPosts.slice(1) : filteredPosts;

  return (
    <main className="min-h-screen bg-paper text-ink pt-[88px] sm:pt-[96px] pb-24 selection:bg-[#7C402E] selection:text-white">
      {/* Editorial Page Header */}
      <section className="relative w-full border-b border-[#7C402E]/15 bg-gradient-to-b from-[#FAF4EC] to-paper py-12 sm:py-18 px-5 sm:px-12">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center text-center">
          {/* Back to Home Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10.5px] sm:text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-[#7C402E] hover:text-[#52291D] transition-colors mb-5 group"
          >
            <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
            Back to Idanazhi Home
          </Link>

          <p className="m-0 mb-2.5 uppercase tracking-[0.26em] text-[10.5px] sm:text-[11.5px] font-semibold text-[#84382B]">
            THE IDANAZHI JOURNAL &amp; CHRONICLES
          </p>

          <h1 className="font-jakarta font-normal text-[clamp(20px,2.6vw,40px)] leading-[1.3] tracking-[-0.015em] uppercase text-[#2D1912] m-0 mb-4 max-w-[880px]">
            Stories of Heritage, Sacred Rites &amp; Unhurried Living
          </h1>

          <p className="font-sans text-[14.5px] sm:text-[16px] text-[#5A3828] max-w-[640px] leading-relaxed m-0 mb-7 font-light">
            Reflections on traditional Kerala architecture, sacred temple wedding rituals,
            farm-to-table culinary notes, and Ayurvedic stillness from the heart of Guruvayoor.
          </p>

          {/* Interactive Search Bar */}
          <div className="w-full max-w-[460px] relative">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7C402E]/60 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stories, architecture, weddings, sadhya..."
              aria-label="Search stories"
              className="w-full bg-white/80 backdrop-blur-sm border border-[#7C402E]/25 rounded-none pl-11 pr-10 py-3 text-[13px] font-sans text-ink placeholder:text-[#5A3828]/50 focus:outline-none focus:border-[#7C402E] focus:bg-white shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink p-1 cursor-pointer"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Category Filter Navigation */}
      <section className="bg-paper/95 border-b border-[#7C402E]/10 py-3 px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 sm:gap-3 py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 text-[10px] sm:text-[11px] font-sans tracking-[0.14em] uppercase transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#7C402E] text-white font-medium shadow-xs'
                  : 'bg-transparent text-[#5A3828] hover:bg-[#7C402E]/10 hover:text-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 pt-10 sm:pt-14">
        {/* Featured Story Banner (Only shown when viewing all stories and no active search) */}
        {isDefaultView && (
          <article
            className="group relative bg-[#FAF4EC] border border-[#7C402E]/20 mb-14 sm:mb-20 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-[#7C402E]/40"
            onClick={() => openArticle(featuredPost)}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
              {/* Featured Image */}
              <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[400px] overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#7C402E] text-white text-[9.5px] tracking-[0.18em] uppercase font-semibold px-3 py-1.5 shadow-sm">
                    FEATURED STORY
                  </span>
                </div>
              </div>

              {/* Featured Editorial Text */}
              <div className="lg:col-span-5 p-7 sm:p-10 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[10.5px] font-sans tracking-[0.14em] uppercase text-[#84382B] mb-3">
                    <span>{featuredPost.category}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-muted">
                      <Clock size={12} /> {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="font-serif text-[clamp(24px,2.4vw,34px)] font-normal text-[#2D1912] leading-[1.22] tracking-[-0.02em] mb-4 group-hover:text-[#7C402E] transition-colors">
                    {featuredPost.title}
                  </h2>

                  <p className="font-sans text-[13.5px] sm:text-[14.5px] leading-relaxed text-[#5A3828] mb-6 font-light">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#7C402E]/15 flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-[12px] font-serif font-semibold text-[#2D1912] m-0">
                      {featuredPost.author.name}
                    </p>
                    <p className="text-[10px] font-sans text-muted tracking-wider uppercase m-0">
                      {featuredPost.author.role}
                    </p>
                  </div>

                  <span className="card-cta">
                    <span className="cta-text">READ ARTICLE</span>
                    <ArrowUpRight size={14} className="cta-arrow" />
                  </span>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Section Heading */}
        <div className="flex items-baseline justify-between mb-8 pb-3 border-b border-[#7C402E]/15">
          <h2 className="font-serif text-[24px] sm:text-[28px] font-normal text-[#2D1912] m-0">
            {isDefaultView ? 'More Stories & Chronicles' : selectedCategory}
          </h2>
          <span className="text-[11px] font-sans text-muted tracking-wider uppercase">
            {displayPosts.length} {displayPosts.length === 1 ? 'Article' : 'Articles'}
          </span>
        </div>

        {/* Stories Grid */}
        {displayPosts.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center">
            <BookOpen size={40} className="text-[#7C402E]/40 mb-4" />
            <p className="font-serif text-[22px] text-[#2D1912] mb-2">No stories found</p>
            <p className="text-muted text-[14px] max-w-[400px] mb-6">
              We couldn&apos;t find any stories matching your query. Try searching with different keywords or reset filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Stories');
              }}
              className="bg-[#7C402E] text-white px-5 py-2.5 text-[11px] tracking-[0.16em] uppercase font-sans cursor-pointer hover:bg-[#5E2B1D] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {displayPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => openArticle(post)}
                className="group flex flex-col bg-white border border-[#7C402E]/15 hover:border-[#7C402E]/40 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF4EC]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#FCF2E7]/95 backdrop-blur-xs text-[#7C402E] text-[9px] tracking-[0.16em] uppercase font-semibold px-2.5 py-1 border border-[#7C402E]/20">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] sm:text-[10.5px] font-sans tracking-[0.12em] uppercase text-muted mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} /> {post.date}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} /> {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-serif text-[20px] sm:text-[22px] font-normal leading-[1.25] tracking-[-0.015em] text-[#2D1912] mb-3 group-hover:text-[#7C402E] transition-colors">
                      {post.title}
                    </h3>

                    <p className="font-sans text-[13px] sm:text-[13.5px] text-[#5A3828] leading-relaxed line-clamp-3 font-light mb-4">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-line/20 flex items-center justify-between mt-auto">
                    <span className="text-[11.5px] font-serif font-medium text-[#2D1912]">
                      {post.author.name}
                    </span>
                    <span className="card-cta">
                      <span className="cta-text">READ ARTICLE</span>
                      <ArrowUpRight size={13} className="cta-arrow" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Experience Idanazhi Sanctuary Banner (Replaces redundant duplicate newsletter box) */}
      <section className="mt-20 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="bg-[#FAF4EC] border border-[#7C402E]/20 p-8 sm:p-12 lg:p-16 text-center flex flex-col items-center">
          <p className="m-0 mb-3 uppercase tracking-[0.24em] text-[10.5px] font-semibold text-[#84382B]">
            EXPERIENCE IDANAZHI
          </p>
          <h2 className="font-serif text-[clamp(26px,3vw,38px)] font-normal text-[#2D1912] m-0 mb-4 max-w-[640px]">
            Immerse Yourself in Living Kerala Heritage
          </h2>
          <p className="font-sans text-[14px] sm:text-[15px] text-[#5A3828] max-w-[540px] leading-relaxed m-0 mb-8 font-light">
            From sacred courtyard weddings to unhurried farm stays among ancestral timber colonnades, allow our concierge to curate your journey.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
            <Link
              href="/stay"
              className="bg-[#7C402E] hover:bg-[#5E2B1D] text-white px-6 py-3.5 text-[10.5px] font-sans font-semibold tracking-[0.18em] uppercase transition-colors text-center w-full sm:w-auto"
            >
              EXPLORE ACCOMMODATIONS
            </Link>
            <Link
              href="/contact"
              className="border border-[#7C402E]/40 text-[#7C402E] hover:bg-[#7C402E]/10 px-6 py-3.5 text-[10.5px] font-sans font-semibold tracking-[0.18em] uppercase transition-colors text-center w-full sm:w-auto"
            >
              PLAN YOUR CELEBRATION
            </Link>
          </div>
        </div>
      </section>

      {/* Full Article Reader Modal with Backdrop Click & ESC handling */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-[80] bg-[rgba(35,18,13,0.7)] backdrop-blur-[6px] flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reader-article-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeArticle();
          }}
        >
          <div className="bg-paper text-ink max-w-[840px] w-full my-auto max-h-[92vh] flex flex-col border border-[#7C402E]/30 shadow-2xl overflow-hidden relative">
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#7C402E]/15 bg-[#FAF4EC] shrink-0">
              <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] font-semibold text-[#84382B]">
                IDANAZHI JOURNAL · {activeArticle.category}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleShare(activeArticle)}
                  className="p-1.5 text-[#7C402E] hover:bg-[#7C402E]/10 rounded-full transition-colors cursor-pointer"
                  title="Share Story Link"
                  aria-label="Share Story Link"
                >
                  {copied ? <Check size={18} className="text-green-700" /> : <Share2 size={18} />}
                </button>
                <button
                  type="button"
                  onClick={closeArticle}
                  className="p-1.5 text-[#2D1912] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
                  aria-label="Close article"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Scrollable Article Body */}
            <div className="overflow-y-auto p-6 sm:p-10 lg:p-12 space-y-6">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-sans tracking-[0.12em] uppercase text-muted">
                <span>{activeArticle.date}</span>
                <span>·</span>
                <span>{activeArticle.readTime}</span>
              </div>

              {/* Title */}
              <h1
                id="reader-article-title"
                className="font-serif text-[clamp(26px,3.2vw,42px)] font-normal leading-[1.2] text-[#2D1912] m-0"
              >
                {activeArticle.title}
              </h1>

              <p className="font-serif text-[16px] sm:text-[18px] text-[#7C402E] italic leading-relaxed m-0 font-light">
                {activeArticle.subtitle}
              </p>

              {/* Author attribution */}
              <div className="flex items-center gap-3 py-3 border-y border-[#7C402E]/15">
                <div className="w-10 h-10 rounded-full bg-[#7C402E]/15 text-[#7C402E] font-serif font-bold flex items-center justify-center text-sm">
                  {activeArticle.author.name[0]}
                </div>
                <div>
                  <p className="text-[13px] font-serif font-semibold text-[#2D1912] m-0">
                    {activeArticle.author.name}
                  </p>
                  <p className="text-[10.5px] font-sans text-muted tracking-wider uppercase m-0">
                    {activeArticle.author.role}
                  </p>
                </div>
              </div>

              {/* Article Hero Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden my-6 border border-[#7C402E]/15">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Lead Paragraph */}
              <p className="font-serif text-[17px] sm:text-[18px] leading-[1.7] text-[#2D1912] first-letter:float-left first-letter:text-[46px] first-letter:leading-none first-letter:pr-3 first-letter:font-serif first-letter:text-[#7C402E]">
                {activeArticle.content.lead}
              </p>

              {/* Body Sections */}
              {activeArticle.content.sections.map((sec, idx) => (
                <div key={idx} className="space-y-4 pt-3">
                  <h3 className="font-serif text-[21px] sm:text-[23px] font-normal text-[#2D1912]">
                    {sec.heading}
                  </h3>
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="font-sans text-[14px] sm:text-[15px] leading-[1.8] text-[#4A2D20] font-light">
                      {p}
                    </p>
                  ))}
                  {sec.quote && (
                    <blockquote className="my-6 pl-5 border-l-2 border-[#7C402E] italic font-serif text-[17px] text-[#7C402E] bg-[#FAF4EC]/60 py-3 pr-4">
                      &ldquo;{sec.quote}&rdquo;
                    </blockquote>
                  )}
                </div>
              ))}

              {/* Tags */}
              <div className="pt-7 border-t border-[#7C402E]/15 flex flex-wrap items-center gap-2">
                <Tag size={14} className="text-[#7C402E]" />
                {activeArticle.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10.5px] font-sans bg-[#FAF4EC] text-[#7C402E] border border-[#7C402E]/20 px-3 py-1"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Bottom CTA within reader */}
              <div className="bg-[#FAF4EC] border border-[#7C402E]/25 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
                <div>
                  <h4 className="font-serif text-[19px] text-[#2D1912] m-0 mb-1">
                    Experience Idanazhi Firsthand
                  </h4>
                  <p className="text-[12.5px] font-sans text-muted m-0">
                    Reserve your sanctuary or arrange a personal celebration consultation.
                  </p>
                </div>
                <Link
                  href="/stay"
                  onClick={closeArticle}
                  className="bg-[#7C402E] hover:bg-[#5E2B1D] text-white px-5 py-2.5 text-[10.5px] font-sans font-semibold tracking-[0.16em] uppercase whitespace-nowrap transition-colors"
                >
                  RESERVE YOUR STAY
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
