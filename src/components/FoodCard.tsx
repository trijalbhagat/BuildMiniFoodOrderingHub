import { useState } from "react";
import { motion } from "motion/react";
import { Plus, CheckCircle, Star, ChefHat, Flame, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { MenuItem, Badge } from "../data/menuItems";
import ParticleEffect, { getAnimationType } from "./ParticleEffect";
import UrgencyBadge from "./UrgencyBadge";

interface FoodCardProps { item: MenuItem; onAdd: (item: MenuItem) => void; }

function ItemBadge({ badge }: { badge: Badge }) {
  if (!badge) return null;
  const config = {
    chef:    { cls: "bg-amber-500",  label: "Chef's Pick", icon: <ChefHat size={10} /> },
    popular: { cls: "bg-orange-500", label: "Popular",     icon: <Flame size={10} /> },
    new:     { cls: "bg-emerald-500",label: "New",         icon: <Sparkles size={10} /> },
  }[badge];
  return (
    <span className={`absolute top-2 left-2 z-10 flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold text-white ${config.cls}`}>
      {config.icon}{config.label}
    </span>
  );
}

function VegDot({ veg }: { veg: boolean }) {
  return (
    <span title={veg ? "Vegetarian" : "Non-vegetarian"}
      className={`inline-flex items-center justify-center w-4 h-4 rounded-sm border-2 shrink-0 ${
        veg ? "border-green-600 bg-green-50 dark:bg-green-950"
            : "border-red-600 bg-red-50 dark:bg-red-950"
      }`}>
      <span className={`w-2 h-2 rounded-full ${veg ? "bg-green-600" : "bg-red-600"}`} />
    </span>
  );
}
export { VegDot };

function CompactCard({ item, onAdd }: { item: MenuItem; onAdd: (item: MenuItem) => void }) {
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    onAdd(item); setAdded(true);
    setTimeout(() => setAdded(false), 1000);
    toast.success(`${item.name} added!`, { icon: "🛒", duration: 1800 });
  };
  return (
    <div className="flex gap-2.5 items-center p-2.5 rounded-xl hover:bg-muted/50 transition-colors group">
      <div className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-orange-100 dark:bg-orange-950/30">
        <img src={item.image} alt={item.name} loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <VegDot veg={item.veg} />
          <p className="text-xs font-bold text-foreground truncate">{item.name}</p>
        </div>
        <div className="flex items-center gap-1 mb-1">
          <Star size={10} className="text-amber-400 fill-amber-400" />
          <span className="text-[10px] font-semibold text-foreground">{item.rating}</span>
          <span className="text-[10px] text-muted-foreground">({item.reviews})</span>
        </div>
        {item.urgency && (
          <div className="mt-0.5">
            <UrgencyBadge urgency={item.urgency} stockLeft={item.stockLeft} ordersRecent={item.ordersRecent} />
          </div>
        )}
        <span className="text-xs font-extrabold text-orange-500">₹{Math.round(item.price)}</span>
      </div>
      <motion.button onClick={handleAdd} whileTap={{ scale: 0.9 }}
        className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
          added ? "bg-emerald-500 text-white" : "bg-orange-500 hover:bg-orange-600 text-white"
        }`}>
        {added ? <CheckCircle size={13} /> : <Plus size={13} />}
      </motion.button>
    </div>
  );
}
export { CompactCard };

export default function FoodCard({ item, onAdd }: FoodCardProps) {
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const animationType = getAnimationType(item.category);

  const handleAdd = () => {
    onAdd(item); setAdded(true);
    setTimeout(() => setAdded(false), 1100);
    toast.success(`${item.name} added!`, { icon: "🛒", duration: 2000 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.93 }} whileHover={{ y: -6 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
      className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col group border border-border"
    >
      <div className="relative overflow-hidden h-48 bg-orange-100 dark:bg-orange-950/30 shrink-0">
        <ItemBadge badge={item.badge} />
        <img src={item.image} alt={item.name} loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <span className="absolute bottom-2 right-2 text-[11px] bg-white/90 dark:bg-black/60 backdrop-blur-sm text-foreground px-2 py-0.5 rounded-full font-semibold">
          {item.category}
        </span>
        <ParticleEffect type={animationType} visible={hovered} />
      </div>

      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex justify-between items-start gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <VegDot veg={item.veg} />
            <h3 className="font-bold text-[15px] leading-snug text-foreground truncate">{item.name}</h3>
          </div>
          <span className="text-base font-extrabold text-orange-500 shrink-0 tabular-nums">
            ₹{Math.round(item.price)}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Star size={13} className="text-amber-400 fill-amber-400" />
          <span className="text-sm font-bold text-foreground">{item.rating}</span>
          <span className="text-xs text-muted-foreground">({item.reviews} reviews)</span>
        </div>
        <UrgencyBadge urgency={item.urgency} stockLeft={item.stockLeft} ordersRecent={item.ordersRecent} />
        <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-2">{item.description}</p>
        <motion.button onClick={handleAdd} whileTap={{ scale: 0.95 }}
          className={`mt-1 w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-1.5 ${
            added
              ? "bg-emerald-500 text-white shadow-md shadow-emerald-200 dark:shadow-emerald-900/30"
              : "bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-200 dark:shadow-orange-900/30"
          }`}>
          {added ? <><CheckCircle size={15} /> Added to Cart!</> : <><Plus size={15} /> Add to Cart</>}
        </motion.button>
      </div>
    </motion.div>
  );
}
