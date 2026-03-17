import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
  User,
  ChevronLeft,
  ChevronRight,
  Tag,
  Loader2,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPosts, useCategories } from "@/hooks/useWordPress";
import type { WPBlogPost, WPCategory } from "@/types/wordpress";
import analystImage from "@/assets/security-analyst.jpg";

const POSTS_PER_PAGE = 9;

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const stripHtml = (html: string) => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const BlogPostCard = ({ post, index }: { post: WPBlogPost; index: number }) => {
  const excerpt = stripHtml(post.excerpt || "").slice(0, 150);
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 block h-full"
      >
        {post.featured_image?.url ? (
          <div className="aspect-video relative overflow-hidden">
            <img
              src={post.featured_image.url}
              alt={post.featured_image.alt || post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        ) : (
          <div className="aspect-video bg-muted flex items-center justify-center">
            <Tag className="h-12 w-12 text-muted-foreground/30" />
          </div>
        )}
        <div className="p-6">
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.categories.slice(0, 2).map((cat) => (
                <Badge
                  key={cat.id}
                  variant="secondary"
                  className="text-xs"
                >
                  {cat.name}
                </Badge>
              ))}
            </div>
          )}
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {excerpt}...
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {post.author && (
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {post.author.name}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(post.date)}
              </span>
            </div>
            {post.acf?.reading_time && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.acf.reading_time}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

const PostSkeleton = () => (
  <div className="bg-card rounded-xl border border-border overflow-hidden">
    <Skeleton className="aspect-video w-full" />
    <div className="p-6">
      <Skeleton className="h-4 w-20 mb-3" />
      <Skeleton className="h-6 w-full mb-2" />
      <Skeleton className="h-6 w-3/4 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <div className="pt-4 border-t border-border flex justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  </div>
);

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setTimeout(() => {
      setDebouncedSearch(value);
      setCurrentPage(1);
    }, 300);
  };

  // Fetch posts with filters
  const { data: postsResponse, isLoading: postsLoading, error: postsError } = useBlogPosts({
    page: currentPage,
    per_page: POSTS_PER_PAGE,
    category: activeCategory || undefined,
    search: debouncedSearch || undefined,
    orderby: "date",
    order: "desc",
  });

  // Fetch categories
  const { data: categoriesResponse, isLoading: categoriesLoading } = useCategories();

  const posts = postsResponse?.data || [];
  const totalPages = postsResponse?.meta?.pages || 1;
  const totalPosts = postsResponse?.meta?.total || 0;
  const categories = categoriesResponse?.data || [];

  const handleCategoryChange = (categoryId: number | null) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
            <span className="text-accent font-medium mb-4 block">Blog</span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Cybersecurity Insights & Updates
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Stay informed with the latest cybersecurity trends, threat intelligence, 
              and expert analysis from our security professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(null)}
                className={
                  activeCategory === null
                    ? "bg-accent text-accent-foreground hover:bg-accent/90"
                    : ""
                }
              >
                All Posts
              </Button>
              {categoriesLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                categories
                  .filter((cat: WPCategory) => cat.count > 0)
                  .slice(0, 6)
                  .map((category: WPCategory) => (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleCategoryChange(category.id)}
                      className={
                        activeCategory === category.id
                          ? "bg-accent text-accent-foreground hover:bg-accent/90"
                          : ""
                      }
                    >
                      {category.name}
                      <span className="ml-1 text-xs opacity-70">({category.count})</span>
                    </Button>
                  ))
              )}
            </div>
          </div>

          {/* Results count */}
          {!postsLoading && (
            <p className="text-sm text-muted-foreground mb-6">
              {totalPosts > 0 
                ? `Showing ${(currentPage - 1) * POSTS_PER_PAGE + 1}-${Math.min(currentPage * POSTS_PER_PAGE, totalPosts)} of ${totalPosts} articles`
                : "No articles found"}
            </p>
          )}

          {/* Error State */}
          {postsError && (
            <div className="text-center py-12 bg-destructive/10 rounded-lg">
              <p className="text-destructive font-medium mb-2">Failed to load blog posts</p>
              <p className="text-sm text-muted-foreground">
                Please check your WordPress connection and try again.
              </p>
            </div>
          )}

          {/* Loading State */}
          {postsLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <PostSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Posts Grid */}
          {!postsLoading && !postsError && posts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: WPBlogPost, index: number) => (
                <BlogPostCard key={post.id} post={post} index={index} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!postsLoading && !postsError && posts.length === 0 && (
            <div className="text-center py-12">
              <Tag className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">No articles found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or category filters.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setActiveCategory(null);
                  setSearchQuery("");
                  setDebouncedSearch("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                  let pageNum: number;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                      className={
                        currentPage === pageNum
                          ? "bg-accent text-accent-foreground"
                          : ""
                      }
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Never Miss an Update
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
              Ready to Strengthen Your Security?
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

export default Blog;
