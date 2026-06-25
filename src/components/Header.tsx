import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Pencil, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  totalItems: number;
  onCartOpen: () => void;
  dark: boolean;
  onToggleDark: () => void;
  vegOnly: boolean;
  onToggleVeg: () => void;
  userName: string;
  onUserNameChange: (name: string) => void;
}

export default function Header({
  totalItems,
  onCartOpen,
  dark,
  onToggleDark,
  vegOnly,
  onToggleVeg,
  userName,
  onUserNameChange,
}: HeaderProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(userName);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when editing starts
  useEffect(() => {
    if (editing) {
      setDraft(userName);
      setTimeout(() => inputRef.current?.select(), 30);
    }
  }, [editing, userName]);

  const commit = () => {
    const trimmed = draft.trim();
    onUserNameChange(trimmed || "Guest");
    setEditing(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") commit();
    if (e.key === "Escape") setEditing(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">

        {/* ── Left: logo + welcome ───────────────────────────────────────── */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Logo mark */}
          <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center shadow-md shadow-orange-300/40 dark:shadow-orange-900/40 shrink-0">
            <span className="text-[18px] leading-none">🍔</span>
          </div>

          {/* App name */}
          <div className="leading-none hidden sm:block shrink-0">
            <span className="font-extrabold text-foreground text-[15px] block">Mini Food</span>
            <span className="text-orange-500 text-[11px] font-bold block tracking-wide">
              Ordering Hub
            </span>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-border shrink-0" />

          {/* Welcome + editable name */}
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-sm text-muted-foreground font-medium hidden sm:inline whitespace-nowrap">
              Welcome,
            </span>

            <AnimatePresence mode="wait">
              {editing ? (
                <motion.div
                  key="input"
                  initial={{ opacity: 0, width: 60 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1"
                >
                  <input
                    ref={inputRef}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={handleKey}
                    onBlur={commit}
                    maxLength={24}
                    className="text-sm font-bold text-foreground bg-muted border border-orange-400 rounded-lg px-2 py-0.5 w-28 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <button
                    onMouseDown={(e) => { e.preventDefault(); commit(); }}
                    className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors shrink-0"
                  >
                    <Check size={12} />
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="name"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setEditing(true)}
                  className="group flex items-center gap-1 max-w-[140px]"
                  title="Click to change your name"
                >
                  <span className="text-sm font-extrabold text-orange-500 truncate">
                    {userName}
                  </span>
                  <Pencil
                    size={11}
                    className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Right: actions ─────────────────────────────────────────────── */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Veg-only toggle */}
          <button
            onClick={onToggleVeg}
            title={vegOnly ? "Showing veg only — click to show all" : "Show veg only"}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-200 text-sm font-semibold ${
              vegOnly
                ? "bg-green-500 border-green-500 text-white shadow-md shadow-green-300/40 dark:shadow-green-900/40"
                : "bg-card border-border text-muted-foreground hover:border-green-500 hover:text-green-600"
            }`}
          >
            <span
              className={`inline-flex items-center justify-center w-4 h-4 rounded-sm border-2 shrink-0 transition-colors ${
                vegOnly
                  ? "border-white bg-white/20"
                  : "border-green-600 bg-green-50 dark:bg-green-950"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full transition-colors ${
                  vegOnly ? "bg-white" : "bg-green-600"
                }`}
              />
            </span>

            <span className="relative inline-flex items-center w-8 h-4 shrink-0">
              <span
                className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                  vegOnly ? "bg-white/30" : "bg-muted"
                }`}
              />
              <motion.span
                animate={{ x: vegOnly ? 16 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`absolute w-3 h-3 rounded-full shadow transition-colors ${
                  vegOnly ? "bg-white" : "bg-green-500"
                }`}
              />
            </span>

            <span className="hidden sm:inline whitespace-nowrap">Veg only</span>
          </button>

          <ThemeToggle dark={dark} onToggle={onToggleDark} />

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onCartOpen}
            className="relative flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl transition-colors font-bold text-sm shadow-md shadow-orange-300/40 dark:shadow-orange-900/40"
          >
            <ShoppingCart size={15} />
            <span className="hidden sm:inline">Cart</span>

            <AnimatePresence mode="popLayout">
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="bg-white text-orange-500 text-[11px] font-extrabold min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center tabular-nums"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
