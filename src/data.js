import ss1 from './assets/images/ss1.jpg';
import ss2 from './assets/images/ss2.gif';
import ss3 from './assets/images/TokyoSkyline.jpg';
import ss4 from './assets/images/amalfi.jpg';
import ss5 from './assets/images/kyotojapan.jpg';
import d6 from './assets/images/d6.jpg'

export const TRIPS = [
  {
    id: 1, title: 'Swiss Alps Luxury Escape', status: 'building',
    destination: 'Zermatt & Grindelwald, Switzerland',
    image: ss1,
    dates: 'Jul 4 – Jul 12, 2025', days: 8, guests: 2, budget: '$14,200',
    tags: ['5-Star', 'Adventure', 'Luxury'],
  },
  {
    id: 2, title: 'Honeymoon in Maldives', status: 'confirmed',
    destination: 'North Malé Atoll, Maldives',
    image: ss2,
    dates: 'Aug 14 – Aug 21, 2025', days: 7, guests: 2, budget: '$9,400',
    tags: ['Romantic', 'Beach'],
  },
  {
    id: 3, title: 'Tokyo Business Loop', status: 'confirmed',
    destination: 'Tokyo, Japan',
    image: ss3,
    dates: 'Sep 3 – Sep 7, 2025', days: 4, guests: 1, budget: '$3,800',
    tags: ['Business', 'City'],
  },
  {
    id: 4, title: 'Amalfi Family Summer', status: 'pending',
    destination: 'Amalfi Coast, Italy',
    image: ss4,
    dates: 'Jul 20 – Jul 30, 2025', days: 10, guests: 4, budget: '$12,400',
    tags: ['Family', 'Scenic'],
  },
  {
    id: 5, title: 'Kyoto Cherry Blossom', status: 'booked',
    destination: 'Kyoto, Japan',
    image: ss5,
    dates: 'Mar 25 – Mar 30, 2026', days: 5, guests: 2, budget: '$5,600',
    tags: ['Cultural', 'Seasonal'],
  },
]

export const SAVED_DESTINATIONS = [
  { id: 1, name: 'Santorini, Greece' },
  { id: 2, name: 'Bali, Indonesia' },
  { id: 3, name: 'Patagonia, Argentina' },
]

// ─── Full booking details per trip ────────────────────────────────────────────
// BookingDetails.jsx reads from this — one entry per trip id

