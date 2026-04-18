/**
 * Seed data for the Visit Big Spring prototype.
 *
 * In production this would be sourced from a headless CMS (proposed:
 * WordPress + WPGraphQL, or Sanity/Payload) via a typed client in this
 * same module shape — pages stay unchanged when the CMS is wired up.
 */

export type SectionKey = "stay" | "eat-drink" | "explore" | "history" | "events";

export const sections: { key: SectionKey; label: string; tagline: string; href: string }[] = [
  { key: "stay", label: "Stay", tagline: "Rest easy under a wide Texas sky.", href: "/stay" },
  { key: "eat-drink", label: "Eat & Drink", tagline: "West Texas flavor, hometown tables.", href: "/eat-drink" },
  { key: "explore", label: "Explore", tagline: "Mesas, trails, tee boxes and trolley rides.", href: "/explore" },
  { key: "history", label: "History", tagline: "From cattle drives to the spring itself.", href: "/history" },
  { key: "events", label: "Events", tagline: "Festivals, rodeos, and small-town holidays.", href: "/events" },
];

export type Business = {
  slug: string;
  name: string;
  category: SectionKey;
  blurb: string;
  address: string;
  phone?: string;
  website?: string;
  image: string; // Unsplash or placeholder
  tags: string[];
};

export const businesses: Business[] = [
  // -------- EXPLORE: parks, outdoor rec, civic recreation --------
  {
    slug: "big-spring-state-park",
    name: "Big Spring State Park",
    category: "explore",
    blurb:
      "A 382-acre mesa-top park with a three-mile scenic loop, picnic pavilions, and some of the widest horizons in West Texas.",
    address: "1 Scenic Drive, Big Spring, TX 79720",
    phone: "432-263-4931",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=70",
    tags: ["Outdoors", "Scenic drive", "Family friendly"],
  },
  {
    slug: "comanche-trail-park",
    name: "Comanche Trail Park",
    category: "explore",
    blurb:
      "The city's recreation hub — lake, amphitheater, disc golf, walking trails and the seasonal Festival of Lights.",
    address: "Golf Course Road, Big Spring, TX 79720",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=70",
    tags: ["Outdoors", "Family friendly", "Events venue"],
  },
  {
    slug: "comanche-trail-golf-course",
    name: "Comanche Trail Golf Course",
    category: "explore",
    blurb:
      "An 18-hole municipal course carved through mesquite and live oak. Tee times welcome visitors year-round.",
    address: "2401 Whipkey Dr, Big Spring, TX 79720",
    phone: "432-264-2366",
    image:
      "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=1400&q=70",
    tags: ["Golf", "Outdoors"],
  },
  {
    slug: "russ-mcewen-aquatic-center",
    name: "Russ McEwen Family Aquatic Center",
    category: "explore",
    blurb:
      "A seasonal aquatic center with pools, slides and a pavilion available for group rentals — the summer heartbeat of family recreation in Big Spring.",
    address: "Big Spring, TX 79720",
    image:
      "https://images.unsplash.com/photo-1534804055670-7f7b0d8fb3ca?auto=format&fit=crop&w=1400&q=70",
    tags: ["Family friendly", "Outdoors", "Seasonal"],
  },
  {
    slug: "moss-creek-lake",
    name: "Moss Creek Lake",
    category: "explore",
    blurb:
      "A quiet West Texas fishing and camping lake just outside town — bass, catfish, and sunset skies that explain the hashtag.",
    address: "Moss Creek Rd, Big Spring, TX 79720",
    image:
      "https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&w=1400&q=70",
    tags: ["Fishing", "Camping", "Outdoors"],
  },
  {
    slug: "comanche-trail-amphitheater",
    name: "Comanche Trail Amphitheater",
    category: "explore",
    blurb:
      "A 6,000-seat outdoor amphitheater built by the Civilian Conservation Corps in 1930 — home to Pops in the Park every July 3rd and summer concert nights.",
    address: "Golf Course Road, Big Spring, TX 79720",
    phone: "432-264-2323",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1400&q=70",
    tags: ["Events venue", "CCC-built", "Capacity 6,000"],
  },
  {
    slug: "sandhill-crane-observatory",
    name: "Sandhill Crane Observatory",
    category: "explore",
    blurb:
      "A seasonal viewing site for the sandhill crane migration. Best light is at sunrise and sunset in late October — bring binoculars and a thermos.",
    address: "3rd St &amp; Channing, Big Spring, TX 79720",
    image:
      "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=1400&q=70",
    tags: ["Wildlife", "Photography", "Seasonal"],
  },
  {
    slug: "dora-roberts-community-center",
    name: "Dora Roberts Community Center",
    category: "explore",
    blurb:
      "A lakeside event center on Comanche Trail Lake — four rooms, up to 300 guests, a 3,600 sq ft ballroom, and an outdoor pavilion for weddings.",
    address: "100 Whipkey Dr, Big Spring, TX 79720",
    phone: "432-264-2323",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1400&q=70",
    tags: ["Events venue", "Weddings", "Lakeside"],
  },

  // -------- HISTORY: museums, monuments, heritage --------
  {
    slug: "heritage-museum",
    name: "Heritage Museum of Big Spring",
    category: "history",
    blurb:
      "Artifacts, photographs and rotating exhibits tracing Howard County from Comanche homeland through the oil boom.",
    address: "510 Scurry St, Big Spring, TX 79720",
    image:
      "https://images.unsplash.com/photo-1565060169187-5284fc87ea1e?auto=format&fit=crop&w=1400&q=70",
    tags: ["Museums", "Indoor"],
  },
  {
    slug: "hangar-25",
    name: "Hangar 25 Air Museum",
    category: "history",
    blurb:
      "A restored WWII T-hangar at the former Big Spring Army Air Field — celebrating the Bombardier School, Webb AFB, and the aircraft and airmen who trained here.",
    address: "1911 Apron Dr, Big Spring, TX 79720",
    image:
      "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?auto=format&fit=crop&w=1400&q=70",
    tags: ["Museums", "Aviation", "WWII"],
  },
  {
    slug: "potton-house",
    name: "Potton House",
    category: "history",
    blurb:
      "An 1898 sandstone home turned house museum — one of the oldest standing structures in Big Spring, preserved and open for tours.",
    address: "200 Gregg St, Big Spring, TX 79720",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=70",
    tags: ["Historic home", "Museum", "Downtown"],
  },
  {
    slug: "vietnam-memorial",
    name: "Big Spring Vietnam Memorial",
    category: "history",
    blurb:
      "A Tribute to Noble Warriors — a community-built memorial honoring the service and sacrifice of Big Spring's Vietnam-era veterans.",
    address: "Big Spring, TX 79720",
    image:
      "https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&w=1400&q=70",
    tags: ["Monument", "Veterans", "Heritage"],
  },
  {
    slug: "municipal-auditorium",
    name: "Big Spring Municipal Auditorium",
    category: "history",
    blurb:
      "Built 1932 on the old Bankhead Highway — 1,412 seats that have hosted Elvis Presley, Hank Williams Jr. and Wayne Newton. Home to the Big Spring Symphony today.",
    address: "310 East Third Street, Big Spring, TX 79720",
    phone: "432-264-2323",
    image:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1400&q=70",
    tags: ["Historic", "1932", "Symphony"],
  },
  {
    slug: "bankhead-highway",
    name: "The Bankhead Highway",
    category: "history",
    blurb:
      "The \"Broadway of America\" — the first transcontinental highway across the South. Ran right down Third Street past Hotel Settles and the Municipal Auditorium, and set the path that became I-20.",
    address: "3rd Street corridor, Big Spring, TX 79720",
    image:
      "https://images.unsplash.com/photo-1519642918688-7e43b19245d8?auto=format&fit=crop&w=1400&q=70",
    tags: ["Historic road", "Texas Historical Commission", "Downtown"],
  },
  {
    slug: "historic-spring",
    name: "The Historic Spring",
    category: "history",
    blurb:
      "The actual spring that named the town — restored with eight corten-metal storyboards on limestone, two observation decks, and a 1,000-seat plaza. Cabeza de Vaca noted it in 1535.",
    address: "Comanche Trail Park, Big Spring, TX 79720",
    image:
      "https://images.unsplash.com/photo-1562089077-e6f23ff06a63?auto=format&fit=crop&w=1400&q=70",
    tags: ["Landmark", "Restored 2019", "CCC heritage"],
  },

  // -------- STAY: real lodging roster from CVB --------
  {
    slug: "hotel-settles",
    name: "Hotel Settles",
    category: "stay",
    blurb:
      "A restored 1930 landmark on the downtown skyline — period rooms, Settles Grill, and rooftop views of the mesa.",
    address: "200 E 3rd St, Big Spring, TX 79720",
    phone: "432-267-7500",
    website: "https://hotelsettles.com",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1400&q=70",
    tags: ["Historic", "Downtown", "Full-service"],
  },
  {
    slug: "hampton-inn",
    name: "Hampton Inn Big Spring",
    category: "stay",
    blurb:
      "Reliable comfort off I-20 with free breakfast, fitness center and outdoor pool.",
    address: "805 W. I-20, Big Spring, TX 79720",
    phone: "432-264-9800",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=70",
    tags: ["Chain", "I-20", "Breakfast included"],
  },
  {
    slug: "la-quinta",
    name: "La Quinta Inn & Suites",
    category: "stay",
    blurb:
      "Pet-friendly interstate stay with a pool, gym, and an easy exit to downtown or Scenic Mountain.",
    address: "1102 I-20 West, Big Spring, TX 79720",
    phone: "432-264-0222",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=70",
    tags: ["Chain", "I-20", "Pet friendly"],
  },
  {
    slug: "towneplace-suites",
    name: "TownePlace Suites by Marriott",
    category: "stay",
    blurb:
      "Extended-stay suites with kitchenettes — built for oilfield crews, travel nurses, and families who want room to spread out.",
    address: "1011 N. San Antonio, Big Spring, TX 79720",
    phone: "432-606-5166",
    image:
      "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?auto=format&fit=crop&w=1400&q=70",
    tags: ["Extended stay", "Kitchenette", "Chain"],
  },
  {
    slug: "comfort-inn",
    name: "Comfort Inn & Suites",
    category: "stay",
    blurb: "Dependable interstate rooms with breakfast, pool, and meeting space.",
    address: "1109 N. Aylesford, Big Spring, TX 79720",
    phone: "432-263-5400",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=70",
    tags: ["Chain", "Breakfast included"],
  },
  {
    slug: "best-western-palace-inn",
    name: "Best Western Palace Inn",
    category: "stay",
    blurb: "A comfortable, reasonably priced stay on the Lamesa Highway north of town.",
    address: "915 Lamesa Hwy, Big Spring, TX 79720",
    phone: "432-264-1500",
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1400&q=70",
    tags: ["Chain", "Value"],
  },
  {
    slug: "sleep-inn-mainstay",
    name: "Sleep Inn & MainStay Suites",
    category: "stay",
    blurb:
      "Sister-branded properties under one roof — a traditional hotel room or a longer-stay suite, your call.",
    address: "308 E. 12th Street, Big Spring, TX 79720",
    phone: "432-606-5118",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=70",
    tags: ["Chain", "Extended stay option"],
  },
  {
    slug: "baymont-inn",
    name: "Baymont Inn & Suites",
    category: "stay",
    blurb: "Dependable budget-to-midscale rooms on the Lamesa Highway corridor.",
    address: "917 Lamesa Hwy, Big Spring, TX 79720",
    phone: "432-268-0568",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=70",
    tags: ["Chain", "Value"],
  },

  // -------- EAT & DRINK --------
  {
    slug: "settles-grill",
    name: "Settles Grill",
    category: "eat-drink",
    blurb:
      "Hotel Settles' flagship — chef-driven steaks, seasonal plates and the best cocktail program between Abilene and Midland.",
    address: "200 E 3rd St, Big Spring, TX 79720",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=70",
    tags: ["Fine dining", "Cocktails", "Historic"],
  },
  {
    slug: "alberto-s",
    name: "Alberto's Restaurant",
    category: "eat-drink",
    blurb:
      "Family-run Tex-Mex institution serving enchiladas and chile rellenos to generations of Big Spring diners.",
    address: "1500 E 4th St, Big Spring, TX 79720",
    image:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1400&q=70",
    tags: ["Tex-Mex", "Family friendly", "Local favorite"],
  },
  {
    slug: "pharmacy-bar",
    name: "Pharmacy Bar &amp; Parlor",
    category: "eat-drink",
    blurb:
      "Tucked inside Hotel Settles — a dark, walnut-and-brass cocktail parlor with the strongest drinks program between Abilene and Midland.",
    address: "200 E 3rd St, Big Spring, TX 79720",
    phone: "432-267-7500",
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1400&q=70",
    tags: ["Cocktails", "Historic", "Late night"],
  },
  {
    slug: "train-car-cigar-bar",
    name: "The Train Car Cigar Bar",
    category: "eat-drink",
    blurb:
      "A downtown cigar lounge on Main Street — humidor, craft cocktails, and the kind of booth you settle into for the evening.",
    address: "100 S Main Street, Big Spring, TX 79720",
    phone: "432-270-6113",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1400&q=70",
    tags: ["Cigars", "Cocktails", "Downtown"],
  },
  {
    slug: "desert-flower-art-gallery",
    name: "Desert Flower Art Gallery",
    category: "eat-drink",
    blurb:
      "Art gallery by day, bar by night — downtown's most atmospheric hangout, open late Monday through Sunday.",
    address: "123 S. Main Street, Big Spring, TX 79720",
    phone: "432-270-0290",
    image:
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1400&q=70",
    tags: ["Art gallery", "Bar", "Downtown"],
  },
  {
    slug: "lumbre-bar-and-grill",
    name: "Lumbre Bar and Grill",
    category: "eat-drink",
    blurb:
      "Downtown grill and cocktail bar on Runnels — open evenings, weekends till midnight.",
    address: "322 Runnels St, Big Spring, TX 79720",
    phone: "432-606-5039",
    image:
      "https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1400&q=70",
    tags: ["Grill", "Cocktails", "Downtown"],
  },
  {
    slug: "downtown-dining",
    name: "Historic Downtown Dining District",
    category: "eat-drink",
    blurb:
      "A walkable stretch of Main and 3rd with cafés, coffee shops, barbecue, and patios built for the West Texas golden hour.",
    address: "Main &amp; 3rd St, Big Spring, TX 79720",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=70",
    tags: ["Downtown", "Walkable", "Variety"],
  },
];

