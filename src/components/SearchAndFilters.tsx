import { Search, ArrowUpDown, ChevronDown, Layers, Gift } from "lucide-react";
import { motion } from "motion/react";
import { Category, CATEGORIES } from "../data/menuItems";

export type SortOption = "popular" | "price-asc" | "price-desc";

interface SearchAndFiltersProps {
  search: string; setSearch: (v: string) => void;
  sort: SortOption; setSort: (s: SortOption) => void;
  isDesktop: boolean;
  openPanels: Exclude<Category, "All">[];
  onTogglePanel: (category: Category) => void;
  activeCategory: Category; setActiveCategory: (c: Category) => void;
  combosOpen: boolean; onToggleCombos: () => void;
}

export default function SearchAndFilters({
  search, setSearch, sort, setSort,
  isDesktop, openPanels, onTogglePanel,
  activeCategory, setActiveCategory,
  combosOpen, onToggleCombos,
}: SearchAndFiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search dishes, ingredients…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm" />
        </div>
        <div className="relative">
          <ArrowUpDown size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <select value={sort} onChange={e => setSort(e.target.value as SortOption)}
            className="pl-8 pr-8 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 appearance-none cursor-pointer">
            <option value="popular">Most Popular</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {CATEGORIES.map(cat => {
          const isAll = cat === "All";
          const desktopActive = isDesktop && !isAll && openPanels.includes(cat as Exclude<Category, "All">);
          const mobileActive  = !isDesktop && activeCategory === cat;
          const isActive = desktopActive || mobileActive;
          return (
            <motion.button key={cat} whileTap={{ scale: 0.94 }}
              onClick={() => isDesktop ? onTogglePanel(cat) : setActiveCategory(cat)}
              className={`relative px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-orange-500 text-white shadow-md shadow-orange-200/60 dark:shadow-orange-900/40"
                  : "bg-card border border-border text-muted-foreground hover:border-orange-400 hover:text-orange-500"
              }`}>
              {cat}
              {desktopActive && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border border-card" />}
            </motion.button>
          );
        })}

        {isDesktop && openPanels.length > 0 && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground ml-1">
            <Layers size={12} />{openPanels.length}/3 open
          </span>
        )}

        <motion.button onClick={onToggleCombos} whileTap={{ scale: 0.94 }}
          className={`relative flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
            combosOpen
              ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md shadow-purple-200/60 dark:shadow-purple-900/40"
              : "bg-card border border-border text-muted-foreground hover:border-purple-400 hover:text-purple-500"
          }`}>
          <Gift size={13} />Combos
          {combosOpen && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-amber-400 rounded-full border border-card" />}
        </motion.button>
      </div>
    </div>
  );
}