export const BOOKING_DETAILS = {
  1: { // Swiss Alps
    destination: 'Zermatt & Grindelwald',
    hero: ss1,
    subtitle: 'Luxury Escape · 8 nights · 2 guests',
    dates: 'Jul 4 – Jul 12, 2025',
    total: '$14,200',
    status: 'Building',
    aiScore: 91,
    flights: [
      {
        icon: '✈️',
        route: 'London Heathrow → Geneva Intl',
        code: 'LX0340',
        date: 'Fri Jul 4 · 09:00',
        class: 'Business Class',
        status: 'Seats held',
        price: '$2,800',
        statusCls: 'cb-tag--blue',
      },
      {
        icon: '✈️',
        route: 'Geneva Intl → London Heathrow',
        code: 'LX0341',
        date: 'Sat Jul 12 · 17:30',
        class: 'Business Class',
        status: 'Pending',
        price: '$2,800',
        statusCls: 'cb-tag--amber',
      },
    ],
    hotel: {
      name: 'The Omnia Zermatt',
      image: ss1,
      type: 'Mountain Suite · Matterhorn view',
      nights: '8 nights · Jul 4 – Jul 12',
      rating: 4.9,
      price: '$6,400',
      amenities: ['Infinity pool', 'Spa & sauna', 'Ski-in/ski-out', 'Fine dining'],
    },
    activities: [
      { icon: '🏔️', name: 'Matterhorn Base Hike', detail: 'Schwarzsee · 6 hours · Level 3 · Guide included', price: '$480', status: 'Booked', statusCls: 'cb-tag--green' },
      { icon: '🚂', name: 'Glacier Express Journey', detail: 'Zermatt → Grindelwald · Excellence class · Panoramic rail', price: '$320', status: 'Booked', statusCls: 'cb-tag--green' },
      { icon: '👨‍🍳', name: 'Private Chef Evening', detail: '5-course dinner · Wine pairing · In-chalet · AI recommended', price: '$640', status: 'AI Pick', statusCls: 'cb-tag--purple', isAI: true },
      { icon: '🎿', name: 'Heli-Skiing Excursion', detail: 'Off-piste · Certified instructor · Private helicopter', price: '$1,200', status: 'Optional', statusCls: 'cb-tag--grey' },
    ],
    breakdown: [
      { icon: '✈️', label: 'Flights (2 persons, return)', amount: '$5,600' },
      { icon: '🏨', label: 'The Omnia Zermatt · 8 nights', amount: '$6,400' },
      { icon: '🚗', label: 'Transfers & private car', amount: '$760' },
      { icon: '🏔️', label: 'Activities & experiences', amount: '$1,440' },
    ],
  },

  2: { // Maldives
    destination: 'North Malé Atoll, Maldives',
    hero: ss2,
    subtitle: 'Honeymoon Package · 7 nights · 2 guests',
    dates: 'Aug 14 – Aug 21, 2025',
    total: '$9,400',
    status: 'Confirmed',
    aiScore: 94,
    flights: [
      {
        icon: '✈️',
        route: 'London Heathrow → Velana Intl',
        code: 'BA0197',
        date: 'Thu Aug 14 · 07:15',
        class: 'Business Class',
        status: 'Seats held',
        price: '$3,200',
        statusCls: 'cb-tag--blue',
      },
      {
        icon: '✈️',
        route: 'Velana Intl → London Heathrow',
        code: 'BA0198',
        date: 'Thu Aug 21 · 11:30',
        class: 'Business Class',
        status: 'Confirmed',
        price: '$3,200',
        statusCls: 'cb-tag--green',
      },
    ],
    hotel: {
      name: 'Soneva Jani',
      image: ss2,
      type: 'Water Villa · Over-ocean bungalow',
      nights: '7 nights · Aug 14 – Aug 21',
      rating: 4.9,
      price: '$4,200',
      amenities: ['Private pool', 'Butler service', 'Spa access', 'All-inclusive'],
    },
    activities: [
      { icon: '🤿', name: 'Private Snorkelling Expedition', detail: 'House Reef · 3h · Marine biologist guide', price: '$320', status: 'Booked', statusCls: 'cb-tag--green' },
      { icon: '💆', name: 'Couples Spa Ritual', detail: '90-min · Coconut & lemongrass · AI recommended', price: '$680', status: 'AI Pick', statusCls: 'cb-tag--purple', isAI: true },
      { icon: '🚤', name: 'Sunset Dolphin Cruise', detail: 'Private catamaran · 2h · Champagne included', price: '$290', status: 'Optional', statusCls: 'cb-tag--grey' },
    ],
    breakdown: [
      { icon: '✈️', label: 'Flights (2 persons, return)', amount: '$6,400' },
      { icon: '🏨', label: 'Soneva Jani · 7 nights', amount: '$4,200' },
      { icon: '🚤', label: 'Transfers & seaplane', amount: '$960' },
      { icon: '🤿', label: 'Activities & experiences', amount: '$680' },
    ],
  },

  3: { // Tokyo
    destination: 'Tokyo, Japan',
    hero: ss3,
    subtitle: 'Business Loop · 4 nights · 1 guest',
    dates: 'Sep 3 – Sep 7, 2025',
    total: '$3,800',
    status: 'Confirmed',
    aiScore: 88,
    flights: [
      {
        icon: '✈️',
        route: 'London Heathrow → Tokyo Narita',
        code: 'JL0043',
        date: 'Wed Sep 3 · 11:00',
        class: 'Business Class',
        status: 'Confirmed',
        price: '$2,100',
        statusCls: 'cb-tag--green',
      },
      {
        icon: '✈️',
        route: 'Tokyo Narita → London Heathrow',
        code: 'JL0044',
        date: 'Sun Sep 7 · 14:00',
        class: 'Business Class',
        status: 'Confirmed',
        price: '$2,100',
        statusCls: 'cb-tag--green',
      },
    ],
    hotel: {
      name: 'Park Hyatt Tokyo',
      image: ss3,
      type: 'Park Suite · Shinjuku skyline view',
      nights: '4 nights · Sep 3 – Sep 7',
      rating: 4.8,
      price: '$1,600',
      amenities: ['Club lounge', 'Indoor pool', 'Fitness centre', 'Concierge'],
    },
    activities: [
      { icon: '🏙️', name: 'Tsukiji Morning Market Tour', detail: 'Guided · 2h · Sushi breakfast included', price: '$120', status: 'Booked', statusCls: 'cb-tag--green' },
      { icon: '🤖', name: 'Akihabara Tech District Walk', detail: 'Self-guided · Evening · AI recommended stops', price: '$0', status: 'AI Pick', statusCls: 'cb-tag--purple', isAI: true },
      { icon: '🍜', name: 'Ramen Tasting Experience', detail: 'Top 5 ramen spots · Shinjuku · 3 hours', price: '$80', status: 'Optional', statusCls: 'cb-tag--grey' },
    ],
    breakdown: [
      { icon: '✈️', label: 'Flights (1 person, return)', amount: '$2,200' },
      { icon: '🏨', label: 'Park Hyatt Tokyo · 4 nights', amount: '$1,600' },
      { icon: '🚗', label: 'Limousine transfers', amount: '$400' },
      { icon: '🎯', label: 'Activities & experiences', amount: '$200' },
    ],
  },

  4: { // Amalfi
    destination: 'Amalfi Coast, Italy',
    hero: ss4,
    subtitle: 'Family Summer · 10 nights · 4 guests',
    dates: 'Jul 20 – Jul 30, 2025',
    total: '$12,400',
    status: 'Pending',
    aiScore: 91,
    flights: [
      {
        icon: '✈️',
        route: 'London Heathrow → Naples Intl',
        code: 'BA0596',
        date: 'Sun Jul 20 · 08:30',
        class: 'Economy Flex',
        status: 'Seats held',
        price: '$880',
        statusCls: 'cb-tag--blue',
      },
      {
        icon: '✈️',
        route: 'Naples Intl → London Heathrow',
        code: 'BA0597',
        date: 'Wed Jul 30 · 19:00',
        class: 'Economy Flex',
        status: 'Pending',
        price: '$880',
        statusCls: 'cb-tag--amber',
      },
    ],
    hotel: {
      name: 'Villa Treville',
      image: ss4,
      type: 'Family Villa · Private pool & sea view',
      nights: '10 nights · Jul 20 – Jul 30',
      rating: 4.8,
      price: '$3,800',
      amenities: ['Private pool', 'Sea terrace', 'Kids club', 'Chef on request'],
    },
    activities: [
      { icon: '⛵', name: 'Positano Private Boat Day', detail: 'Private boat · Positano village · Lunch at Buca', price: '$480', status: 'Booked', statusCls: 'cb-tag--green' },
      { icon: '🍋', name: 'Italian Cooking Class', detail: 'Limoncello tasting · Cliff walk · Family-friendly · AI recommended', price: '$360', status: 'AI Pick', statusCls: 'cb-tag--purple', isAI: true },
      { icon: '🏝️', name: 'Capri Island Excursion', detail: 'Ferry · Blue Grotto · Lunch at Villa Verde', price: '$520', status: 'Optional', statusCls: 'cb-tag--grey' },
    ],
    breakdown: [
      { icon: '✈️', label: 'Flights (4 persons, return)', amount: '$7,040' },
      { icon: '🏨', label: 'Villa Treville · 10 nights', amount: '$3,800' },
      { icon: '🚤', label: 'Boat tours & transfers', amount: '$800' },
      { icon: '🍋', label: 'Activities & experiences', amount: '$760' },
    ],
  },

  5: { // Kyoto
    destination: 'Kyoto, Japan',
    hero: ss5,
    subtitle: 'Cherry Blossom · 5 nights · 2 guests',
    dates: 'Mar 25 – Mar 30, 2026',
    total: '$5,600',
    status: 'Booked',
    aiScore: 94,
    flights: [
      {
        icon: '✈️',
        route: 'Dubai → Osaka Kansai',
        code: 'EK0317',
        date: 'Tue Mar 25 · 08:20',
        class: 'Business Class',
        status: 'Confirmed',
        price: '$2,100',
        statusCls: 'cb-tag--green',
      },
      {
        icon: '✈️',
        route: 'Osaka Kansai → Dubai',
        code: 'EK0318',
        date: 'Sun Mar 30 · 16:45',
        class: 'Business Class',
        status: 'Confirmed',
        price: '$2,100',
        statusCls: 'cb-tag--green',
      },
    ],
    hotel: {
      name: 'Suiran Ryokan',
      image: ss5,
      type: 'Traditional Ryokan · Private onsen · Garden view',
      nights: '5 nights · Mar 25 – Mar 30',
      rating: 4.9,
      price: '$2,100',
      amenities: ['Private onsen', 'Kaiseki dining', 'Tea ceremony', 'Garden access'],
    },
    activities: [
      { icon: '⛩️', name: 'Fushimi Inari Early Access', detail: 'Private guide · Sunrise visit · 3 hours', price: '$280', status: 'Booked', statusCls: 'cb-tag--green' },
      { icon: '🍵', name: 'Urasenke Tea Ceremony', detail: 'Master host · 2 hours · AI recommended', price: '$320', status: 'AI Pick', statusCls: 'cb-tag--purple', isAI: true },
      { icon: '🎋', name: 'Arashiyama Bamboo & Rickshaw', detail: 'Private rickshaw · UNESCO garden · Sunrise', price: '$240', status: 'Booked', statusCls: 'cb-tag--green' },
    ],
    breakdown: [
      { icon: '✈️', label: 'Flights (2 persons, return)', amount: '$4,200' },
      { icon: '🏯', label: 'Suiran Ryokan · 5 nights', amount: '$2,100' },
      { icon: '🚗', label: 'Transfers & private car', amount: '$460' },
      { icon: '🍵', label: 'Cultural experiences', amount: '$840' },
    ],
  },
}

