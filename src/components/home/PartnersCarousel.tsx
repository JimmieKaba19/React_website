import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { partners } from "@/data/company";
import { ArrowRight } from "lucide-react";

const PartnersCarousel = () => {
  // Duplicate partners for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-16 bg-background border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-accent text-sm uppercase tracking-wider">
            Trusted Technology Partners
          </p>
          {/* removing the link to our partners */}
          {/* <Link 
            to="/partners" 
            className="text-sm text-red-500 hover:text-accent/80 transition-colors flex items-center gap-1 group"
          >
            View All Partners
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link> */}
        </motion.div>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div className="flex animate-marquee min-w-full w-max">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 mx-6 flex items-center justify-center"
            >
              <div className="h-16 w-40 bg-white rounded-lg border border-border hover:border-accent/70 hover:shadow-md transition-all flex items-center justify-center p-4">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-10 max-w-full object-contain filter hover:grayscale-0 transition-all duration-600"
                  onError={(e) => {
                    // Fallback to text if logo fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.nextElementSibling?.classList.remove("hidden");
                  }}
                />
                <span className="hidden text-sm font-semibold text-primary text-center">
                  {partner.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;
