import { Category } from "../data/menuItems";

type AnimationType = "fire" | "bubbles" | "sparkles" | "leaves" | "none";

/** Map food category → animation type */
export function getAnimationType(category: Exclude<Category, "All">): AnimationType {
  const map: Record<string, AnimationType> = {
    Pizza:    "fire",
    Burgers:  "fire",
    Drinks:   "bubbles",
    Desserts: "sparkles",
    Healthy:  "leaves",
  };
  return map[category] ?? "none";
}

// ── Particle configs ──────────────────────────────────────────────────────────

const FIRE_COLORS   = ["#ff4500", "#ff6b00", "#ffcc00", "#ff3300", "#ffa500", "#ffee00", "#ff5500", "#ff8c00"];
const BUBBLE_COLORS = ["rgba(125,211,252,0.75)", "rgba(186,230,253,0.7)", "rgba(103,232,249,0.7)", "rgba(147,197,253,0.65)", "rgba(196,181,253,0.65)", "rgba(165,243,252,0.7)"];
const SPARKLE_CHARS = ["✦", "✧", "★", "✶", "✸", "✺"];
const SPARKLE_COLORS= ["#fbbf24", "#f9a8d4", "#a78bfa", "#34d399", "#60a5fa", "#fb923c", "#f472b6", "#4ade80"];
const LEAF_EMOJIS   = ["🍃", "🌿", "🍀", "🌱", "🍂", "🍁"];

// Seeded deterministic "random" so particles don't jump on every re-render
function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

interface ParticleEffectProps {
  type: AnimationType;
  visible: boolean;
}

export default function ParticleEffect({ type, visible }: ParticleEffectProps) {
  if (!visible || type === "none") return null;

  if (type === "fire")     return <FireParticles />;
  if (type === "bubbles")  return <BubbleParticles />;
  if (type === "sparkles") return <SparkleParticles />;
  if (type === "leaves")   return <LeafParticles />;
  return null;
}

// ─── Fire ─────────────────────────────────────────────────────────────────────

function FireParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
      {Array.from({ length: 12 }).map((_, i) => {
        const left  = 10 + seededRand(i * 3)     * 80;
        const size  = 5  + seededRand(i * 3 + 1) * 7;
        const delay = seededRand(i * 3 + 2)       * 0.6;
        const dur   = 0.6 + seededRand(i * 5)     * 0.5;
        const dx    = (seededRand(i * 7) - 0.5)   * 18;
        const color = FIRE_COLORS[i % FIRE_COLORS.length];

        return (
          <span
            key={i}
            style={{
              position: "absolute",
              bottom: "8%",
              left: `${left}%`,
              width: size,
              height: size * 1.4,
              borderRadius: "50% 50% 30% 30%",
              background: `radial-gradient(ellipse at 40% 60%, ${color}, transparent)`,
              boxShadow: `0 0 ${size * 1.5}px ${color}`,
              // @ts-ignore CSS custom prop
              "--dx": `${dx}px`,
              animationName: "fireRise",
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
              animationTimingFunction: "ease-out",
              animationIterationCount: "infinite",
              animationFillMode: "both",
            }}
          />
        );
      })}
    </div>
  );
}

// ─── Bubbles ──────────────────────────────────────────────────────────────────

function BubbleParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
      {Array.from({ length: 9 }).map((_, i) => {
        const left  = 8  + seededRand(i * 4)     * 84;
        const size  = 6  + seededRand(i * 4 + 1) * 10;
        const delay = seededRand(i * 4 + 2)       * 0.9;
        const dur   = 0.9 + seededRand(i * 6)     * 0.7;
        const dx    = (seededRand(i * 9) - 0.5)   * 14;
        const color = BUBBLE_COLORS[i % BUBBLE_COLORS.length];

        return (
          <span
            key={i}
            style={{
              position: "absolute",
              bottom: "4%",
              left: `${left}%`,
              width: size,
              height: size,
              borderRadius: "50%",
              background: color,
              border: "1px solid rgba(255,255,255,0.5)",
              // @ts-ignore
              "--dx": `${dx}px`,
              animationName: "bubbleRise",
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationFillMode: "both",
            }}
          />
        );
      })}
    </div>
  );
}

// ─── Sparkles ─────────────────────────────────────────────────────────────────

function SparkleParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
      {Array.from({ length: 11 }).map((_, i) => {
        const left   = 5  + seededRand(i * 5)     * 90;
        const top    = 5  + seededRand(i * 5 + 1) * 85;
        const size   = 10 + seededRand(i * 5 + 2) * 14;
        const delay  = seededRand(i * 5 + 3)       * 0.8;
        const dur    = 0.7 + seededRand(i * 7)     * 0.6;
        const char   = SPARKLE_CHARS[i % SPARKLE_CHARS.length];
        const color  = SPARKLE_COLORS[i % SPARKLE_COLORS.length];

        return (
          <span
            key={i}
            style={{
              position: "absolute",
              top: `${top}%`,
              left: `${left}%`,
              fontSize: size,
              color,
              textShadow: `0 0 8px ${color}`,
              lineHeight: 1,
              animationName: "sparkleAnim",
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationFillMode: "both",
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}

// ─── Leaves ───────────────────────────────────────────────────────────────────

function LeafParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
      {Array.from({ length: 8 }).map((_, i) => {
        const left  = 5  + seededRand(i * 6)     * 90;
        const size  = 13 + seededRand(i * 6 + 1) * 8;
        const delay = seededRand(i * 6 + 2)       * 0.7;
        const dur   = 0.9 + seededRand(i * 8)     * 0.6;
        const dx    = (seededRand(i * 11) - 0.5)  * 20;
        const emoji = LEAF_EMOJIS[i % LEAF_EMOJIS.length];

        return (
          <span
            key={i}
            style={{
              position: "absolute",
              bottom: "6%",
              left: `${left}%`,
              fontSize: size,
              lineHeight: 1,
              // @ts-ignore
              "--dx": `${dx}px`,
              animationName: "leafFloat",
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
              animationTimingFunction: "ease-out",
              animationIterationCount: "infinite",
              animationFillMode: "both",
            }}
          >
            {emoji}
          </span>
        );
      })}
    </div>
  );
}
