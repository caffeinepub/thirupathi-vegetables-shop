import { CheckCircle, Loader2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { usePlaceOrder } from "../hooks/useQueries";
import type { CartItem } from "../types/cart";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  total: number;
  onSuccess: () => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  total,
  onSuccess,
}: CheckoutModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orderId, setOrderId] = useState<bigint | null>(null);
  const placeOrder = usePlaceOrder();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const items = cartItems.map((item) => ({
      productName: item.productName,
      quantity: item.quantity,
    }));
    const id = await placeOrder.mutateAsync({
      customerName: name,
      phoneNumber: phone,
      address,
      items,
    });
    setOrderId(id);
    onSuccess();
  };

  const handleClose = () => {
    setName("");
    setPhone("");
    setAddress("");
    setOrderId(null);
    placeOrder.reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          <motion.div
            data-ocid="checkout.dialog"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h2 className="font-bold text-lg text-foreground">
                  {orderId ? "Order Placed!" : "Checkout"}
                </h2>
                <button
                  type="button"
                  data-ocid="checkout.close_button"
                  onClick={handleClose}
                  className="p-1.5 rounded-md hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6">
                {orderId ? (
                  <div
                    data-ocid="checkout.success_state"
                    className="text-center py-6"
                  >
                    <CheckCircle className="w-16 h-16 text-price-green mx-auto mb-4" />
                    <h3 className="font-bold text-xl text-foreground mb-2">
                      Thank you!
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Your order has been placed successfully.
                    </p>
                    <div className="bg-shop-green-light rounded-lg p-4 mb-6">
                      <p className="text-sm text-muted-foreground">Order ID</p>
                      <p className="font-bold text-xl text-shop-green">
                        #{orderId.toString()}
                      </p>
                    </div>
                    <button
                      type="button"
                      data-ocid="checkout.confirm_button"
                      onClick={handleClose}
                      className="w-full bg-shop-green hover:bg-shop-green-dark text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="bg-muted rounded-lg p-3 space-y-1">
                      {cartItems.map((item) => (
                        <div
                          key={item.productName}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-muted-foreground">
                            {item.productName} × {item.quantity}kg
                          </span>
                          <span className="font-medium">
                            ₹{(item.pricePerKg * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                      <div className="border-t border-border mt-2 pt-2 flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-price-green">
                          ₹{total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="checkout-name"
                        className="block text-sm font-medium mb-1"
                      >
                        Customer Name *
                      </label>
                      <input
                        id="checkout-name"
                        data-ocid="checkout.input"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="checkout-phone"
                        className="block text-sm font-medium mb-1"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="checkout-phone"
                        data-ocid="checkout.input"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="10-digit mobile number"
                        className="w-full border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="checkout-address"
                        className="block text-sm font-medium mb-1"
                      >
                        Delivery Address *
                      </label>
                      <textarea
                        id="checkout-address"
                        data-ocid="checkout.textarea"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your full delivery address"
                        rows={3}
                        className="w-full border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      />
                    </div>

                    {placeOrder.isError && (
                      <div
                        data-ocid="checkout.error_state"
                        className="text-destructive text-sm bg-destructive/10 rounded-lg px-3 py-2"
                      >
                        Failed to place order. Please try again.
                      </div>
                    )}

                    <button
                      data-ocid="checkout.submit_button"
                      type="submit"
                      disabled={placeOrder.isPending}
                      className="w-full bg-shop-green hover:bg-shop-green-dark disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      {placeOrder.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Placing
                          Order...
                        </>
                      ) : (
                        "Place Order"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
