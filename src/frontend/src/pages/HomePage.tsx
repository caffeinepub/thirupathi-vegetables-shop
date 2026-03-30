import { useRef, useState } from "react";
import type { Product } from "../backend.d";
import { CartSidebar } from "../components/CartSidebar";
import { CheckoutModal } from "../components/CheckoutModal";
import { HeroSection } from "../components/HeroSection";
import { ProductGrid } from "../components/ProductGrid";
import { ShopFooter } from "../components/ShopFooter";
import { ShopHeader } from "../components/ShopHeader";
import { useGetAllProducts } from "../hooks/useQueries";
import type { CartItem } from "../types/cart";

export function HomePage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);

  const { data: products = [], isLoading } = useGetAllProducts();

  const total = cartItems.reduce(
    (sum, item) => sum + item.pricePerKg * item.quantity,
    0,
  );

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.productName === product.name);
      if (existing) return prev;
      return [
        ...prev,
        {
          productName: product.name,
          pricePerKg: product.pricePerKg,
          quantity: 0.5,
        },
      ];
    });
  };

  const increment = (productName: string) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.productName === productName
          ? { ...i, quantity: i.quantity + 0.5 }
          : i,
      ),
    );
  };

  const decrement = (productName: string) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.productName === productName);
      if (!item) return prev;
      if (item.quantity <= 0.5)
        return prev.filter((i) => i.productName !== productName);
      return prev.map((i) =>
        i.productName === productName
          ? { ...i, quantity: i.quantity - 0.5 }
          : i,
      );
    });
  };

  const removeItem = (productName: string) => {
    setCartItems((prev) => prev.filter((i) => i.productName !== productName));
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
    setCartOpen(false);
  };

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ShopHeader cartItems={cartItems} onCartClick={() => setCartOpen(true)} />

      <main className="flex-1">
        <HeroSection onShopNow={scrollToProducts} />
        <div ref={productsRef}>
          <ProductGrid
            products={products}
            isLoading={isLoading}
            cartItems={cartItems}
            onAddToCart={addToCart}
            onIncrement={increment}
            onDecrement={decrement}
          />
        </div>
      </main>

      <ShopFooter />

      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onIncrement={increment}
        onDecrement={decrement}
        onRemove={removeItem}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartItems={cartItems}
        total={total}
        onSuccess={handleOrderSuccess}
      />
    </div>
  );
}
