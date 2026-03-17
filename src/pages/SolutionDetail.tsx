import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, ArrowRight, Lightbulb, Target, Cog } from "lucide-react";
import { solutions } from "@/data/solutions";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import NotFound from "./NotFound";

const SolutionDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const solution = solutions.find((s) => s.slug === slug);

  // Redirect to external URL for flagship solutions
  if (solution?.externalUrl) {
    window.location.href = solution.externalUrl;
    return null;
  }

  if (!solution) {
    return <NotFound />;
  }

  const Icon = solution.icon;
  const otherSolutions = solutions.filter((s) => s.id !== solution.id && !s.isFlagship).slice(0, 3);

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
            Back to Solutions
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
              <span className="text-accent font-medium">Solution</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6"
            >
              {solution.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-primary-foreground/80 leading-relaxed"
            >
              {solution.longDescription}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Capabilities & Partners Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Key Capabilities
              </h2>
              <p className="text-muted-foreground mb-8">
                Our comprehensive {solution.shortTitle} solutions provide
                enterprise-grade protection with these core capabilities:
              </p>
              <ul className="space-y-4">
                {solution.capabilities.map((capability, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="h-6 w-6 text-green flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{capability}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-muted rounded-2xl p-8"
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Industries Served
              </h3>
              <div className="flex flex-wrap gap-2">
                {solution.industries.map((industry, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-7 h-7 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Business Benefits
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Implementing our {solution.shortTitle} solutions delivers measurable
              value to your organization
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {solution.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-background rounded-xl p-6 border border-border"
              >
                <CheckCircle className="w-8 h-8 text-green mb-4" />
                <p className="text-foreground font-medium">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      {/* <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Target className="w-7 h-7 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Real-World Success Stories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how organizations have transformed their security with our solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {solution.useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-primary/5 rounded-xl p-6 border border-primary/10"
              >
                <div className="text-4xl font-bold text-accent mb-4">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="text-foreground">{useCase}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Cog className="w-7 h-7 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-primary mb-4">
              Our Implementation Process
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A proven methodology for delivering successful security outcomes
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {solution.process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-background rounded-xl p-6 border border-border h-full">
                    <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold mb-4">
                      {index + 1}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                  {index < solution.process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Solutions */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Related Solutions
            </h2>
            <p className="text-muted-foreground">
              Explore other solutions that complement {solution.shortTitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {otherSolutions.map((relatedSolution, index) => {
              const RelatedIcon = relatedSolution.icon;
              return (
                <motion.div
                  key={relatedSolution.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/solutions/${relatedSolution.slug}`}
                    className="group block bg-card rounded-xl p-6 border border-border hover:border-green hover:shadow-lg transition-all"
                  >
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                      <RelatedIcon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-green transition-colors mb-2">
                      {relatedSolution.shortTitle}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedSolution.description}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
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
            <h2 className="text-3xl md:text-4xl font-bold text-primary-primary mb-6">
              Ready to Secure Your {solution.shortTitle}?
            </h2>
            <p className="text-xl text-primary mb-8 max-w-2xl mx-auto">
              Let's discuss how our {solution.shortTitle} solutions can protect your
              organization.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-accent/90 text-accent-foreground"
              >
                <Link to="/contact">
                  Talk to our team
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {/* <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link to="/solutions">View All Solutions</Link>
              </Button> */}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default SolutionDetail;
