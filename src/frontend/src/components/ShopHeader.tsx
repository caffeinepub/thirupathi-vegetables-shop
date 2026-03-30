import { Heart, Menu, Search, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import type { CartItem } from "../types/cart";

interface ShopHeaderProps {
  cartItems: CartItem[];
  onCartClick: () => void;
}

export function ShopHeader({ cartItems, onCartClick }: ShopHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Shop", href: "#products" },
    { label: "Seasonal", href: "#products" },
    { label: "Fruits", href: "#products" },
    { label: "Vegetables", href: "#products" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 shadow-md">
      <div className="bg-shop-green text-white py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-6">
          {["Home", "Shop", "Cart", "Checkout"].map((link) => (
            <a
              key={link}
              href={link === "Cart" ? "#" : `#${link.toLowerCase()}`}
              onClick={
                link === "Cart"
                  ? (e) => {
                      e.preventDefault();
                      onCartClick();
                    }
                  : undefined
              }
              className="text-xs text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-2 shrink-0">
            <img
              src="/assets/generated/shop-logo-transparent.dim_120x120.png"
              alt="Thirupathi Shop Logo"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="font-bold text-lg leading-tight text-shop-green tracking-wide">
                THIRUPATHI
              </div>
              <div className="text-xs text-muted-foreground leading-tight">
                VEGETABLES & FRUITS SHOP
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
                className="text-sm font-medium text-foreground hover:text-shop-green transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Search"
              className="p-2 text-muted-foreground hover:text-shop-green transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              type="button"
              aria-label="Wishlist"
              className="p-2 text-muted-foreground hover:text-shop-green transition-colors"
            >
              <Heart className="w-5 h-5" />
            </button>
            <button
              type="button"
              data-ocid="cart.open_modal_button"
              onClick={onCartClick}
              aria-label={`Cart, ${totalItems.toFixed(1)} kg`}
              className="relative p-2 text-muted-foreground hover:text-shop-green transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-shop-orange text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button
              type="button"
              className="lg:hidden p-2 text-muted-foreground hover:text-shop-green transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-white">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-sm text-foreground hover:bg-shop-green/5 hover:text-shop-green transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