// ─── rest of your existing exports unchanged ──────────────────────────────────

export const ITINERARY_DATA = {
  1: [
    { id: 1, day: 'DAY 1 · JUL 4', title: 'Arrival & Transfer', status: 'confirmed', activities: [{ id: 'a1', detail: 'Private transfer on arrival', tags: ['Swiss Air', 'Private car'] }] },
    { id: 2, day: 'DAY 2 · JUL 5', title: 'Matterhorn Base Hike', status: 'confirmed', activities: [{ id: 'a2', detail: 'Schwarzsee · 6 hours · Level 3', tags: ['Guided tour', 'Equipment incl.'] }] },
    { id: 3, day: 'DAY 3 · JUL 7', title: 'Private Chef Evening', status: 'pending', activities: [{ id: 'a3', detail: '5 courses', tags: ['Private chef', 'Wine pairing'] }] },
    { id: 4, day: 'DAY 4 · JUL 8', title: 'Glacier Express Journey', status: 'confirmed', activities: [{ id: 'a4', detail: 'Panoramic rail from Zermatt to Grindelwald · Excellence class', tags: ['Glacier Express'] }] },
    { id: 5, day: 'DAYS 5–8', title: 'AI generating activities…', status: 'building', activities: [] },
  ],
  2: [
    { id: 1, day: 'DAY 1 · AUG 14', title: 'Arrival & Seaplane Transfer', status: 'confirmed', activities: [{ id: 'b1', detail: 'London Heathrow → Velana Intl · Business Class', tags: ['British Airways', 'Private car'] }] },
    { id: 2, day: 'DAY 2 · AUG 15', title: 'Overwater Villa Check-in', status: 'confirmed', activities: [{ id: 'b2', detail: 'Soneva Jani · Private overwater villa · Butler service', tags: ['Guided tour'] }] },
    { id: 3, day: 'DAY 3 · AUG 16', title: 'Snorkeling & Spa', status: 'confirmed', activities: [{ id: 'b3', detail: 'House reef snorkeling · Couples spa ritual · 90 min', tags: ['Equipment incl.', 'Private chef'] }] },
    { id: 4, day: 'DAY 4 · AUG 17', title: 'Sunset Dolphin Cruise', status: 'pending', activities: [{ id: 'b4', detail: 'Private yacht · Dolphin watching · Champagne dinner', tags: ['Wine pairing'] }] },
    { id: 5, day: 'DAYS 5–7', title: 'AI generating activities…', status: 'building', activities: [] },
  ],
  3: [
    { id: 1, day: 'DAY 1 · SEP 3', title: 'Arrival & Hotel Check-in', status: 'confirmed', activities: [{ id: 'c1', detail: 'Tokyo Narita → Shinjuku · Limousine transfer', tags: ['Private car'] }] },
    { id: 2, day: 'DAY 2 · SEP 4', title: 'Business Meetings', status: 'confirmed', activities: [{ id: 'c2', detail: 'Shibuya district · 3 client meetings · Conference room', tags: ['Guided tour'] }] },
    { id: 3, day: 'DAY 3 · SEP 5', title: 'Tsukiji & Akihabara', status: 'confirmed', activities: [{ id: 'c3', detail: 'Morning market tour · Tech district evening walk', tags: ['Guided tour', 'Equipment incl.'] }] },
    { id: 4, day: 'DAY 4 · SEP 7', title: 'AI generating activities…', status: 'building', activities: [] },
  ],
  4: [
    { id: 1, day: 'DAY 1 · JUL 20', title: 'Arrival & Villa Check-in', status: 'confirmed', activities: [{ id: 'd1', detail: 'Naples Airport → Amalfi · Private transfer', tags: ['Private car'] }] },
    { id: 2, day: 'DAY 2 · JUL 21', title: 'Positano Day Trip', status: 'confirmed', activities: [{ id: 'd2', detail: 'Private boat · Positano village · Lunch at Ristorante Buca', tags: ['Guided tour'] }] },
    { id: 3, day: 'DAY 3 · JUL 22', title: 'Cooking Class & Cliffs', status: 'pending', activities: [{ id: 'd3', detail: 'Italian cooking class · Limoncello tasting · Cliff walk', tags: ['Private chef', 'Wine pairing'] }] },
    { id: 4, day: 'DAY 4 · JUL 23', title: 'Capri Island Excursion', status: 'confirmed', activities: [{ id: 'd4', detail: 'Ferry to Capri · Blue Grotto · Lunch at Villa Verde', tags: ['Equipment incl.'] }] },
    { id: 5, day: 'DAYS 5–10', title: 'AI generating activities…', status: 'building', activities: [] },
  ],
  5: [
    { id: 1, day: 'DAY 1 · MAR 25', title: 'Arrival & Ryokan Check-in', status: 'confirmed', activities: [{ id: 'k1', detail: 'Dubai → Osaka Kansai · Business Class', tags: ['Emirates', 'Private car'] }] },
    { id: 2, day: 'DAY 2 · MAR 26', title: 'Fushimi Inari & Temples', status: 'confirmed', activities: [{ id: 'k2', detail: 'Private guided tour · Early morning access · 3 hours', tags: ['Guided tour'] }] },
    { id: 3, day: 'DAY 3 · MAR 27', title: 'Traditional Tea Ceremony', status: 'pending', activities: [{ id: 'k3', detail: 'Urasenke Tea School · Master host · 2 hours', tags: ['Private chef'] }] },
    { id: 4, day: 'DAY 4 · MAR 28', title: 'Arashiyama Bamboo Grove', status: 'confirmed', activities: [{ id: 'k4', detail: 'Private rickshaw · UNESCO garden · Sunrise visit', tags: ['Guided tour', 'Equipment incl.'] }] },
    { id: 5, day: 'DAY 5', title: 'AI generating activities…', status: 'building', activities: [] },
  ],
}

