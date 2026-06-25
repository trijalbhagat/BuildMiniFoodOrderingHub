import { useRef } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Category } from "../data/menuItems";

interface Review {
  id: number;
  publication: string;
  headline: string;
  body: string;
  reviewer: string;
  reviewerTitle: string;
  stars: number;
  rotation: number;         // card tilt in degrees
  accentColor: string;      // stamp/tape colour
  itemId: number;
  itemName: string;
  itemImage: string;
  itemCategory: Exclude<Category, "All">;
  stamp?: string;           // optional emoji stamp
}

const REVIEWS: Review[] = [
  {
    id: 1,
    publication: "THE CULINARY GAZETTE",
    headline: "A Slice of Pure Heaven",
    body: "Perfectly balanced, this Margherita transported me straight to Naples. The buffalo mozzarella melts like a dream — a masterclass in restraint.",
    reviewer: "Sofia Ricci",
    reviewerTitle: "Restaurant Critic, Rome",
    stars: 5,
    rotation: -2.2,
    accentColor: "#f97316",
    stamp: "⭐",
    itemId: 1,
    itemName: "Margherita Classica",
    itemImage: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=120&h=120&fit=crop&auto=format",
    itemCategory: "Pizza",
  },
  {
    id: 2,
    publication: "DAILY BITES",
    headline: "The Burger That Changed Everything",
    body: "I've had burgers on five continents. None come close to the Wagyu Double Stack. The caramelised onion jam alone warrants the journey.",
    reviewer: "James Whitfield",
    reviewerTitle: "Food Columnist, London",
    stars: 5,
    rotation: 1.8,
    accentColor: "#ef4444",
    stamp: "🏆",
    itemId: 6,
    itemName: "Wagyu Double Stack",
    itemImage: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=120&h=120&fit=crop&auto=format",
    itemCategory: "Burgers",
  },
  {
    id: 3,
    publication: "THE MORNING SAUCER",
    headline: "Serenity Arrives in a Cup",
    body: "Each sip of the Ceremonial Matcha Latte is meditative. The Uji-grade matcha is never bitter — just smooth, grassy, and utterly calming.",
    reviewer: "Yuki Tanaka",
    reviewerTitle: "Tea Sommelier, Kyoto",
    stars: 5,
    rotation: -1.5,
    accentColor: "#22c55e",
    stamp: "🍵",
    itemId: 11,
    itemName: "Ceremonial Matcha Latte",
    itemImage: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=120&h=120&fit=crop&auto=format",
    itemCategory: "Drinks",
  },
  {
    id: 4,
    publication: "SWEET TOOTH WEEKLY",
    headline: "Mascarpone So Light It Defies Gravity",
    body: "The Classic Tiramisu achieves something rare — perfection through simplicity. Every layer sings. I ordered a second before finishing the first.",
    reviewer: "Marie Leblanc",
    reviewerTitle: "Pastry Chef, Paris",
    stars: 5,
    rotation: 2.5,
    accentColor: "#a855f7",
    stamp: "🍰",
    itemId: 13,
    itemName: "Classic Tiramisu",
    itemImage: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=120&h=120&fit=crop&auto=format",
    itemCategory: "Desserts",
  },
  {
    id: 5,
    publication: "WELLNESS DISPATCH",
    headline: "Fuel for the Body and Soul",
    body: "The Acai Power Bowl is vibrant, nourishing, and surprisingly filling. The house granola adds the crunch that makes everything sing together.",
    reviewer: "Priya Mehta",
    reviewerTitle: "Nutritionist, Mumbai",
    stars: 5,
    rotation: -1.2,
    accentColor: "#6366f1",
    itemId: 17,
    itemName: "Acai Power Bowl",
    itemImage: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=120&h=120&fit=crop&auto=format",
    itemCategory: "Healthy",
  },
  {
    id: 6,
    publication: "MOLTEN MOMENTS",
    headline: "Dark Chocolate That Flows Like Lava",
    body: "Cut through the shell and watch the Valrhona pour out. Paired with the vanilla bean ice cream, it is the only dessert that matters.",
    reviewer: "Carlos Mendez",
    reviewerTitle: "Chocolatier, Barcelona",
    stars: 5,
    rotation: 1.4,
    accentColor: "#78350f",
    stamp: "🍫",
    itemId: 14,
    itemName: "Chocolate Lava Cake",
    itemImage: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=120&h=120&fit=crop&auto=format",
    itemCategory: "Desserts",
  },
  {
    id: 7,
    publication: "EARTHY PALATE",
    headline: "Truffle That Commands the Room",
    body: "The truffle cream on this pizza is not shy — it announces itself with authority. Paired with wild mushrooms and aged gruyère, it is pure opulence.",
    reviewer: "Elena Voronova",
    reviewerTitle: "Michelin Inspector, Lyon",
    stars: 5,
    rotation: -2.8,
    accentColor: "#d97706",
    stamp: "🍄",
    itemId: 4,
    itemName: "Truffle Mushroom",
    itemImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=120&h=120&fit=crop&auto=format",
    itemCategory: "Pizza",
  },
  {
    id: 8,
    publication: "THE MANGO PRESS",
    headline: "Rose Water and Cardamom in Perfect Harmony",
    body: "The Mango Cardamom Lassi is a floral poem in a glass. The Alphonso mango is thick and sweet; the cardamom whispers rather than shouts.",
    reviewer: "Arjun Kapoor",
    reviewerTitle: "Food Writer, Delhi",
    stars: 5,
    rotation: 2.1,
    accentColor: "#f59e0b",
    itemId: 9,
    itemName: "Mango Cardamom Lassi",
    itemImage: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=120&h=120&fit=crop&auto=format",
    itemCategory: "Drinks",
  },
];

