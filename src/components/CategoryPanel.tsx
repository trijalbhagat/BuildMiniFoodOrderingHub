import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { MenuItem, Category } from "../data/menuItems";
import { CompactCard } from "./FoodCard";

// Emoji per category for panel header flair
const CATEGORY_EMOJI: Record<Exclude<Category, "All">, string> = {
  Pizza: "🍕",
  Burgers: "🍔",
  Drinks: "🥤",
  Desserts: "🍰",
  Healthy: "🥗",
};

// Pastel accent per category (header tint)
const CATEGORY_COLOR: Record<Exclude<Category, "All">, string> = {
  Pizza:    "from-orange-400 to-amber-400",
  Burgers:  "from-red-400 to-orange-400",
  Drinks:   "from-cyan-400 to-blue-400",
  Desserts: "from-pink-400 to-rose-400",
  Healthy:  "from-green-400 to-emerald-400",
};

interface CategoryPanelProps {
  category: Exclude<Category, "All">;
  items: MenuItem[];
  /** Horizontal stack index (0 = rightmost, 1 = next, 2 = furthest left) */
  stackIndex: number;
  onClose: () => void;
  onAdd: (item: MenuItem) => void;
}

/** Width of each panel in pixels — used to compute stacking offsets */
export const PANEL_WIDTH = 268;

export default function CategoryPanel({
  category,
  items,
  stackIndex,
  onClose,
  onAdd,
}: CategoryPanelProps) {
  const emoji = CATEGORY_EMOJI[category];
  const gradient = CATEGORY_COLOR[category];
  // Stack panels from the right edge; newest (index 0) is rightmost
  const rightOffset = stackIndex * (PANEL_WIDTH + 8);

  return (
    <AnimatePresence>
      <motion.div
        key={category}
        initial={{ x: PANEL_WIDTH, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: PANEL_WIDTH, opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        style={{ right: rightOffset, width: PANEL_WIDTH }}
        className="fixed top-20 bottom-6 z-[35] flex flex-col rounded-2xl shadow-2xl border border-border bg-card overflow-hidden"
      >
        {/* Gradient header */}
        <div className={`bg-gradient-to-r ${gradient} px-4 py-3 flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            <span className="text-xl">{emoji}</span>
            <div>
              <p className="text-white font-extrabold text-sm leading-none">{category}</p>
              <p className="text-white/80 text-[10px] mt-0.5">
                {items.length} dish{items.length !== 1 ? "es" : ""}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors"
          >
            <X size={13} className="text-white" />
          </button>
        </div>

        {/* Veg legend */}
        <div className="flex items-center gap-3 px-3 py-2 border-b border-border bg-muted/30 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm border-2 border-green-600 bg-green-50 dark:bg-green-950 inline-flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
            </span>
            Veg
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm border-2 border-red-600 bg-red-50 dark:bg-red-950 inline-flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            </span>
            Non-veg
          </span>
        </div>

        {/* Independently scrollable item list */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-1 py-2">
          {items.length === 0 ? (
            <p className="text-center text-xs text-muted-foreground py-8">No items found.</p>
          ) : (
            <div className="flex flex-col divide-y divide-border/50">
              {items.map((item) => (
                <CompactCard key={item.id} item={item} onAdd={onAdd} />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
