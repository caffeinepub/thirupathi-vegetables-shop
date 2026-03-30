import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";

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
                <span>Mancherial IB 504302</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Phone className="w-4 h-4 shrink-0 text-white/50" />
                <a
                  href="tel:9705719988"
                  className="hover:text-white transition-colors"
                >
                  9705719988
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <svg
                  className="w-4 h-4 shrink-0 text-white/50"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  role="img"
                  aria-label="WhatsApp"
                >
                  <title>WhatsApp</title>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L0 24l6.341-1.506A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.946 0-3.772-.498-5.354-1.373l-.383-.227-3.967.942.999-3.876-.25-.399A9.937 9.937 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                <a
                  href="https://wa.me/919705719988"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: 9705719988
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Mail className="w-4 h-4 shrink-0 text-white/50" />
                <a
                  href="mailto:hariprasadchoppari5@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  hariprasadchoppari5@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Clock className="w-4 h-4 shrink-0 text-white/50" />
                <span>7:00 AM – 7:40 PM</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <ExternalLink className="w-4 h-4 shrink-0 text-white/50" />
                <a
                  href="https://maps.app.goo.gl/mWBXiRHFbjm9kqFA9?g_st=ic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors underline"
                >
                  Get Directions
                </a>
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
