// Local trip package data for the frontend-only planner.
// Future prompts will use this global array to render recommendation cards and trip details.
window.tripPackages = [
  {
    id: "trip-paris-romantic",
    title: "Romantic Escape in Paris",
    city: "Paris",
    country: "France",
    tripType: "Romantic",
    tags: ["Romantic", "Culture", "Walkable"],
    interests: ["Culture", "Cuisine", "Shopping"],
    estimatedPrice: 1850,
    durationDays: 5,
    recommendedGroupSize: "2 travelers",
    kosherFriendly: true,
    rating: 4.8,
    reviewCount: 1840,
    image: "../assets/images/trips/paris-romantic-escape.jpg",
    shortDescription: "A relaxed Paris package with charming neighborhoods, classic museums, and memorable dining moments.",
    itinerary: [
      {
        day: 1,
        title: "Arrival and Seine walk",
        description: "Check in, walk along the Seine, and enjoy a calm first evening near the city center."
      },
      {
        day: 2,
        title: "Museums and cafes",
        description: "Visit famous museum areas, explore nearby gardens, and stop at classic Paris cafes."
      },
      {
        day: 3,
        title: "Montmartre and views",
        description: "Spend the day in Montmartre, visit scenic viewpoints, and enjoy a romantic dinner."
      }
    ],
    reviews: [
      {
        user: "Maya",
        rating: 5,
        comment: "The pace felt relaxed and perfect for a couples trip."
      },
      {
        user: "Daniel",
        rating: 4.7,
        comment: "Great mix of culture, food, and easy walking routes."
      }
    ]
  },
  {
    id: "trip-orlando-family-adventure",
    title: "Family Adventure in Orlando",
    city: "Orlando",
    country: "USA",
    tripType: "Family",
    tags: ["Family", "Theme Parks", "Easy Planning"],
    interests: ["Adventure", "Shopping", "Relaxation", "Attractions"],
    estimatedPrice: 2600,
    durationDays: 6,
    recommendedGroupSize: "Family of 4",
    kosherFriendly: false,
    rating: 4.6,
    reviewCount: 2150,
    image: "../assets/images/trips/orlando-family-adventure.jpg",
    shortDescription: "A family-friendly Orlando package built around theme parks, easy meals, and flexible rest time.",
    itinerary: [
      {
        day: 1,
        title: "Arrival and resort check-in",
        description: "Settle into the hotel, explore the area, and prepare for the first park day."
      },
      {
        day: 2,
        title: "Theme park highlights",
        description: "Spend the day at a major theme park with planned breaks and family-friendly rides."
      },
      {
        day: 3,
        title: "Water fun and shopping",
        description: "Enjoy a lighter day with water activities, outlet shopping, and an easy dinner."
      }
    ],
    reviews: [
      {
        user: "Rachel",
        rating: 4.8,
        comment: "The schedule was easy for kids and did not feel rushed."
      },
      {
        user: "Ben",
        rating: 4.5,
        comment: "Good balance between park time and family downtime."
      }
    ]
  },
  {
    id: "trip-tokyo-food-weekend",
    title: "Urban Food Weekend in Tokyo",
    city: "Tokyo",
    country: "Japan",
    tripType: "Urban",
    tags: ["Urban", "Cuisine", "Nightlife"],
    interests: ["Cuisine", "Nightlife", "Shopping", "Culture"],
    estimatedPrice: 1450,
    durationDays: 4,
    recommendedGroupSize: "2-4 travelers",
    kosherFriendly: false,
    rating: 4.9,
    reviewCount: 2360,
    image: "../assets/images/trips/tokyo-food-weekend.jpg",
    shortDescription: "A compact Tokyo city package focused on food districts, markets, shopping streets, and evening lights.",
    itinerary: [
      {
        day: 1,
        title: "Arrival and neighborhood dinner",
        description: "Check in and explore a lively food district for the first evening."
      },
      {
        day: 2,
        title: "Markets and city icons",
        description: "Visit a major food market, sample local snacks, and explore central city landmarks."
      },
      {
        day: 3,
        title: "Shopping and nightlife",
        description: "Discover shopping streets, themed cafes, and bright nightlife areas."
      }
    ],
    reviews: [
      {
        user: "Noam",
        rating: 4.9,
        comment: "The food stops were the highlight of the whole weekend."
      },
      {
        user: "Ella",
        rating: 4.8,
        comment: "Perfect for a short city trip with lots to explore."
      }
    ]
  },
  {
    id: "trip-athens-nature-history",
    title: "Nature and History Trip in Greece",
    city: "Athens",
    country: "Greece",
    tripType: "Adventure",
    tags: ["History", "Coast", "Culture"],
    interests: ["History", "Culture", "Nature", "Cuisine", "Attractions"],
    estimatedPrice: 1250,
    durationDays: 5,
    recommendedGroupSize: "Small group",
    kosherFriendly: true,
    rating: 4.5,
    reviewCount: 980,
    image: "../assets/images/trips/athens-nature-history.jpg",
    shortDescription: "A Greece package combining Athens history, coastal views, and easy outdoor discovery.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Athens",
        description: "Check in, walk through historic streets, and enjoy a simple local dinner."
      },
      {
        day: 2,
        title: "Ancient landmarks",
        description: "Visit major archaeological areas and learn about the city's ancient past."
      },
      {
        day: 3,
        title: "Coastal day trip",
        description: "Head toward the coast for sea views, light walking, and sunset scenery."
      }
    ],
    reviews: [
      {
        user: "Ari",
        rating: 4.6,
        comment: "Great history content with enough outdoor time."
      },
      {
        user: "Lior",
        rating: 4.4,
        comment: "The coastal day made the trip feel complete."
      }
    ]
  },
  {
    id: "trip-barcelona-culture-beach",
    title: "Culture and Beach Break in Barcelona",
    city: "Barcelona",
    country: "Spain",
    tripType: "Urban",
    tags: ["Culture", "Beach", "Cuisine"],
    interests: ["Culture", "Cuisine", "Shopping", "Relaxation", "Attractions"],
    estimatedPrice: 1320,
    durationDays: 5,
    recommendedGroupSize: "2-4 travelers",
    kosherFriendly: true,
    rating: 4.7,
    reviewCount: 1420,
    image: "../assets/images/trips/barcelona-culture-beach.jpg",
    shortDescription: "A Barcelona package with architecture, markets, beach time, and relaxed city exploration.",
    itinerary: [
      {
        day: 1,
        title: "Arrival and Gothic Quarter",
        description: "Settle in and walk through the Gothic Quarter and nearby public squares."
      },
      {
        day: 2,
        title: "Architecture highlights",
        description: "Explore famous architecture sites and enjoy a market lunch."
      },
      {
        day: 3,
        title: "Beach and evening tapas",
        description: "Spend time near the beach and enjoy a relaxed evening food route."
      }
    ],
    reviews: [
      {
        user: "Dana",
        rating: 4.8,
        comment: "Loved the combination of city energy and beach time."
      },
      {
        user: "Omer",
        rating: 4.6,
        comment: "The itinerary was simple to follow and very enjoyable."
      }
    ]
  },
  {
    id: "trip-new-york-urban-discovery",
    title: "Urban Discovery in New York City",
    city: "New York City",
    country: "USA",
    tripType: "Urban",
    tags: ["Urban", "Museums", "Shopping"],
    interests: ["Culture", "Shopping", "Cuisine", "Nightlife", "Attractions"],
    estimatedPrice: 2100,
    durationDays: 5,
    recommendedGroupSize: "2-4 travelers",
    kosherFriendly: true,
    rating: 4.6,
    reviewCount: 2500,
    image: "../assets/images/trips/new-york-urban-discovery.jpg",
    shortDescription: "A fast-paced New York package with neighborhoods, skyline views, museums, and food stops.",
    itinerary: [
      {
        day: 1,
        title: "Midtown arrival",
        description: "Check in, explore Midtown, and visit a skyline viewpoint."
      },
      {
        day: 2,
        title: "Museums and park walk",
        description: "Visit a major museum and enjoy a relaxed walk through Central Park."
      },
      {
        day: 3,
        title: "Downtown neighborhoods",
        description: "Explore downtown streets, shops, food halls, and evening entertainment."
      }
    ],
    reviews: [
      {
        user: "Shira",
        rating: 4.6,
        comment: "A strong city itinerary with lots of variety."
      },
      {
        user: "Adam",
        rating: 4.5,
        comment: "The neighborhood plan helped us avoid wasting time."
      }
    ]
  },
  {
    id: "trip-bangkok-family-culture",
    title: "Family Culture Trip in Bangkok",
    city: "Bangkok",
    country: "Thailand",
    tripType: "Family",
    tags: ["Family", "Culture", "Markets"],
    interests: ["Culture", "Cuisine", "Shopping", "History", "Attractions"],
    estimatedPrice: 980,
    durationDays: 6,
    recommendedGroupSize: "Family of 4",
    kosherFriendly: false,
    rating: 4.4,
    reviewCount: 1120,
    image: "../assets/images/trips/bangkok-family-culture.jpg",
    shortDescription: "A family Bangkok package with temples, markets, river views, and flexible daily pacing.",
    itinerary: [
      {
        day: 1,
        title: "Arrival and easy market walk",
        description: "Check in and visit a nearby market for a light first evening."
      },
      {
        day: 2,
        title: "Temples and river route",
        description: "Explore important temple areas and travel by river for city views."
      },
      {
        day: 3,
        title: "Food and shopping day",
        description: "Enjoy local food stops, family-friendly shopping, and a calm evening."
      }
    ],
    reviews: [
      {
        user: "Tamar",
        rating: 4.5,
        comment: "Good for kids and still interesting for adults."
      },
      {
        user: "Ido",
        rating: 4.3,
        comment: "The river day was a great way to see the city."
      }
    ]
  },
  {
    id: "trip-rome-history-romance",
    title: "History and Romance in Rome",
    city: "Rome",
    country: "Italy",
    tripType: "Romantic",
    tags: ["Romantic", "History", "Cuisine"],
    interests: ["History", "Culture", "Cuisine"],
    estimatedPrice: 1680,
    durationDays: 5,
    recommendedGroupSize: "2 travelers",
    kosherFriendly: true,
    rating: 4.8,
    reviewCount: 1760,
    image: "../assets/images/trips/rome-history-romance.jpg",
    shortDescription: "A romantic Rome package with ancient landmarks, neighborhood walks, and classic Italian dining.",
    itinerary: [
      {
        day: 1,
        title: "Arrival and piazza walk",
        description: "Check in and enjoy a gentle walk through central piazzas."
      },
      {
        day: 2,
        title: "Ancient Rome",
        description: "Visit major ancient sites and learn about the city's layered history."
      },
      {
        day: 3,
        title: "Food and fountains",
        description: "Explore food streets, famous fountains, and a romantic evening route."
      }
    ],
    reviews: [
      {
        user: "Yael",
        rating: 4.9,
        comment: "Classic, beautiful, and easy to follow."
      },
      {
        user: "Eitan",
        rating: 4.7,
        comment: "The historical sites and food stops were excellent."
      }
    ]
  },
  {
    id: "trip-amsterdam-canal-weekend",
    title: "Canal Weekend in Amsterdam",
    city: "Amsterdam",
    country: "Netherlands",
    tripType: "Romantic",
    tags: ["Canals", "Museums", "Walkable"],
    interests: ["Culture", "History", "Relaxation"],
    estimatedPrice: 1180,
    durationDays: 4,
    recommendedGroupSize: "2 travelers",
    kosherFriendly: true,
    rating: 4.5,
    reviewCount: 860,
    image: "../assets/images/trips/amsterdam-canal-weekend.jpg",
    shortDescription: "A walkable Amsterdam package with canal views, museum time, and relaxed neighborhood discovery.",
    itinerary: [
      {
        day: 1,
        title: "Canal arrival walk",
        description: "Check in and explore nearby canals and bridges at an easy pace."
      },
      {
        day: 2,
        title: "Museum day",
        description: "Visit well-known museums and take breaks in quiet local cafes."
      },
      {
        day: 3,
        title: "Neighborhood cycling",
        description: "Enjoy a light cycling route or walking tour through scenic districts."
      }
    ],
    reviews: [
      {
        user: "Nina",
        rating: 4.6,
        comment: "The route felt calm and romantic."
      },
      {
        user: "Gil",
        rating: 4.4,
        comment: "Great for a short weekend with culture and views."
      }
    ]
  },
  {
    id: "trip-dubai-family-luxury",
    title: "Family City Escape in Dubai",
    city: "Dubai",
    country: "UAE",
    tripType: "Family",
    tags: ["Family", "Shopping", "Modern"],
    interests: ["Shopping", "Adventure", "Relaxation", "Cuisine", "Attractions"],
    estimatedPrice: 2400,
    durationDays: 5,
    recommendedGroupSize: "Family of 4",
    kosherFriendly: true,
    rating: 4.6,
    reviewCount: 1340,
    image: "../assets/images/trips/dubai-family-luxury.jpg",
    shortDescription: "A Dubai family package with modern attractions, shopping, desert views, and comfortable pacing.",
    itinerary: [
      {
        day: 1,
        title: "Arrival and marina walk",
        description: "Check in and enjoy an easy walk near the marina or waterfront."
      },
      {
        day: 2,
        title: "City attractions",
        description: "Visit major modern attractions, malls, and indoor family activities."
      },
      {
        day: 3,
        title: "Desert experience",
        description: "Take a guided desert outing with views, dinner, and evening entertainment."
      }
    ],
    reviews: [
      {
        user: "Moran",
        rating: 4.7,
        comment: "Very comfortable for family travel."
      },
      {
        user: "Amit",
        rating: 4.5,
        comment: "The desert evening was the best part."
      }
    ]
  },
  {
    id: "trip-prague-history-weekend",
    title: "Historic Weekend in Prague",
    city: "Prague",
    country: "Czech Republic",
    tripType: "Romantic",
    tags: ["History", "Romantic", "Old Town"],
    interests: ["History", "Culture", "Cuisine"],
    estimatedPrice: 890,
    durationDays: 4,
    recommendedGroupSize: "2 travelers",
    kosherFriendly: true,
    rating: 4.7,
    reviewCount: 940,
    image: "../assets/images/trips/prague-history-weekend.jpg",
    shortDescription: "A Prague package with old town streets, castle views, bridges, and cozy evening walks.",
    itinerary: [
      {
        day: 1,
        title: "Old Town arrival",
        description: "Check in and explore the old town squares and nearby lanes."
      },
      {
        day: 2,
        title: "Castle and river views",
        description: "Visit castle areas, cross historic bridges, and enjoy river viewpoints."
      },
      {
        day: 3,
        title: "Culture and cafes",
        description: "Spend the day visiting cultural sites and relaxing in local cafes."
      }
    ],
    reviews: [
      {
        user: "Roni",
        rating: 4.8,
        comment: "Beautiful and simple for a long weekend."
      },
      {
        user: "Tal",
        rating: 4.6,
        comment: "The walking route was very clear."
      }
    ]
  },
  {
    id: "trip-lisbon-coastal-culture",
    title: "Coastal Culture Trip in Lisbon",
    city: "Lisbon",
    country: "Portugal",
    tripType: "Urban",
    tags: ["Coast", "Culture", "Cuisine"],
    interests: ["Culture", "Cuisine", "History", "Relaxation"],
    estimatedPrice: 1050,
    durationDays: 5,
    recommendedGroupSize: "2-4 travelers",
    kosherFriendly: true,
    rating: 4.6,
    reviewCount: 1010,
    image: "../assets/images/trips/lisbon-coastal-culture.jpg",
    shortDescription: "A Lisbon package with hilltop views, historic districts, coastal air, and local food stops.",
    itinerary: [
      {
        day: 1,
        title: "Arrival and viewpoint walk",
        description: "Check in and visit nearby viewpoints for an easy introduction to the city."
      },
      {
        day: 2,
        title: "Historic districts",
        description: "Explore old neighborhoods, public squares, and cultural landmarks."
      },
      {
        day: 3,
        title: "Coastal day",
        description: "Take a short coastal outing with relaxed walking and scenic stops."
      }
    ],
    reviews: [
      {
        user: "Hila",
        rating: 4.7,
        comment: "Great views and a warm city feeling."
      },
      {
        user: "Nadav",
        rating: 4.5,
        comment: "The coastal day was relaxed and worthwhile."
      }
    ]
  },
  {
    id: "trip-cape-town-adventure",
    title: "Adventure and Coast in Cape Town",
    city: "Cape Town",
    country: "South Africa",
    tripType: "Adventure",
    tags: ["Adventure", "Nature", "Coast"],
    interests: ["Adventure", "Nature", "Cuisine", "Culture", "Extreme sports"],
    estimatedPrice: 1750,
    durationDays: 7,
    recommendedGroupSize: "Small group",
    kosherFriendly: false,
    rating: 4.8,
    reviewCount: 1220,
    image: "../assets/images/trips/cape-town-adventure.jpg",
    shortDescription: "A Cape Town adventure package with mountain views, coastline drives, and active outdoor days.",
    itinerary: [
      {
        day: 1,
        title: "Arrival and waterfront",
        description: "Check in and explore the waterfront area at an easy pace."
      },
      {
        day: 2,
        title: "Mountain viewpoint",
        description: "Visit a major mountain viewpoint and enjoy short scenic walks."
      },
      {
        day: 3,
        title: "Coastal route",
        description: "Take a coastline drive with nature stops, beaches, and photo points."
      }
    ],
    reviews: [
      {
        user: "Ori",
        rating: 4.9,
        comment: "The scenery was unforgettable."
      },
      {
        user: "Lea",
        rating: 4.7,
        comment: "A great option for travelers who like active days."
      }
    ]
  },
  {
    id: "trip-queenstown-outdoor-adventure",
    title: "Outdoor Adventure in Queenstown",
    city: "Queenstown",
    country: "New Zealand",
    tripType: "Adventure",
    tags: ["Adventure", "Nature", "Scenic"],
    interests: ["Adventure", "Nature", "Relaxation", "Extreme sports"],
    estimatedPrice: 2950,
    durationDays: 8,
    recommendedGroupSize: "Small group",
    kosherFriendly: false,
    rating: 4.9,
    reviewCount: 1180,
    image: "../assets/images/trips/queenstown-outdoor-adventure.jpg",
    shortDescription: "A Queenstown package for outdoor travelers with lake views, hikes, and adventure activities.",
    itinerary: [
      {
        day: 1,
        title: "Arrival by the lake",
        description: "Check in and enjoy a gentle walk along the lakefront."
      },
      {
        day: 2,
        title: "Scenic hike",
        description: "Spend the day on a guided or self-paced hike with panoramic views."
      },
      {
        day: 3,
        title: "Adventure activity day",
        description: "Choose from classic local adventure activities and end with a relaxed dinner."
      }
    ],
    reviews: [
      {
        user: "Gal",
        rating: 4.9,
        comment: "Perfect for nature and adventure."
      },
      {
        user: "Michal",
        rating: 4.8,
        comment: "The views made every day special."
      }
    ]
  },
  {
    id: "trip-kyoto-culture-retreat",
    title: "Cultural Retreat in Kyoto",
    city: "Kyoto",
    country: "Japan",
    tripType: "Romantic",
    tags: ["Culture", "Temples", "Calm"],
    interests: ["Culture", "History", "Relaxation", "Cuisine"],
    estimatedPrice: 1650,
    durationDays: 5,
    recommendedGroupSize: "2 travelers",
    kosherFriendly: false,
    rating: 4.8,
    reviewCount: 1540,
    image: "../assets/images/trips/kyoto-culture-retreat.jpg",
    shortDescription: "A calm Kyoto package with temples, gardens, traditional streets, and peaceful walks.",
    itinerary: [
      {
        day: 1,
        title: "Arrival and old streets",
        description: "Check in and explore traditional streets during a quiet evening walk."
      },
      {
        day: 2,
        title: "Temples and gardens",
        description: "Visit temple areas, gardens, and scenic cultural districts."
      },
      {
        day: 3,
        title: "Market and tea culture",
        description: "Explore a food market and learn about local tea and craft traditions."
      }
    ],
    reviews: [
      {
        user: "Sivan",
        rating: 4.9,
        comment: "Peaceful, beautiful, and very well paced."
      },
      {
        user: "Yonatan",
        rating: 4.7,
        comment: "The garden day was excellent."
      }
    ]
  },
  {
    id: "trip-reykjavik-northern-adventure",
    title: "Northern Adventure in Reykjavik",
    city: "Reykjavik",
    country: "Iceland",
    tripType: "Adventure",
    tags: ["Nature", "Adventure", "Northern Lights"],
    interests: ["Nature", "Adventure", "Relaxation", "Extreme sports"],
    estimatedPrice: 2800,
    durationDays: 6,
    recommendedGroupSize: "Small group",
    kosherFriendly: false,
    rating: 4.7,
    reviewCount: 870,
    image: "../assets/images/trips/reykjavik-northern-adventure.jpg",
    shortDescription: "An Iceland package with dramatic landscapes, geothermal stops, and northern sky experiences.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Reykjavik",
        description: "Check in, explore the compact city center, and prepare for nature outings."
      },
      {
        day: 2,
        title: "Geothermal route",
        description: "Visit geothermal areas, waterfalls, and wide-open landscapes."
      },
      {
        day: 3,
        title: "Northern sky evening",
        description: "Take an evening outing focused on northern sky viewing conditions."
      }
    ],
    reviews: [
      {
        user: "Erez",
        rating: 4.8,
        comment: "The landscapes felt completely different from anywhere else."
      },
      {
        user: "Adi",
        rating: 4.6,
        comment: "A strong nature trip with comfortable planning."
      }
    ]
  },
  {
    id: "trip-london-family-icons",
    title: "Family Icons Tour in London",
    city: "London",
    country: "United Kingdom",
    tripType: "Family",
    tags: ["Family", "Museums", "Icons"],
    interests: ["History", "Culture", "Shopping", "Cuisine", "Attractions"],
    estimatedPrice: 2200,
    durationDays: 6,
    recommendedGroupSize: "Family of 4",
    kosherFriendly: true,
    rating: 4.6,
    reviewCount: 1980,
    image: "../assets/images/trips/london-family-icons.jpg",
    shortDescription: "A London family package with landmarks, museums, parks, and simple transport-friendly days.",
    itinerary: [
      {
        day: 1,
        title: "Arrival and landmark walk",
        description: "Check in and see central landmarks during an easy first walk."
      },
      {
        day: 2,
        title: "Museums and parks",
        description: "Visit a family-friendly museum and take a break in a nearby park."
      },
      {
        day: 3,
        title: "Markets and theater area",
        description: "Explore markets, shopping streets, and the theater district."
      }
    ],
    reviews: [
      {
        user: "Keren",
        rating: 4.7,
        comment: "The museum choices worked well for the whole family."
      },
      {
        user: "Roy",
        rating: 4.5,
        comment: "Easy to navigate and not too packed."
      }
    ]
  },
  {
    id: "trip-vancouver-nature-city",
    title: "Nature and City Escape in Vancouver",
    city: "Vancouver",
    country: "Canada",
    tripType: "Adventure",
    tags: ["Nature", "City", "Coast"],
    interests: ["Nature", "Adventure", "Cuisine", "Relaxation", "Extreme sports"],
    estimatedPrice: 1900,
    durationDays: 6,
    recommendedGroupSize: "2-4 travelers",
    kosherFriendly: false,
    rating: 4.5,
    reviewCount: 910,
    image: "../assets/images/trips/vancouver-nature-city.jpg",
    shortDescription: "A Vancouver package combining city neighborhoods, waterfront paths, forests, and mountain views.",
    itinerary: [
      {
        day: 1,
        title: "Waterfront arrival",
        description: "Check in and walk along the waterfront for a relaxed first evening."
      },
      {
        day: 2,
        title: "Forest and bridge day",
        description: "Explore nearby forest areas, bridges, and scenic viewpoints."
      },
      {
        day: 3,
        title: "Neighborhood food route",
        description: "Visit local neighborhoods, food stops, and shopping streets."
      }
    ],
    reviews: [
      {
        user: "Matan",
        rating: 4.5,
        comment: "A great mix of city and nature."
      },
      {
        user: "Noy",
        rating: 4.4,
        comment: "The outdoor parts were easy to reach."
      }
    ]
  },
  {
    id: "trip-buenos-aires-culture-nightlife",
    title: "Culture and Nightlife in Buenos Aires",
    city: "Buenos Aires",
    country: "Argentina",
    tripType: "Urban",
    tags: ["Culture", "Nightlife", "Cuisine"],
    interests: ["Culture", "Nightlife", "Cuisine", "Shopping"],
    estimatedPrice: 1150,
    durationDays: 5,
    recommendedGroupSize: "2-4 travelers",
    kosherFriendly: true,
    rating: 4.4,
    reviewCount: 760,
    image: "../assets/images/trips/buenos-aires-culture-nightlife.jpg",
    shortDescription: "A Buenos Aires package with colorful neighborhoods, food experiences, culture, and evening energy.",
    itinerary: [
      {
        day: 1,
        title: "Arrival and neighborhood walk",
        description: "Check in and explore a lively neighborhood with cafes and public squares."
      },
      {
        day: 2,
        title: "Culture and history",
        description: "Visit cultural landmarks, historic areas, and local galleries."
      },
      {
        day: 3,
        title: "Food and nightlife",
        description: "Enjoy a food-focused evening and experience the city's nightlife atmosphere."
      }
    ],
    reviews: [
      {
        user: "Ofir",
        rating: 4.5,
        comment: "The city felt full of character."
      },
      {
        user: "Mika",
        rating: 4.3,
        comment: "Great culture and food for the price."
      }
    ]
  },
  {
    id: "trip-singapore-family-city",
    title: "Smart Family City Trip in Singapore",
    city: "Singapore",
    country: "Singapore",
    tripType: "Family",
    tags: ["Family", "Modern", "Easy Transit"],
    interests: ["Culture", "Cuisine", "Shopping", "Nature", "Attractions"],
    estimatedPrice: 2050,
    durationDays: 5,
    recommendedGroupSize: "Family of 4",
    kosherFriendly: true,
    rating: 4.7,
    reviewCount: 1460,
    image: "../assets/images/trips/singapore-family-city.jpg",
    shortDescription: "A Singapore family package with modern attractions, gardens, food areas, and simple transportation.",
    itinerary: [
      {
        day: 1,
        title: "Arrival and bay views",
        description: "Check in and enjoy an easy evening around the bay area."
      },
      {
        day: 2,
        title: "Gardens and attractions",
        description: "Visit major garden areas and family-friendly city attractions."
      },
      {
        day: 3,
        title: "Food and neighborhoods",
        description: "Explore cultural neighborhoods, food centers, and shopping streets."
      }
    ],
    reviews: [
      {
        user: "Yarden",
        rating: 4.8,
        comment: "Very easy city for a family trip."
      },
      {
        user: "Alon",
        rating: 4.6,
        comment: "Clean, organized, and full of things to do."
      }
    ]
  }
];

