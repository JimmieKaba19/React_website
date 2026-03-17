import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowLeft,
  User,
  Tag,
  Share2,
  Linkedin,
  Twitter,
  Facebook,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPost, useBlogPosts } from "@/hooks/useWordPress";
import type { WPBlogPost } from "@/types/wordpress";

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

const RelatedPostCard = ({ post }: { post: WPBlogPost }) => {
  const excerpt = stripHtml(post.excerpt || "").slice(0, 100);
  
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-md transition-all duration-300 block"
    >
      {post.featured_image?.url ? (
        <div className="aspect-video relative overflow-hidden">
          <img
            src={post.featured_image.url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="aspect-video bg-muted flex items-center justify-center">
          <Tag className="h-8 w-8 text-muted-foreground/30" />
        </div>
      )}
      <div className="p-4">
        <h4 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
          {post.title}
        </h4>
        <p className="text-sm text-muted-foreground line-clamp-2">{excerpt}...</p>
        <p className="text-xs text-muted-foreground mt-2">{formatDate(post.date)}</p>
      </div>
    </Link>
  );
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: postResponse, isLoading, error } = useBlogPost(slug || "");
  const post = postResponse?.data;

  // Fetch related posts (latest 3)
  const { data: relatedResponse } = useBlogPosts({
    per_page: 4,
    orderby: "date",
    order: "desc",
  });

  const relatedPosts = (relatedResponse?.data || [])
    .filter((p: WPBlogPost) => p.slug !== slug)
    .slice(0, 3);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = post?.title || "Blog Post";

  const handleShare = (platform: string) => {
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    };
    window.open(urls[platform], "_blank", "width=600,height=400");
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <Skeleton className="h-8 w-32 mb-8" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="aspect-video w-full mb-8" />
            <div className="max-w-3xl mx-auto space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-navy to-primary-dark pt-32 pb-20">
        <div className="container mx-auto px-4">
          <Link
            to="/blog"
            className="inline-flex items-center text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
          
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((cat) => (
                <Badge
                  key={cat.id}
                  className="bg-accent/20 text-accent border-accent/30"
                >
                  {cat.name}
                </Badge>
              ))}
            </div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 max-w-4xl"
          >
            {post.title}
          </motion.h1>

          <div className="flex flex-wrap items-center gap-4 text-primary-foreground/80">
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.avatar ? (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <User className="h-5 w-5 text-accent" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-primary-foreground">{post.author.name}</p>
                  {post.author.bio && (
                    <p className="text-sm text-primary-foreground/60 line-clamp-1">{post.author.bio}</p>
                  )}
                </div>
              </div>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </span>
            {post.acf?.reading_time && (
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.acf.reading_time}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image?.url && (
        <div className="container mx-auto px-4 -mt-8 relative z-10">
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            src={post.featured_image.url}
            alt={post.featured_image.alt || post.title}
            className="w-full max-w-4xl mx-auto rounded-xl shadow-xl aspect-video object-cover"
          />
        </div>
      )}

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Share buttons */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share this article:
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare("twitter")}
                  className="hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare("linkedin")}
                  className="hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5]"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare("facebook")}
                  className="hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Article content */}
            <article
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:text-foreground prose-headings:font-bold
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground
                prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                prose-blockquote:border-accent prose-blockquote:text-muted-foreground
                prose-img:rounded-lg prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  {post.tags.map((tag) => (
                    <Badge key={tag.id} variant="outline">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relPost: WPBlogPost) => (
                <RelatedPostCard key={relPost.id} post={relPost} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild variant="outline">
                <Link to="/blog">View All Articles</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default BlogPost;
