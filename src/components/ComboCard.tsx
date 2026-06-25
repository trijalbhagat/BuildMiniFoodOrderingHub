import { useState } from "react";
import { motion } from "motion/react";
import { Plus, CheckCircle, Tag, Star } from "lucide-react";
import { toast } from "sonner";
import { Combo } from "../data/combos";
import { MenuItem } from "../data/menuItems";

interface ComboCardProps { combo: Combo; onAddCombo: (items: MenuItem[]) => void; }

function VegDot({ veg }: { veg: boolean }) {
  return (
    <span title={veg ? "Vegetarian" : "Non-vegetarian"}
      className={`inline-flex items-center justify-center w-3.5 h-3.5 rounded-sm border-2 shrink-0 ${
        veg ? "border-green-600 bg-green-50 dark:bg-green-950"
            : "border-red-600 bg-red-50 dark:bg-red-950"
      }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${veg ? "bg-green-600" : "bg-red-600"}`} />
    </span>
  );
}

export default function ComboCard({ combo, onAddCombo }: ComboCardProps) {
  const [added, setAdded] = useState(false);
  const savings    = (combo.originalPrice - combo.comboPrice).toFixed(2);
  const savingsPct = Math.round(((combo.originalPrice - combo.comboPrice) / combo.originalPrice) * 100);

  const handleAddCombo = () => {
    const asMenuItems = combo.items.map(ci => ({
      id: ci.id, name: ci.name, category: ci.category as any,
      price: ci.price, description: "", rating: 0, reviews: 0,
      badge: null, popular: false, image: ci.image, veg: ci.veg, urgency: null,
    })) as MenuItem[];
    asMenuItems.forEach(item => onAddCombo([item]));
    setAdded(true);
    toast.success(`${combo.name} combo added to cart! 🎉`, { duration: 2500 });
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }} transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-card rounded-3xl overflow-hidden border border-border shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      <div className={`relative bg-gradient-to-r ${combo.gradient} p-5 pb-0`}>
        {combo.badge && (
          <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-white/30 flex items-center gap-1">
            <Star size={9} fill="white" /> {combo.badge}
          </span>
        )}
        <div className="mb-4">
          <p className="text-2xl mb-1">{combo.emoji}</p>
          <h3 className="text-white font-extrabold text-xl leading-tight">{combo.name}</h3>
          <p className="text-white/80 text-xs mt-0.5">{combo.tagline}</p>
        </div>
        <div className="flex items-end gap-0">
          {combo.items.map((item, i) => (
            <motion.div key={item.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.07, duration: 0.3 }}
              style={{ zIndex: combo.items.length - i, marginLeft: i > 0 ? -16 : 0 }}
              className="relative w-24 h-24 rounded-t-2xl overflow-hidden border-2 border-white/40 shadow-lg shrink-0">
              <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover" />
            </motion.div>
          ))}
          <div className="flex-1" />
        </div>
      </div>
      <div className="p-5 flex flex-col gap-4 flex-1">
        <div className="space-y-2">
          {combo.items.map(item => (
            <div key={item.id} className="flex items-center gap-2">
              <VegDot veg={item.veg} />
              <span className="text-sm text-foreground font-medium flex-1 truncate">{item.name}</span>
              <span className="text-xs text-muted-foreground tabular-nums shrink-0">${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-border" />
        <div className="flex items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-foreground tabular-nums">${combo.comboPrice.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground line-through tabular-nums">${combo.originalPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <Tag size={11} className="text-emerald-500" />
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Save ${savings} · {savingsPct}% off</span>
            </div>
          </div>
          <motion.button onClick={handleAddCombo} whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 shrink-0 ${
              added
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/30"
                : "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-200 dark:shadow-orange-900/30"
            }`}>
            {added ? <><CheckCircle size={15} /> Added!</> : <><Plus size={15} /> Add Combo</>}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
