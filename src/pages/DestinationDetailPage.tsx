import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Clock, Calendar, Thermometer, DollarSign,
  Languages, MapPin, Plane, Star, CheckCircle, Globe,
} from 'lucide-react';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import BentoGallery, { GalleryImageItem } from '@/components/ui/bento-gallery';
import { CTABanner } from '@/components/CTABanner';
import { SEOHead } from '@/components/SEOHead';

// ── Per-destination data ──────────────────────────────────────────────────────

interface Highlight {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  body: string;
}

interface DestinationData {
  slug: string;
  name: string;
  country: string;
  region: string;
  flag: string;
  tagline: string;
  heroImage: string;
  heroImageAlt: string;
  intro: string;
  body: string;
  rating: number;
  reviewCount: number;
  flightTime: string;
  bestSeason: string;
  currency: string;
  language: string;
  timezone: string;
  visaInfo: string;
  highlights: { title: string; body: string; accent: string }[];
  gallery: GalleryImageItem[];
  themeGradient: string;
  accentColor: string;
}

const DESTINATIONS: Record<string, DestinationData> = {
  rome: {
    slug:        'rome',
    name:        'Rome',
    country:     'Italy',
    region:      'Europe',
    flag:        '🇮🇹',
    tagline:     'Eternal City, Timeless Memories',
    heroImage:   'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1400&auto=format&fit=crop&q=85',
    heroImageAlt:'The Colosseum in Rome at golden hour',
    intro:       'Rome is one of the world\'s most extraordinary cities — a living museum where millennia of history sit side by side with buzzing trattorias, designer boutiques, and baroque piazzas. For Nigerian travellers, Rome offers a rich cultural immersion unlike anywhere else.',
    body:        'From the grandeur of the Colosseum to the intimate streets of Trastevere, every corner of Rome tells a story. Our Lagos–Rome packages include direct flight coordination via major carriers, curated accommodation in the historic centro storico, Vatican private tours, and local dining experiences you won\'t find in any guidebook.',
    rating:      4.9,
    reviewCount: 87,
    flightTime:  '~6.5 hours from Lagos',
    bestSeason:  'April – June, Sept – Oct',
    currency:    'Euro (€)',
    language:    'Italian',
    timezone:    'CET (UTC+1)',
    visaInfo:    'Schengen visa required — we coordinate the application',
    highlights: [
      { title: 'The Colosseum',    body: 'Skip the queue with our pre-booked VIP access to the world\'s most iconic amphitheatre.',        accent: '#f87171' },
      { title: 'Vatican Museums',  body: 'Private guided tours through the Sistine Chapel and St. Peter\'s Basilica.',                    accent: '#60a5fa' },
      { title: 'Trastevere',       body: 'Wander through cobblestone lanes and discover authentic Roman cuisine in this beloved quarter.', accent: '#fbbf24' },
      { title: 'Piazza Navona',    body: 'A baroque masterpiece — fountains, artists, and the best gelato in the city.',                  accent: '#34d399' },
      { title: 'Day Trip: Naples', body: 'Hit Pompeii and the Amalfi Coast in a single breathtaking day excursion.',                     accent: '#a78bfa' },
      { title: 'Cinecittà Shoppe', body: 'Designer shopping along Via Condotti, the heart of Italian fashion.',                          accent: '#f472b6' },
    ],
    gallery: [
      { id: 1, title: 'Colosseum at Dusk',   desc: 'Rome\'s iconic amphitheatre bathed in golden light',     url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',  span: 'md:col-span-2 md:row-span-2' },
      { id: 2, title: 'Trevi Fountain',      desc: 'Baroque masterpiece in the heart of Rome',               url: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=800&q=80', span: '' },
      { id: 3, title: 'Vatican Dome',        desc: 'Michelangelo\'s magnificent St. Peter\'s Basilica',       url: 'https://images.unsplash.com/photo-1587555049481-3aecbc1a0783?w=800&q=80', span: '' },
      { id: 4, title: 'Roman Street',        desc: 'Sunlit cobblestones of Trastevere',                       url: 'https://images.unsplash.com/photo-1519077930-d37c67943b0e?w=800&q=80', span: 'md:row-span-2' },
      { id: 5, title: 'Roman Cuisine',       desc: 'Cacio e pepe — the soul of Roman cooking',                url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80', span: '' },
      { id: 6, title: 'Piazza Navona',       desc: 'The beating heart of baroque Rome',                       url: 'https://images.unsplash.com/photo-1600854964509-fe82ce40b4b3?w=800&q=80', span: 'md:col-span-2' },
    ],
    themeGradient: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #450a0a 100%)',
    accentColor:   '#f87171',
  },

  serengeti: {
    slug:        'serengeti',
    name:        'Serengeti',
    country:     'Tanzania',
    region:      'Africa',
    flag:        '🇹🇿',
    tagline:     'The Great Migration. The Ultimate Safari.',
    heroImage:   'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1400&auto=format&fit=crop&q=85',
    heroImageAlt:'Wildebeest crossing the Serengeti plains',
    intro:       'The Serengeti is Africa\'s most celebrated wildlife sanctuary — a limitless golden plain where the great migration unfolds every year and predator-prey dramas play out on a scale that humbles even the most seasoned traveller.',
    body:        'Our Serengeti expeditions are built around the annual wildebeest migration, one of nature\'s greatest spectacles. We coordinate flights from Lagos via Nairobi or Dar es Salaam, set you up in expertly chosen lodges ranging from intimate tented camps to luxury wilderness retreats, and pair you with highly experienced local guides who read the bush like no guidebook can.',
    rating:      5.0,
    reviewCount: 64,
    flightTime:  '~5 hours from Lagos (via Nairobi)',
    bestSeason:  'July – October (migration peak)',
    currency:    'Tanzanian Shilling (TZS)',
    language:    'Swahili, English',
    timezone:    'EAT (UTC+3)',
    visaInfo:    'e-Visa on arrival available — we guide the process',
    highlights: [
      { title: 'Great Migration',  body: 'Witness 1.5 million wildebeest and zebra crossing the Mara River — nature\'s most dramatic spectacle.', accent: '#fbbf24' },
      { title: 'Big Five Safaris', body: 'Guided game drives in open 4x4 vehicles searching for lion, elephant, leopard, buffalo, and rhino.',    accent: '#34d399' },
      { title: 'Hot Air Balloon',  body: 'Float above the golden plains at sunrise for a perspective unlike anything on the ground.',             accent: '#f87171' },
      { title: 'Ngorongoro Crater',body: 'A UNESCO World Heritage Site — the world\'s largest intact volcanic caldera, teeming with wildlife.',   accent: '#60a5fa' },
      { title: 'Maasai Culture',   body: 'Immersive village visits to understand the Maasai people whose land surrounds the park.',               accent: '#a78bfa' },
      { title: 'Night Safaris',    body: 'Experience the Serengeti after dark — a completely different set of creatures commands the plains.',     accent: '#f472b6' },
    ],
    gallery: [
      { id: 1, title: 'The Great Migration', desc: 'Thousands of wildebeest on the move', url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80', span: 'md:col-span-2 md:row-span-2' },
      { id: 2, title: 'Lion at Dawn',        desc: 'King of the plains at golden hour',   url: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&q=80',      span: '' },
      { id: 3, title: 'Elephant Herd',       desc: 'Family group crossing the savanna',   url: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80',  span: '' },
      { id: 4, title: 'Giraffe Silhouette',  desc: 'Iconic silhouette at sunset',          url: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80',      span: 'md:row-span-2' },
      { id: 5, title: 'Acacia Sunrise',      desc: 'The Serengeti at its most magical',    url: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&q=80',  span: '' },
      { id: 6, title: 'Balloon Safari',      desc: 'Above the plains at sunrise',          url: 'https://images.unsplash.com/photo-1521336575822-6da63fb45455?w=800&q=80',  span: 'md:col-span-2' },
    ],
    themeGradient: 'linear-gradient(135deg, #78350f 0%, #92400e 50%, #451a03 100%)',
    accentColor:   '#fbbf24',
  },

  'greek-islands': {
    slug:        'greek-islands',
    name:        'Greek Islands',
    country:     'Greece',
    region:      'Europe',
    flag:        '🇬🇷',
    tagline:     'Infinity Pools, Caldera Views & Aegean Blue',
    heroImage:   'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1400&auto=format&fit=crop&q=85',
    heroImageAlt:'White-washed buildings of Santorini overlooking the caldera',
    intro:       'The Greek Islands are a dream realised — cerulean waters lapping at white-washed villages, sunset views that defy description, and a warmth of culture and cuisine that makes every visitor feel like a local.',
    body:        'Our island-hopping packages are tailored for Nigerian travellers seeking romance, relaxation, or adventure. From the volcanic drama of Santorini to the lush greenery of Corfu and the party energy of Mykonos, we craft itineraries that move at your pace — with every ferry, villa, and taverna pre-arranged.',
    rating:      4.9,
    reviewCount: 73,
    flightTime:  '~7 hours from Lagos (via Athens)',
    bestSeason:  'May – June, Sept – Oct',
    currency:    'Euro (€)',
    language:    'Greek',
    timezone:    'EET (UTC+2)',
    visaInfo:    'Schengen visa required — we coordinate the application',
    highlights: [
      { title: 'Santorini Sunset',  body: 'Watch the world-famous Oia sunset from a cliffside terrace — pure magic.',                            accent: '#f87171' },
      { title: 'Caldera Sailing',   body: 'Private catamaran cruise around the volcanic caldera with swimming stops at hot springs.',             accent: '#60a5fa' },
      { title: 'Mykonos Nightlife', body: 'The island\'s cosmopolitan energy draws travellers from every corner of the globe.',                   accent: '#a78bfa' },
      { title: 'Rhodes Old Town',   body: 'A UNESCO medieval fortress city — one of the best-preserved in all of Europe.',                       accent: '#fbbf24' },
      { title: 'Beach Hopping',     body: 'Crystal-clear waters from Red Beach to Navagio — each more stunning than the last.',                  accent: '#34d399' },
      { title: 'Greek Cuisine',     body: 'Fresh octopus, fava, and moussaka at tavernas where the owner is also the chef.',                     accent: '#f472b6' },
    ],
    gallery: [
      { id: 1, title: 'Santorini Caldera',  desc: 'The iconic view from Oia',              url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80', span: 'md:col-span-2 md:row-span-2' },
      { id: 2, title: 'Blue Domes',         desc: 'Symbol of the Greek Islands',            url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80', span: '' },
      { id: 3, title: 'Aegean Waters',      desc: 'Crystal clear coves of Mykonos',         url: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80',     span: '' },
      { id: 4, title: 'Sunset Cruise',      desc: 'Golden hour on the Aegean Sea',           url: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=800&q=80', span: 'md:row-span-2' },
      { id: 5, title: 'Greek Cuisine',      desc: 'Fresh seafood at a harbour taverna',      url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',     span: '' },
      { id: 6, title: 'Windmills of Mykonos', desc: 'Iconic landmark at the water\'s edge', url: 'https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?w=800&q=80', span: 'md:col-span-2' },
    ],
    themeGradient: 'linear-gradient(135deg, #1e3a5f 0%, #0f4c81 50%, #0c2d4e 100%)',
    accentColor:   '#60a5fa',
  },

  dubai: {
    slug:        'dubai',
    name:        'Dubai',
    country:     'UAE',
    region:      'Middle East',
    flag:        '🇦🇪',
    tagline:     'Sky-High Ambition, Desert Soul',
    heroImage:   'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1400&auto=format&fit=crop&q=85',
    heroImageAlt:'Dubai skyline with Burj Khalifa towering over the city',
    intro:       'Dubai is the city that refused to accept limits. In a single visit you can ski indoors, dine 124 floors above the ground, safari across golden dunes, and shop in the world\'s largest mall — all in the same day.',
    body:        'A perennial favourite for Nigerian travellers, Dubai is a natural stopover that deserves its own full itinerary. We coordinate direct flights from Lagos, premium hotel blocks at properties along Sheikh Zayed Road or Palm Jumeirah, desert safari experiences, and everything in between — at price points from aspirational to ultra-luxury.',
    rating:      4.9,
    reviewCount: 112,
    flightTime:  '~6 hours from Lagos (direct)',
    bestSeason:  'November – March',
    currency:    'UAE Dirham (AED)',
    language:    'Arabic, English',
    timezone:    'GST (UTC+4)',
    visaInfo:    'Visa on arrival for Nigerian passport holders (30 days)',
    highlights: [
      { title: 'Burj Khalifa',       body: 'Ascend to the observation deck at 555m — the highest in the world.',                              accent: '#fbbf24' },
      { title: 'Desert Safari',      body: 'Dune bashing, camel riding, and a traditional Bedouin camp dinner under the stars.',              accent: '#f87171' },
      { title: 'Palm Jumeirah',      body: 'The man-made island that redefined what\'s possible — beachfront dining and luxury stays.',       accent: '#60a5fa' },
      { title: 'Dubai Mall',         body: '1,200+ stores, an indoor ice rink, and the world\'s largest indoor aquarium.',                    accent: '#34d399' },
      { title: 'Gold & Spice Souks', body: 'Abra across Dubai Creek to explore the traditional trading heart of old Dubai.',                  accent: '#f472b6' },
      { title: 'Ski Dubai',          body: 'Real snow in the middle of the desert — a genuinely surreal experience.',                         accent: '#a78bfa' },
    ],
    gallery: [
      { id: 1, title: 'Burj Khalifa',    desc: 'The world\'s tallest building at twilight', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',  span: 'md:col-span-2 md:row-span-2' },
      { id: 2, title: 'Desert Safari',   desc: 'Golden dunes of the Arabian desert',         url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',  span: '' },
      { id: 3, title: 'Dubai Marina',    desc: 'Glittering waterfront skyline at night',     url: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&q=80',   span: '' },
      { id: 4, title: 'Palm Jumeirah',   desc: 'The iconic man-made island from above',       url: 'https://images.unsplash.com/photo-1585945268752-9e6c14af84e5?w=800&q=80',  span: 'md:row-span-2' },
      { id: 5, title: 'Gold Souk',       desc: 'The glittering heart of old Dubai',           url: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80',  span: '' },
      { id: 6, title: 'Dubai Fountain',  desc: 'The world\'s largest choreographed fountain', url: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80',     span: 'md:col-span-2' },
    ],
    themeGradient: 'linear-gradient(135deg, #78350f 0%, #92400e 50%, #451a03 100%)',
    accentColor:   '#fbbf24',
  },

  london: {
    slug:        'london',
    name:        'London',
    country:     'United Kingdom',
    region:      'Europe',
    flag:        '🇬🇧',
    tagline:     'The Gateway to Europe',
    heroImage:   'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1400&auto=format&fit=crop&q=85',
    heroImageAlt:'Tower Bridge and the London skyline along the Thames',
    intro:       'London is the most connected city in the world for Nigerian travellers — a familiar yet endlessly surprising metropolis with deep cultural ties to West Africa and an energy that never lets up.',
    body:        'Whether you\'re arriving for business, study, a medical trip, or pure leisure, London rewards every type of traveller. We coordinate UK Standard Visitor Visa applications (a notoriously complex process), direct Lagos-Heathrow flights, and London accommodations from budget Shoreditch to five-star Mayfair.',
    rating:      4.8,
    reviewCount: 94,
    flightTime:  '~6.5 hours from Lagos (direct)',
    bestSeason:  'May – September',
    currency:    'British Pound (£)',
    language:    'English',
    timezone:    'GMT (UTC+0) / BST (UTC+1)',
    visaInfo:    'UK Standard Visitor Visa required — we assist with applications',
    highlights: [
      { title: 'Tower of London',   body: 'Crown Jewels, Beefeaters, and 900 years of royal history on the banks of the Thames.',          accent: '#f87171' },
      { title: 'Borough Market',    body: 'London\'s oldest food market — a sensory feast of global flavours just steps from London Bridge.', accent: '#34d399' },
      { title: 'West End Shows',    body: 'Hamilton, The Lion King, Les Misérables — we handle ticket booking for the hottest shows.',      accent: '#a78bfa' },
      { title: 'Museum Mile',       body: 'The British Museum, V&A, Natural History — all free, all world-class, all within walking distance.', accent: '#60a5fa' },
      { title: 'Notting Hill',      body: 'Explore the colourful neighbourhood that\'s home to the world\'s largest street carnival.',      accent: '#fbbf24' },
      { title: 'Day Trip: Oxford',  body: 'Just 60 minutes by train to one of the world\'s greatest university cities.',                    accent: '#f472b6' },
    ],
    gallery: [
      { id: 1, title: 'Tower Bridge',    desc: 'London\'s most iconic landmark',            url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',  span: 'md:col-span-2 md:row-span-2' },
      { id: 2, title: 'Big Ben',         desc: 'Parliament and Westminster at twilight',     url: 'https://images.unsplash.com/photo-1543832923-44667a44c804?w=800&q=80',     span: '' },
      { id: 3, title: 'Borough Market',  desc: 'London\'s celebrated street food market',    url: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=800&q=80',  span: '' },
      { id: 4, title: 'Notting Hill',    desc: 'Colourful terraces of West London',          url: 'https://images.unsplash.com/photo-1490642914619-7955a3fd483c?w=800&q=80',  span: 'md:row-span-2' },
      { id: 5, title: 'The Shard',       desc: 'London\'s glittering glass skyline',          url: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&q=80',  span: '' },
      { id: 6, title: 'Buckingham',     desc: 'The Changing of the Guard ceremony',          url: 'https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=800&q=80',  span: 'md:col-span-2' },
    ],
    themeGradient: 'linear-gradient(135deg, #1e3a5f 0%, #1e3a5f 50%, #0f172a 100%)',
    accentColor:   '#60a5fa',
  },

  'new-york': {
    slug:        'new-york',
    name:        'New York',
    country:     'United States',
    region:      'Americas',
    flag:        '🇺🇸',
    tagline:     'The City That Never Sleeps',
    heroImage:   'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1400&auto=format&fit=crop&q=85',
    heroImageAlt:'Manhattan skyline from the Hudson River at sunset',
    intro:       'New York City is an assault on the senses — in the very best way. Eight million stories compressed into five boroughs, with a pace, diversity, and ambition that makes it unlike any other city on Earth.',
    body:        'We\'ve sent hundreds of Nigerian travellers to New York — for business, study, family visits, and leisure. Our NYC packages cover US visa guidance (a critical step), direct or one-stop flights from Lagos, Manhattan hotel blocks, and a curated city guide that goes well beyond Times Square.',
    rating:      4.8,
    reviewCount: 88,
    flightTime:  '~11 hours from Lagos (direct)',
    bestSeason:  'April – June, Sept – Nov',
    currency:    'US Dollar ($)',
    language:    'English',
    timezone:    'EST (UTC-5) / EDT (UTC-4)',
    visaInfo:    'B1/B2 US visa required — we guide the application process',
    highlights: [
      { title: 'Central Park',       body: 'The 843-acre green lung of Manhattan — cycling, picnics, and the Bethesda Fountain.',           accent: '#34d399' },
      { title: 'Brooklyn Bridge',    body: 'Walk the iconic suspension bridge for the best views of the Manhattan skyline.',                accent: '#60a5fa' },
      { title: 'The Met Museum',     body: 'One of the world\'s greatest museums — African art, Egyptian antiquities, and 5,000 years.',   accent: '#f87171' },
      { title: 'Harlem',             body: 'Explore the cultural heartbeat of Black America — jazz, soul food, and living history.',        accent: '#a78bfa' },
      { title: 'Food Scene',         body: 'Nigerian, Ghanaian, and West African restaurants in the Bronx and Brooklyn — taste home away.', accent: '#fbbf24' },
      { title: 'Times Square',       body: 'Go once, stand there for 10 minutes, take the photo, and then go find the real New York.',     accent: '#f472b6' },
    ],
    gallery: [
      { id: 1, title: 'Manhattan Skyline', desc: 'NYC from the Hudson River',             url: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80', span: 'md:col-span-2 md:row-span-2' },
      { id: 2, title: 'Brooklyn Bridge',   desc: 'The iconic bridge at golden hour',       url: 'https://images.unsplash.com/photo-1555109307-f7d9da25c244?w=800&q=80',    span: '' },
      { id: 3, title: 'Central Park',      desc: 'Autumn colours in 843 acres of green',   url: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80', span: '' },
      { id: 4, title: 'Times Square',      desc: 'The crossroads of the world',             url: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80', span: 'md:row-span-2' },
      { id: 5, title: 'NYC Food Scene',    desc: 'The city\'s legendary culinary diversity', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80', span: '' },
      { id: 6, title: 'Empire State',      desc: 'Art Deco icon of the NYC skyline',        url: 'https://images.unsplash.com/photo-1499092346302-b8d7a599720e?w=800&q=80', span: 'md:col-span-2' },
    ],
    themeGradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #0f0e2a 100%)',
    accentColor:   '#a78bfa',
  },

  cartagena: {
    slug:        'cartagena',
    name:        'Cartagena',
    country:     'Colombia',
    region:      'Americas',
    flag:        '🇨🇴',
    tagline:     'Colombia\'s Caribbean Jewel',
    heroImage:   'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1400&auto=format&fit=crop&q=85',
    heroImageAlt:'Colourful colonial architecture of Cartagena\'s old city',
    intro:       'Cartagena is one of the most beautiful cities in Latin America — a UNESCO-listed walled colonial city exploding with colour, history, and Caribbean energy. It\'s the perfect first step into South America.',
    body:        'Our Cartagena packages connect Lagos to Bogotá and on to Cartagena, with curated stays in the walled city\'s boutique hotels and seamless day trip coordination to the Rosario Islands, Barú beach, and Palenque — a village founded by freed African slaves with deep cultural connections to Nigeria.',
    rating:      4.8,
    reviewCount: 41,
    flightTime:  '~14 hours from Lagos (via Europe or US)',
    bestSeason:  'December – April',
    currency:    'Colombian Peso (COP)',
    language:    'Spanish',
    timezone:    'COT (UTC-5)',
    visaInfo:    'No visa required for Nigerian passport (90 days tourist)',
    highlights: [
      { title: 'Walled Old City',   body: 'UNESCO-listed colonial fortress city with pastel-coloured mansions and bougainvillea-draped walls.', accent: '#f472b6' },
      { title: 'Rosario Islands',   body: 'Crystal-clear Caribbean waters and vibrant coral reefs just 45 minutes by boat.',                    accent: '#34d399' },
      { title: 'Palenque Village',  body: 'Visit the first free African town in the Americas — a living piece of African diaspora history.',    accent: '#fbbf24' },
      { title: 'Street Food',       body: 'Arepas, ceviche, and patacones from the legendary palenqueras of the walled city.',                 accent: '#f87171' },
      { title: 'Sunset Cruise',     body: 'Sail around the bay at dusk with cocktails and a Caribbean soundtrack.',                             accent: '#60a5fa' },
      { title: 'Castillo San Felipe',body: 'The largest Spanish colonial fortress ever built in the Americas — an engineering marvel.',         accent: '#a78bfa' },
    ],
    gallery: [
      { id: 1, title: 'Old City Walls',   desc: 'UNESCO-listed colonial fortifications',     url: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80',  span: 'md:col-span-2 md:row-span-2' },
      { id: 2, title: 'Caribbean Beach',  desc: 'Crystal waters of the Rosario Islands',     url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',   span: '' },
      { id: 3, title: 'Colonial Streets', desc: 'Cartagena\'s signature colourful facades',   url: 'https://images.unsplash.com/photo-1574871786514-46e1680ea587?w=800&q=80',   span: '' },
      { id: 4, title: 'Castillo San Felipe', desc: 'The great Spanish fortress above the city', url: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&q=80', span: 'md:row-span-2' },
      { id: 5, title: 'Local Cuisine',    desc: 'Colombia\'s rich Caribbean food culture',    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',   span: '' },
      { id: 6, title: 'Sunset Bay',       desc: 'Golden hour over Cartagena bay',              url: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80',  span: 'md:col-span-2' },
    ],
    themeGradient: 'linear-gradient(135deg, #4a1d96 0%, #5b21b6 50%, #2e1065 100%)',
    accentColor:   '#a78bfa',
  },

  'buenos-aires': {
    slug:        'buenos-aires',
    name:        'Buenos Aires',
    country:     'Argentina',
    region:      'Americas',
    flag:        '🇦🇷',
    tagline:     'The Paris of South America',
    heroImage:   'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=1400&auto=format&fit=crop&q=85',
    heroImageAlt:'Colourful buildings of La Boca neighbourhood in Buenos Aires',
    intro:       'Buenos Aires is a city of passion — in its tango, its food, its football, and its people. A sprawling, European-inflected metropolis with a distinctly Latin American soul, it rewards those willing to stay a week and explore properly.',
    body:        'As the gateway to South America\'s southernmost adventures, Buenos Aires is an essential stop on any Latin America expedition. We coordinate long-haul flights from Lagos, curated stays in Palermo or Recoleta, tango show packages, steakhouse dinners at parrillas that change your understanding of beef, and optional extensions to Patagonia or Iguazú Falls.',
    rating:      4.7,
    reviewCount: 35,
    flightTime:  '~16 hours from Lagos (via Europe)',
    bestSeason:  'October – April (southern spring/summer)',
    currency:    'Argentine Peso (ARS)',
    language:    'Spanish',
    timezone:    'ART (UTC-3)',
    visaInfo:    'No visa required for Nigerian passport (90 days)',
    highlights: [
      { title: 'La Boca',         body: 'The iconic colourful neighbourhood that\'s home to the Boca Juniors and the birthplace of tango.', accent: '#f87171' },
      { title: 'Tango Show',      body: 'An authentic milonga tango performance with dinner — one of the great cultural experiences of SA.', accent: '#f472b6' },
      { title: 'Parrilla Dinner', body: 'Argentine beef is in a category of its own. An asado evening at a traditional parrilla is essential.', accent: '#fbbf24' },
      { title: 'Recoleta Cemetery', body: 'The most spectacular cemetery in the world — an open-air museum of Argentine history.',          accent: '#a78bfa' },
      { title: 'Palermo Soho',    body: 'Trendy boutiques, craft beer bars, and street art in the hippest barrio in the city.',             accent: '#34d399' },
      { title: 'Iguazú Falls',    body: 'Extension: 80km of waterfalls on the Brazilian border — wider than Niagara, taller than Victoria.', accent: '#60a5fa' },
    ],
    gallery: [
      { id: 1, title: 'La Boca',            desc: 'Buenos Aires\' most colourful neighbourhood',  url: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800&q=80',   span: 'md:col-span-2 md:row-span-2' },
      { id: 2, title: 'Obelisco',           desc: 'The iconic heart of Buenos Aires',              url: 'https://images.unsplash.com/photo-1562516710-8bcd8c62b79e?w=800&q=80',      span: '' },
      { id: 3, title: 'Tango',              desc: 'The dance that defines the city',               url: 'https://images.unsplash.com/photo-1545041703-f4bb2e31a9f0?w=800&q=80',      span: '' },
      { id: 4, title: 'Iguazú Falls',       desc: 'One of the world\'s great natural wonders',     url: 'https://images.unsplash.com/photo-1590577976322-3d2d6a2130f5?w=800&q=80',    span: 'md:row-span-2' },
      { id: 5, title: 'Argentine Asado',    desc: 'The sacred ritual of Argentine barbecue',       url: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80',      span: '' },
      { id: 6, title: 'Recoleta',           desc: 'The grand Parisian boulevards of Recoleta',     url: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&q=80',   span: 'md:col-span-2' },
    ],
    themeGradient: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #022c22 100%)',
    accentColor:   '#34d399',
  },
};

// ── Sub-components ────────────────────────────────────────────────────────────

const fadeUp = {
  initial:     { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: false, margin: '-60px' },
  transition:  { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

function DestinationPassportCard({ dest, t }: {
  dest: DestinationData & { heroImage: string; heroImageAlt: string; flag: string; name: string; country: string; region: string; rating: number; reviewCount: number; accentColor: string; flightTime: string; bestSeason: string; currency: string; language: string; timezone: string; visaInfo: string };
  t: (key: string, opts?: Record<string, unknown>) => string;
}) {
  const accent = dest.accentColor;
  const cells = [
    { Icon: Plane,      label: t('destination_detail.info_flight'),   value: dest.flightTime },
    { Icon: Calendar,   label: t('destination_detail.info_season'),   value: dest.bestSeason },
    { Icon: DollarSign, label: t('destination_detail.info_currency'), value: dest.currency   },
    { Icon: Languages,  label: t('destination_detail.info_language'), value: dest.language   },
    { Icon: Clock,      label: t('destination_detail.info_timezone'), value: dest.timezone   },
    { Icon: Globe,      label: t('destination_detail.info_visa'),     value: dest.visaInfo   },
  ];

  return (
    <div className="rounded-3xl overflow-hidden bg-white"
      style={{ border: '1px solid rgba(13,27,56,0.08)', boxShadow: '0 12px 48px -8px rgba(13,27,56,0.13)' }}>

      {/* ── Photo header ── */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={dest.heroImage} alt={dest.heroImageAlt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          style={{ objectPosition: 'center 35%' }}
        />
        {/* dark gradient from bottom */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 10%, rgba(10,22,46,0.82) 100%)' }} />
        {/* accent side tint */}
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to right, ${accent}55 0%, transparent 60%)` }} />

        {/* Bottom info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
          <div>
            <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.16em] mb-0.5" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              {dest.country} · {dest.region}
            </p>
            <h3 className="text-white text-2xl font-black leading-none" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              {dest.flag} {dest.name}
            </h3>
          </div>
          {/* Rating badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full shrink-0"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(10px)' }}>
            <Star className="w-3 h-3" style={{ fill: '#fbbf24', color: '#fbbf24' }} />
            <span className="text-white text-xs font-black" style={{ fontFamily: 'Satoshi, sans-serif' }}>{dest.rating}</span>
            <span className="text-white/45 text-[10px]" style={{ fontFamily: 'Satoshi, sans-serif' }}>({dest.reviewCount})</span>
          </div>
        </div>
      </div>

      {/* ── Section label ── */}
      <div className="flex items-center gap-2 px-5 py-3"
        style={{ background: `${accent}0c`, borderBottom: `1px solid ${accent}1a` }}>
        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accent }} />
        <p className="text-[10px] font-black uppercase tracking-[0.22em]"
          style={{ fontFamily: 'Satoshi, sans-serif', color: accent }}>
          {t('destination_detail.trip_glance')}
        </p>
      </div>

      {/* ── Info grid ── */}
      <div className="grid grid-cols-2">
        {cells.map(({ Icon, label, value }, i) => (
          <div
            key={label}
            className="group flex items-start gap-3 p-4 transition-colors duration-200 hover:bg-[rgba(13,27,56,0.025)]"
            style={{
              borderRight:  i % 2 === 0 ? '1px solid rgba(13,27,56,0.06)' : 'none',
              borderBottom: i < cells.length - 2 ? '1px solid rgba(13,27,56,0.06)' : 'none',
            }}
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200"
              style={{ background: `${accent}12` }}>
              <Icon className="w-3.5 h-3.5" style={{ color: accent }} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-0.5"
                style={{ fontFamily: 'Satoshi, sans-serif', color: 'rgba(13,27,56,0.32)' }}>{label}</p>
              <p className="text-[13px] font-semibold leading-snug"
                style={{ fontFamily: 'Satoshi, sans-serif', color: '#0d1b38' }}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <div className="p-4" style={{ borderTop: '1px solid rgba(13,27,56,0.06)' }}>
        <Link to="/enquiries">
          <motion.div
            className="flex items-center justify-between px-4 py-3 rounded-2xl cursor-pointer"
            style={{ background: `${accent}10`, border: `1px solid ${accent}22` }}
            whileHover={{ background: `${accent}1c` }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-sm font-bold" style={{ fontFamily: 'Satoshi, sans-serif', color: accent }}>
              {t('destination_detail.plan_cta', { name: dest.name })}
            </span>
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: accent }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </div>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DestinationDetailPage() {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const dest = slug ? DESTINATIONS[slug] : undefined;

  if (!dest) return <Navigate to="/destinations" replace />;

  return (
    <div className="min-h-screen">
      <SEOHead
        title={`${dest.name}, ${dest.country} — Next Route Travels`}
        description={dest.intro}
        canonicalPath={`/destinations/${dest.slug}`}
      />


      {/* ── HERO SCROLL — dark navy ── */}
      <section className="bg-[#0d1b38] relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
          style={{ background: `${dest.accentColor}12`, filter: 'blur(120px)' }}
        />
        <ContainerScroll
          titleComponent={
            <div className="px-4 pt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-center gap-2 mb-5"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
                  <span className="text-xl">{dest.flag}</span>
                  <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    {dest.country} · {dest.region}
                  </span>
                </div>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.92] mb-4"
                style={{ fontFamily: 'Clash Display, sans-serif' }}
              >
                {dest.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
                className="text-lg md:text-xl text-white/40 mb-8"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {dest.tagline}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
                className="flex items-center justify-center gap-4 flex-wrap"
              >
                <div className="flex items-center gap-1.5">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className="w-4 h-4" style={{
                      fill:  s <= Math.floor(dest.rating) ? '#fbbf24' : 'transparent',
                      color: s <= Math.floor(dest.rating) ? '#fbbf24' : 'rgba(255,255,255,0.2)',
                      strokeWidth: 1.5,
                    }} />
                  ))}
                  <span className="text-sm font-bold text-white/70 ml-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    {dest.rating} ({t('destination_detail.reviews_count', { count: dest.reviewCount })})
                  </span>
                </div>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <div className="flex items-center gap-1.5 text-sm text-white/50" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  <MapPin className="w-3.5 h-3.5" style={{ color: dest.accentColor }} />
                  {dest.region}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-white/50" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  <Thermometer className="w-3.5 h-3.5" style={{ color: dest.accentColor }} />
                  {dest.bestSeason}
                </div>
              </motion.div>
            </div>
          }
        >
          <img
            src={dest.heroImage}
            alt={dest.heroImageAlt}
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 40%' }}
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(13,27,56,0.4) 0%, transparent 60%)' }} />
        </ContainerScroll>
      </section>

      {/* ── INTRO & PRACTICAL INFO — white ── */}
      <section className="relative px-6 py-24 bg-[#f5f8fc] overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{ background: `${dest.accentColor}09`, filter: 'blur(100px)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full pointer-events-none"
          style={{ background: `${dest.accentColor}07`, filter: 'blur(80px)', transform: 'translate(-30%, 30%)' }} />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-14 xl:gap-20 items-start">

            {/* ── Left: editorial text ── */}
            <div>
              <motion.div {...fadeUp}>
                {/* Meta row: flag + region + rating */}
                <div className="flex items-center gap-3 flex-wrap mb-7">
                  <span className="text-2xl leading-none">{dest.flag}</span>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                    style={{ background: `${dest.accentColor}12`, border: `1px solid ${dest.accentColor}28` }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: dest.accentColor }} />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]"
                      style={{ fontFamily: 'Satoshi, sans-serif', color: dest.accentColor }}>
                      {t('destination_detail.about_eyebrow')} {dest.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5" style={{
                        fill:   s <= Math.floor(dest.rating) ? '#fbbf24' : 'rgba(13,27,56,0.12)',
                        color:  s <= Math.floor(dest.rating) ? '#fbbf24' : 'rgba(13,27,56,0.12)',
                        strokeWidth: 0,
                      }} />
                    ))}
                    <span className="text-xs font-bold ml-1" style={{ fontFamily: 'Satoshi, sans-serif', color: 'rgba(13,27,56,0.45)' }}>
                      {dest.rating}
                    </span>
                  </div>
                </div>

                {/* Intro pull-quote with accent left border */}
                <div className="relative pl-5 mb-6"
                  style={{ borderLeft: `3px solid ${dest.accentColor}` }}>
                  <p className="text-2xl md:text-[1.7rem] font-black leading-[1.22]"
                    style={{ fontFamily: 'Clash Display, sans-serif', color: '#0d1b38' }}>
                    {dest.intro}
                  </p>
                </div>

                <p className="text-base leading-[1.8]"
                  style={{ fontFamily: 'Satoshi, sans-serif', color: 'rgba(13,27,56,0.52)' }}>
                  {dest.body}
                </p>
              </motion.div>

              {/* Quick-stat pills */}
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="mt-8 flex items-center gap-3 flex-wrap"
              >
                {[
                  { Icon: Plane,    text: dest.flightTime },
                  { Icon: Calendar, text: dest.bestSeason },
                ].map(({ Icon, text }) => (
                  <div key={text}
                    className="flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{ background: 'rgba(13,27,56,0.05)', border: '1px solid rgba(13,27,56,0.08)' }}>
                    <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: dest.accentColor }} />
                    <span className="text-xs font-semibold" style={{ fontFamily: 'Satoshi, sans-serif', color: 'rgba(13,27,56,0.65)' }}>{text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Right: Destination Passport Card ── */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              <DestinationPassportCard dest={dest} t={t} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS — dark navy ── */}
      <section className="py-24 px-6 bg-[#0d1b38]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 mb-5 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: dest.accentColor }} />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {t('destination_detail.highlights_eyebrow')}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              {t('destination_detail.highlights_heading', { name: dest.name })}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {dest.highlights.map(({ title, body, accent }, i) => (
              <motion.div
                key={title}
                {...fadeUp}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                className="relative p-6 rounded-2xl overflow-hidden transition-all duration-500"
                style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${accent}22` }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.05)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.025)'; }}
              >
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }} />
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${accent}18` }}>
                    <CheckCircle className="w-4 h-4" style={{ color: accent }} />
                  </div>
                  <h3 className="text-base font-black text-white pt-1" style={{ fontFamily: 'Clash Display, sans-serif' }}>{title}</h3>
                </div>
                <p className="text-sm text-white/40 leading-relaxed pl-11" style={{ fontFamily: 'Satoshi, sans-serif' }}>{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY — white ── */}
      <div className="bg-[#f5f8fc]">
        <BentoGallery
          dark={false}
          imageItems={dest.gallery}
          title={t('destination_detail.gallery_title', { name: dest.name })}
          description={t('destination_detail.gallery_desc')}
        />
      </div>

      {/* ── BOTTOM CTA — dark themed ── */}
      <section className="px-6 py-20 bg-[#0d1b38]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            {...fadeUp}
            className="relative rounded-3xl overflow-hidden px-8 py-12 text-center"
            style={{ background: dest.themeGradient, border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="absolute inset-0 opacity-[0.04]" aria-hidden
              style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
            />
            <div className="relative z-10">
              <span className="text-4xl mb-4 block">{dest.flag}</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                {t('destination_detail.cta_heading', { name: dest.name })}
              </h2>
              <p className="text-white/60 mb-8 text-base" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {t('destination_detail.cta_body', { name: dest.name })}
              </p>
              <Link to="/enquiries">
                <motion.span
                  className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full cursor-pointer bg-white text-[#0d1b38]"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                >
                  <span className="text-sm font-bold" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    {t('destination_detail.cta_button', { name: dest.name })}
                  </span>
                  <span className="w-9 h-9 rounded-full bg-[#0d1b38] text-white flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </span>
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