const galleryImagesByTripType = {
  Romantic: [
    "../assets/images/trips/paris-romantic-escape.jpg",
    "../assets/images/trips/rome-history-romance.jpg",
    "../assets/images/trips/amsterdam-canal-weekend.jpg",
    "../assets/images/trips/prague-history-weekend.jpg",
    "../assets/images/trips/kyoto-culture-retreat.jpg"
  ],
  Family: [
    "../assets/images/trips/orlando-family-adventure.jpg",
    "../assets/images/trips/bangkok-family-culture.jpg",
    "../assets/images/trips/dubai-family-luxury.jpg",
    "../assets/images/trips/london-family-icons.jpg",
    "../assets/images/trips/singapore-family-city.jpg"
  ],
  Adventure: [
    "../assets/images/trips/athens-nature-history.jpg",
    "../assets/images/trips/cape-town-adventure.jpg",
    "../assets/images/trips/queenstown-outdoor-adventure.jpg",
    "../assets/images/trips/reykjavik-northern-adventure.jpg",
    "../assets/images/trips/vancouver-nature-city.jpg"
  ],
  Urban: [
    "../assets/images/trips/tokyo-food-weekend.jpg",
    "../assets/images/trips/barcelona-culture-beach.jpg",
    "../assets/images/trips/new-york-urban-discovery.jpg",
    "../assets/images/trips/lisbon-coastal-culture.jpg",
    "../assets/images/trips/buenos-aires-culture-nightlife.jpg"
  ]
};

