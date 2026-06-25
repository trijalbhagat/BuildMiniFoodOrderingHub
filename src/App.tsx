import { useState, useEffect, useMemo } from "react";

import menuItems, { Category, CATEGORIES } from "./data/menuItems";
import useCart from "./hooks/useCart";
import useIsDesktop from "./hooks/useIsDesktop";
import { SortOption } from "./components/SearchAndFilters";

import Header from "./components/Header";
import SearchAndFilters from "./components/SearchAndFilters";
import MenuGrid from "./components/MenuGrid";
import CartSidebar from "./components/CartSidebar";
import CheckoutModal from "./components/CheckoutModal";
import Toast from "./components/Toast";
import CategoryPanel from "./components/CategoryPanel";
import ComboSection from "./components/ComboSection";
import ReviewStrip from "./components/ReviewStrip";
import OrderTracker from "./components/OrderTracker";

const MAX_PANELS = 3;

export default function App() {
  // ── Theme ──────────────────────────────────────────────────────────────────
  const [dark, setDark] = useState<boolean>(() => {
    try { return localStorage.getItem("mfoh-theme") === "dark"; } catch { return false; }
  });

  const [userName, setUserName] = useState<string>(() => {
    try { return localStorage.getItem("mfoh-name") || "Guest"; } catch { return "Guest"; }
  });

  const handleUserNameChange = (name: string) => {
    setUserName(name);
    try { localStorage.setItem("mfoh-name", name); } catch { /* ignore */ }
  };

  useEffect(() => {
    const html = document.documentElement;
    dark ? html.classList.add("dark") : html.classList.remove("dark");
    localStorage.setItem("mfoh-theme", dark ? "dark" : "light");
  }, [dark]);

  // ── Responsive mode ────────────────────────────────────────────────────────
  // Desktop (≥1024px): category clicks open side panels.
  // Mobile (<1024px):  category clicks filter the main grid normally.
  const isDesktop = useIsDesktop();

  // ── UI state ───────────────────────────────────────────────────────────────
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [trackerVisible, setTrackerVisible] = useState(false);
  const [trackedTotal, setTrackedTotal] = useState(0);
  const [combosOpen, setCombosOpen] = useState(false);
  const [vegOnly, setVegOnly] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("popular");

  // Mobile-only: active category for normal grid filtering
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  // Desktop-only: open side panels (up to MAX_PANELS, index 0 = newest/rightmost)
  const [openPanels, setOpenPanels] = useState<Exclude<Category, "All">[]>([]);

  const togglePanel = (cat: Category) => {
    if (cat === "All") {
      setOpenPanels([]);
      return;
    }
    const nonAll = cat as Exclude<Category, "All">;
    setOpenPanels((prev) => {
      if (prev.includes(nonAll)) return prev.filter((c) => c !== nonAll);
      const trimmed = prev.length >= MAX_PANELS ? prev.slice(0, -1) : prev;
      return [nonAll, ...trimmed];
    });
  };

  const closePanel = (cat: Exclude<Category, "All">) =>
    setOpenPanels((prev) => prev.filter((c) => c !== cat));

  // ── Cart ───────────────────────────────────────────────────────────────────
  const {
    cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice,
  } = useCart();

  // ── Filtered + sorted items for main grid ──────────────────────────────────
  const filteredItems = useMemo(() => {
    let items = menuItems;

    // Mobile: apply active category filter
    if (!isDesktop && activeCategory !== "All") {
      items = items.filter((i) => i.category === activeCategory);
    }

    // Veg-only filter (both modes)
    if (vegOnly) items = items.filter((i) => i.veg);

    // Both: apply search
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q)
      );
    }

    const sorted = [...items];
    if (sort === "popular")    sorted.sort((a, b) => b.reviews - a.reviews);
    if (sort === "price-asc")  sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }, [isDesktop, activeCategory, vegOnly, search, sort]);

  // ── Items per open panel ───────────────────────────────────────────────────
  const panelItems = useMemo(() => {
    const map: Record<string, typeof menuItems> = {};
    for (const cat of openPanels) {
      const base = menuItems.filter((i) => i.category === cat);
      const sorted = [...base];
      if (sort === "popular")    sorted.sort((a, b) => b.reviews - a.reviews);
      if (sort === "price-asc")  sorted.sort((a, b) => a.price - b.price);
      if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
      map[cat] = sorted;
    }
    return map;
  }, [openPanels, sort]);

  const handlePlaceOrder = () => {
    setTrackedTotal(totalPrice);
    clearCart();
    setTimeout(() => {
      setCheckoutOpen(false);
      setCartOpen(false);
      setTrackerVisible(true);
    }, 3200);
  };

  return (
    <div className="min-h-screen bg-background">
      <Toast dark={dark} />

      <Header
        totalItems={totalItems}
        onCartOpen={() => setCartOpen(true)}
        dark={dark}
        onToggleDark={() => setDark((d) => !d)}
        vegOnly={vegOnly}
        onToggleVeg={() => setVegOnly((v) => !v)}
        userName={userName}
        onUserNameChange={handleUserNameChange}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50/80 to-orange-100/60 dark:from-stone-900 dark:via-stone-900 dark:to-orange-950/20 py-6 px-4 sm:px-6">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-300/25 dark:bg-orange-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-amber-300/25 dark:bg-amber-600/8 rounded-full blur-3xl pointer-events-none" />

        {/* Newspaper review strip */}
        <div className="max-w-7xl mx-auto relative mt-2">
          <ReviewStrip
            onItemClick={(category) => {
              if (isDesktop) {
                togglePanel(category);
              } else {
                setActiveCategory(category);
              }
              // Smooth scroll to menu
              document.getElementById("menu-section")?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </div>
      </section>

      {/* Main content */}
      <main id="menu-section" className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <SearchAndFilters
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
          isDesktop={isDesktop}
          openPanels={openPanels}
          onTogglePanel={togglePanel}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          combosOpen={combosOpen}
          onToggleCombos={() => setCombosOpen((v) => !v)}
        />

        {/* Combo deals section — animates in/out above main grid */}
        <ComboSection
          visible={combosOpen}
          onClose={() => setCombosOpen(false)}
          onAddCombo={(items) => items.forEach((i) => addToCart(i))}
        />

        <div className="mt-6">
          <p className="text-sm text-muted-foreground mb-4">
            Showing{" "}
            <span className="font-bold text-foreground">{filteredItems.length}</span>{" "}
            dish{filteredItems.length !== 1 ? "es" : ""}
            {!isDesktop && activeCategory !== "All" && (
              <> in <span className="font-bold text-orange-500">{activeCategory}</span></>
            )}
            {search.trim() && (
              <> matching <span className="font-bold text-orange-500">"{search}"</span></>
            )}
          </p>

          <MenuGrid items={filteredItems} onAdd={addToCart} />
        </div>
      </main>

      <footer className="border-t border-border mt-16 py-8 text-center text-sm text-muted-foreground">
        🍔 Mini Food Ordering Hub — Fresh food, delivered with love.
      </footer>

      {/* Desktop-only: category side panels, stacked from right edge */}
      {isDesktop && openPanels.map((cat, idx) => (
        <CategoryPanel
          key={cat}
          category={cat}
          items={panelItems[cat] ?? []}
          stackIndex={idx}
          onClose={() => closePanel(cat)}
          onAdd={addToCart}
        />
      ))}

      <CartSidebar
        cart={cart}
        totalItems={totalItems}
        totalPrice={totalPrice}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdate={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
      />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        totalPrice={totalPrice}
        onPlaceOrder={handlePlaceOrder}
      />

      <OrderTracker
        visible={trackerVisible}
        onDismiss={() => setTrackerVisible(false)}
        orderTotal={trackedTotal}
      />
    </div>
  );
}
