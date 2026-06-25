export interface ComboItem {
  id: number;       // references MenuItem.id
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
  originalPrice: number;  // sum of item prices
  comboPrice: number;     // discounted price
  gradient: string;       // Tailwind gradient classes
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
    comboPrice: 29.99,
    originalPrice: 32.97,
    items: [
      { id: 1,  name: "Margherita Classica",   image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&auto=format", price: 14.99, veg: true,  category: "Pizza"   },
      { id: 4,  name: "Truffle Mushroom",       image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&auto=format", price: 22.99, veg: true,  category: "Pizza"   },
      { id: 10, name: "Pressed Lemonade",       image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop&auto=format", price: 4.99,  veg: true,  category: "Drinks"  },
    ],
  },
  {
    id: "burger-feast",
    name: "Burger Feast",
    tagline: "Two crowd-pleasing burgers + a shake",
    emoji: "🍔🍔🥤",
    gradient: "from-red-500 via-orange-500 to-amber-400",
    comboPrice: 34.99,
    originalPrice: 39.97,
    items: [
      { id: 5,  name: "Classic Smash Burger",   image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&auto=format", price: 12.99, veg: false, category: "Burgers" },
      { id: 6,  name: "Wagyu Double Stack",      image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop&auto=format", price: 24.99, veg: false, category: "Burgers" },
      { id: 12, name: "Wild Berry Smoothie",     image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop&auto=format", price: 7.49,  veg: true,  category: "Drinks"  },
    ],
  },
  {
    id: "healthy-day",
    name: "Healthy Day",
    tagline: "Nourish yourself from morning to night",
    emoji: "🥗🥤🫙",
    gradient: "from-green-500 via-emerald-500 to-teal-400",
    comboPrice: 36.99,
    originalPrice: 43.47,
    items: [
      { id: 17, name: "Acai Power Bowl",         image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop&auto=format", price: 13.49, veg: true,  category: "Healthy" },
      { id: 19, name: "Grilled Salmon Salad",    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&auto=format", price: 18.99, veg: false, category: "Healthy" },
      { id: 11, name: "Ceremonial Matcha Latte", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop&auto=format", price: 6.99,  veg: true,  category: "Drinks"  },
    ],
  },
  {
    id: "dessert-lover",
    name: "Dessert Lover",
    tagline: "Life is short — eat dessert first",
    emoji: "🍰🍫🍮",
    gradient: "from-pink-500 via-rose-500 to-red-400",
    comboPrice: 24.99,
    originalPrice: 27.97,
    items: [
      { id: 13, name: "Classic Tiramisu",        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&auto=format", price: 8.99,  veg: true,  category: "Desserts"},
      { id: 14, name: "Chocolate Lava Cake",     image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop&auto=format", price: 9.99,  veg: true,  category: "Desserts"},
      { id: 16, name: "Cinnamon Churros",        image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop&auto=format", price: 7.49,  veg: true,  category: "Desserts"},
    ],
  },
  {
    id: "party-pack",
    name: "Party Pack",
    tagline: "Feed the whole squad — pizza + burgers + drinks",
    emoji: "🎉🍕🍔",
    gradient: "from-purple-500 via-violet-500 to-indigo-500",
    comboPrice: 54.99,
    originalPrice: 63.46,
    badge: "Best Value",
    items: [
      { id: 2,  name: "Pepperoni Supreme",       image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop&auto=format", price: 17.99, veg: false, category: "Pizza"   },
      { id: 8,  name: "Crispy Chicken Crunch",   image: "https://images.unsplash.com/photo-1606755962773-d324e9a13086?w=400&h=300&fit=crop&auto=format", price: 13.99, veg: false, category: "Burgers" },
      { id: 9,  name: "Mango Cardamom Lassi",    image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&h=300&fit=crop&auto=format", price: 5.99,  veg: true,  category: "Drinks"  },
      { id: 14, name: "Chocolate Lava Cake",     image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop&auto=format", price: 9.99,  veg: true,  category: "Desserts"},
    ],
  },
  {
    id: "veggie-delight",
    name: "Veggie Delight",
    tagline: "100% plant-powered and proud of it",
    emoji: "🌿🍔🥤",
    gradient: "from-lime-500 via-green-500 to-emerald-500",
    items: [
      { id: 7,  name: "Mushroom Swiss Melt",     image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop&auto=format", price: 15.99, veg: true,  category: "Burgers" },
      { id: 17, name: "Acai Power Bowl",         image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop&auto=format", price: 13.49, veg: true,  category: "Healthy" },
      { id: 10, name: "Pressed Lemonade",        image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop&auto=format", price: 4.99,  veg: true,  category: "Drinks"  },
    ],
    comboPrice: 30.99,
    originalPrice: 34.47,
  },
];

export default combos;
