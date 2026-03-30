import { Mail, MapPin, Phone } from "lucide-react";

export function ShopFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-shop-green text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/assets/generated/shop-logo-transparent.dim_120x120.png"
                alt="Logo"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-bold text-base">THIRUPATHI</div>
                <div className="text-xs text-white/70">
                  VEGETABLES & FRUITS SHOP
                </div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Your trusted source for the freshest vegetables and fruits.
              Delivering farm-fresh produce daily.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-base mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                "Home",
                "Shop",
                "Seasonal Specials",
                "Fruits",
                "Vegetables",
                "About Us",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#home"
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div id="about">
            <h4 className="font-bold text-base mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/70">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-white/50" />
                <span>
                  123, Market Street, Thirupathi Nagar, Tamil Nadu - 600001
                </span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Phone className="w-4 h-4 shrink-0 text-white/50" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Mail className="w-4 h-4 shrink-0 text-white/50" />
                <span>thirupathi.veggies@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/60">
          <span>
            © {year} Thirupathi Vegetables & Fruits Shop. All rights reserved.
          </span>
          <span>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white underline"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
