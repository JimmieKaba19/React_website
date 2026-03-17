import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  Video,
  BookOpen,
  Newspaper,
  Download,
  ArrowRight,
  Calendar,
  Clock,
  Search,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { resources, resourceCategories, Resource } from "@/data/resources";
import teamImage from "@/assets/team-collaboration.jpg";
import analystImage from "@/assets/security-analyst.jpg";

const getCategoryIcon = (category: Resource["category"]) => {
  switch (category) {
    case "whitepaper":
      return FileText;
    case "case-study":
      return BookOpen;
    case "webinar":
      return Video;
    case "blog":
      return Newspaper;
    case "guide":
      return Download;
  }
};

const getCategoryColor = (category: Resource["category"]) => {
  switch (category) {
    case "whitepaper":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    case "case-study":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    case "webinar":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
    case "blog":
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
    case "guide":
      return "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400";
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      activeCategory === "all" || resource.category === activeCategory;
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredResources = resources.filter((r) => r.featured);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-navy to-primary-dark pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${analystImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(2px)",
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="text-accent font-medium mb-4 block">
              Resources
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Security Insights & Knowledge
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Explore our library of whitepapers, case studies, webinars, and
              guides to stay ahead of evolving cybersecurity threats.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Featured Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredResources.map((resource, index) => {
              const Icon = getCategoryIcon(resource.category);
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/resources/${resource.slug}`}
                    className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 block"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={index === 0 ? teamImage : analystImage}
                        alt={resource.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge
                        className={`absolute top-4 left-4 ${getCategoryColor(
                          resource.category
                        )}`}
                      >
                        <Icon className="h-3 w-3 mr-1" />
                        {resource.category.replace("-", " ")}
                      </Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {resource.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(resource.date)}
                          </span>
                          {resource.readTime && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {resource.readTime}
                            </span>
                          )}
                        </div>
                        <span className="text-accent flex items-center text-sm font-medium">
                          Read More
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Resources */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {resourceCategories.map((category) => (
                <Button
                  key={category.value}
                  variant={
                    activeCategory === category.value ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setActiveCategory(category.value)}
                  className={
                    activeCategory === category.value
                      ? "bg-accent text-accent-foreground hover:bg-accent/90"
                      : ""
                  }
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Resource Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => {
              const Icon = getCategoryIcon(resource.category);
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/resources/${resource.slug}`}
                    className="group bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300 block h-full"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-3 rounded-lg ${getCategoryColor(
                          resource.category
                        )}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {resource.category.replace("-", " ")}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {resource.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(resource.date)}
                      </div>
                      {resource.readTime && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {resource.readTime}
                        </span>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No resources found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Stay Informed
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Subscribe to our newsletter for the latest cybersecurity insights,
              threat intelligence, and industry updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                type="email"
                className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Need Tailored Security Guidance?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our security experts are ready to discuss your specific challenges
              and provide customized recommendations for your organization.
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
              <Button asChild size="lg" variant="outline">
                <Link to="/solutions">Explore Our Solutions</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Resources;