export function businessesByCategory(cat: SectionKey) {
  return businesses.filter((b) => b.category === cat);
}

export function businessBySlug(slug: string) {
  return businesses.find((b) => b.slug === slug);
}

export type Event = {
  slug: string;
  title: string;
  date: string; // ISO
  endDate?: string;
  location: string;
  image: string;
  summary: string;
  description: string;
  tags: string[];
};

export const events: Event[] = [
  {
    slug: "pops-in-the-park",
    title: "Pops in the Park",
    date: "2026-05-23T19:00:00-05:00",
    location: "Comanche Trail Park Amphitheater",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1400&q=70",
    summary: "Free symphony night under the stars to kick off summer.",
    description:
      "The Big Spring Symphony Association's annual Pops in the Park fills the amphitheater with brass, fireworks, and a few thousand lawn chairs. Bring a blanket, a picnic, and arrive by sunset.",
    tags: ["Music", "Free", "Family friendly"],
  },
  {
    slug: "rattlesnake-roundup-reunion",
    title: "Howard County Fair & Rodeo",
    date: "2026-06-12T18:00:00-05:00",
    endDate: "2026-06-14T22:00:00-05:00",
    location: "Howard County Fair Barn",
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1400&q=70",
    summary: "Three days of rodeo, livestock shows, BBQ and a midway.",
    description:
      "A West Texas rite of summer — PRCA-sanctioned rodeo Friday and Saturday nights, livestock judging by day, and cold drinks all weekend.",
    tags: ["Rodeo", "Family friendly", "Food"],
  },
  {
    slug: "big-spring-air-show",
    title: "Big Spring Air Show",
    date: "2026-07-04T10:00:00-05:00",
    location: "McMahon-Wrinkle Airpark",
    image:
      "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?auto=format&fit=crop&w=1400&q=70",
    summary: "Independence Day flyover, warbirds, and Hangar 25 open hangar.",
    description:
      "Warbird formation flights, civilian aerobatics and a twilight fireworks show over the mesa. Hosted in partnership with Hangar 25 Air Museum.",
    tags: ["Aviation", "Fireworks", "Holiday"],
  },
  {
    slug: "festival-of-lights",
    title: "Festival of Lights — Poinsettia Capital of Texas",
    date: "2026-11-27T18:00:00-06:00",
    endDate: "2026-12-31T22:00:00-06:00",
    location: "Comanche Trail Park",
    image:
      "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=1400&q=70",
    summary:
      "A drive-through holiday light display through Comanche Trail Park — Big Spring's signature Poinsettia Capital celebration.",
    description:
      "More than a mile of lit displays, sponsored and built by local businesses, civic groups and families. Free, nightly from Thanksgiving through New Year's Eve. Big Spring is officially designated the Poinsettia Capital of Texas, and the Festival of Lights is the season's centerpiece.",
    tags: ["Holiday", "Free", "Family friendly", "Poinsettia Capital"],
  },
  {
    slug: "sunset-big-spring",
    title: "Sunset Big Spring",
    date: "2026-04-25T19:30:00-05:00",
    location: "Big Spring State Park · Scenic Mountain",
    image:
      "https://images.unsplash.com/photo-1472213984618-c79aaec7fef0?auto=format&fit=crop&w=1400&q=70",
    summary:
      "A Canvas of Colors in the Sky — experience the magic of sunset from the mesa and tag #SUNSETBIGSPRING.",
    description:
      "Big Spring's mesa-top park sits 200 feet above the plain, and the nightly sunset over the Llano Estacado is the city's signature image. Throughout the season the CVB hosts guided sunset gatherings and photo walks at Scenic Mountain. Tag your shots with #SUNSETBIGSPRING.",
    tags: ["Outdoors", "Photography", "Free", "Family friendly"],
  },
  {
    slug: "downtown-art-walk",
    title: "Downtown Art Walk",
    date: "2026-05-02T17:00:00-05:00",
    location: "Historic Downtown Big Spring",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1400&q=70",
    summary: "First Saturday gallery stroll with live music and food trucks.",
    description:
      "Galleries, studios and storefronts stay open late. Stages at Main & 3rd feature local musicians; food trucks line Scurry Street.",
    tags: ["Arts", "Downtown", "Music"],
  },
];

export function eventBySlug(slug: string) {
  return events.find((e) => e.slug === slug);
}

export function upcomingEvents(limit?: number) {
  const sorted = [...events].sort((a, b) => +new Date(a.date) - +new Date(b.date));
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

/* -------------------------------------------------------------- */
/* Venues — meeting / event spaces with capacity data              */
/* -------------------------------------------------------------- */

export type Venue = {
  slug: string;
  name: string;
  /** Seat/guest capacity for the dominant use case. */
  capacity: number;
  /** Optional secondary capacity (e.g. banquet seating vs. lecture). */
  capacityNote?: string;
  /** Total interior square footage, if applicable. */
  sqft?: number;
  /** Number of rentable rooms or distinct function spaces. */
  rooms?: number;
  /** Outdoor / indoor / mixed. */
  setting: "indoor" | "outdoor" | "mixed";
  features: string[];
  phone?: string;
  image: string;
  blurb: string;
  /** 1 = most monumental, 5 = most intimate. Used for sort order. */
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
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1400&q=70",
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
