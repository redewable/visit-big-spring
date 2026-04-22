/**
 * Seed data for Visit Big Spring.
 *
 * In production this is sourced from a headless CMS (proposed: WordPress +
 * WPGraphQL) via a typed client exported from this same module shape — so
 * pages stay unchanged when the CMS is wired up.
 *
 * Content verified against:
 *   - visitbigspring.com  (CVB, official)
 *   - tpwd.texas.gov/state-parks/big-spring  (official state park)
 *   - Big Spring Visitors Guide (2020s edition, provided by the CVB)
 *   - Google Maps (cross-checked addresses & coordinates)
 *
 * Entries that could NOT be fully verified live at the time of writing are
 * marked `// VERIFY` — a human should confirm before submission. Place IDs
 * are left empty; they'll be resolved post-award via Google Places API.
 */

export type SectionKey = "stay" | "eat-drink" | "explore" | "history" | "events";

export const sections: { key: SectionKey; label: string; tagline: string; href: string }[] = [
  { key: "stay", label: "Stay", tagline: "Rest easy under a wide Texas sky.", href: "/stay" },
  { key: "eat-drink", label: "Eat & Drink", tagline: "West Texas flavor, hometown tables.", href: "/eat-drink" },
  { key: "explore", label: "Explore", tagline: "Mesas, trails, tee boxes and trolley rides.", href: "/explore" },
  { key: "history", label: "History", tagline: "From cattle drives to the spring itself.", href: "/history" },
  { key: "events", label: "Events", tagline: "Festivals, rodeos, and small-town holidays.", href: "/events" },
];

/* -------------------------------------------------------------- */
/* Business listings                                                */
/* -------------------------------------------------------------- */

export type BusinessTier = "standard" | "editors-pick" | "heritage-member";

export type Hours = {
  /** 0 = Sun, 1 = Mon, ..., 6 = Sat. */
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** 24h local time, e.g. "08:00". null = closed. */
  open: string | null;
  close: string | null;
};

export type Business = {
  slug: string;
  name: string;
  category: SectionKey;
  blurb: string;
  /** Longer editorial introduction, shown on Editor's Pick + Heritage Member cards. */
  editorial?: string;
  address: string;
  phone?: string;
  website?: string;
  image: string;
  tags: string[];
  /** Pin location for the interactive map. */
  lat: number;
  lng: number;
  /** Google Maps place id (resolved post-award via Places API). */
  googlePlaceId?: string;
  /** Operating hours, if known. Empty array → UI hides the block. */
  hours?: Hours[];
  tier: BusinessTier;
};

/** Build a Google Maps place URL from a business — used until Place IDs are wired. */
export function googleMapsUrl(b: Pick<Business, "name" | "address">) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${b.name} ${b.address}`,
  )}`;
}

/** Standard "every day" hours helper. */
const daily = (open: string, close: string): Hours[] =>
  ([0, 1, 2, 3, 4, 5, 6] as const).map((day) => ({ day, open, close }));

