# Product Requirements Document (PRD)
# WordPress Headless CMS Integration

![Tandem Technologies](../public/images/tandem-logo.png)

**Document Version:** 1.0  
**Last Updated:** January 12, 2026  
**Author:** Tandem Technologies Limited  
**Status:** Draft

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Project Overview](#2-project-overview)
3. [Goals & Objectives](#3-goals--objectives)
4. [User Stories & Personas](#4-user-stories--personas)
5. [Functional Requirements](#5-functional-requirements)
6. [Technical Architecture](#6-technical-architecture)
7. [Content Types & Data Models](#7-content-types--data-models)
8. [API Specifications](#8-api-specifications)
9. [Security Requirements](#9-security-requirements)
10. [Performance Requirements](#10-performance-requirements)
11. [Integration Points](#11-integration-points)
12. [Migration Strategy](#12-migration-strategy)
13. [Success Metrics](#13-success-metrics)
14. [Timeline & Milestones](#14-timeline--milestones)
15. [Risks & Mitigations](#15-risks--mitigations)
16. [Appendix](#16-appendix)

---

## 1. Executive Summary

### 1.1 Purpose

This PRD outlines the requirements for implementing a headless WordPress CMS to power dynamic content for the Tandem Technologies Limited website. The integration will enable non-technical staff to manage website content through WordPress's familiar admin interface while the React frontend consumes content via the WordPress REST API.

### 1.2 Scope

The headless CMS will manage:
- Case Studies & Success Stories
- Solution Pages (detailed content)
- Team & Company Information
- Blog/News Articles
- Partner Information
- Industry-specific Content
- Resources (Whitepapers, Guides, Documentation)

### 1.3 Out of Scope

- E-commerce functionality
- User authentication for website visitors
- Real-time collaborative editing
- Multi-language support (Phase 1)

---

## 2. Project Overview

### 2.1 Background

Tandem Technologies Limited requires a content management solution that:
- Empowers marketing and content teams to publish without developer intervention
- Maintains the high-performance React frontend
- Provides enterprise-grade security
- Scales with business growth

### 2.2 Solution Approach

**Headless WordPress Architecture:**
- WordPress serves as the content repository and admin interface
- React frontend fetches content via REST API
- Edge functions proxy API requests for security
- Content is cached for optimal performance

### 2.3 Key Stakeholders

| Stakeholder | Role | Responsibilities |
|-------------|------|------------------|
| Marketing Team | Content Creators | Create, edit, and publish content |
| IT Department | Technical Oversight | WordPress hosting, security, backups |
| Development Team | Implementation | API integration, frontend updates |
| Management | Approval | Content strategy, brand compliance |

---

## 3. Goals & Objectives

### 3.1 Business Goals

1. **Reduce Content Publishing Time** - From days to hours
2. **Empower Non-Technical Users** - Enable self-service content management
3. **Improve SEO Performance** - Dynamic, frequently updated content
4. **Maintain Brand Consistency** - Centralized content governance
5. **Scale Content Operations** - Support growth without proportional dev effort

### 3.2 Technical Objectives

1. **API Response Time** - < 200ms average
2. **Content Freshness** - < 5 minute cache invalidation
3. **Uptime** - 99.9% availability
4. **Security** - Zero exposed credentials, authenticated API access
5. **Developer Experience** - Type-safe API consumption

### 3.3 Success Criteria

- [ ] Marketing team can publish content without developer assistance
- [ ] Page load times remain under 2 seconds
- [ ] All content types are fully manageable via WordPress
- [ ] SEO scores maintain or improve current levels
- [ ] Zero security incidents related to CMS integration

---

## 4. User Stories & Personas

### 4.1 Personas

#### Persona 1: Content Manager (Sarah)
- **Role:** Marketing Manager at Tandem Technologies
- **Technical Skill:** Intermediate (familiar with WordPress)
- **Goals:** Publish case studies, update solution pages, manage blog
- **Pain Points:** Currently requires developer for all content changes

#### Persona 2: Executive (James)
- **Role:** Managing Director
- **Technical Skill:** Basic
- **Goals:** Review and approve content before publication
- **Pain Points:** Slow approval workflows

#### Persona 3: Developer (Alex)
- **Role:** Frontend Developer
- **Technical Skill:** Expert
- **Goals:** Integrate content seamlessly, maintain performance
- **Pain Points:** Manual content updates, hardcoded content

### 4.2 User Stories

#### Content Management

| ID | As a... | I want to... | So that... | Priority |
|----|---------|--------------|------------|----------|
| US-01 | Content Manager | Create and edit case studies | I can showcase client success stories | High |
| US-02 | Content Manager | Upload and manage images | I can enrich content with visuals | High |
| US-03 | Content Manager | Preview content before publishing | I can ensure quality | High |
| US-04 | Content Manager | Schedule content publication | I can plan campaigns | Medium |
| US-05 | Content Manager | Manage team member profiles | I can keep the About page current | Medium |
| US-06 | Content Manager | Categorize and tag content | Users can find relevant content | Medium |
| US-07 | Executive | Approve content before publication | Brand standards are maintained | Medium |
| US-08 | Content Manager | Duplicate existing content | I can quickly create similar pages | Low |

#### Technical

| ID | As a... | I want to... | So that... | Priority |
|----|---------|--------------|------------|----------|
| US-09 | Developer | Fetch content via typed API | I can build reliable features | High |
| US-10 | Developer | Cache API responses | Performance is optimized | High |
| US-11 | Developer | Receive webhook notifications | Content updates are reflected quickly | Medium |
| US-12 | Developer | Access content in draft mode | I can preview unpublished content | Medium |

---

## 5. Functional Requirements

### 5.1 WordPress Backend Requirements

#### 5.1.1 Custom Post Types

| Post Type | Slug | Description | Fields |
|-----------|------|-------------|--------|
| Case Study | `case-study` | Client success stories | Title, Client, Industry, Challenge, Solution, Results, Testimonial, Featured Image, Gallery |
| Solution | `solution` | Detailed solution pages | Title, Overview, Features, Benefits, Use Cases, Related Solutions, CTA |
| Team Member | `team-member` | Staff profiles | Name, Title, Bio, Photo, LinkedIn, Email, Department |
| Partner | `partner` | Technology partners | Name, Logo, Description, Website, Partnership Level |
| Resource | `resource` | Downloadable content | Title, Type, Description, File, Thumbnail, Category |

#### 5.1.2 Custom Taxonomies

| Taxonomy | Associated Post Types | Purpose |
|----------|----------------------|---------|
| Industry | Case Study, Solution, Resource | Categorize by industry vertical |
| Service Category | Solution, Resource | Group by service offering |
| Resource Type | Resource | Whitepaper, Guide, Datasheet, etc. |
| Department | Team Member | Organize staff by department |

#### 5.1.3 Required Plugins

| Plugin | Purpose | Required |
|--------|---------|----------|
| Advanced Custom Fields (ACF) Pro | Custom fields management | Yes |
| ACF to REST API | Expose ACF fields in REST API | Yes |
| Application Passwords | Secure API authentication | Yes |
| Yoast SEO | SEO management | Recommended |
| WP REST Cache | API response caching | Recommended |
| Redirection | URL management | Recommended |

### 5.2 Frontend Requirements

#### 5.2.1 Content Display

| Feature | Description | Priority |
|---------|-------------|----------|
| Dynamic Solution Pages | Fetch and render solution content from WP | High |
| Case Study Listings | Grid/list view with filtering | High |
| Case Study Detail Pages | Full case study with gallery | High |
| Team Directory | Staff listing with filters | Medium |
| Blog/News Section | Article listings with pagination | Medium |
| Resource Library | Searchable, filterable resources | Medium |
| Partner Showcase | Partner logos and information | Low |

#### 5.2.2 Content Features

| Feature | Description | Priority |
|---------|-------------|----------|
| Search | Full-text search across content | High |
| Filtering | Filter by industry, category, type | High |
| Pagination | Paginated content listings | High |
| Related Content | Show related items | Medium |
| Social Sharing | Share buttons on content | Medium |
| Print-Friendly | Printable case studies | Low |

### 5.3 Administrative Requirements

| Requirement | Description | Priority |
|-------------|-------------|----------|
| User Roles | Editor, Author, Contributor roles | High |
| Revision History | Track content changes | High |
| Media Library | Organized image/file management | High |
| Content Workflow | Draft → Review → Publish | Medium |
| Activity Logging | Audit trail of changes | Medium |
| Bulk Operations | Bulk edit/delete content | Low |

---

## 6. Technical Architecture

### 6.1 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           TANDEM WEBSITE ARCHITECTURE                     │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐     ┌─────────────────┐     ┌─────────────────────────┐
│                 │     │                 │     │                         │
│   WordPress     │────▶│  Edge Function  │────▶│   React Frontend        │
│   (Headless)    │     │  (API Proxy)    │     │   (Lovable)             │
│                 │     │                 │     │                         │
└────────┬────────┘     └─────────────────┘     └────────────┬────────────┘
         │                       │                           │
         │                       │                           │
         ▼                       ▼                           ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────────────┐
│                 │     │                 │     │                         │
│   MySQL         │     │   Secrets       │     │   Browser               │
│   Database      │     │   (Credentials) │     │   (End User)            │
│                 │     │                 │     │                         │
└─────────────────┘     └─────────────────┘     └─────────────────────────┘
```

### 6.2 Data Flow

```
1. Content Creation Flow:
   Editor → WordPress Admin → MySQL → REST API → Edge Function → React → User

2. Content Consumption Flow:
   User Request → React App → Edge Function → WordPress REST API → Response → Render

3. Cache Invalidation Flow:
   WordPress Publish → Webhook → Edge Function → Clear Cache → Fresh Content
```

### 6.3 Component Architecture

#### 6.3.1 Edge Function (API Proxy)

```typescript
// supabase/functions/wordpress-proxy/index.ts

Purpose: Securely proxy requests to WordPress REST API
Features:
  - Credential injection (never exposed to client)
  - Response caching
  - Rate limiting
  - Error handling
  - Request validation
```

#### 6.3.2 React Hooks

```typescript
// src/hooks/useWordPress.ts

Hooks Provided:
  - useCaseStudies()     - Fetch case study listings
  - useCaseStudy(slug)   - Fetch single case study
  - useSolutions()       - Fetch solution listings
  - useSolution(slug)    - Fetch single solution
  - useTeamMembers()     - Fetch team directory
  - useResources()       - Fetch resource library
  - usePartners()        - Fetch partner information
  - useBlogPosts()       - Fetch blog articles
  - useSearch(query)     - Search across content
```

#### 6.3.3 Type Definitions

```typescript
// src/types/wordpress.ts

Types Defined:
  - WPCaseStudy
  - WPSolution
  - WPTeamMember
  - WPPartner
  - WPResource
  - WPBlogPost
  - WPMedia
  - WPCategory
  - WPTag
```

### 6.4 Caching Strategy

| Layer | Cache Duration | Invalidation |
|-------|---------------|--------------|
| CDN | 1 hour | On publish webhook |
| Edge Function | 5 minutes | TTL expiry |
| React Query | 5 minutes | Stale-while-revalidate |
| Browser | Session | Navigation |

---

## 7. Content Types & Data Models

### 7.1 Case Study

```typescript
interface WPCaseStudy {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: WPMedia;
  gallery: WPMedia[];
  acf: {
    client_name: string;
    client_logo: WPMedia;
    industry: string[];
    challenge: string;
    solution: string;
    results: {
      metric: string;
      value: string;
      description: string;
    }[];
    testimonial: {
      quote: string;
      author: string;
      title: string;
      photo: WPMedia;
    };
    technologies: string[];
    project_duration: string;
    services_provided: string[];
  };
  categories: WPCategory[];
  tags: WPTag[];
  date: string;
  modified: string;
  seo: {
    title: string;
    description: string;
    og_image: WPMedia;
  };
}
```

### 7.2 Solution

```typescript
interface WPSolution {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: WPMedia;
  acf: {
    tagline: string;
    overview: string;
    key_features: {
      icon: string;
      title: string;
      description: string;
    }[];
    benefits: {
      title: string;
      description: string;
    }[];
    use_cases: {
      industry: string;
      scenario: string;
      outcome: string;
    }[];
    related_solutions: number[]; // IDs of related solutions
    cta: {
      title: string;
      description: string;
      button_text: string;
      button_link: string;
    };
    pricing_info: string;
    implementation_time: string;
  };
  categories: WPCategory[];
  date: string;
  modified: string;
  seo: {
    title: string;
    description: string;
    og_image: WPMedia;
  };
}
```

### 7.3 Team Member

```typescript
interface WPTeamMember {
  id: number;
  slug: string;
  title: string; // Full name
  content: string; // Extended bio
  featured_image: WPMedia; // Profile photo
  acf: {
    job_title: string;
    department: string;
    short_bio: string;
    email: string;
    phone: string;
    linkedin: string;
    twitter: string;
    certifications: string[];
    expertise: string[];
    order: number; // Display order
    is_leadership: boolean;
  };
  date: string;
  modified: string;
}
```

### 7.4 Partner

```typescript
interface WPPartner {
  id: number;
  slug: string;
  title: string; // Partner name
  content: string; // Partnership description
  featured_image: WPMedia; // Partner logo
  acf: {
    website: string;
    partnership_level: 'platinum' | 'gold' | 'silver' | 'bronze';
    partnership_type: string;
    solutions_offered: string[];
    certifications: string[];
    contact_email: string;
    order: number;
  };
  date: string;
  modified: string;
}
```

### 7.5 Resource

```typescript
interface WPResource {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: WPMedia;
  acf: {
    resource_type: 'whitepaper' | 'guide' | 'datasheet' | 'infographic' | 'video' | 'webinar';
    file: {
      url: string;
      filename: string;
      filesize: number;
      mime_type: string;
    };
    external_link: string;
    requires_registration: boolean;
    estimated_read_time: string;
    author: string;
    publish_date: string;
  };
  categories: WPCategory[];
  tags: WPTag[];
  date: string;
  modified: string;
  seo: {
    title: string;
    description: string;
  };
}
```

### 7.6 Blog Post

```typescript
interface WPBlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: WPMedia;
  author: {
    id: number;
    name: string;
    avatar: string;
    bio: string;
  };
  categories: WPCategory[];
  tags: WPTag[];
  date: string;
  modified: string;
  acf: {
    reading_time: string;
    featured: boolean;
    related_solutions: number[];
  };
  seo: {
    title: string;
    description: string;
    og_image: WPMedia;
  };
}
```

---

## 8. API Specifications

### 8.1 Endpoints

#### 8.1.1 Case Studies

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/wp-json/wp/v2/case-study` | List all case studies |
| GET | `/wp-json/wp/v2/case-study/{id}` | Get case study by ID |
| GET | `/wp-json/wp/v2/case-study?slug={slug}` | Get case study by slug |
| GET | `/wp-json/wp/v2/case-study?industry={id}` | Filter by industry |

#### 8.1.2 Solutions

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/wp-json/wp/v2/solution` | List all solutions |
| GET | `/wp-json/wp/v2/solution/{id}` | Get solution by ID |
| GET | `/wp-json/wp/v2/solution?slug={slug}` | Get solution by slug |
| GET | `/wp-json/wp/v2/solution?category={id}` | Filter by category |

#### 8.1.3 Team Members

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/wp-json/wp/v2/team-member` | List all team members |
| GET | `/wp-json/wp/v2/team-member?department={slug}` | Filter by department |
| GET | `/wp-json/wp/v2/team-member?meta_key=is_leadership&meta_value=1` | Leadership only |

#### 8.1.4 Resources

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/wp-json/wp/v2/resource` | List all resources |
| GET | `/wp-json/wp/v2/resource?resource_type={type}` | Filter by type |
| GET | `/wp-json/wp/v2/resource?category={id}` | Filter by category |

#### 8.1.5 Search

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/wp-json/wp/v2/search?search={query}&type=post&subtype=case-study,solution,resource` | Search content |

### 8.2 Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `per_page` | integer | Results per page (max 100) | `?per_page=10` |
| `page` | integer | Page number | `?page=2` |
| `orderby` | string | Sort field | `?orderby=date` |
| `order` | string | Sort direction | `?order=desc` |
| `search` | string | Search term | `?search=security` |
| `_embed` | boolean | Include embedded data | `?_embed=true` |
| `_fields` | string | Limit returned fields | `?_fields=id,title,slug` |

### 8.3 Response Format

```json
{
  "data": [...],
  "meta": {
    "total": 50,
    "pages": 5,
    "current_page": 1,
    "per_page": 10
  }
}
```

### 8.4 Error Responses

| Status | Code | Description |
|--------|------|-------------|
| 400 | `invalid_param` | Invalid query parameter |
| 401 | `unauthorized` | Missing/invalid authentication |
| 404 | `not_found` | Resource not found |
| 429 | `rate_limited` | Too many requests |
| 500 | `internal_error` | Server error |

---

## 9. Security Requirements

### 9.1 Authentication

| Requirement | Implementation |
|-------------|----------------|
| API Authentication | WordPress Application Passwords |
| Credential Storage | Backend secrets (never client-exposed) |
| Request Signing | HMAC signature validation |
| Token Rotation | Quarterly credential rotation |

### 9.2 Access Control

| Role | Capabilities |
|------|--------------|
| Administrator | Full access, plugin management |
| Editor | Publish, edit all content |
| Author | Publish, edit own content |
| Contributor | Write, submit for review |

### 9.3 Security Measures

| Measure | Description |
|---------|-------------|
| HTTPS Only | All API requests over TLS 1.3 |
| Rate Limiting | 100 requests/minute per IP |
| Input Validation | Sanitize all user inputs |
| SQL Injection Prevention | Prepared statements only |
| XSS Prevention | Content sanitization |
| CORS Configuration | Whitelist allowed origins |
| Security Headers | CSP, HSTS, X-Frame-Options |

### 9.4 Compliance

- GDPR compliance for user data
- Regular security audits
- Automated vulnerability scanning
- Incident response procedures

---

## 10. Performance Requirements

### 10.1 Response Time Targets

| Metric | Target | Maximum |
|--------|--------|---------|
| API Response (cached) | < 50ms | 100ms |
| API Response (uncached) | < 200ms | 500ms |
| Page Load (FCP) | < 1.5s | 2.5s |
| Page Load (LCP) | < 2.0s | 3.0s |
| Time to Interactive | < 3.0s | 5.0s |

### 10.2 Scalability

| Metric | Requirement |
|--------|-------------|
| Concurrent Users | Support 1,000+ |
| API Requests | 10,000/hour |
| Content Items | 10,000+ posts |
| Media Storage | 50GB+ |

### 10.3 Optimization Strategies

1. **Image Optimization**
   - WebP conversion
   - Responsive srcset
   - Lazy loading
   - CDN delivery

2. **API Optimization**
   - Response compression
   - Field limiting
   - Pagination
   - Batch requests

3. **Caching**
   - Edge caching
   - Browser caching
   - React Query caching
   - Stale-while-revalidate

---

## 11. Integration Points

### 11.1 Current System Integrations

| System | Integration Type | Purpose |
|--------|-----------------|---------|
| Contact Form | Supabase | Lead capture |
| Analytics | Google Analytics | Traffic analysis |
| Email | Resend | Notifications |

### 11.2 WordPress Integrations

| Integration | Purpose | Priority |
|-------------|---------|----------|
| Yoast SEO | SEO metadata | High |
| Google Analytics | Content analytics | Medium |
| Mailchimp | Newsletter signup | Medium |
| Slack | Publishing notifications | Low |

### 11.3 Future Integrations

| Integration | Purpose | Phase |
|-------------|---------|-------|
| HubSpot | CRM sync | Phase 2 |
| LinkedIn | Content syndication | Phase 2 |
| Zapier | Workflow automation | Phase 3 |

---

## 12. Migration Strategy

### 12.1 Content Migration Plan

| Phase | Content Type | Source | Effort |
|-------|--------------|--------|--------|
| 1 | Solutions | Static files | Medium |
| 2 | Case Studies | New creation | High |
| 3 | Team Profiles | Manual entry | Low |
| 4 | Resources | Document upload | Medium |
| 5 | Blog Posts | Future content | Ongoing |

### 12.2 Migration Steps

1. **Preparation**
   - Set up WordPress environment
   - Install and configure plugins
   - Create custom post types
   - Design ACF field groups

2. **Content Entry**
   - Migrate existing solution content
   - Create case study templates
   - Enter team member profiles
   - Upload resources and media

3. **Integration**
   - Deploy edge function proxy
   - Implement React hooks
   - Update frontend components
   - Test all content types

4. **Validation**
   - Content review and QA
   - Performance testing
   - Security audit
   - User acceptance testing

5. **Cutover**
   - DNS updates (if applicable)
   - Cache warmup
   - Monitoring setup
   - Go-live announcement

### 12.3 Rollback Plan

| Trigger | Action | Timeline |
|---------|--------|----------|
| Critical bug | Revert to static content | Immediate |
| Performance issues | Increase caching | 1 hour |
| Security breach | Disable API access | Immediate |

---

## 13. Success Metrics

### 13.1 Key Performance Indicators (KPIs)

| KPI | Target | Measurement |
|-----|--------|-------------|
| Content Publishing Time | < 30 minutes | Time from draft to live |
| Page Load Speed | < 2 seconds | Google PageSpeed |
| API Uptime | 99.9% | Monitoring |
| Content Freshness | < 5 min delay | Cache invalidation |
| SEO Score | > 90 | Lighthouse |

### 13.2 User Satisfaction Metrics

| Metric | Target | Method |
|--------|--------|--------|
| Editor Satisfaction | > 4/5 | Survey |
| Time Saved | > 50% | Comparison |
| Error Rate | < 1% | Logging |
| Support Tickets | < 5/month | Tracking |

### 13.3 Business Metrics

| Metric | Target | Timeline |
|--------|--------|----------|
| Case Studies Published | 10+ | 6 months |
| Blog Posts Published | 20+ | 6 months |
| Organic Traffic | +25% | 6 months |
| Lead Generation | +15% | 6 months |

---

## 14. Timeline & Milestones

### 14.1 Project Phases

```
Phase 1: Foundation (Weeks 1-2)
├── WordPress setup and configuration
├── Plugin installation and configuration
├── Custom post types and taxonomies
└── ACF field group design

Phase 2: Integration (Weeks 3-4)
├── Edge function development
├── React hooks implementation
├── Type definitions
└── Error handling

Phase 3: Frontend (Weeks 5-6)
├── Component updates
├── Dynamic routing
├── Search implementation
└── Filtering and pagination

Phase 4: Content (Weeks 7-8)
├── Content migration
├── Media optimization
├── SEO configuration
└── Quality assurance

Phase 5: Launch (Week 9)
├── Final testing
├── Performance optimization
├── Documentation
└── Go-live
```

### 14.2 Milestone Deliverables

| Milestone | Deliverable | Date |
|-----------|-------------|------|
| M1 | WordPress configured with all post types | Week 2 |
| M2 | API proxy functional | Week 4 |
| M3 | Frontend integration complete | Week 6 |
| M4 | All content migrated | Week 8 |
| M5 | Production launch | Week 9 |

---

## 15. Risks & Mitigations

### 15.1 Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| API downtime | Low | High | Fallback to cached content |
| Performance degradation | Medium | Medium | Aggressive caching, CDN |
| Security breach | Low | Critical | Regular audits, monitoring |
| Plugin conflicts | Medium | Low | Careful plugin selection |

### 15.2 Operational Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Content quality issues | Medium | Medium | Editorial guidelines, review process |
| User adoption resistance | Low | Medium | Training, documentation |
| Scope creep | Medium | Medium | Strict change control |
| Resource constraints | Low | High | Prioritized backlog |

### 15.3 Business Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Delayed launch | Medium | Medium | Buffer time, MVP approach |
| Budget overrun | Low | Medium | Fixed-scope phases |
| Vendor lock-in | Low | Low | Standard WordPress, data export |

---

## 16. Appendix

### 16.1 Glossary

| Term | Definition |
|------|------------|
| Headless CMS | CMS where content management is decoupled from presentation |
| REST API | Representational State Transfer Application Programming Interface |
| ACF | Advanced Custom Fields - WordPress plugin for custom fields |
| Edge Function | Serverless function running at the network edge |
| SWR | Stale-While-Revalidate caching strategy |

### 16.2 References

- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [ACF Documentation](https://www.advancedcustomfields.com/resources/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Lovable Documentation](https://docs.lovable.dev/)

### 16.3 Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Jan 12, 2026 | Tandem Technologies | Initial draft |

---

## Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Project Sponsor | | | |
| Technical Lead | | | |
| Content Lead | | | |
| Security Lead | | | |

---

*© 2026 Tandem Technologies Limited. All rights reserved.*
