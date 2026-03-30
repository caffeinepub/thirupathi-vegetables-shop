import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { CartItem } from "../types/cart";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onIncrement: (productName: string) => void;
  onDecrement: (productName: string) => void;
  onRemove: (productName: string) => void;
  onCheckout: () => void;
}

export function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
}: CartSidebarProps) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.pricePerKg * item.quantity,
    0,
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />
          <motion.div
            data-ocid="cart.panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-card shadow-2xl z-50 flex flex-col"
          >
            <div className="bg-shop-green-light px-4 py-4 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-shop-green" />
                <h2 className="font-bold text-foreground text-base">
                  Shopping Cart
                </h2>
                <span className="bg-shop-orange text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                  {cartItems.length} items
                </span>
              </div>
              <button
                type="button"
                data-ocid="cart.close_button"
                onClick={onClose}
                className="p-1.5 rounded-md hover:bg-black/10 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div
                  data-ocid="cart.empty_state"
                  className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground"
                >
                  <ShoppingBag className="w-12 h-12 opacity-30" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {cartItems.map((item, i) => (
                    <div
                      key={item.productName}
                      data-ocid={`cart.item.${i + 1}`}
                      className="px-4 py-3"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {item.productName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ₹{item.pricePerKg}/kg
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemove(item.productName)}
                          className="text-muted-foreground hover:text-destructive transition-colors p-0.5"
                          aria-label={`Remove ${item.productName}`}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onDecrement(item.productName)}
                            className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-semibold min-w-[3rem] text-center">
                            {item.quantity} kg
                          </span>
                          <button
                            type="button"
                            onClick={() => onIncrement(item.productName)}
                            className="w-6 h-6 rounded-full bg-shop-orange text-white flex items-center justify-center hover:bg-shop-orange-hover transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-price-green">
                          ₹{(item.pricePerKg * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Subtotal
                  </span>
                  <span className="font-bold text-base text-foreground">
                    ₹{total.toFixed(2)}
                  </span>
                </div>
                <button
                  type="button"
                  data-ocid="cart.submit_button"
                  onClick={onCheckout}
                  className="w-full bg-shop-green hover:bg-shop-green-dark text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