export const businesses: Business[] = [
  /* ======================================================== */
  /* EXPLORE — parks, outdoor rec, civic recreation             */
  /* ======================================================== */
  {
    slug: "big-spring-state-park",
    name: "Big Spring State Park",
    category: "explore",
    tier: "editors-pick",
    blurb:
      "A 382-acre mesa-top state park with a three-mile scenic loop, CCC-built pavilion, and a 200-foot bluff that shows you the Llano Estacado in every direction.",
    editorial:
      "If Big Spring has a soul, it's on Scenic Mountain. The loop road circles the mesa at golden hour in under ten minutes; every turn is a postcard. Sunrise joggers, sunset photographers, picnicking families — this is the one place locals tell you to see first. Entrance is free. Bring water, bring a camera, bring time.",
    address: "1 Scenic Drive, Big Spring, TX 79720",
    phone: "432-263-4931",
    website: "https://tpwd.texas.gov/state-parks/big-spring",
    image: "/assets/venues/big-spring-state-park.png",
    tags: ["State park", "Scenic drive", "Free entry"],
    lat: 32.2285,
    lng: -101.4902,
    hours: daily("08:00", "20:00"),
  },
  {
    slug: "comanche-trail-park",
    name: "Comanche Trail Park",
    category: "explore",
    tier: "standard",
    blurb:
      "The city's 136-acre recreation hub — lake, 6,000-seat CCC amphitheater, disc golf, walking trails, and the seasonal Festival of Lights.",
    address: "Golf Course Road, Big Spring, TX 79720",
    phone: "432-264-2323",
    image: "/assets/venues/comanche-trail-park-entrance.jpeg",
    tags: ["Park", "CCC heritage", "Family friendly"],
    lat: 32.2128,
    lng: -101.4828,
  },
  {
    slug: "comanche-trail-golf-course",
    name: "Comanche Trail Golf Course",
    category: "explore",
    tier: "standard",
    blurb:
      "An 18-hole municipal course carved through mesquite and live oak — the only rolling-hills course in West Texas. Tee times welcome visitors year-round.",
    address: "2401 Whipkey Dr, Big Spring, TX 79720",
    phone: "432-264-2366",
    image: "/assets/venues/golf-course.jpeg",
    tags: ["Golf", "Municipal", "Year-round"],
    lat: 32.2101,
    lng: -101.4788,
  },
  {
    slug: "russ-mcewen-aquatic-center",
    name: "Russ McEwen Family Aquatic Center",
    category: "explore",
    tier: "standard",
    blurb:
      "A summer-season aquatic park inside Comanche Trail Park — two slides, a lazy river, a kids' splash zone, sand play area, and shaded pavilions for rent.",
    address: "911 E. Golf Course Rd, Big Spring, TX 79720",
    phone: "432-264-0037",
    image:
      "https://images.unsplash.com/photo-1534804055670-7f7b0d8fb3ca?auto=format&fit=crop&w=1400&q=70",
    tags: ["Family", "Seasonal", "Pool"],
    lat: 32.2122,
    lng: -101.4811,
  },
  {
    slug: "moss-creek-lake",
    name: "Moss Creek Lake",
    category: "explore",
    tier: "standard",
    blurb:
      "A 640-acre fishing and camping lake southeast of town — bass, catfish, 26 sheltered campsites, a beach swim area, and ATV trails.",
    address: "Moss Creek Rd, Big Spring, TX 79720", // VERIFY exact address
    image:
      "https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&w=1400&q=70",
    tags: ["Fishing", "Camping", "ATV"],
    lat: 32.23,
    lng: -101.40,
  },
  {
    slug: "comanche-trail-amphitheater",
    name: "Comanche Trail Amphitheater",
    category: "explore",
    tier: "standard",
    blurb:
      "A 6,000-seat outdoor stone amphitheater built by the Civilian Conservation Corps in 1930 — home to Pops in the Park every July 3rd.",
    address: "Golf Course Road, Big Spring, TX 79720",
    phone: "432-264-2323",
    image: "/assets/venues/comanche-trail-park-ampitheater.jpeg",
    tags: ["Events venue", "CCC-built"],
    lat: 32.2118,
    lng: -101.4831,
  },
  {
    slug: "sandhill-crane-observatory",
    name: "Sandhill Crane Observatory",
    category: "explore",
    tier: "standard",
    blurb:
      "A seasonal viewing point for the sandhill crane migration. Best light is at sunrise and sunset in late October — bring binoculars and a thermos.",
    address: "W. Channing Street, Big Spring, TX 79720", // VERIFY
    image:
      "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=1400&q=70",
    tags: ["Wildlife", "Photography", "Seasonal"],
    lat: 32.245,
    lng: -101.493,
  },
  {
    slug: "dora-roberts-community-center",
    name: "Dora Roberts Community Center",
    category: "explore",
    tier: "standard",
    blurb:
      "A lakeside event center on Comanche Trail Lake — four rooms, up to 300 guests, a 3,600 sq ft ballroom, and an outdoor pavilion for weddings.",
    address: "100 Whipkey Dr, Big Spring, TX 79720",
    phone: "432-264-2323",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1400&q=70",
    tags: ["Events venue", "Lakeside"],
    lat: 32.2134,
    lng: -101.4836,
  },

  /* ======================================================== */
  /* HISTORY — museums, monuments, heritage                     */
  /* ======================================================== */
  {
    slug: "heritage-museum",
    name: "Heritage Museum of Big Spring",
    category: "history",
    tier: "heritage-member",
    blurb:
      "Artifacts, photographs and rotating exhibits tracing Howard County from Comanche homeland through the oil boom. Housed in pioneer Dora Roberts' former home.",
    editorial:
      "Heritage Member. The Heritage Museum is the keeper of Big Spring's paper trail — photographs, ranching ledgers, arrowheads, oil-boom memorabilia. The permanent exhibits walk you from pre-contact to petroleum; the rotating gallery keeps reason to come back. Expect a volunteer docent, expect to stay longer than you planned.",
    address: "510 Scurry St, Big Spring, TX 79720",
    phone: "432-267-8255",
    image:
      "https://images.unsplash.com/photo-1565060169187-5284fc87ea1e?auto=format&fit=crop&w=1400&q=70",
    tags: ["Museum", "Indoor", "Heritage Member"],
    lat: 32.2521,
    lng: -101.4786,
  },
  {
    slug: "hangar-25",
    name: "Hangar 25 Air Museum",
    category: "history",
    tier: "heritage-member",
    blurb:
      "A restored WWII T-hangar at the former Big Spring Army Air Field — celebrating the Bombardier School, Webb AFB, and the 10,000+ pilots who trained here 1952–1977.",
    editorial:
      "Heritage Member. Walk into Hangar 25 and you are, quite literally, walking onto the hangar floor where a generation of American airmen earned their wings. Retired veterans often staff the desk; they remember. The collection spans uniforms, aircraft, and the quiet weight of the 50,000 visitors from all 50 states who have stopped here since the museum opened in 1999.",
    address: "1911 Apron Dr, Big Spring, TX 79720",
    phone: "432-264-1999",
    website: "https://www.hangar25airmuseum.org",
    image:
      "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?auto=format&fit=crop&w=1400&q=70",
    tags: ["Museum", "Aviation", "WWII", "Heritage Member"],
    lat: 32.2138,
    lng: -101.5221,
  },
  {
    slug: "potton-house",
    name: "Potton House",
    category: "history",
    tier: "standard",
    blurb:
      "An 1898 sandstone home — one of the oldest standing structures in Big Spring. Tours by appointment; call the Heritage Museum.",
    address: "200 Gregg Street, Big Spring, TX 79720",
    phone: "432-267-8255",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=70",
    tags: ["Historic home", "Appointment only"],
    lat: 32.2488,
    lng: -101.4778,
  },
  {
    slug: "vietnam-memorial",
    name: "Big Spring Vietnam Memorial",
    category: "history",
    tier: "standard",
    blurb:
      "A Tribute to Noble Warriors — a community-built memorial on the former Webb AFB grounds. Includes a UH-1 Huey, F-4E Phantom II, Cobra, and an Abrams tank.",
    address: "Big Spring, TX 79720", // VERIFY exact address — on SWCID campus
    phone: "432-263-7361",
    image:
      "https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&w=1400&q=70",
    tags: ["Memorial", "Veterans"],
    lat: 32.219,
    lng: -101.513,
  },
  {
    slug: "municipal-auditorium",
    name: "Big Spring Municipal Auditorium",
    category: "history",
    tier: "standard",
    blurb:
      "Built 1932 on the old Bankhead Highway — 1,412 seats that have hosted Elvis Presley, Hank Williams Jr. and Wayne Newton. Home to the Big Spring Symphony today.",
    address: "310 East Third Street, Big Spring, TX 79720",
    phone: "432-264-2323",
    image:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1400&q=70",
    tags: ["Historic", "1932", "Symphony"],
    lat: 32.2527,
    lng: -101.4761,
  },
  {
    slug: "historic-spring",
    name: "The Historic Spring",
    category: "history",
    tier: "standard",
    blurb:
      "The actual spring that named the town — restored with eight corten-metal storyboards on limestone, two observation decks, and a 1,000-seat plaza. Cabeza de Vaca noted it in 1535.",
    address: "Comanche Trail Park, Big Spring, TX 79720",
    image:
      "https://images.unsplash.com/photo-1562089077-e6f23ff06a63?auto=format&fit=crop&w=1400&q=70",
    tags: ["Landmark", "Restored 2019"],
    lat: 32.2125,
    lng: -101.4822,
  },

  /* ======================================================== */
  /* STAY — lodging roster verified against CVB listing         */
  /* ======================================================== */
  {
    slug: "hotel-settles",
    name: "Hotel Settles",
    category: "stay",
    tier: "editors-pick",
    blurb:
      "A restored 1930 boutique landmark on the downtown skyline — 65 guest rooms, Settles Grill, Pharmacy Bar, and 15,000 sq ft of event space.",
    editorial:
      "Editor's Pick. If you spend one night in Big Spring, spend it here. The Settles opened in 1930 — the tallest building between Fort Worth and El Paso in its day — and a full art-deco restoration returned it to its oil-boom elegance. Book a corner room, drink downstairs at the Pharmacy Bar, eat at Settles Grill, and feel the building settle around you.",
    address: "200 E Third Street, Big Spring, TX 79720",
    phone: "432-267-7500",
    website: "https://hotelsettles.com",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1400&q=70",
    tags: ["Historic", "Downtown", "Full service"],
    lat: 32.2525,
    lng: -101.4777,
  },
  {
    slug: "hampton-inn",
    name: "Hampton Inn Big Spring",
    category: "stay",
    tier: "standard",
    blurb:
      "Dependable comfort off I-20 with free breakfast, fitness center and outdoor pool.",
    address: "805 W. I-20, Big Spring, TX 79720",
    phone: "432-264-9800",
    website: "https://www.hilton.com/en/hotels/bpthnhx-hampton-big-spring-texas/",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=70",
    tags: ["Chain", "I-20", "Breakfast included"],
    lat: 32.234,
    lng: -101.494,
  },
  {
    slug: "la-quinta",
    name: "La Quinta Inn & Suites",
    category: "stay",
    tier: "standard",
    blurb:
      "Pet-friendly interstate stay with pool, fitness center, and an easy exit to downtown or Scenic Mountain.",
    address: "1102 I-20 West, Big Spring, TX 79720",
    phone: "432-264-0222",
    website: "https://www.wyndhamhotels.com/laquinta/big-spring-texas",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=70",
    tags: ["Chain", "I-20", "Pet friendly"],
    lat: 32.233,
    lng: -101.492,
  },
  {
    slug: "towneplace-suites",
    name: "TownePlace Suites by Marriott",
    category: "stay",
    tier: "standard",
    blurb:
      "Extended-stay suites with kitchenettes — built for oilfield crews, travel nurses, and families who want room to spread out.",
    address: "1011 N. San Antonio St, Big Spring, TX 79720",
    phone: "432-606-5166",
    website: "https://www.marriott.com/maftb",
    image:
      "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?auto=format&fit=crop&w=1400&q=70",
    tags: ["Extended stay", "Chain"],
    lat: 32.260,
    lng: -101.484,
  },
  {
    slug: "comfort-inn",
    name: "Comfort Inn & Suites",
    category: "stay",
    tier: "standard",
    blurb: "Dependable interstate rooms with breakfast, pool, and meeting space.",
    address: "1109 N. Aylesford St, Big Spring, TX 79720",
    phone: "432-263-5400",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=70",
    tags: ["Chain", "Breakfast"],
    lat: 32.2375,
    lng: -101.498,
  },
  {
    slug: "best-western-palace-inn",
    name: "Best Western Palace Inn",
    category: "stay",
    tier: "standard",
    blurb: "Comfortable, reasonably priced stay on the Lamesa Highway north of town.",
    address: "915 Lamesa Hwy, Big Spring, TX 79720",
    phone: "432-264-1500",
    website: "https://www.bestwestern.com/",
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1400&q=70",
    tags: ["Chain", "Value"],
    lat: 32.270,
    lng: -101.491,
  },
  {
    slug: "baymont-inn",
    name: "Baymont Inn & Suites",
    category: "stay",
    tier: "standard",
    blurb: "Budget-to-midscale rooms on the Lamesa Highway corridor.",
    address: "917 Lamesa Hwy, Big Spring, TX 79720",
    phone: "432-268-0568",
    website: "https://www.wyndhamhotels.com/baymont",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=70",
    tags: ["Chain", "Value"],
    lat: 32.2702,
    lng: -101.4912,
  },
  {
    slug: "sleep-inn-mainstay",
    name: "Sleep Inn & MainStay Suites",
    category: "stay",
    tier: "standard",
    blurb:
      "Sister-branded properties under one roof — a traditional hotel room or a longer-stay suite, your call.",
    address: "308 E. 12th Street, Big Spring, TX 79720",
    phone: "432-606-5118",
    website: "https://www.choicehotels.com/",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=70",
    tags: ["Chain", "Extended stay"],
    lat: 32.237,
    lng: -101.477,
  },

  /* ======================================================== */
  /* EAT & DRINK                                                 */
  /* ======================================================== */
  {
    slug: "settles-grill",
    name: "Settles Grill",
    category: "eat-drink",
    tier: "editors-pick",
    blurb:
      "Hotel Settles' flagship dining room — chef-driven steaks, seasonal plates, and Sunday brunch beneath the restored 1930 ceiling.",
    editorial:
      "Editor's Pick. The dining room inside Hotel Settles is quietly the best chef-driven kitchen between Abilene and Midland. Steaks are the headline; the seasonal plates and Sunday brunch are the sleeper picks. Reservations on weekend nights. Order something from the Pharmacy Bar next door first.",
    address: "200 E 3rd St, Big Spring, TX 79720",
    phone: "432-267-7500",
    website: "https://hotelsettles.com/dining/settles-grill/",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=70",
    tags: ["Fine dining", "Cocktails", "Historic"],
    lat: 32.2525,
    lng: -101.4777,
  },
  {
    slug: "alberto-s-crystal-cafe",
    name: "Alberto's Crystal Cafe",
    category: "eat-drink",
    tier: "standard",
    blurb:
      "Family-run Tex-Mex institution on North Gregg — enchiladas, chile rellenos, and breakfast plates for generations of Big Spring diners.",
    address: "300 N. Gregg St, Big Spring, TX 79720",
    phone: "432-267-2310",
    image:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1400&q=70",
    tags: ["Tex-Mex", "Family", "Local favorite"],
    lat: 32.2548,
    lng: -101.4782,
  },
  {
    slug: "cowboys-steakhouse",
    name: "Cowboy's Steakhouse",
    category: "eat-drink",
    tier: "standard",
    blurb:
      "Classic West Texas steakhouse on FM 700 — rib-eyes, chicken-fried everything, and a salad bar worth the trip.",
    address: "404 E. FM 700, Big Spring, TX 79720",
    phone: "432-263-0181",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=70",
    tags: ["Steakhouse", "Family", "Local favorite"],
    lat: 32.2468,
    lng: -101.4670,
  },
  {
    slug: "pharmacy-bar",
    name: "Pharmacy Bar & Parlor",
    category: "eat-drink",
    tier: "standard",
    blurb:
      "Tucked inside Hotel Settles — walnut-and-brass cocktail parlor with the strongest program between Abilene and Midland.",
    address: "200 E 3rd St, Big Spring, TX 79720",
    phone: "432-267-7500",
    website: "https://hotelsettles.com/dining/pharmacy-bar-parlor/",
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1400&q=70",
    tags: ["Cocktails", "Historic", "Late night"],
    lat: 32.2525,
    lng: -101.4777,
  },
  {
    slug: "train-car-cigar-bar",
    name: "The Train Car Cigar Bar",
    category: "eat-drink",
    tier: "standard",
    blurb:
      "A downtown cigar lounge on Main Street — humidor, craft cocktails, and the kind of booth you settle into for the evening.",
    address: "100 S Main Street, Big Spring, TX 79720",
    phone: "432-270-6113",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1400&q=70",
    tags: ["Cigars", "Cocktails", "Downtown"],
    lat: 32.2531,
    lng: -101.4770,
  },
  {
    slug: "desert-flower-art-gallery",
    name: "Desert Flower Art Gallery",
    category: "eat-drink",
    tier: "standard",
    blurb:
      "Art gallery by day, bar by night — downtown's most atmospheric hangout, open late seven days a week.",
    address: "123 S. Main Street, Big Spring, TX 79720",
    phone: "432-270-0290",
    image:
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1400&q=70",
    tags: ["Art gallery", "Bar", "Downtown"],
    lat: 32.2528,
    lng: -101.4770,
  },
  {
    slug: "lumbre-bar-and-grill",
    name: "Lumbre Bar and Grill",
    category: "eat-drink",
    tier: "standard",
    blurb:
      "Downtown grill and cocktail bar on Runnels — open evenings, weekends till midnight.",
    address: "322 Runnels St, Big Spring, TX 79720",
    phone: "432-606-5039",
    image:
      "https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1400&q=70",
    tags: ["Grill", "Cocktails", "Downtown"],
    lat: 32.2516,
    lng: -101.4766,
  },
  {
    slug: "casa-blanca",
    name: "Casa Blanca Restaurant",
    category: "eat-drink",
    tier: "standard",
    blurb:
      "Long-running Mexican restaurant on Lamesa Hwy — generous plates, margarita pitcher pricing, booth seating.",
    address: "1005 Lamesa Hwy, Big Spring, TX 79720",
    phone: "432-263-1162",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=70",
    tags: ["Mexican", "Family"],
    lat: 32.2635,
    lng: -101.4915,
  },
];