// Jagged torn-paper bottom edge — colour is the paper fill, applied inline per card
function TornEdge({ paperColor }: { paperColor: string }) {
  return (
    <svg
      viewBox="0 0 260 18"
      preserveAspectRatio="none"
      className="w-full"
      style={{ display: "block", marginTop: -1 }}
    >
      <path
        d="M0 0 L8 10 L18 3 L28 12 L40 4 L52 14 L62 5 L72 13 L84 2 L94 11 L106 4 L118 14 L128 6 L140 12 L152 3 L162 10 L174 2 L186 12 L196 5 L208 13 L220 4 L232 11 L244 3 L254 9 L260 0 Z"
        fill={paperColor}
      />
    </svg>
  );
}

interface ReviewStripProps {
  onItemClick: (category: Exclude<Category, "All">) => void;
}

export default function ReviewStrip({ onItemClick }: ReviewStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Section label */}
      <div className="flex items-center gap-3 px-4 sm:px-6 mb-4">
        <div className="flex-1 h-px bg-border" />
        <span
          className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          What the critics say
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Arrow buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-card border border-border shadow-md flex items-center justify-center hover:bg-muted transition-colors"
      >
        <ChevronLeft size={16} className="text-muted-foreground" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-card border border-border shadow-md flex items-center justify-center hover:bg-muted transition-colors"
      >
        <ChevronRight size={16} className="text-muted-foreground" />
      </button>

      {/* Horizontal scroll track */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto px-10 pb-6 pt-2 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {REVIEWS.map((review, i) => (
          <NewspaperCard
            key={review.id}
            review={review}
            index={i}
            onItemClick={onItemClick}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Individual newspaper cutout card ────────────────────────────────────────

function NewspaperCard({
  review,
  index,
  onItemClick,
}: {
  review: Review;
  index: number;
  onItemClick: (category: Exclude<Category, "All">) => void;
}) {
  // Aged paper tones — slightly different per card for variety
  const paperBg = [
    "#fdf6e3", "#fef9f0", "#fdf4e7", "#fef8ee", "#fdf5e6",
    "#fefaf0", "#fdf3e4", "#fef7ec",
  ][index % 8];

  const paperDark = [
    "#2a2216", "#2b2318", "#291f14", "#2c2417", "#2a2115",
    "#2b2419", "#281e13", "#2c2318",
  ][index % 8];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35 }}
      style={{
        transform: `rotate(${review.rotation}deg)`,
        transformOrigin: "center bottom",
        minWidth: 240,
        maxWidth: 240,
      }}
      className="shrink-0 flex flex-col"
    >
      {/* Paper body — light uses warm cream, dark uses warm near-black */}
      <div
        className="flex flex-col shadow-xl dark:shadow-black/40"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          borderTop: `4px solid ${review.accentColor}`,
        }}
      >
        <div
          className="p-4 flex flex-col gap-2.5 newspaper-paper"
          style={
            {
              "--paper-light": paperBg,
              "--paper-dark": paperDark,
              background: paperBg,
            } as React.CSSProperties
          }
        >
          {/* Publication name */}
          <div className="flex items-center justify-between">
            <p
              className="text-[9px] font-bold tracking-[0.25em] uppercase"
              style={{ color: review.accentColor, fontFamily: "Georgia, serif" }}
            >
              {review.publication}
            </p>
            {review.stamp && (
              <span className="text-sm leading-none">{review.stamp}</span>
            )}
          </div>

          {/* Rule */}
          <div className="h-px" style={{ background: `${review.accentColor}40` }} />

          {/* Headline */}
          <h3
            className="font-bold leading-snug dark:text-stone-100"
            style={{ fontSize: 15, color: "#1a1008", fontFamily: "'Playfair Display', serif" }}
          >
            {review.headline}
          </h3>

          {/* Rule */}
          <div className="h-px bg-stone-300 dark:bg-stone-600" />

          {/* Opening quote + body */}
          <div className="relative">
            <Quote
              size={14}
              style={{ color: review.accentColor, opacity: 0.5 }}
              className="absolute -top-1 -left-0.5"
            />
            <p
              className="pl-4 text-[11px] leading-relaxed dark:text-stone-300"
              style={{ color: "#3d2b1f", fontStyle: "italic" }}
            >
              {review.body}
            </p>
          </div>

          {/* Star row */}
          <div className="flex gap-0.5">
            {Array.from({ length: review.stars }).map((_, s) => (
              <span key={s} style={{ color: review.accentColor, fontSize: 11 }}>★</span>
            ))}
          </div>

          {/* Rule */}
          <div className="h-px bg-stone-300 dark:bg-stone-600" />

          {/* Clickable food item */}
          <button
            onClick={() => onItemClick(review.itemCategory)}
            className="flex items-center gap-2.5 group text-left w-full hover:opacity-80 transition-opacity"
            title={`View all ${review.itemCategory} items`}
          >
            <img
              src={review.itemImage}
              alt={review.itemName}
              className="w-11 h-11 rounded-lg object-cover border-2 shrink-0 group-hover:scale-105 transition-transform duration-200"
              style={{ borderColor: review.accentColor }}
            />
            <div className="min-w-0">
              <p
                className="text-[10px] font-bold tracking-wide truncate dark:text-stone-100"
                style={{ color: "#1a1008", fontFamily: "'Playfair Display', serif" }}
              >
                {review.itemName}
              </p>
              <p
                className="text-[9px] tracking-wide mt-0.5"
                style={{ color: review.accentColor, fontFamily: "Georgia, serif" }}
              >
                TAP TO VIEW ↗
              </p>
            </div>
          </button>

          {/* Rule */}
          <div className="h-px bg-stone-300 dark:bg-stone-600" />

          {/* Reviewer byline */}
          <p
            className="text-[9px] leading-relaxed dark:text-stone-400"
            style={{ color: "#7a5c3a" }}
          >
            — <strong>{review.reviewer}</strong>, {review.reviewerTitle}
          </p>
        </div>

        {/* Torn bottom edge — matches paper colour so it blends */}
        <TornEdge paperColor={paperBg} />
      </div>
    </motion.div>
  );
}
