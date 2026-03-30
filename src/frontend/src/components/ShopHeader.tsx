import {
  Heart,
  Loader2,
  LogIn,
  LogOut,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import type { CartItem } from "../types/cart";

interface ShopHeaderProps {
  cartItems: CartItem[];
  onCartClick: () => void;
}

export function ShopHeader({ cartItems, onCartClick }: ShopHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { identity, login, clear, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const principalShort = isAuthenticated
    ? `${identity.getPrincipal().toString().slice(0, 5)}...`
    : null;

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

          <div className="flex items-center gap-2">
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

            {/* Auth button */}
            {isInitializing ? (
              <div className="p-2">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              </div>
            ) : isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-shop-green/10 text-shop-green rounded-full px-3 py-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">{principalShort}</span>
                </div>
                <button
                  type="button"
                  data-ocid="auth.logout_button"
                  onClick={clear}
                  aria-label="Logout"
                  className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-destructive transition-colors px-2 py-1.5 rounded-md hover:bg-destructive/10"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            ) : (
              <button
                type="button"
                data-ocid="auth.login_button"
                onClick={login}
                disabled={isLoggingIn}
                className="hidden sm:flex items-center gap-1.5 bg-shop-green hover:bg-shop-green-dark disabled:opacity-60 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
              >
                {isLoggingIn ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <LogIn className="w-3.5 h-3.5" />
                )}
                Login
              </button>
            )}

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
            {/* Mobile auth */}
            <div className="px-4 py-3 border-t border-border">
              {isAuthenticated ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-sm text-shop-green">
                    <User className="w-4 h-4" />
                    <span>{principalShort}</span>
                  </div>
                  <button
                    type="button"
                    data-ocid="auth.mobile_logout_button"
                    onClick={clear}
                    className="flex items-center gap-1.5 text-sm text-destructive font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  data-ocid="auth.mobile_login_button"
                  onClick={login}
                  disabled={isLoggingIn}
                  className="w-full flex items-center justify-center gap-2 bg-shop-green hover:bg-shop-green-dark disabled:opacity-60 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
                >
                  {isLoggingIn ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <LogIn className="w-4 h-4" />
                  )}
                  Login to Your Account
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
