/**
 * WordPress Headless CMS Type Definitions
 * Based on PRD-WordPress-Headless-CMS.md
 */

// ============================================
// Core WordPress Types
// ============================================

export interface WPMedia {
  id: number;
  url: string;
  alt: string;
  title: string;
  width: number;
  height: number;
  sizes: {
    thumbnail: string;
    medium: string;
    large: string;
    full: string;
  };
  mime_type: string;
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  parent: number;
}

export interface WPTag {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface WPSeoMeta {
  title: string;
  description: string;
  og_image?: WPMedia;
}

export interface WPAuthor {
  id: number;
  name: string;
  avatar: string;
  bio: string;
}

// ============================================
// Case Study
// ============================================

export interface WPCaseStudyResult {
  metric: string;
  value: string;
  description: string;
}

export interface WPCaseStudyTestimonial {
  quote: string;
  author: string;
  title: string;
  photo?: WPMedia;
}

export interface WPCaseStudyACF {
  client_name: string;
  client_logo?: WPMedia;
  industry: string[];
  challenge: string;
  solution: string;
  results: WPCaseStudyResult[];
  testimonial?: WPCaseStudyTestimonial;
  technologies: string[];
  project_duration: string;
  services_provided: string[];
}

export interface WPCaseStudy {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image?: WPMedia;
  gallery?: WPMedia[];
  acf: WPCaseStudyACF;
  categories: WPCategory[];
  tags: WPTag[];
  date: string;
  modified: string;
  seo: WPSeoMeta;
}

// ============================================
// Solution
// ============================================

export interface WPSolutionFeature {
  icon: string;
  title: string;
  description: string;
}

export interface WPSolutionBenefit {
  title: string;
  description: string;
}

export interface WPSolutionUseCase {
  industry: string;
  scenario: string;
  outcome: string;
}

export interface WPSolutionCTA {
  title: string;
  description: string;
  button_text: string;
  button_link: string;
}

export interface WPSolutionACF {
  tagline: string;
  overview: string;
  key_features: WPSolutionFeature[];
  benefits: WPSolutionBenefit[];
  use_cases: WPSolutionUseCase[];
  related_solutions: number[];
  cta: WPSolutionCTA;
  pricing_info?: string;
  implementation_time?: string;
}

export interface WPSolution {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image?: WPMedia;
  acf: WPSolutionACF;
  categories: WPCategory[];
  date: string;
  modified: string;
  seo: WPSeoMeta;
}

// ============================================
// Team Member
// ============================================

export interface WPTeamMemberACF {
  job_title: string;
  department: string;
  short_bio: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  twitter?: string;
  certifications: string[];
  expertise: string[];
  order: number;
  is_leadership: boolean;
}

export interface WPTeamMember {
  id: number;
  slug: string;
  title: string;
  content: string;
  featured_image?: WPMedia;
  acf: WPTeamMemberACF;
  date: string;
  modified: string;
}

// ============================================
// Partner
// ============================================

export type PartnershipLevel = 'platinum' | 'gold' | 'silver' | 'bronze';

export interface WPPartnerACF {
  website: string;
  partnership_level: PartnershipLevel;
  partnership_type: string;
  solutions_offered: string[];
  certifications: string[];
  contact_email?: string;
  order: number;
}

export interface WPPartner {
  id: number;
  slug: string;
  title: string;
  content: string;
  featured_image?: WPMedia;
  acf: WPPartnerACF;
  date: string;
  modified: string;
}

// ============================================
// Resource
// ============================================

export type ResourceType = 'whitepaper' | 'guide' | 'datasheet' | 'infographic' | 'video' | 'webinar';

export interface WPResourceFile {
  url: string;
  filename: string;
  filesize: number;
  mime_type: string;
}

export interface WPResourceACF {
  resource_type: ResourceType;
  file?: WPResourceFile;
  external_link?: string;
  requires_registration: boolean;
  estimated_read_time?: string;
  author?: string;
  publish_date?: string;
}

export interface WPResource {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image?: WPMedia;
  acf: WPResourceACF;
  categories: WPCategory[];
  tags: WPTag[];
  date: string;
  modified: string;
  seo: WPSeoMeta;
}

// ============================================
// Blog Post
// ============================================

export interface WPBlogPostACF {
  reading_time?: string;
  featured: boolean;
  related_solutions: number[];
}

export interface WPBlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image?: WPMedia;
  author: WPAuthor;
  categories: WPCategory[];
  tags: WPTag[];
  date: string;
  modified: string;
  acf: WPBlogPostACF;
  seo: WPSeoMeta;
}

// ============================================
// Page
// ============================================

export interface WPPage {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  featured_image?: WPMedia;
  parent: number;
  menu_order: number;
  date: string;
  modified: string;
  seo: WPSeoMeta;
}

// ============================================
// API Response Types
// ============================================

export interface WPPaginationMeta {
  total: number;
  pages: number;
  current_page: number;
  per_page: number;
}

export interface WPApiResponse<T> {
  data: T;
  meta: WPPaginationMeta;
}

export interface WPApiError {
  code: string;
  message: string;
  status: number;
}

// ============================================
// Query Parameter Types
// ============================================

export interface WPQueryParams {
  per_page?: number;
  page?: number;
  orderby?: 'date' | 'title' | 'modified' | 'menu_order';
  order?: 'asc' | 'desc';
  search?: string;
  category?: number;
  tag?: number;
  _embed?: boolean;
  _fields?: string;
  slug?: string;
}

export interface WPCaseStudyQueryParams extends WPQueryParams {
  industry?: number;
}

export interface WPTeamMemberQueryParams extends WPQueryParams {
  department?: string;
  is_leadership?: boolean;
}

export interface WPResourceQueryParams extends WPQueryParams {
  resource_type?: ResourceType;
}

export interface WPSearchParams {
  search: string;
  type?: 'post';
  subtype?: string[];
  per_page?: number;
  page?: number;
}
