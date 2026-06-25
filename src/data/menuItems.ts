export type Category = "All" | "Pizza" | "Burgers" | "Drinks" | "Desserts" | "Healthy" | "Indian";
export type Badge = "chef" | "popular" | "new" | null;
export type UrgencyType = "low-stock" | "trending" | "popular-now" | null;

export interface MenuItem {
  id: number;
  name: string;
  category: Exclude<Category, "All">;
  price: number;
  description: string;
  rating: number;
  reviews: number;
  badge: Badge;
  popular: boolean;
  image: string;
  veg: boolean;
  urgency: UrgencyType;
  stockLeft?: number;
  ordersRecent?: number;
}

export const CATEGORIES: Category[] = [
  "All", "Pizza", "Burgers", "Drinks", "Desserts", "Healthy", "Indian",
];

export const PAYMENT_METHODS = [
  "Credit Card",
  "Debit Card",
  "UPI",
  "Net Banking",
  "Cash on Delivery",
];

const menuItems: MenuItem[] = [
  // ── Pizza ──────────────────────────────────────────────────────────────────
  {
    id: 1, name: "Margherita Classica", category: "Pizza", price: 349,
    description: "San Marzano tomatoes, fresh buffalo mozzarella, fragrant basil leaves.",
    rating: 4.8, reviews: 342, badge: "chef", popular: true, veg: true,
    urgency: "popular-now", ordersRecent: 12,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 2, name: "Pepperoni Supreme", category: "Pizza", price: 429,
    description: "Double-layered pepperoni, stretchy mozzarella, zesty herbed tomato base.",
    rating: 4.9, reviews: 521, badge: "popular", popular: true, veg: false,
    urgency: "trending",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 3, name: "BBQ Chicken Blaze", category: "Pizza", price: 449,
    description: "Smoky BBQ sauce, grilled chicken thigh, caramelized onions, jalapeños.",
    rating: 4.7, reviews: 287, badge: null, popular: false, veg: false,
    urgency: null,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 4, name: "Truffle Mushroom", category: "Pizza", price: 549,
    description: "Black truffle cream, wild mushroom medley, aged gruyère, fresh thyme.",
    rating: 4.9, reviews: 198, badge: "chef", popular: false, veg: true,
    urgency: "low-stock", stockLeft: 3,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop&auto=format",
  },

  // ── Burgers (no beef) ──────────────────────────────────────────────────────
  {
    id: 5, name: "Classic Chicken Smash", category: "Burgers", price: 299,
    description: "Juicy smashed chicken patty, American cheese, dill pickles, secret sauce.",
    rating: 4.8, reviews: 634, badge: "popular", popular: true, veg: false,
    urgency: "popular-now", ordersRecent: 8,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 6, name: "Paneer Royal Stack", category: "Burgers", price: 329,
    description: "Grilled paneer tikka patty, aged cheddar, mint chutney, onion jam, brioche.",
    rating: 4.9, reviews: 312, badge: "chef", popular: true, veg: true,
    urgency: "low-stock", stockLeft: 2,
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 7, name: "Mushroom Swiss Melt", category: "Burgers", price: 319,
    description: "Sautéed cremini mushrooms, melted swiss, garlic butter brioche bun.",
    rating: 4.6, reviews: 189, badge: null, popular: false, veg: true,
    urgency: null,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 8, name: "Crispy Chicken Crunch", category: "Burgers", price: 319,
    description: "Nashville-spiced fried chicken, pickled daikon slaw, sriracha mayo.",
    rating: 4.7, reviews: 445, badge: "popular", popular: true, veg: false,
    urgency: "popular-now", ordersRecent: 15,
    image: "https://images.unsplash.com/photo-1606755962773-d324e9a13086?w=600&h=400&fit=crop&auto=format",
  },

  // ── Drinks ─────────────────────────────────────────────────────────────────
  {
    id: 9, name: "Mango Cardamom Lassi", category: "Drinks", price: 149,
    description: "Alphonso mango, whole-milk yogurt, pinch of cardamom and rose water.",
    rating: 4.8, reviews: 223, badge: "chef", popular: false, veg: true,
    urgency: null,
    image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 10, name: "Pressed Lemonade", category: "Drinks", price: 129,
    description: "Cold-pressed lemons, raw cane sugar, sprigs of fresh spearmint.",
    rating: 4.6, reviews: 156, badge: null, popular: false, veg: true,
    urgency: null,
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 11, name: "Ceremonial Matcha Latte", category: "Drinks", price: 199,
    description: "Uji ceremonial-grade matcha, oat milk, light honey, served over ice.",
    rating: 4.9, reviews: 381, badge: "popular", popular: true, veg: true,
    urgency: "trending",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 12, name: "Wild Berry Smoothie", category: "Drinks", price: 199,
    description: "Blueberries, acai, strawberries, banana, almond milk, chia seeds.",
    rating: 4.7, reviews: 278, badge: null, popular: false, veg: true,
    urgency: null,
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&h=400&fit=crop&auto=format",
  },

  // ── Desserts ───────────────────────────────────────────────────────────────
  {
    id: 13, name: "Classic Tiramisu", category: "Desserts", price: 249,
    description: "Savoiardi soaked in espresso, silky mascarpone cream, dusted cocoa.",
    rating: 4.9, reviews: 412, badge: "chef", popular: true, veg: true,
    urgency: "low-stock", stockLeft: 3,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 14, name: "Chocolate Lava Cake", category: "Desserts", price: 279,
    description: "Warm Valrhona dark chocolate shell, molten center, vanilla bean ice cream.",
    rating: 4.8, reviews: 567, badge: "popular", popular: true, veg: true,
    urgency: "trending",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 15, name: "Mango Coconut Sorbet", category: "Desserts", price: 189,
    description: "Alphonso mango purée, coconut cream, fresh lime zest. Vegan-friendly.",
    rating: 4.6, reviews: 134, badge: null, popular: false, veg: true,
    urgency: null,
    image: "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 16, name: "Cinnamon Churros", category: "Desserts", price: 199,
    description: "Golden fried dough batons, cinnamon sugar dusting, dulce de leche dip.",
    rating: 4.7, reviews: 298, badge: null, popular: false, veg: true,
    urgency: null,
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&h=400&fit=crop&auto=format",
  },

  // ── Healthy ────────────────────────────────────────────────────────────────
  {
    id: 17, name: "Acai Power Bowl", category: "Healthy", price: 329,
    description: "Thick acai base, house granola, coconut flakes, banana, local honey.",
    rating: 4.8, reviews: 347, badge: "popular", popular: true, veg: true,
    urgency: "popular-now", ordersRecent: 9,
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 18, name: "Roasted Buddha Bowl", category: "Healthy", price: 349,
    description: "Farro, roasted chickpeas, lacinato kale, sweet potato, tahini lemon.",
    rating: 4.7, reviews: 213, badge: "chef", popular: false, veg: true,
    urgency: null,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 19, name: "Grilled Salmon Salad", category: "Healthy", price: 449,
    description: "Atlantic salmon fillet, arugula, cucumber ribbon, dill yogurt, seeds.",
    rating: 4.9, reviews: 189, badge: "chef", popular: false, veg: false,
    urgency: "low-stock", stockLeft: 4,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 20, name: "Avocado Toast Deluxe", category: "Healthy", price: 299,
    description: "Toasted sourdough, smashed avocado, poached egg, chili flakes, microgreens.",
    rating: 4.6, reviews: 402, badge: null, popular: true, veg: true,
    urgency: null,
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=600&h=400&fit=crop&auto=format",
  },

  // ── Indian ─────────────────────────────────────────────────────────────────
  {
    id: 21, name: "Butter Chicken", category: "Indian", price: 349,
    description: "Tender chicken in a velvety tomato-cashew gravy, kissed with cream and fenugreek.",
    rating: 4.9, reviews: 876, badge: "popular", popular: true, veg: false,
    urgency: "popular-now", ordersRecent: 21,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 22, name: "Paneer Tikka Masala", category: "Indian", price: 319,
    description: "Charred cottage cheese cubes in smoky, spiced onion-tomato masala. Pure comfort.",
    rating: 4.8, reviews: 643, badge: "chef", popular: true, veg: true,
    urgency: "trending",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 23, name: "Dal Makhani", category: "Indian", price: 249,
    description: "Slow-simmered black lentils with butter, cream, and a hint of smoky tandoor.",
    rating: 4.7, reviews: 412, badge: null, popular: false, veg: true,
    urgency: null,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 24, name: "Chicken Biryani", category: "Indian", price: 379,
    description: "Fragrant basmati rice layered with spiced chicken, saffron, and caramelized onions.",
    rating: 4.9, reviews: 1024, badge: "popular", popular: true, veg: false,
    urgency: "popular-now", ordersRecent: 18,
    image: "https://images.unsplash.com/photo-1563379091339-03246963d73e?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 25, name: "Chole Bhature", category: "Indian", price: 199,
    description: "Spiced chickpea curry served with fluffy deep-fried bhature. A Punjabi classic.",
    rating: 4.8, reviews: 534, badge: "chef", popular: true, veg: true,
    urgency: "low-stock", stockLeft: 3,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&h=400&fit=crop&auto=format",
  },
];

export default menuItems;
