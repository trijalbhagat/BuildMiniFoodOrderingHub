import { ShoppingBag } from "lucide-react";
import FoodCard from "./FoodCard";
import { MenuItem } from "../data/menuItems";

interface MenuGridProps {
  items: MenuItem[];
  onAdd: (item: MenuItem) => void;
}

export default function MenuGrid({ items, onAdd }: MenuGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
        <ShoppingBag size={52} className="mb-4 opacity-25" />
        <p className="text-xl font-bold text-foreground">No dishes found</p>
        <p className="text-sm mt-1">Try adjusting your search or category filter</p>
      </div>
    );
  }

  // Menu cards rendered dynamically via map() — no repeated JSX
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {items.map((item) => (
        <FoodCard key={item.id} item={item} onAdd={onAdd} />
      ))}
    </div>
  );
}
