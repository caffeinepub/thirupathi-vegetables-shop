import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import type { Product } from "../backend.d";
import type { CartItem } from "../types/cart";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onIncrement: (productName: string) => void;
  onDecrement: (productName: string) => void;
}

export function ProductGrid({
  products,
  isLoading,
  cartItems,
  onAddToCart,
  onIncrement,
  onDecrement,
}: ProductGridProps) {
  const getCartItem = (name: string) =>
    cartItems.find((i) => i.productName === name);

  return (
    <section id="products" className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">
            Our Fresh Collection
          </h2>
          <p className="text-muted-foreground mt-1">
            Farm-fresh vegetables and fruits, priced per kilogram
          </p>
        </div>

        {isLoading ? (
          <div
            data-ocid="products.loading_state"
            className="flex items-center justify-center py-20"
          >
            <Loader2 className="w-8 h-8 animate-spin text-shop-green" />
            <span className="ml-3 text-muted-foreground">
              Loading products...
            </span>
          </div>
        ) : products.length === 0 ? (
          <div
            data-ocid="products.empty_state"
            className="text-center py-20 text-muted-foreground"
          >
            No products available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
              >
                <ProductCard
                  product={product}
                  cartItem={getCartItem(product.name)}
                  onAddToCart={onAddToCart}
                  onIncrement={onIncrement}
                  onDecrement={onDecrement}
                  index={i + 1}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
