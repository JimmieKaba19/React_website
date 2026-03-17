import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle, ArrowRight, Users, Shield, FileCheck, TrendingUp } from "lucide-react";
import { industries } from "@/data/industries";
import { solutions } from "@/data/solutions";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import NotFound from "./NotFound";

const IndustryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const industry = industries.find((i) => i.slug === slug);

  if (!industry) {
    return <NotFound />;
  }

  const Icon = industry.icon;
  const relevantSolutions = solutions.filter((s) =>
    industry.relevantSolutions.includes(s.id)
  );
  const otherIndustries = industries.filter((i) => i.id !== industry.id).slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-navy to-primary-dark pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/stock/solutions-hero.jpg" alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-navy/90 to-primary-dark/95" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-green transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Industries
          </Link>
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-16 h-16 rounded-xl bg-accent/20 flex items-center justify-center">
                <Icon className="h-8 w-8 text-accent" />
              </div>
              <span className="text-accent font-medium">Industry</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6"
            >
              {industry.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-primary-foreground/80 leading-relaxed"
            >
              {industry.longDescription}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            {industry.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-accent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges & Stakeholders Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
                <h2 className="text-3xl font-bold text-foreground">
                  Industry Challenges
                </h2>
              </div>
              <p className="text-muted-foreground mb-8">
                Organizations in {industry.title} face unique cybersecurity
                challenges that require specialized solutions:
              </p>
              <ul className="space-y-4">
                {industry.challenges.map((challenge, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3 bg-amber-500/5 rounded-lg p-4 border border-amber-500/10"
                  >
                    <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{challenge}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-muted rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="h-6 w-6 text-accent" />
                  <h3 className="text-xl font-semibold text-foreground">
                    Key Stakeholders
                  </h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  We work closely with key decision-makers in your organization:
                </p>
                <div className="flex flex-wrap gap-3">
                  {industry.stakeholders.map((stakeholder, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-background rounded-lg text-foreground font-medium border border-border"
                    >
                      {stakeholder}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-muted rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FileCheck className="h-6 w-6 text-accent" />
                  <h3 className="text-xl font-semibold text-foreground">
                    Regulatory Compliance
                  </h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  We help you meet industry-specific compliance requirements:
                </p>
                <div className="flex flex-wrap gap-2">
                  {industry.regulations.map((reg, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium"
                    >
                      {reg}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recommended Solutions Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Recommended Solutions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our tailored solutions address the specific security needs of{" "}
              {industry.title}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {relevantSolutions.map((solution, index) => {
              const SolutionIcon = solution.icon;
              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/solutions/${solution.slug}`}
                    className="group block bg-background rounded-xl p-6 border border-border hover:border-green hover:shadow-lg transition-all h-full"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                        <SolutionIcon className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-green transition-colors">
                          {solution.shortTitle}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                          {solution.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {solution.partners.slice(0, 2).map((partner, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-muted rounded text-xs text-muted-foreground"
                            >
                              {partner}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Study Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12 border border-border">
              <div className="flex items-center gap-2 text-accent mb-4">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider">
                  Success Story
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {industry.caseStudyPreview.title}
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                {industry.caseStudyPreview.result}
              </p>
              <Button asChild variant="outline">
                <Link to="/resources">
                  Read More Case Studies
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other Industries */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Other Industries We Serve
            </h2>
            <p className="text-muted-foreground">
              Explore our expertise across different sectors
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {otherIndustries.map((otherIndustry, index) => {
              const OtherIcon = otherIndustry.icon;
              return (
                <motion.div
                  key={otherIndustry.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/industries/${otherIndustry.slug}`}
                    className="group block bg-background rounded-xl p-6 border border-border hover:border-green hover:shadow-lg transition-all"
                  >
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                      <OtherIcon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-green transition-colors mb-2">
                      {otherIndustry.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {otherIndustry.description}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Secure Your {industry.title} Organization
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help protect your organization with
              industry-specific cybersecurity solutions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Link to="/contact">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link to="/industries">View All Industries</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default IndustryDetail;
