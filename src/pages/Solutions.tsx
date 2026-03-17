import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Sparkles, ExternalLink, Fingerprint } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { solutions } from "@/data/solutions";

const flagshipSolution = solutions.find(s => s.isFlagship);
const regularSolutions = solutions.filter(s => !s.isFlagship);

const Solutions = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-navy to-primary-dark pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/stock/solutions-hero.jpg" alt="" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-navy/90 to-primary-dark/95" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 text-accent font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Our Solutions
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Comprehensive Cybersecurity Solutions
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              From operational technology to identity management, we provide
              end-to-end security solutions to protect your organization from
              evolving threats.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Flagship Solution Banner */}
      {/* {flagshipSolution && (
        <section className="py-12 bg-gradient-to-r from-accent/10 via-green/5 to-accent/10 border-b border-border">
          <div className="container mx-auto px-4">
            <motion.a
              href={flagshipSolution.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group flex flex-col md:flex-row items-start md:items-center gap-6 p-6 md:p-8 bg-card rounded-2xl border-2 border-accent/30 hover:border-accent hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/15 flex items-center justify-center flex-shrink-0">
                <Fingerprint className="h-8 w-8 text-accent" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded">Flagship Product</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">{flagshipSolution.shortTitle}</h3>
                <p className="text-muted-foreground">{flagshipSolution.description}</p>
              </div>
              <span className="inline-flex items-center gap-2 text-accent font-semibold whitespace-nowrap group-hover:gap-3 transition-all">
                Explore Platform
                <ExternalLink className="h-5 w-5" />
              </span>
            </motion.a>
          </div>
        </section>
      )} */}

      {/* Solutions Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {regularSolutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/solutions/${solution.slug}`}
                    className="group block bg-card rounded-2xl border border-border hover:border-green hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="grid md:grid-cols-3 gap-6 p-6 md:p-8">
                      {/* Left - Icon & Title */}
                      <div className="md:col-span-1">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                            <Icon className="h-7 w-7 text-accent" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-foreground group-hover:text-green transition-colors">
                              {solution.shortTitle}
                            </h3>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {solution.partners.slice(0, 2).map((partner, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground"
                                >
                                  {partner}
                                </span>
                              ))}
                              {solution.partners.length > 2 && (
                                <span className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">
                                  +{solution.partners.length - 2}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Middle - Description & Benefits */}
                      <div className="md:col-span-1">
                        <p className="text-muted-foreground text-sm mb-4">
                          {solution.description}
                        </p>
                        <ul className="space-y-2">
                          {solution.benefits.slice(0, 2).map((benefit, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-foreground"
                            >
                              <CheckCircle className="h-4 w-4 text-green flex-shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right - CTA */}
                      <div className="md:col-span-1 flex items-center justify-end">
                        <span className="inline-flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                          Learn More
                          <ArrowRight className="h-5 w-5" />
                        </span>
                      </div>
                    </div>

                    {/* Capabilities Bar */}
                    <div className="bg-muted/50 px-6 md:px-8 py-4 border-t border-border">
                      <div className="flex flex-wrap gap-2">
                        {solution.capabilities.slice(0, 4).map((cap, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-background rounded-full text-xs text-muted-foreground border border-border"
                          >
                            {cap}
                          </span>
                        ))}
                        {solution.capabilities.length > 4 && (
                          <span className="px-3 py-1 text-xs text-accent">
                            +{solution.capabilities.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Capabilities Overview */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Choose Our Solutions?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine industry-leading technologies with deep expertise to
              deliver security solutions that truly protect your organization.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { value: "25+", label: "Technology Partners", desc: "Best-in-class vendors" },
              { value: "8", label: "Industry Verticals", desc: "Specialized expertise" },
              { value: "24/7", label: "Security Operations", desc: "Round-the-clock monitoring" },
              { value: "15+", label: "Enterprise Clients", desc: "Trusted by leaders" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-white font-medium mb-1">{stat.label}</div>
                <p className="text-muted-foreground text-sm">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Not Sure Which Solution You Need?
            </h2>
            <p className="text-xl text-primary mb-8 max-w-2xl mx-auto">
              Our security experts can help assess your needs and recommend the
              right solutions for your organization.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-accent/90 text-accent-foreground"
              >
                <Link to="/contact">
                  Talk to our Team
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {/* <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link to="/resources">View Case Studies</Link>
              </Button> */}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Solutions;
