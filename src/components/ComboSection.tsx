import { motion, AnimatePresence } from "motion/react";
import { Gift, X } from "lucide-react";
import combos from "../data/combos";
import ComboCard from "./ComboCard";
import { MenuItem } from "../data/menuItems";

interface ComboSectionProps {
  visible: boolean;
  onClose: () => void;
  onAddCombo: (items: MenuItem[]) => void;
}

export default function ComboSection({ visible, onClose, onAddCombo }: ComboSectionProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="mt-8 mb-2">
            {/* Section header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-md shadow-purple-200 dark:shadow-purple-900/30">
                  <Gift size={17} className="text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-foreground leading-none">
                    Combo Deals
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {combos.length} curated bundles · save up to 20%
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-xl hover:bg-muted transition-colors"
              >
                <X size={13} /> Hide combos
              </button>
            </div>

            {/* Combo grid — two columns on md+, one column on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {combos.map((combo, i) => (
                <motion.div
                  key={combo.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <ComboCard combo={combo} onAddCombo={onAddCombo} />
                </motion.div>
              ))}
            </div>

            {/* Divider before main menu */}
            <div className="mt-10 mb-2 flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs font-semibold text-muted-foreground px-2">
                Or pick individual items below
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