const galleryImageAltText = {
  "../assets/images/trips/amsterdam-canal-weekend.jpg": "Amsterdam canal view for a walkable weekend trip",
  "../assets/images/trips/athens-nature-history.jpg": "Athens historic scenery for a culture and coast trip",
  "../assets/images/trips/bangkok-family-culture.jpg": "Bangkok cultural landmark for a family travel package",
  "../assets/images/trips/barcelona-culture-beach.jpg": "Barcelona city and beach view for an urban break",
  "../assets/images/trips/buenos-aires-culture-nightlife.jpg": "Buenos Aires street scene for culture and nightlife travel",
  "../assets/images/trips/cape-town-adventure.jpg": "Cape Town coast and mountain scenery for an adventure trip",
  "../assets/images/trips/dubai-family-luxury.jpg": "Dubai city view for a comfortable family escape",
  "../assets/images/trips/kyoto-culture-retreat.jpg": "Kyoto temple and garden scenery for a cultural retreat",
  "../assets/images/trips/lisbon-coastal-culture.jpg": "Lisbon coastal city view for a culture trip",
  "../assets/images/trips/london-family-icons.jpg": "London landmark view for a family city tour",
  "../assets/images/trips/new-york-urban-discovery.jpg": "New York City skyline for an urban discovery trip",
  "../assets/images/trips/orlando-family-adventure.jpg": "Orlando family attraction scene for an easy adventure package",
  "../assets/images/trips/paris-romantic-escape.jpg": "Paris city view for a romantic escape",
  "../assets/images/trips/prague-history-weekend.jpg": "Prague old town view for a historic weekend trip",
  "../assets/images/trips/queenstown-outdoor-adventure.jpg": "Queenstown lake and mountain scenery for an outdoor adventure",
  "../assets/images/trips/reykjavik-northern-adventure.jpg": "Iceland landscape near Reykjavik for a northern adventure",
  "../assets/images/trips/rome-history-romance.jpg": "Rome historic city view for a romance and history trip",
  "../assets/images/trips/singapore-family-city.jpg": "Singapore modern city garden view for a family trip",
  "../assets/images/trips/tokyo-food-weekend.jpg": "Tokyo food district scene for an urban weekend trip",
  "../assets/images/trips/vancouver-nature-city.jpg": "Vancouver waterfront and nature scenery for a city escape"
};

// Adds a local visual gallery to every trip package.
// Expects each trip to have an image and tripType.
// Keeps data frontend-only while avoiding duplicated gallery boilerplate in every object.
window.tripPackages.forEach(function (trip) {
  const relatedImages = galleryImagesByTripType[trip.tripType] || [];
  const gallerySources = [trip.image]
    .concat(relatedImages)
    .filter(function (src, index, images) {
      return src && images.indexOf(src) === index;
    })
    .slice(0, 3);

  trip.gallery = gallerySources.map(function (src) {
    return {
      src: src,
      alt: galleryImageAltText[src] || trip.title + " travel gallery image"
    };
  });
});