export const CHAT_MESSAGES = [
  { id: 1, role: 'user', text: 'I want to plan an 8-day escape to the Swiss Alps for 2 people in July. We love hiking, fine dining, and luxury mountain lodges. No strict budget.' },
  { id: 2, role: 'ai', text: "Spectacular choice! 🏔️ July is peak season in the Swiss Alps.\n\nI'm cross-referencing luxury mountain retreats across **Zermatt**, **Grindelwald**, and **Verbier**. Simultaneously checking hiking trail conditions and Michelin-starred restaurant availability for your dates.", tripCard: 0 },
]

export const AI_RESPONSES = {
  default: { text: "Great choice! Let me search the best options for you. 🌍\n\nCould you share your **preferred travel dates** and **approximate budget** per person? This helps me cross-reference live availability across our supplier network.", tripCard: null },
  beach: { text: "Perfect — I'm pulling up top beach destinations right now. 🏖️\n\nThe **Maldives overwater villas** are stunning in October, and **Santorini** peaks in September. Both offer private transfers and curated fine dining experiences.", tripCard: 1 },
  mountain: { text: "Mountain escapes are magical! 🏔️\n\nI'm cross-referencing availability across the **Swiss Alps**, **Dolomites**, and **Canadian Rockies**. Simultaneously checking hiking trail conditions and luxury lodge availability for your dates.", tripCard: 0 },
  romantic: { text: "For a romantic retreat, **Santorini** and the **Amalfi Coast** are unbeatable right now. 💑\n\nI can build a combined **Italy–Greece itinerary** with private sunset dinners and boutique cliff-side hotels. Shall I draft it?", tripCard: 3 },
  family: { text: "Family trips need the perfect balance! 👨‍👩‍👧\n\n**Bali** ticks every box — beaches, culture, and kids' activities. I'm checking **villa availability** and **private guide schedules** for your travel window.", tripCard: null },
  cultural: { text: "Exceptional taste! 🏛️\n\n**Kyoto** in spring offers the richest cultural immersion. I'm checking **temple access**, **private tea ceremony bookings**, and **boutique ryokan availability** now.", tripCard: 4 },
}

