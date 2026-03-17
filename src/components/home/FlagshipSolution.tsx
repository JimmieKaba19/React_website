import { motion } from "framer-motion";
import { ArrowRight, Fingerprint, Shield, Lock, BarChart3, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Shield, label: "Enterprise Security", desc: "MFA & threat detection" },
  { icon: Lock, label: "Access Control", desc: "OAuth, SAML SSO & RDP" },
  { icon: Clock, label: "Time & Attendance", desc: "Geo-fenced & NFC tracking" },
  { icon: BarChart3, label: "Analytics", desc: "Audit trails & reporting" },
];

const FlagshipSolution = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/stock/digital-identity.jpg"
          alt="Products Background" 
          className="w-full h-full object-cover opacity-60" 
        />
        {/* Dark Overlay to ensure text pops */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-navy/85 to-primary-dark/95" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-green rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Fingerprint className="w-4 h-4" />
              Flagship Product
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
              Tandem IGA
            </h2>
            <p className="text-lg text-accent font-medium mb-4">
              IdentityGuard: Enterprise Identity Governance & Administration
            </p>
            <p className="text-primary-foreground/75 text-lg leading-relaxed mb-8 max-w-lg">
              Our proprietary platform for centralized identity management, access control, 
              and compliance. Built by Tandem for modern enterprises.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-green-700 hover:bg-accent/90 text-accent-foreground font-semibold"
              >
                <a href="https://igs.tandem.co.ke/" target="_blank" rel="noopener noreferrer">
                  Explore Tandem IGA
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className=" bg-green-700 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href="/contact">
                  Request a Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right - Feature cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-5 hover:bg-white/15 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center mb-3">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="font-semibold text-primary-foreground text-sm mb-1">
                      {feature.label}
                    </h3>
                    <p className="text-primary-foreground/60 text-xs">
                      {feature.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FlagshipSolution;
