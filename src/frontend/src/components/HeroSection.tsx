import { motion } from "motion/react";

interface HeroSectionProps {
  onShopNow: () => void;
}

export function HeroSection({ onShopNow }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative h-[480px] md:h-[560px] overflow-hidden"
    >
      <img
        src="/assets/generated/hero-vegetables-banner.dim_1400x600.jpg"
        alt="Fresh vegetables and fruits"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="bg-black/50 backdrop-blur-sm rounded-xl p-8 md:p-10 max-w-md"
          >
            <p className="text-shop-green-light text-sm font-semibold uppercase tracking-widest mb-2">
              100% Fresh & Organic
            </p>
            <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-4">
              Fresh Vegetables &amp; Fruits Delivered!
            </h1>
            <p className="text-white/80 text-sm md:text-base mb-6">
              Farm-fresh produce delivered to your doorstep. Order by the kg at
              the best prices.
            </p>
            <button
              type="button"
              data-ocid="hero.primary_button"
              onClick={onShopNow}
              className="bg-shop-orange hover:bg-shop-orange-hover text-white font-semibold px-7 py-3 rounded-lg transition-colors"
            >
              Shop Now
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