export const KYOTO_ITINERARY_DAYS = [
  { id: 1, day: 'DAY 1 · MAR 25', title: 'Arrival & Ryokan Check-in', status: 'confirmed', activities: [{ id: 'k1', icon: '✈️', title: 'Flight to Kyoto · Emirates EK317', detail: 'Dubai → Osaka Kansai · Business Class', tags: ['Emirates', 'Private car'], status: 'confirmed' }] },
  { id: 2, day: 'DAY 2 · MAR 26', title: 'Fushimi Inari & Temples', status: 'confirmed', activities: [{ id: 'k2', icon: '🏯', title: 'Fushimi Inari Taisha', detail: 'Private guided tour · Early morning access · 3 hours', tags: ['Guided tour', 'Temple Access'], status: 'confirmed' }] },
  { id: 3, day: 'DAY 3 · MAR 27', title: 'Traditional Tea Ceremony', status: 'pending', activities: [{ id: 'k3', icon: '🍵', title: 'Urasenke Tea School', detail: 'Authentic ceremony · Master host · 2 hours', tags: ['Private chef', 'Cultural Experience'], status: 'pending' }] },
  { id: 4, day: 'DAY 4 · MAR 28', title: 'Arashiyama Bamboo Grove', status: 'confirmed', activities: [{ id: 'k4', icon: '🎋', title: 'Bamboo Grove & Tenryu-ji', detail: 'Private rickshaw · UNESCO garden · Sunrise visit', tags: ['Guided tour', 'Equipment incl.'], status: 'confirmed' }] },
  { id: 5, day: 'DAYS 5', title: 'AI generating activities…', status: 'building', activities: [] },
]

