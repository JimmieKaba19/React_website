import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Factory, Briefcase, BarChart3 } from "lucide-react";

const practices = [
  {
    id: "cyber",
    num: "Practice 01",
    icon: ShieldCheck,
    title: "Cybersecurity & Risk",
    tagline: "Protect. Detect. Respond.",
    description: "Enterprise network security, identity & access management, data governance, endpoint protection, and security services for IT environments.",
    audience: "CISO · IT Manager · Risk & Compliance",
    slug: "solutions",
    color: "accent"
  },
  {
    id: "ot",
    num: "Practice 02",
    icon: Factory,
    title: "OT Cybersecurity",
    tagline: "Secure Operations. Ensure Continuity.",
    description: "Purpose-built cybersecurity for industrial control systems, SCADA, and critical infrastructure, without disrupting operational processes.",
    audience: "COO · Plant Manager · OT Engineer",
    slug: "solutions",
    color: "blue-500" // You can map these to your Tailwind theme
  },
  {
    id: "biz",
    num: "Practice 03",
    icon: Briefcase,
    title: "Business Operations",
    tagline: "Connect People. Streamline Operations.",
    description: "Contact centre platforms, HR & payroll systems, ERP, CRM, and call recording, the operational backbone your organisation runs on.",
    audience: "CEO · HR Director · Operations · Finance",
    slug: "solutions",
    color: "green-500"
  },
  {
    id: "analytics",
    num: "Practice 04",
    icon: BarChart3,
    title: "Data & Analytics",
    tagline: "Turn Data into Decisions.",
    description: "Business intelligence, data integration, and analytics platforms that give leaders real visibility across operations, finance, and customer experience.",
    audience: "CEO · CFO · Data & Strategy Teams",
    slug: "solutions",
    color: "purple-500"
  }
];

const PracticesSection = () => {
  return (
    <section id="practices" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-accent font-semibold text-sm uppercase tracking-widest mb-4"
          >
            What We Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Four Practices. One Trusted Partner.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-3xl mx-auto text-lg"
          >
            Whether you need to harden your security posture, protect industrial operations, 
            streamline your business, or unlock your data, we have a dedicated practice built for it.
          </motion.p>
        </div>

        {/* Practices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {practices.map((practice, index) => {
            const Icon = practice.icon;
            return (
              <motion.div
                key={practice.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/${practice.slug}`}
                  className="group relative flex flex-col h-full p-8 rounded-2xl bg-card border border-border hover:border-accent/40 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Practice Number */}
                  <span className="text-xs font-bold tracking-widest text-muted-foreground/90 uppercase mb-6 group-hover:text-accent transition-colors">
                    {practice.num}
                  </span>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
                    <Icon className="h-7 w-7 text-primary group-hover:text-accent transition-all duration-300" />
                  </div>

                  {/* Text Content */}
                  <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
                    {practice.title}
                  </h3>
                  <p className="text-sm font-semibold text-accent/80 mb-4">
                    {practice.tagline}
                  </p>
                  <p className="text-sm text-muted-foreground mb-8 flex-grow leading-relaxed">
                    {practice.description}
                  </p>

                  {/* Footer Label */}
                  <div className="pt-6 border-t border-border mt-auto">
                    <p className="text-[10px] uppercase tracking-tighter text-muted-foreground font-bold">
                      Key Stakeholders
                    </p>
                    <p className="text-[11px] text-muted-foreground/80 mt-1">
                      {practice.audience}
                    </p>
                  </div>

                  {/* Decorative Arrow */}
                  <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-5 w-5 text-accent" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PracticesSection;