// import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { industries } from "@/data/industries";

const IndustriesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4"
          >
            Industries We Serve
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-primary mb-4"
          >
            Tailored Security for Your Industry
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            We understand that each industry faces unique cybersecurity challenges. 
            Our solutions are tailored to address the specific needs of your sector.
          </motion.p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.slice(0, 4).map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  // to={`/industries/${industry.slug}`}
                  className="group block h-full p-8 rounded-xl bg-card border border-border hover:border-accent/50 hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="h-8 w-8 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-accent transition-colors">
                    {industry.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {industry.description.slice(0, 80)}...
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Second Row - removing max-w-4xl for equal fit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 mx-auto"> 
          {industries.slice(4).map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index + 4) * 0.1 }}
              >
                <div
                  // to={`/industries/${industry.slug}`}
                  className="group block h-full p-8 rounded-xl bg-card border border-border hover:border-accent/50 hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="h-8 w-8 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-accent transition-colors">
                    {industry.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {industry.description.slice(0, 80)}...
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All CTA */}
        {/* removin the link to the industried section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/industries"
            className="inline-flex items-center text-primary hover:text-accent font-semibold transition-colors"
          >
            View All Industries
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div> */}
      </div>
    </section>
  );
};

export default IndustriesSection;