export const TRIP_CHAT_MESSAGES = {
  1: [
    { id: 1, role: 'user', text: 'I want to plan an 8-day escape to the Swiss Alps for 2 people in July. We love hiking, fine dining, and luxury mountain lodges. No strict budget.' },
    { id: 2, role: 'ai', text: "Spectacular choice! 🏔️ July is peak season in the Swiss Alps.\n\nI'm cross-referencing luxury mountain retreats across **Zermatt**, **Grindelwald**, and **Verbier**. Simultaneously checking hiking trail conditions and Michelin-starred restaurant availability for your dates.", tripCard: 0 },
  ],
  2: [
    { id: 1, role: 'user', text: 'Planning a honeymoon in the Maldives for 7 nights in August. We want overwater bungalows, privacy, and a romantic experience.' },
    { id: 2, role: 'ai', text: "What a beautiful choice! 🌊 The Maldives in August is absolutely stunning.\n\nI'm checking availability at **Soneva Jani**, **Six Senses Laamu**, and **Gili Lankanfushi**. All offer private overwater villas with direct lagoon access and butler service.", tripCard: 1 },
  ],
  3: [
    { id: 1, role: 'user', text: 'I need a 4-day business trip to Tokyo in September. Just 1 person, need a good hotel near Shibuya and some free time for sightseeing.' },
    { id: 2, role: 'ai', text: "Perfect — Tokyo in September is ideal for business travel. 🗼\n\nI'm booking **Park Hyatt Tokyo** in Shinjuku — close to Shibuya and iconic from Lost in Translation. Checking **conference facilities** and leaving afternoons free for Tsukiji and Akihabara.", tripCard: 2 },
  ],
  4: [
    { id: 1, role: 'user', text: 'Family summer trip to the Amalfi Coast, Italy. 4 people including 2 kids. 10 days in July, looking for a villa with a pool.' },
    { id: 2, role: 'ai', text: "Gorgeous choice for a family! 🍋 The Amalfi Coast in July is magical.\n\nSearching for **private villas with pools** across Positano, Ravello, and Praiano. Also checking **family-friendly boat tours** and kid-friendly restaurants along the coast.", tripCard: 3 },
  ],
  5: [
    { id: 1, role: 'user', text: 'I want to experience cherry blossom season in Kyoto, Japan. 5 days end of March, 2 people, cultural focus.' },
    { id: 2, role: 'ai', text: "Exceptional timing! 🌸 Late March in Kyoto is peak cherry blossom season.\n\nI'm securing **early morning temple access** at Fushimi Inari and Kinkaku-ji, booking a **traditional tea ceremony** at Urasenke school, and arranging a ryokan with private onsen.", tripCard: 4 },
  ],
}

