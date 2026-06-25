import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { CartItem } from "../hooks/useCart";
import { PAYMENT_METHODS } from "../data/menuItems";

interface CheckoutModalProps {
  open: boolean; onClose: () => void;
  cart: CartItem[]; totalPrice: number; onPlaceOrder: () => void;
}

const fmt = (n: number) => `₹${Math.round(n)}`;

export default function CheckoutModal({ open, onClose, cart, totalPrice, onPlaceOrder }: CheckoutModalProps) {
  const [address, setAddress] = useState("");
  const [payMethod, setPayMethod] = useState(PAYMENT_METHODS[0]);
  const [placed, setPlaced] = useState(false);

  const handlePlace = () => {
    if (!address.trim()) { toast.error("Please enter a delivery address"); return; }
    setPlaced(true);
    setTimeout(() => { onPlaceOrder(); setTimeout(() => { setPlaced(false); setAddress(""); }, 300); }, 3000);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          onClick={e => { if (!placed && e.target === e.currentTarget) onClose(); }}>
          <motion.div initial={{ scale: 0.88, opacity: 0, y: 24 }} animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }} transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className="bg-card rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-border">
            {placed ? (
              <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} className="p-12 text-center">
                <motion.div animate={{ scale: [1, 1.25, 1, 1.15, 1], rotate: [0, -8, 8, -4, 0] }}
                  transition={{ duration: 0.7 }} className="text-7xl mb-5 select-none">🎉</motion.div>
                <h2 className="text-2xl font-extrabold text-foreground mb-2">Order Placed!</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Your food is being prepared with love. Estimated delivery: <strong className="text-foreground">25–35 min</strong>.
                </p>
              </motion.div>
            ) : (
              <>
                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                  <h2 className="text-xl font-extrabold text-foreground">Checkout</h2>
                  <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-muted transition-colors">
                    <X size={17} className="text-muted-foreground" />
                  </button>
                </div>
                <div className="px-6 py-5 space-y-6 max-h-[65vh] overflow-y-auto">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Order Summary</p>
                    <div className="space-y-2">
                      {cart.map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-foreground">{item.name} <span className="text-muted-foreground font-normal">×{item.quantity}</span></span>
                          <span className="font-bold text-foreground tabular-nums">{fmt(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border mt-3 pt-3 flex justify-between font-extrabold text-foreground">
                      <span>Total</span>
                      <span className="text-orange-500 tabular-nums">{fmt(totalPrice)}</span>
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-bold text-foreground mb-2">
                      <MapPin size={14} className="text-orange-500" />Delivery Address
                    </label>
                    <textarea value={address} onChange={e => setAddress(e.target.value)}
                      placeholder="123 Main Street, Apt 4B, New York, NY 10001" rows={3}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm resize-none" />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-bold text-foreground mb-2">
                      <CreditCard size={14} className="text-orange-500" />Payment Method
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {PAYMENT_METHODS.map(method => (
                        <button key={method} onClick={() => setPayMethod(method)}
                          className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                            payMethod === method
                              ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                              : "border-border text-muted-foreground hover:border-orange-300 hover:text-orange-500"
                          }`}>{method}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-border">
                  <motion.button onClick={handlePlace} whileTap={{ scale: 0.97 }}
                    className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-xl transition-colors text-[15px] shadow-lg shadow-orange-300/40 dark:shadow-orange-900/40">
                    Place Order · {fmt(totalPrice)}
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
