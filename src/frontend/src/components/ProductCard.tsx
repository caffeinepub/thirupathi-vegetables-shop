import { Minus, Plus } from "lucide-react";
import type { Product } from "../backend.d";
import type { CartItem } from "../types/cart";

const PRODUCT_ICONS: Record<string, string> = {
  Tomato: "🍅",
  Potato: "🥔",
  Onion: "🧅",
  Carrot: "🥕",
  Spinach: "🥬",
  "Green Beans": "🫘",
  Cucumber: "🥒",
  Brinjal: "🍆",
  "Bell Pepper": "🫑",
  Cauliflower: "🥦",
  Cabbage: "🥬",
  Peas: "🫛",
  Mango: "🥭",
  Banana: "🍌",
  Apple: "🍎",
  Orange: "🍊",
  Grapes: "🍇",
  Watermelon: "🍉",
  Papaya: "🍈",
  Pineapple: "🍍",
  Pomegranate: "🍎",
  Guava: "🍐",
  Lemon: "🍋",
};

function getIcon(name: string): string {
  for (const [key, icon] of Object.entries(PRODUCT_ICONS)) {
    if (name.toLowerCase().includes(key.toLowerCase())) return icon;
  }
  return "🌿";
}

interface ProductCardProps {
  product: Product;
  cartItem?: CartItem;
  onAddToCart: (product: Product) => void;
  onIncrement: (productName: string) => void;
  onDecrement: (productName: string) => void;
  index: number;
}

export function ProductCard({
  product,
  cartItem,
  onAddToCart,
  onIncrement,
  onDecrement,
  index,
}: ProductCardProps) {
  const icon = getIcon(product.name);

  return (
    <div
      data-ocid={`products.item.${index}`}
      className="bg-card rounded-xl shadow-card border border-border overflow-hidden hover:shadow-md transition-shadow flex flex-col"
    >
      <div className="bg-shop-green-light flex items-center justify-center h-36 text-6xl">
        {icon}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-foreground text-sm mb-1 truncate">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground mb-2">Fresh & Natural</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-price-green font-bold text-base">
            ₹{product.pricePerKg}
            <span className="text-xs font-normal text-muted-foreground">
              /kg
            </span>
          </span>
        </div>

        {cartItem ? (
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              data-ocid={`products.decrement.${index}`}
              onClick={() => onDecrement(product.name)}
              className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="flex-1 text-center text-sm font-semibold">
              {cartItem.quantity} kg
            </span>
            <button
              type="button"
              data-ocid={`products.increment.${index}`}
              onClick={() => onIncrement(product.name)}
              className="w-7 h-7 rounded-full bg-shop-orange text-white flex items-center justify-center hover:bg-shop-orange-hover transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            data-ocid={`products.add_button.${index}`}
            onClick={() => onAddToCart(product)}
            className="mt-3 w-full bg-shop-orange hover:bg-shop-orange-hover text-white text-sm font-semibold py-2 rounded-lg transition-colors"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