export const ADMIN_BOOKINGS = {
  'James Thornton': {
    id: 'SAF-2049', hero: d6,
    client: { name: 'James Thornton', avatar: 'JT', trip: 'Honeymoon Package' },
    destination: 'Malé, Maldives', badge: 'HONEYMOON PACKAGE',
    dates: 'Aug 20 – Aug 26, 2025', nights: 6, guests: 2,
    route: 'London Heathrow → Velana Intl',
    status: 'Quoting', aiScore: 94, segments: 11, total: '$9,850',
    agent: { name: 'Dana R.', avatar: 'DR', role: 'Lead Agent' },
    costBreakdown: [
      { icon: '✈️', label: 'Flights (2 persons, return)', amount: '$6,400' },
      { icon: '🏨', label: 'Soneva Jani · 5 nights', amount: '$4,200' },
      { icon: '🚤', label: 'Transfers & seaplane', amount: '$960' },
      { icon: '🤿', label: 'Activities & experiences', amount: '$680' },
    ],
  },
  'Marcus Webb': {
    id: 'SAF-2050', hero: ss3,
    client: { name: 'Marcus Webb', avatar: 'MW', trip: 'Tokyo Business Loop' },
    destination: 'Tokyo, Japan', badge: 'BUSINESS TRIP',
    dates: 'Sep 3 – Sep 7, 2025', nights: 4, guests: 1,
    route: 'London Heathrow → Tokyo Narita',
    status: 'Confirmed', aiScore: 88, segments: 7, total: '$5,400',
    agent: { name: 'Layla K.', avatar: 'LK', role: 'Senior Agent' },
    costBreakdown: [
      { icon: '✈️', label: 'Flights (1 person, return)', amount: '$3,200' },
      { icon: '🏨', label: 'Park Hyatt Tokyo · 4 nights', amount: '$1,600' },
      { icon: '🚗', label: 'Transfers & limousine', amount: '$400' },
      { icon: '🎯', label: 'Activities & experiences', amount: '$200' },
    ],
  },
  'Oliver Beaumont': {
    id: 'SAF-2051', hero: ss4,
    client: { name: 'Oliver Beaumont', avatar: 'OB', trip: 'Amalfi Family Summer' },
    destination: 'Amalfi Coast, Italy', badge: 'FAMILY PACKAGE',
    dates: 'Jul 20 – Jul 30, 2025', nights: 10, guests: 4,
    route: 'London Heathrow → Naples',
    status: 'Pending', aiScore: 91, segments: 14, total: '$12,400',
    agent: { name: 'Priya S.', avatar: 'PS', role: 'Senior Agent' },
    costBreakdown: [
      { icon: '✈️', label: 'Flights (4 persons, return)', amount: '$7,200' },
      { icon: '🏨', label: 'Villa Treville · 10 nights', amount: '$3,800' },
      { icon: '🚤', label: 'Boat tours & transfers', amount: '$800' },
      { icon: '🍋', label: 'Activities & experiences', amount: '$600' },
    ],
  },
  'Ravi Nakamura': {
    id: 'SAF-2052', hero: ss5,
    client: { name: 'Ravi Nakamura', avatar: 'RN', trip: 'Kyoto Cherry Blossom' },
    destination: 'Kyoto, Japan', badge: 'CULTURAL PACKAGE',
    dates: 'Mar 25 – Mar 30, 2026', nights: 5, guests: 2,
    route: 'Dubai → Osaka Kansai',
    status: 'Quoting', aiScore: 94, segments: 9, total: '$7,200',
    agent: { name: 'Dana R.', avatar: 'DR', role: 'Lead Agent' },
    costBreakdown: [
      { icon: '✈️', label: 'Flights (2 persons, return)', amount: '$4,200' },
      { icon: '🏯', label: 'Ryokan · 5 nights', amount: '$2,100' },
      { icon: '🚗', label: 'Transfers & private car', amount: '$300' },
      { icon: '🍵', label: 'Cultural experiences', amount: '$600' },
    ],
  },
}