export function businessesByCategory(cat: SectionKey) {
  return businesses.filter((b) => b.category === cat);
}

export function businessBySlug(slug: string) {
  return businesses.find((b) => b.slug === slug);
}

/* -------------------------------------------------------------- */
/* Events                                                           */
/* -------------------------------------------------------------- */

export type Event = {
  slug: string;
  title: string;
  date: string; // ISO 8601
  endDate?: string;
  location: string;
  /** Coordinates for outdoor-event weather forecast lookup. Optional. */
  lat?: number;
  lng?: number;
  outdoor?: boolean;
  image: string;
  summary: string;
  description: string;
  tags: string[];
};

export const events: Event[] = [
  // VERIFY — recurring dates locked-in from the Official Visitor Guide.
  // Exact times for 2026 should be confirmed with the CVB before print.
  {
    slug: "silver-wings-ball",
    title: "Hangar 25 Silver Wings Ball",
    date: "2026-01-31T18:00:00-06:00", // VERIFY
    location: "Hangar 25 Air Museum",
    lat: 32.2138,
    lng: -101.5221,
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=70",
    summary:
      "The Air Museum's signature winter fundraiser — black tie optional, dinner on the hangar floor.",
    description:
      "Hangar 25's annual Silver Wings Ball transforms the WWII hangar floor into a ballroom for an evening of dinner, dancing, and live auctions benefiting the museum's operations and veteran-honoring programs.",
    tags: ["Fundraiser", "Aviation", "Black tie"],
    outdoor: false,
  },
  {
    slug: "howard-college-rodeo",
    title: "Howard College Rodeo",
    date: "2026-04-16T19:00:00-05:00", // VERIFY exact April weekend
    endDate: "2026-04-18T22:00:00-05:00",
    location: "Howard County Fair Barns",
    lat: 32.2344,
    lng: -101.4555,
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1400&q=70",
    summary:
      "Three nights of collegiate-level rodeo — bull riding, barrel racing, tie-down roping.",
    description:
      "Howard College hosts its annual intercollegiate rodeo each April. One of the best collegiate rodeo programs in the southwest, plus midway food and a Saturday-night dance.",
    tags: ["Rodeo", "College", "Family"],
    outdoor: true,
  },
  {
    slug: "master-the-mountain",
    title: 'Big Spring State Park "Master the Mountain" Run/Walk',
    date: "2026-04-25T08:00:00-05:00", // VERIFY
    location: "Big Spring State Park",
    lat: 32.2285,
    lng: -101.4902,
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1400&q=70",
    summary: "An early-spring 5K around the mesa's 3-mile scenic loop.",
    description:
      "A community 5K along the CCC-built loop road at Big Spring State Park. Registration supports the park's interpretive programs.",
    tags: ["5K", "Outdoors", "Family"],
    outdoor: true,
  },
  {
    slug: "sunset-big-spring",
    title: "Sunset Big Spring",
    date: "2026-05-02T19:30:00-05:00", // VERIFY — spring equivalent of the fall series
    location: "Big Spring State Park · Scenic Mountain",
    lat: 32.2285,
    lng: -101.4902,
    image:
      "https://images.unsplash.com/photo-1472213984618-c79aaec7fef0?auto=format&fit=crop&w=1400&q=70",
    summary:
      "A Canvas of Colors in the Sky — guided sunset gatherings on the mesa. Tag #SUNSETBIGSPRING.",
    description:
      "Scenic Mountain sits 200 feet above the plain, and the nightly sunset over the Llano Estacado is Big Spring's signature image. The CVB hosts guided sunset gatherings and photo walks at the top of the loop each spring.",
    tags: ["Outdoors", "Free", "Photography"],
    outdoor: true,
  },
  {
    slug: "cowboy-reunion-rodeo",
    title: "Cowboy Reunion & PBRCA Sanctioned Rodeo",
    date: "2026-06-18T19:30:00-05:00", // VERIFY
    endDate: "2026-06-20T22:30:00-05:00",
    location: "Howard County Fair Barns",
    lat: 32.2344,
    lng: -101.4555,
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1400&q=70",
    summary:
      "A three-day PBRCA-sanctioned rodeo and community reunion — rough-stock events, BBQ cook-off, dance.",
    description:
      "One of West Texas's oldest rodeos. Rough-stock and timed events, a working chuckwagon cook-off, and the Cowboy Reunion dance Saturday night. Gates open at 5 pm; rodeo at 7:30.",
    tags: ["Rodeo", "Family", "Holiday"],
    outdoor: true,
  },
  {
    slug: "pops-in-the-park",
    title: "Pops in the Park",
    date: "2026-07-03T20:00:00-05:00",
    location: "Comanche Trail Amphitheater",
    lat: 32.2118,
    lng: -101.4831,
    image: "/assets/venues/comanche-trail-park-ampitheater.jpeg",
    summary:
      "The Big Spring Symphony's free Independence-Eve concert — patriotic music and fireworks finale.",
    description:
      "Every July 3rd, the Big Spring Symphony Association's Pops in the Park fills the 6,000-seat CCC amphitheater with brass, patriotic medleys, and fireworks. Free. Bring a blanket, a picnic, and arrive by sunset.",
    tags: ["Music", "Free", "Fireworks", "Holiday"],
    outdoor: true,
  },
  {
    slug: "comanche-warrior-triathlon",
    title: "Comanche Warrior Triathlon",
    date: "2026-09-12T07:00:00-05:00", // VERIFY
    location: "Comanche Trail Park",
    lat: 32.2128,
    lng: -101.4828,
    image:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1400&q=70",
    summary:
      "Sprint-distance triathlon — swim at the Russ McEwen Aquatic Center, bike the golf course loop, run Comanche Trail.",
    description:
      "A sprint-distance triathlon in Comanche Trail Park. 500-meter pool swim, 20K bike out to the edge of town, 5K run. Registration opens in June.",
    tags: ["Sports", "Outdoors"],
    outdoor: true,
  },
  {
    slug: "festival-of-lights",
    title: "Festival of Lights — Poinsettia Capital of Texas",
    date: "2026-11-27T18:00:00-06:00",
    endDate: "2026-12-31T22:00:00-06:00",
    location: "Comanche Trail Park",
    lat: 32.2128,
    lng: -101.4828,
    image:
      "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=1400&q=70",
    summary:
      "A drive-through holiday light display through Comanche Trail Park — Big Spring's signature Poinsettia Capital celebration.",
    description:
      "More than a mile of lit displays, sponsored and built by local businesses, civic groups and families. Free, nightly from Thanksgiving through New Year's Eve. Big Spring is officially designated the Poinsettia Capital of Texas, and the Festival of Lights is the season's centerpiece.",
    tags: ["Holiday", "Free", "Family friendly"],
    outdoor: true,
  },
];

