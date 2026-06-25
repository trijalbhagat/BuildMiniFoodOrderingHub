export interface ComboItem {
  id: number;
  name: string;
  image: string;
  price: number;
  veg: boolean;
  category: string;
}

export interface Combo {
  id: string;
  name: string;
  tagline: string;
  items: ComboItem[];
  originalPrice: number;
  comboPrice: number;
  gradient: string;
  emoji: string;
  badge?: string;
}

const combos: Combo[] = [
  {
    id: "pizza-night",
    name: "Pizza Night",
    tagline: "A classic Italian evening sorted",
    emoji: "🍕🥤",
    gradient: "from-orange-500 via-amber-500 to-yellow-400",
    comboPrice: 799,
    originalPrice: 927,
    items: [
      { id: 1,  name: "Margherita Classica",    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&auto=format",   price: 349, veg: true,  category: "Pizza"   },
      { id: 4,  name: "Truffle Mushroom",        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&auto=format",   price: 549, veg: true,  category: "Pizza"   },
      { id: 10, name: "Pressed Lemonade",        image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop&auto=format",   price: 129, veg: true,  category: "Drinks"  },
    ],
  },
  {
    id: "desi-feast",
    name: "Desi Feast",
    tagline: "The ultimate Indian comfort meal",
    emoji: "🍛🫓🥛",
    gradient: "from-orange-600 via-red-500 to-amber-500",
    comboPrice: 699,
    originalPrice: 897,
    badge: "Best Value",
    items: [
      { id: 21, name: "Butter Chicken",          image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop&auto=format",   price: 349, veg: false, category: "Indian"  },
      { id: 23, name: "Dal Makhani",             image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&auto=format",   price: 249, veg: true,  category: "Indian"  },
      { id: 9,  name: "Mango Cardamom Lassi",    image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&h=300&fit=crop&auto=format",   price: 149, veg: true,  category: "Drinks"  },
      { id: 14, name: "Chocolate Lava Cake",     image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop&auto=format",   price: 279, veg: true,  category: "Desserts"},
    ],
  },
  {
    id: "healthy-day",
    name: "Healthy Day",
    tagline: "Nourish yourself from morning to night",
    emoji: "🥗🥤🫙",
    gradient: "from-green-500 via-emerald-500 to-teal-400",
    comboPrice: 899,
    originalPrice: 1097,
    items: [
      { id: 17, name: "Acai Power Bowl",         image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop&auto=format",   price: 329, veg: true,  category: "Healthy" },
      { id: 19, name: "Grilled Salmon Salad",    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&auto=format",   price: 449, veg: false, category: "Healthy" },
      { id: 11, name: "Ceremonial Matcha Latte", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop&auto=format",   price: 199, veg: true,  category: "Drinks"  },
    ],
  },
  {
    id: "dessert-lover",
    name: "Dessert Lover",
    tagline: "Life is short — eat dessert first",
    emoji: "🍰🍫🍮",
    gradient: "from-pink-500 via-rose-500 to-red-400",
    comboPrice: 649,
    originalPrice: 727,
    items: [
      { id: 13, name: "Classic Tiramisu",        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&auto=format",   price: 249, veg: true,  category: "Desserts"},
      { id: 14, name: "Chocolate Lava Cake",     image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop&auto=format",   price: 279, veg: true,  category: "Desserts"},
      { id: 16, name: "Cinnamon Churros",        image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop&auto=format",   price: 199, veg: true,  category: "Desserts"},
    ],
  },
  {
    id: "biryani-party",
    name: "Biryani Party",
    tagline: "The complete biryani experience",
    emoji: "🍚🍗🥛",
    gradient: "from-yellow-500 via-amber-500 to-orange-500",
    comboPrice: 649,
    originalPrice: 777,
    items: [
      { id: 24, name: "Chicken Biryani",         image: "https://images.unsplash.com/photo-1563379091339-03246963d73e?w=400&h=300&fit=crop&auto=format",   price: 379, veg: false, category: "Indian"  },
      { id: 25, name: "Chole Bhature",           image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop&auto=format",   price: 199, veg: true,  category: "Indian"  },
      { id: 9,  name: "Mango Cardamom Lassi",    image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&h=300&fit=crop&auto=format",   price: 149, veg: true,  category: "Drinks"  },
    ],
  },
  {
    id: "veggie-delight",
    name: "Veggie Delight",
    tagline: "100 % plant-powered and proud of it",
    emoji: "🌿🧀🥤",
    gradient: "from-lime-500 via-green-500 to-emerald-500",
    comboPrice: 749,
    originalPrice: 897,
    items: [
      { id: 22, name: "Paneer Tikka Masala",     image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop&auto=format",   price: 319, veg: true,  category: "Indian"  },
      { id: 17, name: "Acai Power Bowl",         image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop&auto=format",   price: 329, veg: true,  category: "Healthy" },
      { id: 10, name: "Pressed Lemonade",        image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop&auto=format",   price: 129, veg: true,  category: "Drinks"  },
    ],
  },
];

export default combos;
