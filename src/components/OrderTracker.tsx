import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronDown, ChevronUp, MapPin, Clock } from "lucide-react";

interface OrderTrackerProps { visible: boolean; onDismiss: () => void; orderTotal: number; }

const STAGES = [
  { id: 0, label: "Order Placed",     icon: "✅", detail: "We have received your order"      },
  { id: 1, label: "Preparing",        icon: "👨‍🍳", detail: "Our chefs are cooking your meal"  },
  { id: 2, label: "Out for Delivery", icon: "🛵", detail: "Your order is on its way"         },
  { id: 3, label: "Delivered",        icon: "🎉", detail: "Enjoy your meal!"                 },
];
const STAGE_DURATIONS = [4000, 8000, 10000];

export default function OrderTracker({ visible, onDismiss, orderTotal }: OrderTrackerProps) {
  const [stage, setStage]         = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [eta, setEta]             = useState(32);

  useEffect(() => {
    if (!visible) { setStage(0); setEta(32); return; }
    const timers: ReturnType<typeof setTimeout>[] = [];
    STAGE_DURATIONS.forEach((delay, i) => {
      timers.push(setTimeout(() => {
        setStage(i + 1);
        setEta(prev => Math.max(0, prev - Math.round(delay / 1000 / 60 * 10)));
      }, delay));
    });
    const etaInterval = setInterval(() => setEta(prev => Math.max(0, prev - 1)), 60_000);
    return () => { timers.forEach(clearTimeout); clearInterval(etaInterval); };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div initial={{ y: 120, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }} transition={{ type: "spring", damping: 26, stiffness: 280 }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[70] w-[calc(100vw-2rem)] max-w-md">
          <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">

            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500">
              <div className="flex items-center gap-2">
                <span className="text-lg leading-none">{STAGES[stage].icon}</span>
                <div>
                  <p className="text-white font-extrabold text-sm leading-none">Track Your Order</p>
                  <p className="text-white/80 text-[11px] mt-0.5">{STAGES[stage].label}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setCollapsed(c => !c)}
                  className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center transition-colors">
                  {collapsed ? <ChevronUp size={14} className="text-white" /> : <ChevronDown size={14} className="text-white" />}
                </button>
                <button onClick={onDismiss}
                  className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center transition-colors">
                  <X size={14} className="text-white" />
                </button>
              </div>
            </div>

            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden">
                  <div className="px-4 py-4 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock size={13} className="text-orange-500" />
                        <span>
                          {stage < 3
                            ? <>Est. arrival <strong className="text-foreground">{eta} min</strong></>
                            : <strong className="text-emerald-500">Delivered!</strong>}
                        </span>
                      </div>
                      <span className="font-bold text-foreground">₹{Math.round(orderTotal)}</span>
                    </div>

                    <div className="relative">
                      <div className="absolute left-[13px] top-3 bottom-3 w-0.5 bg-border" />
                      <motion.div className="absolute left-[13px] top-3 w-0.5 bg-orange-500 origin-top"
                        animate={{ height: stage === 0 ? "0%" : `${(stage / (STAGES.length - 1)) * 100}%` }}
                        transition={{ duration: 0.6, ease: "easeInOut" }} />
                      <div className="space-y-3 relative">
                        {STAGES.map(s => {
                          const done    = stage > s.id;
                          const current = stage === s.id;
                          return (
                            <div key={s.id} className="flex items-start gap-3">
                              <div className="relative shrink-0 mt-0.5">
                                <motion.div
                                  animate={{
                                    scale: current ? [1, 1.25, 1] : 1,
                                    backgroundColor: done || current ? "#f97316" : "#e5e7eb",
                                  }}
                                  transition={{ duration: 0.6, repeat: current ? Infinity : 0, repeatDelay: 1 }}
                                  className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-xs border-2 border-card shadow">
                                  {done    ? <span className="text-white text-[11px]">✓</span>
                                  : current ? <span className="text-[13px]">{s.icon}</span>
                                  :           <span className="w-2 h-2 rounded-full bg-border block" />}
                                </motion.div>
                              </div>
                              <div className="pt-0.5">
                                <p className={`text-sm font-bold leading-none ${done || current ? "text-foreground" : "text-muted-foreground"}`}>
                                  {s.label}
                                </p>
                                {(done || current) && <p className="text-xs text-muted-foreground mt-0.5">{s.detail}</p>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground border-t border-border pt-3">
                      <MapPin size={11} className="text-orange-500 shrink-0" />
                      Delivering to your saved address
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
