import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  Video,
  BookOpen,
  Newspaper,
  Download,
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  ArrowRight,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getResourceBySlug, resources, Resource } from "@/data/resources";
import teamImage from "@/assets/team-collaboration.jpg";
import analystImage from "@/assets/security-analyst.jpg";
import consultationImage from "@/assets/consultation-meeting.jpg";

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

const getResourceImage = (index: number) => {
  const images = [teamImage, analystImage, consultationImage];
  return images[index % images.length];
};

const ResourceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const resource = getResourceBySlug(slug || "");

  if (!resource) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Resource Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The resource you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link to="/resources">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Resources
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const Icon = getCategoryIcon(resource.category);
  const resourceIndex = resources.findIndex((r) => r.id === resource.id);
  
  // Get related resources (same category, excluding current)
  const relatedResources = resources
    .filter((r) => r.category === resource.category && r.id !== resource.id)
    .slice(0, 3);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: resource.title,
        text: resource.description,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-navy to-primary-dark pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${getResourceImage(resourceIndex)})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(2px)",
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <Button
              variant="ghost"
              className="text-primary-foreground/80 hover:text-primary-foreground mb-6"
              onClick={() => navigate("/resources")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Resources
            </Button>

            <Badge className={`${getCategoryColor(resource.category)} mb-4`}>
              <Icon className="h-3 w-3 mr-1" />
              {resource.category.replace("-", " ")}
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              {resource.title}
            </h1>

            <p className="text-xl text-primary-foreground/80 leading-relaxed mb-8">
              {resource.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-primary-foreground/70">
              {resource.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>
                    {resource.author.name}, {resource.author.role}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(resource.date)}</span>
              </div>
              {resource.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{resource.readTime}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="bg-card rounded-2xl p-8 md:p-12 border border-border">
                <article className="prose prose-lg dark:prose-invert max-w-none">
                  {resource.content.split("\n").map((paragraph, index) => {
                    // Handle headers
                    if (paragraph.startsWith("## ")) {
                      return (
                        <h2
                          key={index}
                          className="text-2xl font-bold text-foreground mt-8 mb-4"
                        >
                          {paragraph.replace("## ", "")}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith("### ")) {
                      return (
                        <h3
                          key={index}
                          className="text-xl font-semibold text-foreground mt-6 mb-3"
                        >
                          {paragraph.replace("### ", "")}
                        </h3>
                      );
                    }
                    // Handle blockquotes
                    if (paragraph.startsWith("> ")) {
                      return (
                        <blockquote
                          key={index}
                          className="border-l-4 border-accent pl-4 italic text-muted-foreground my-4"
                        >
                          {paragraph.replace("> ", "")}
                        </blockquote>
                      );
                    }
                    // Handle list items
                    if (paragraph.startsWith("- ")) {
                      return (
                        <li key={index} className="text-muted-foreground ml-4">
                          {paragraph.replace("- ", "")}
                        </li>
                      );
                    }
                    if (paragraph.startsWith("1. ") || paragraph.match(/^\d+\. /)) {
                      return (
                        <li key={index} className="text-muted-foreground ml-4 list-decimal">
                          {paragraph.replace(/^\d+\. /, "")}
                        </li>
                      );
                    }
                    // Handle checkbox items
                    if (paragraph.startsWith("- [ ]")) {
                      return (
                        <div key={index} className="flex items-center gap-2 text-muted-foreground my-1">
                          <input type="checkbox" disabled className="h-4 w-4" />
                          <span>{paragraph.replace("- [ ] ", "")}</span>
                        </div>
                      );
                    }
                    // Handle bold text
                    if (paragraph.includes("**")) {
                      const parts = paragraph.split(/\*\*(.*?)\*\*/g);
                      return (
                        <p key={index} className="text-muted-foreground my-4">
                          {parts.map((part, i) =>
                            i % 2 === 1 ? (
                              <strong key={i} className="text-foreground font-semibold">
                                {part}
                              </strong>
                            ) : (
                              part
                            )
                          )}
                        </p>
                      );
                    }
                    // Handle table headers
                    if (paragraph.startsWith("|") && paragraph.includes("---")) {
                      return null; // Skip separator rows
                    }
                    if (paragraph.startsWith("|")) {
                      const cells = paragraph.split("|").filter((c) => c.trim());
                      return (
                        <div
                          key={index}
                          className="grid grid-cols-4 gap-2 py-2 border-b border-border text-sm"
                        >
                          {cells.map((cell, i) => (
                            <span
                              key={i}
                              className={i === 0 ? "font-semibold" : "text-muted-foreground"}
                            >
                              {cell.trim()}
                            </span>
                          ))}
                        </div>
                      );
                    }
                    // Regular paragraphs
                    if (paragraph.trim()) {
                      return (
                        <p key={index} className="text-muted-foreground my-4 leading-relaxed">
                          {paragraph}
                        </p>
                      );
                    }
                    return null;
                  })}
                </article>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-32 space-y-6">
                {/* Share Card */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-semibold text-foreground mb-4">
                    Share This Resource
                  </h3>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>

                {/* Tags */}
                {resource.tags && resource.tags.length > 0 && (
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="bg-primary rounded-xl p-6 text-primary-foreground">
                  <h3 className="font-semibold mb-2">Need Expert Help?</h3>
                  <p className="text-sm text-primary-foreground/80 mb-4">
                    Our security experts can help you implement these strategies.
                  </p>
                  <Button
                    asChild
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      {relatedResources.length > 0 && (
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Related Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedResources.map((related, index) => {
                const RelatedIcon = getCategoryIcon(related.category);
                return (
                  <Link
                    key={related.id}
                    to={`/resources/${related.slug}`}
                    className="group bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-3 rounded-lg ${getCategoryColor(
                          related.category
                        )}`}
                      >
                        <RelatedIcon className="h-5 w-5" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {related.category.replace("-", " ")}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {related.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Explore More Resources
            </h2>
            <p className="text-muted-foreground mb-8">
              Continue learning with our library of security insights,
              case studies, and expert guides.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Link to="/resources">
                  View All Resources
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Get Custom Guidance</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ResourceDetail;
