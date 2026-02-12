export interface Homestay {
  id: string;
  title: string;
  subtitle: string;
  route: string;
  image: string;
  description: string;
  longDescription: string;
  amenities: string[];
  features: string[];
  rooms: number;
  guests: number;
  bathrooms: number;
  price: string;
  pricePerNight: number;
  highlights: string[];
  location: string;
  nearbyAttractions: string[];
}

export const homestays: Homestay[] = [
  {
    id: "whitehouse",
    title: "WHITE HOUSE",
    subtitle: "Luxury Coastal Retreat",
    route: "Whitehouse",
    image: "/whitehouse.webp",
    description: "Luxurious 6BHK Villa. Near Malpe Beach. Perfect for large groups and families.",
    longDescription: "Experience true luxury at our iconic White House, a pristine coastal retreat featuring floor-to-ceiling windows, private balconies, and breathtaking ocean views. This architectural masterpiece combines contemporary comfort with timeless elegance. Located in Udupi city center, near the beautiful Malpe Beach, offering the perfect escape for discerning travelers.",
    amenities: [
      "Private swimming pool",
      "Ocean view terrace",
      "Fully equipped kitchen",
      "Air conditioning throughout",
      "Spacious living areas",
      "Multiple entertainment zones",
      "24/7 security",
      "Parking facility"
    ],
    features: [
      "6 bedrooms",
      "Large living spaces",
      "Modern furnishings",
      "Beach proximity",
      "Outdoor seating areas",
      "Well-maintained gardens"
    ],
    rooms: 6,
    guests: 35,
    bathrooms: 4,
    price: "₹2,00,000+",
    pricePerNight: 20000,
    highlights: [
      "Near Malpe Beach",
      "Perfect for large groups",
      "Modern amenities",
      "City center location"
    ],
    location: "Udupi City Center, Karnataka",
    nearbyAttractions: [
      "Malpe Beach",
      "Sri Krishna Temple",
      "St. Mary's Island",
      "Kaup Beach"
    ]
  },
  {
    id: "gardenvilla",
    title: "GARDEN VILLA",
    subtitle: "Spacious Bedrooms Paradise",
    route: "GardenVilla",
    image: "/gardenvilla.webp",
    description: "5BHK spacious bedrooms and fully furnished villa. Perfect for family gatherings.",
    longDescription: "Immerse yourself in luxury at our Garden Villa, a spacious 5-bedroom retreat offering fully furnished accommodations. This eco-conscious property seamlessly blends modern comfort with nature, featuring lush gardens, outdoor living spaces, and all the amenities needed for an unforgettable stay.",
    amenities: [
      "Swimming pool",
      "Fully furnished rooms",
      "Complete kitchen facilities",
      "Spacious dining area",
      "Living and recreation rooms",
      "Outdoor garden space",
      "Parking available",
      "Air conditioning"
    ],
    features: [
      "5 spacious bedrooms",
      "Fully furnished",
      "Modern kitchen",
      "Large gardens",
      "Multiple bathrooms",
      "Well-designed interiors"
    ],
    rooms: 5,
    guests: 20,
    bathrooms: 3,
    price: "₹1,80,000+",
    pricePerNight: 18000,
    highlights: [
      "Spacious bedrooms",
      "Family-friendly",
      "Fully furnished",
      "Beautiful gardens"
    ],
    location: "Udupi City Center, Karnataka",
    nearbyAttractions: [
      "Shopping markets",
      "Restaurants and cafes",
      "Local temples",
      "Entertainment zones"
    ]
  },
  {
    id: "cottagehouse",
    title: "COTTAGE HOUSE",
    subtitle: "Air-Conditioned 3BHK Villa",
    route: "CottageHouse",
    image: "/cottagehouse.webp",
    description: "Air-conditioned 3-BHK fully furnished villa. Perfect for small to medium families.",
    longDescription: "Step into comfort at our Cottage House, a charming 3-bedroom fully furnished villa with air conditioning throughout. Located 7 km from Udupi and 15 km from Manipal, this cozy retreat offers the perfect balance of comfort and accessibility, ideal for family vacations and getaways.",
    amenities: [
      "Air conditioning",
      "Fully furnished",
      "Complete kitchen",
      "Dining area",
      "Living room",
      "Outdoor space",
      "Parking",
      "Water supply"
    ],
    features: [
      "3 bedrooms",
      "Air-conditioned rooms",
      "Modern furnishings",
      "Compact design",
      "2 bathrooms",
      "Natural light"
    ],
    rooms: 3,
    guests: 8,
    bathrooms: 2,
    price: "₹1,20,000+",
    pricePerNight: 12000,
    highlights: [
      "Air-conditioned",
      "Fully furnished",
      "Family-friendly",
      "Affordable pricing"
    ],
    location: "Near Udupi (7 km) & Manipal (15 km), Karnataka",
    nearbyAttractions: [
      "Manipal University",
      "Local restaurants",
      "Shopping areas",
      "Coastal roads"
    ]
  },
  {
    id: "hilltopvilla",
    title: "HILL TOP VILLA",
    subtitle: "Air-Conditioned 3BHK Villa",
    route: "TopVilla",
    image: "/hilltopvilla.webp",
    description: "3-BHK Villa with Air Conditioning. Scenic elevated location with beautiful views.",
    longDescription: "Command stunning views at our Hill Top Villa, a 3-bedroom air-conditioned villa with an elevated location offering panoramic vistas. Located 7 km from Udupi and 15 km from Manipal, this premium residence provides the perfect blend of comfort and scenic beauty for a memorable getaway.",
    amenities: [
      "Air conditioning",
      "Panoramic views",
      "Fully furnished",
      "Kitchen facilities",
      "Living and dining areas",
      "Outdoor viewing space",
      "Parking facility",
      "24/7 water supply"
    ],
    features: [
      "3 bedrooms",
      "Elevated location",
      "Scenic views",
      "Air-conditioned",
      "2 bathrooms",
      "Modern interiors"
    ],
    rooms: 3,
    guests: 10,
    bathrooms: 2,
    price: "₹1,35,000+",
    pricePerNight: 13500,
    highlights: [
      "Scenic views",
      "Elevated location",
      "Air-conditioned",
      "Perfect for couples & families"
    ],
    location: "Near Udupi (7 km) & Manipal (15 km), Karnataka",
    nearbyAttractions: [
      "Viewpoint",
      "Hill trails",
      "Scenic spots",
      "Local attractions"
    ]
  },
  {
    id: "sunrisehome",
    title: "SUNRISE HOME",
    subtitle: "3BHK Brick House",
    route: "SunriseHome",
    image: "/sunrise home.webp",
    description: "3-BHK Brick House with beautiful design. Ideal for small families and couples.",
    longDescription: "Enjoy comfort and privacy at our Sunrise Home, a modern 3-bedroom brick house with thoughtful design and cozy interiors. Located 7 km from Udupi and 15 km from Manipal, this charming property is perfect for families seeking a peaceful retreat away from the city hustle.",
    amenities: [
      "Fully furnished",
      "Complete kitchen",
      "Dining area",
      "Living room",
      "Ceiling fans",
      "Outdoor space",
      "Parking",
      "Basic amenities"
    ],
    features: [
      "3 bedrooms",
      "Brick construction",
      "Modern design",
      "Spacious rooms",
      "2 bathrooms",
      "Well-lit interiors"
    ],
    rooms: 3,
    guests: 6,
    bathrooms: 2,
    price: "₹1,00,000+",
    pricePerNight: 10000,
    highlights: [
      "Budget-friendly",
      "Comfortable stay",
      "Peaceful location",
      "Ideal for small groups"
    ],
    location: "Near Udupi (7 km) & Manipal (15 km), Karnataka",
    nearbyAttractions: [
      "Manipal Lake",
      "Local eateries",
      "Shopping centers",
      "Peaceful environment"
    ]
  },
  {
    id: "chalet-labonne-vie",
    title: "CHALET LA BONNE VIE",
    subtitle: "2BHK Modern House",
    route: "ChaletLabonne",
    image: "/chaletlabonnevie.webp",
    description: "2-BHK Modern house with Bird sanctuary and Farm. Unique nature experience.",
    longDescription: "Experience modern living in harmony with nature at Chalet La Bonne Vie, a charming 2-bedroom modern house featuring access to a bird sanctuary and working farm. Located 7 km from Udupi and 15 km from Manipal, this unique property offers an authentic connection with nature and wildlife.",
    amenities: [
      "Modern furnishings",
      "Equipped kitchen",
      "Dining space",
      "Living area",
      "Bird sanctuary access",
      "Farm access",
      "Outdoor space",
      "Parking facility"
    ],
    features: [
      "2 bedrooms",
      "Modern design",
      "Bird sanctuary",
      "Farm access",
      "1 bathroom",
      "Nature-focused"
    ],
    rooms: 2,
    guests: 5,
    bathrooms: 1,
    price: "₹85,000+",
    pricePerNight: 8500,
    highlights: [
      "Unique bird sanctuary",
      "Farm experience",
      "Nature immersion",
      "Eco-friendly stay"
    ],
    location: "Near Udupi (7 km) & Manipal (15 km), Karnataka",
    nearbyAttractions: [
      "Bird sanctuary",
      "Farm areas",
      "Natural surroundings",
      "Peaceful villages"
    ]
  },
  {
    id: "viewpoint-oasis",
    title: "VIEWPOINT OASIS",
    subtitle: "Premium Retreat with Facilities",
    route: "ViewPoint",
    image: "/viewpoint.webp",
    description: "Exclusive property with Jacuzzi, View Point, and BBQ Area. Premium amenities.",
    longDescription: "Discover ultimate relaxation at Viewpoint Oasis, our premium retreat featuring state-of-the-art facilities including a jacuzzi, scenic viewpoint, and BBQ area. Located 7 km from Udupi and 15 km from Manipal, this sophisticated property is perfect for special occasions and group celebrations.",
    amenities: [
      "Jacuzzi facility",
      "BBQ area",
      "Scenic viewpoint",
      "Fully furnished",
      "Kitchen facilities",
      "Dining area",
      "Lounge space",
      "Parking & security"
    ],
    features: [
      "Premium amenities",
      "Jacuzzi",
      "Viewpoint access",
      "BBQ setup",
      "Well-designed",
      "Modern facilities"
    ],
    rooms: 3,
    guests: 12,
    bathrooms: 2,
    price: "₹1,50,000+",
    pricePerNight: 15000,
    highlights: [
      "Jacuzzi facility",
      "BBQ area",
      "Scenic views",
      "Premium amenities"
    ],
    location: "Near Udupi (7 km) & Manipal (15 km), Karnataka",
    nearbyAttractions: [
      "Viewpoint locations",
      "Dining spots",
      "Entertainment zones",
      "Social venues"
    ]
  }
];

export const getHomestayByRoute = (route: string) => {
  return homestays.find(h => h.route === route);
};

export const getHomestayById = (id: string) => {
  return homestays.find(h => h.id === id);
};
