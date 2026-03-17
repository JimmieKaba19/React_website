import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Lock, Database } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/images/stock/gradient-technology-background.jpg" 
          alt="" 
          className="w-full h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/90 to-primary" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-8"
          >
            <Shield className="h-4 w-4 text-accent" />
            Enterprise Cybersecurity Solutions
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Securing Operations.
            <br />
            <span className="text-gradient">Protecting Identity.</span>
            <br />
            Governing Data.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto"
          >
            Comprehensive enterprise cybersecurity solutions that protect your critical assets, 
            secure your identity infrastructure, and ensure data governance across your organization.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-green hover:bg-white/10 text-accent-foreground px-8 py-6 text-lg shadow-glow"
            >
              <Link to="/contact">
                Request Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-green border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
            >
              <Link to="/solutions">Explore Solutions</Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */} 
          {/*commenting this code for later review)*/}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto"
          >
            <div className="flex flex-col items-center">
              <Shield className="h-8 w-8 text-accent mb-2" />
              <span className="text-white/60 text-sm text-center">OT Security</span>
            </div>
            <div className="flex flex-col items-center">
              <Lock className="h-8 w-8 text-accent mb-2" />
              <span className="text-white/60 text-sm text-center">Identity Protection</span>
            </div>
            <div className="flex flex-col items-center">
              <Database className="h-8 w-8 text-accent mb-2" />
              <span className="text-white/60 text-sm text-center">Data Governance</span>
            </div>
          </motion.div> */}
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