export function eventBySlug(slug: string) {
  return events.find((e) => e.slug === slug);
}

export function upcomingEvents(limit?: number) {
  const sorted = [...events].sort((a, b) => +new Date(a.date) - +new Date(b.date));
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

export function formatEventDate(e: Event) {
  const start = new Date(e.date);
  const opts: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  if (!e.endDate) return start.toLocaleDateString("en-US", opts);
  const end = new Date(e.endDate);
  return `${start.toLocaleDateString("en-US", opts)} – ${end.toLocaleDateString("en-US", opts)}`;
}

/* -------------------------------------------------------------- */
/* Venues — meeting / event spaces with capacity data              */
/* -------------------------------------------------------------- */

export type Venue = {
  slug: string;
  name: string;
  capacity: number;
  capacityNote?: string;
  sqft?: number;
  rooms?: number;
  setting: "indoor" | "outdoor" | "mixed";
  features: string[];
  phone?: string;
  image: string;
  blurb: string;
  tier: 1 | 2 | 3 | 4 | 5;
};

export const venues: Venue[] = [
  {
    slug: "comanche-trail-amphitheater",
    name: "Comanche Trail Amphitheater",
    capacity: 6000,
    setting: "outdoor",
    tier: 1,
    features: [
      "Civilian Conservation Corps — built 1930",
      "Host venue for Pops in the Park",
      "Natural stone seating & stage",
      "Parking for 1,000+",
    ],
    phone: "432-264-2323",
    image: "/assets/venues/comanche-trail-park-ampitheater.jpeg",
    blurb:
      "The city's largest venue. A CCC-built stone amphitheater inside Comanche Trail Park, for concerts, rodeo kick-offs, symphony nights and the Annual Fourth of July Celebration.",
  },
  {
    slug: "dorothy-garrett-coliseum",
    name: "Dorothy Garrett Coliseum",
    capacity: 4000,
    capacityNote: "East Room: 600 lecture / 300 banquet",
    sqft: 90000,
    rooms: 3,
    setting: "indoor",
    tier: 1,
    features: [
      "17,000 sq ft arena, unobstructed sight lines",
      "4,000 contoured seats + 1,500 portable",
      "East Room divisible into 6 sub-rooms",
      "On-site athletic complex",
    ],
    phone: "432-264-5045",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=70",
    blurb:
      "A 90,000 sq ft multi-use coliseum on the Howard College campus — concerts, conventions, trade shows, regional sports. The region's largest indoor venue.",
  },
  {
    slug: "hotel-settles-events",
    name: "Hotel Settles — Grand Ballroom & Event Spaces",
    capacity: 500,
    capacityNote: "Across 8 dedicated function spaces",
    sqft: 15000,
    rooms: 8,
    setting: "indoor",
    tier: 2,
    features: [
      "Opulently restored 1930 Grand Ballroom",
      "On-site boutique hotel: 65 guest rooms",
      "Settles Grill catering",
      "Pharmacy Bar & Parlor",
    ],
    phone: "432-267-7500",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=70",
    blurb:
      "The premier West Texas destination for corporate retreats, weddings, galas, reunions, and quinceañeras — with the period-appropriate hospitality of a restored 1930 landmark.",
  },
  {
    slug: "big-spring-municipal-auditorium",
    name: "Big Spring Municipal Auditorium",
    capacity: 1412,
    setting: "indoor",
    tier: 2,
    features: [
      "Built 1932 on the old Bankhead Highway",
      "Hosted Elvis, Hank Williams Jr., Wayne Newton",
      "Home venue · Big Spring Symphony",
      "Proscenium stage + full lighting rig",
    ],
    phone: "432-264-2323",
    image:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1400&q=70",
    blurb:
      "A 1932 performing-arts landmark on Third Street — downtown's premier stage for symphony, concerts, graduations, and touring productions.",
  },
  {
    slug: "dora-roberts-community-center",
    name: "Dora Roberts Community Center",
    capacity: 300,
    capacityNote: "Ballroom up to 300 · Lake Room up to 80",
    sqft: 3600,
    rooms: 4,
    setting: "mixed",
    tier: 3,
    features: [
      "Lakeside on Comanche Trail Lake",
      "3,600 sq ft Ballroom",
      "Lake Room overlooks the water",
      "Outdoor pavilion for weddings",
    ],
    phone: "432-264-2323",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1400&q=70",
    blurb:
      "Four rentable rooms overlooking Comanche Trail Lake — the city's go-to for weddings, dinners, and community gatherings up to 300 guests.",
  },
  {
    slug: "howard-county-fair-barns",
    name: "Howard County Fair Barns",
    capacity: 1500,
    setting: "indoor",
    tier: 3,
    features: [
      "Home of the Howard County Fair & Rodeo",
      "Livestock judging arena",
      "Concession + midway space",
      "Large covered barn events",
    ],
    phone: "432-816-7808",
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1400&q=70",
    blurb:
      "A working fairgrounds with covered barns sized for agricultural shows, rodeo, and large social events.",
  },
  {
    slug: "welch-reception-center",
    name: "Welch Reception Center",
    capacity: 250,
    setting: "indoor",
    tier: 4,
    features: [
      "Traditional reception-hall layout",
      "Catering prep kitchen",
      "On-site parking",
    ],
    phone: "432-267-6331",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=70",
    blurb:
      "A reliable mid-size reception hall for weddings, banquets, and community events up to 250 guests.",
  },
];

export function venueBySlug(slug: string) {
  return venues.find((v) => v.slug === slug);
}

/* -------------------------------------------------------------- */
/* Stories — editorial long-form articles                           */
/* -------------------------------------------------------------- */

export type Story = {
  slug: string;
  title: string;
  dek: string;
  author: string;
  date: string; // ISO
  readMinutes: number;
  image: string;
  /** Markdown-ish body. Paragraphs separated by blank lines. */
  body: string;
};

export const stories: Story[] = [
  {
    slug: "the-spring-at-the-source",
    title: "The Spring at the Source",
    dek: "A reliable watering hole in Sulphur Draw — and the ten-thousand-year story of the people, animals, and towns it pulled in.",
    author: "Visit Big Spring editorial",
    date: "2026-02-14",
    readMinutes: 5,
    image:
      "https://images.unsplash.com/photo-1562089077-e6f23ff06a63?auto=format&fit=crop&w=1600&q=75",
    body: `There is a spring in a rocky gorge on the south edge of town.

It is not dramatic. No waterfall, no geyser, no tourist boardwalk. A seep of sulphur-tinged water rising through fractured limestone where the Edwards Plateau and the Llano Estacado meet — the kind of thing you might drive past without noticing.

People have not been driving past it for ten thousand years.

Mastodon bones have been pulled from the silt near the spring. Wooly mammoth. Saber-toothed tiger. Long before any human set foot in West Texas, the spring was already the best reliable water for a hundred miles in any direction, and every large mammal that lived on the southern plains knew it.

The Spanish came next. Álvar Núñez Cabeza de Vaca, wrecked and walking across the continent in 1535, documented the site on his overland crossing. For two centuries after him, traders moving between Santa Fe and the lower Rio Grande used the spring as a waypoint on the Chihuahua trail. Comanche, Kiowa and Apache bands gathered here on the Great Comanche War Trail — the rocky gorge made it a natural meeting point, hard to approach unseen.

In 1849, Captain Randolph B. Marcy led an expedition back from Santa Fe to Fort Smith, Arkansas. His journal mentions the spring by name. He marked it as a campsite on the Overland Trail to California. Signal Mountain, ten miles southeast, was his landmark on the horizon.

The railroad arrived in 1881. The town was incorporated the following year. The tent city around the spring disappeared; permanent residences took its place. The spring began to serve a town that had taken its name from it.

In 2019, the Convention & Visitors Bureau completed a major restoration of the site. Native stone, CCC-style construction to match the park around it. Two observation decks overlook the water. Eight engraved corten-metal story boards, mounted on limestone, tell each period of the history in sequence: Ice Age animals, Spanish exploration, the Great Comanche War Trail, Marcy's expedition, the railroad, the oil boom, the bombardier school, today.

A widened trail brings wheelchairs and strollers to the edge of the water. A 1,000-seat plaza with electrical hookups and a performance stage hosts community events. A walking area is devoted to the Native American history of the region. A replica ranch dugout represents the ranching heritage.

Go stand at the edge of the observation deck. The water is still there. It is still the same water.

That is the story.`,
  },
  {
    slug: "skies-and-engines",
    title: "Skies and Engines: Big Spring's Aviation Heritage",
    dek: "From the 1942 Bombardier School to Webb AFB to today's Hangar 25 — the air above Big Spring has carried a lot of weight.",
    author: "Visit Big Spring editorial",
    date: "2026-03-02",
    readMinutes: 4,
    image:
      "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?auto=format&fit=crop&w=1600&q=75",
    body: `In the summer of 1942, the U.S. Army Air Forces broke ground on a bombardier school two miles southwest of Big Spring.

Pilots-in-training arrived by the trainload. The airfield opened in October. By the time the war ended, thousands of bombardiers had qualified there — young men, mostly, from every state, learning to drop ordnance from B-17s over the West Texas scrub before shipping out to the Pacific and Europe.

The base closed in 1945. For seven years it sat mostly empty, the runways still there, the hangars still there, the dust settling on the training manuals.

In 1952, the Korean War reopened it as Webb Air Force Base, an undergraduate pilot training facility. For the next twenty-five years, Webb trained more than ten thousand American pilots. You could stand downtown and watch T-38s practice touch-and-goes in the pattern overhead. The base became the largest single employer in Howard County.

Webb closed in 1977. The pilots left. The runways became McMahon-Wrinkle Airpark, an industrial park and a general-aviation airfield.

One hangar remained.

In 1999, local aviation enthusiasts and a coalition of veterans reopened one of the restored WWII T-hangars as the Hangar 25 Air Museum. The collection grew. Artifacts came in from former Webb airmen and their families — uniforms, photographs, tools, propellers, logbooks. A UH-1 Huey helicopter was placed outside. A T-38 trainer, the one that flew here, was brought back.

Today, on most weekdays, the staff at Hangar 25 includes retired airmen and civil-service veterans who worked the base when it was active. They remember. They tell you what a typical training day was like, what the mess hall served, what the instructors said to a nervous cadet before a check ride. Since the museum opened in 1999, more than 50,000 visitors from all fifty states and thirty countries have walked its floor.

If you come to Big Spring, you will notice the airspace. You will notice a warbird overhead in July around the Fourth, you will notice helicopters sometimes, you will notice the perfectly flat runway threading out toward Signal Mountain at the edge of the horizon. It is quiet airspace now. But it has held a lot.

The museum is open Tuesday through Saturday. Admission is donation-based. Ask the person at the desk whether they flew here. Often, they did.`,
  },
  {
    slug: "outdoors-without-the-crowds",
    title: "Outdoors Without the Crowds",
    dek: "State park, recreation park, lake, and a sandhill-crane migration — four West Texas outdoor experiences within ten miles of the interstate.",
    author: "Visit Big Spring editorial",
    date: "2026-03-21",
    readMinutes: 4,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=75",
    body: `Most national parks require a plane ticket, a reservation, and a crowd.

Big Spring doesn't.

Start with **Big Spring State Park.** It sits on top of Scenic Mountain, a mesa rising 200 feet above the plain on the south edge of town. A three-mile paved loop road circles the summit; a five-mile natural hike-and-bike trail drops below; a two-thirds-mile nature trail shows off the desert vegetation. Entrance is free. The pavilion at the top — built by the Civilian Conservation Corps in the 1930s — is available for group reservations. The view, in every direction, is the Llano Estacado to the horizon.

If you come for one thing, come for the sunset. Every evening, the west-facing rim of the loop road fills with pickup trucks, cyclists, photographers, and a quiet line of joggers on the final lap. Few parks in the country have a better ratio of sunset-per-effort.

Next, **Comanche Trail Park.** A 136-acre recreation area on the south side of town, built by the CCC in the 1930s and run by the City of Big Spring ever since. It has five picnic pavilions, three playgrounds, a softball field, a 36-hole disc golf course, an 18-hole golf course, nine tennis courts, a 6,000-seat amphitheater, a family aquatic center, and a small lake. You can get lost there for a day and not overlap with anyone else.

Then **Moss Creek Lake.** Twelve miles southeast of town. Constructed in 1938 by the City of Big Spring with help from the Army Corps of Engineers. 640 acres of recreation water — fishing (bass, catfish), 26 sheltered campsites and pavilions you can reserve, a beach swim area, and ATV trails. It is not, in any sense, a Central Texas lake: there will not be a line at the boat ramp on a Saturday in July.

And finally, a quiet one. **The Sandhill Crane Observatory.** A small viewing area west of downtown. For about three weeks in late October, the migratory cranes rest on the playa lakes around Big Spring on their way south from the breeding grounds in Canada. The birds arrive at dawn and leave at dusk. If you are there at either end of the day, with binoculars and coffee, you will see several thousand very large birds flying in formation over a very big sky.

That is the outdoors, here.

Four experiences. Free or nearly free. All within ten miles of the interstate. No reservation required.`,
  },
];

export function storyBySlug(slug: string) {
  return stories.find((s) => s.slug === slug);
}
