import { Sun, Moon } from "lucide-react";
import { motion } from "motion/react";

interface ThemeToggleProps {
  dark: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ dark, onToggle }: ThemeToggleProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      onClick={onToggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </motion.button>
  );
}
