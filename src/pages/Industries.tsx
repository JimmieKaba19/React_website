import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Building } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { industries } from "@/data/industries";
import { solutions } from "@/data/solutions";

const Industries = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-navy to-primary-dark pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/stock/industries-hero.jpg" alt="" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-navy/90 to-primary-dark/95" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 text-accent font-medium mb-4">
              <Building className="w-4 h-4" />
              Industries We Serve
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Industry-Specific Security Solutions
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Every industry faces unique cybersecurity challenges. We deliver
              tailored solutions that address your sector's specific threats,
              compliance requirements, and operational needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              const relevantSolutions = solutions.filter((s) =>
                industry.relevantSolutions.includes(s.id)
              );

              return (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/industries/${industry.slug}`}
                    className="group block bg-card rounded-2xl border border-border hover:border-green hover:shadow-xl transition-all duration-300 h-full"
                  >
                    <div className="p-6 md:p-8">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                          <Icon className="h-7 w-7 text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-semibold text-foreground group-hover:text-green transition-colors">
                            {industry.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                            {industry.description}
                          </p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-border">
                        {industry.stats.map((stat, i) => (
                          <div key={i} className="text-center">
                            <div className="text-lg font-bold text-accent">
                              {stat.value}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Challenges */}
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-foreground mb-3">
                          Key Challenges:
                        </h4>
                        <ul className="space-y-2">
                          {industry.challenges.slice(0, 3).map((challenge, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <CheckCircle className="h-4 w-4 text-green flex-shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Solutions & Regulations */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {relevantSolutions.slice(0, 2).map((solution) => (
                          <span
                            key={solution.id}
                            className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium"
                          >
                            {solution.shortTitle}
                          </span>
                        ))}
                        {industry.regulations.slice(0, 2).map((reg, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs"
                          >
                            {reg}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <span className="inline-flex items-center text-accent font-medium text-sm group-hover:gap-2 transition-all">
                        Learn More
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Industry Expertise Matters */}
      {/* <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                Why Industry Expertise Matters
              </h2>
              <p className="text-muted-foreground mb-6">
                Cybersecurity is not one-size-fits-all. Each industry has unique
                regulatory requirements, operational constraints, and threat
                landscapes that demand specialized knowledge.
              </p>
              <ul className="space-y-4">
                {[
                  "Deep understanding of industry-specific compliance requirements",
                  "Tailored threat intelligence for your sector",
                  "Experience with industry-standard systems and protocols",
                  "Best practices learned from similar organizations",
                  "Stakeholder-focused communication and reporting",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="h-6 w-6 text-green flex-shrink-0 mt-0.5" />
                    <span className="text-white">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden"
            >
              <img 
                src="/images/stock/data-dashboard.jpg" 
                alt="Security operations dashboard" 
                className="w-full h-64 object-cover rounded-2xl mb-6"
              />
              <div className="bg-primary rounded-2xl p-8 text-center text-white">
                Enterprise Clients
              </div>
              <p className="text-primary-foreground/70 mb-8">
                Across all major industries in Africa
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary-foreground/10 rounded-xl p-4">
                  <div className="text-2xl font-bold text-accent">99.9%</div>
                  <div className="text-sm text-primary-foreground/70">Uptime SLA</div>
                </div>
                <div className="bg-primary-foreground/10 rounded-xl p-4">
                  <div className="text-2xl font-bold text-accent">15+</div>
                  <div className="text-sm text-primary-foreground/70">Years Experience</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Ready to Secure Your Industry?
            </h2>
            <p className="text-xl text-primary mb-8 max-w-2xl mx-auto">
              Let's discuss your industry's unique challenges and how we can help
              protect your organization.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-accent/90 text-accent-foreground"
              >
                <Link to="/contact">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {/* <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link to="/solutions">Explore Solutions</Link>
              </Button> */}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Industries;
