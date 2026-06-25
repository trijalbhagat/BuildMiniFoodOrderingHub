import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, X, Minus, Plus, Trash2, CreditCard } from "lucide-react";
import { CartItem } from "../hooks/useCart";

interface CartSidebarProps {
  cart: CartItem[]; totalItems: number; totalPrice: number;
  open: boolean; onClose: () => void;
  onUpdate: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

const fmt = (n: number) => `₹${Math.round(n)}`;

export default function CartSidebar({ cart, totalItems, totalPrice, open, onClose, onUpdate, onRemove, onCheckout }: CartSidebarProps) {
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }} onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40" />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-[420px] bg-card shadow-2xl z-50 flex flex-col">

            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <ShoppingCart size={15} className="text-white" />
                </div>
                <h2 className="text-lg font-extrabold text-foreground">Your Order</h2>
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span key={totalItems} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-muted transition-colors">
                <X size={17} className="text-muted-foreground" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              <AnimatePresence>
                {cart.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center py-20">
                    <div className="text-6xl mb-4">🍽️</div>
                    <p className="text-xl font-extrabold text-foreground mb-1">Your cart is empty</p>
                    <p className="text-sm text-muted-foreground">Add something delicious to get started!</p>
                  </motion.div>
                ) : cart.map(item => (
                  <motion.div key={item.id} layout
                    initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30, transition: { duration: 0.18 } }}
                    className="flex gap-3 items-center bg-background rounded-xl p-3 border border-border">
                    <img src={item.image} alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover bg-orange-100 dark:bg-orange-950/30 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-foreground truncate">{item.name}</p>
                      <p className="text-orange-500 font-extrabold text-sm mt-0.5 tabular-nums">
                        {fmt(item.price * item.quantity)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => onUpdate(item.id, -1)}
                          className="w-6 h-6 rounded-full bg-muted hover:bg-orange-100 dark:hover:bg-orange-900/30 flex items-center justify-center transition-colors">
                          <Minus size={11} />
                        </button>
                        <span className="text-sm font-bold w-5 text-center tabular-nums">{item.quantity}</span>
                        <button onClick={() => onUpdate(item.id, 1)}
                          className="w-6 h-6 rounded-full bg-muted hover:bg-orange-100 dark:hover:bg-orange-900/30 flex items-center justify-center transition-colors">
                          <Plus size={11} />
                        </button>
                      </div>
                    </div>
                    <button onClick={() => onRemove(item.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-muted-foreground hover:text-red-500 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {cart.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="px-6 py-5 border-t border-border bg-card space-y-3">
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal ({totalItems} items)</span>
                      <span className="tabular-nums">{fmt(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Delivery fee</span>
                      <span className="text-emerald-500 font-semibold">Free</span>
                    </div>
                  </div>
                  <div className="flex justify-between font-extrabold text-foreground text-base border-t border-border pt-3">
                    <span>Total</span>
                    <span className="text-orange-500 tabular-nums text-lg">{fmt(totalPrice)}</span>
                  </div>
                  <motion.button onClick={onCheckout} whileTap={{ scale: 0.97 }}
                    className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-xl transition-colors flex items-center justify-center gap-2 text-[15px] shadow-lg shadow-orange-300/40 dark:shadow-orange-900/40">
                    <CreditCard size={17} />Checkout · {fmt(totalPrice)}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
