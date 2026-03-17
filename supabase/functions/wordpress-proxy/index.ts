import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

/**
 * WordPress Headless CMS API Proxy
 * 
 * This edge function securely proxies requests to the WordPress REST API,
 * handling authentication, caching, and error management.
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

// Allowed WordPress endpoints (standard WP REST API endpoints)
const ALLOWED_ENDPOINTS = [
  'posts',       // Blog posts
  'pages',       // Pages
  'categories',  // Categories
  'tags',        // Tags
  'users',       // Authors
  'media',       // Media
  'search',      // Search
  // Custom post types (to be configured in WordPress)
  'case-study',
  'solution',
  'team-member',
  'partner',
  'resource',
];

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 100; // requests per minute
const RATE_LIMIT_WINDOW = 60000; // 1 minute in ms

function isRateLimited(clientIp: string): boolean {
  const now = Date.now();
  const clientData = rateLimitMap.get(clientIp);

  if (!clientData || now > clientData.resetTime) {
    rateLimitMap.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (clientData.count >= RATE_LIMIT) {
    return true;
  }

  clientData.count++;
  return false;
}

function validateEndpoint(endpoint: string): boolean {
  const baseEndpoint = endpoint.split('/')[0].split('?')[0];
  return ALLOWED_ENDPOINTS.includes(baseEndpoint);
}

function buildQueryString(params: Record<string, string | number | boolean | undefined>): string {
  const searchParams = new URLSearchParams();
  
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  }
  
  return searchParams.toString();
}

interface WPRenderedField {
  rendered: string;
}

interface WPMediaDetails {
  width?: number;
  height?: number;
  sizes?: Record<string, unknown>;
}

interface WPFeaturedMedia {
  id: number;
  source_url: string;
  alt_text?: string;
  title: string | WPRenderedField;
  media_details?: WPMediaDetails;
  mime_type: string;
}

interface WPTerm {
  id: number;
  name: string;
  slug: string;
  description?: string;
  count?: number;
  parent?: number;
}

interface WPAuthorData {
  id: number;
  name: string;
  avatar_urls?: Record<string, string>;
  description?: string;
}

interface WPEmbedded {
  'wp:featuredmedia'?: WPFeaturedMedia[];
  'wp:term'?: WPTerm[][];
  author?: WPAuthorData[];
}

interface WPItem {
  title?: string | WPRenderedField;
  content?: string | WPRenderedField;
  excerpt?: string | WPRenderedField;
  _embedded?: WPEmbedded;
  _links?: unknown;
  [key: string]: unknown;
}

function transformWordPressResponse(data: unknown): unknown {
  if (Array.isArray(data)) {
    return data.map(item => transformSingleItem(item as WPItem));
  }
  return transformSingleItem(data as WPItem);
}

function transformSingleItem(item: WPItem): Record<string, unknown> {
  if (!item || typeof item !== 'object') return item as Record<string, unknown>;

  const transformed: Record<string, unknown> = { ...item };

  // Transform title from { rendered: string } to string
  if (transformed.title && typeof transformed.title === 'object' && 'rendered' in (transformed.title as object)) {
    transformed.title = (transformed.title as WPRenderedField).rendered;
  }

  // Transform content from { rendered: string } to string
  if (transformed.content && typeof transformed.content === 'object' && 'rendered' in (transformed.content as object)) {
    transformed.content = (transformed.content as WPRenderedField).rendered;
  }

  // Transform excerpt from { rendered: string } to string
  if (transformed.excerpt && typeof transformed.excerpt === 'object' && 'rendered' in (transformed.excerpt as object)) {
    transformed.excerpt = (transformed.excerpt as WPRenderedField).rendered;
  }

  // Extract featured image from _embedded data
  const embedded = item._embedded;
  if (embedded) {
    if (embedded['wp:featuredmedia']?.[0]) {
      const media = embedded['wp:featuredmedia'][0];
      const mediaTitle = typeof media.title === 'object' ? media.title.rendered : media.title;
      transformed.featured_image = {
        id: media.id,
        url: media.source_url,
        alt: media.alt_text || '',
        title: mediaTitle,
        width: media.media_details?.width || 0,
        height: media.media_details?.height || 0,
        sizes: media.media_details?.sizes || {},
        mime_type: media.mime_type,
      };
    }

    // Extract terms (categories and tags)
    if (embedded['wp:term']) {
      const terms = embedded['wp:term'];
      transformed.categories = terms[0]?.map((term) => ({
        id: term.id,
        name: term.name,
        slug: term.slug,
        description: term.description,
        count: term.count,
        parent: term.parent,
      })) || [];
      
      transformed.tags = terms[1]?.map((term) => ({
        id: term.id,
        name: term.name,
        slug: term.slug,
        count: term.count,
      })) || [];
    }

    // Extract author
    if (embedded.author?.[0]) {
      const author = embedded.author[0];
      transformed.author = {
        id: author.id,
        name: author.name,
        avatar: author.avatar_urls?.['96'] || '',
        bio: author.description || '',
      };
    }
  }

  // Clean up internal fields
  delete transformed._embedded;
  delete transformed._links;

  return transformed;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    
    if (isRateLimited(clientIp)) {
      return new Response(
        JSON.stringify({ code: 'rate_limited', message: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse request
    const { method } = req;
    if (method !== 'GET' && method !== 'POST') {
      return new Response(
        JSON.stringify({ code: 'method_not_allowed', message: 'Only GET and POST methods are allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get WordPress configuration from secrets
    // WORDPRESS_URL should be the WordPress backend URL (e.g., https://your-wp-site.com)
    const wpBaseUrl = Deno.env.get('WORDPRESS_URL');

    if (!wpBaseUrl) {
      console.error('WORDPRESS_URL not configured');
      return new Response(
        JSON.stringify({ code: 'configuration_error', message: 'WordPress URL not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log(`Using WordPress URL: ${wpBaseUrl}`);

    // Parse request body for POST or URL params for GET
    let requestData: Record<string, unknown> = {};
    
    if (method === 'POST') {
      requestData = await req.json();
    } else {
      const url = new URL(req.url);
      url.searchParams.forEach((value, key) => {
        requestData[key] = value;
      });
    }

    const { endpoint, ...queryParams } = requestData as { endpoint: string } & Record<string, string | number | boolean>;

    if (!endpoint || !validateEndpoint(endpoint)) {
      return new Response(
        JSON.stringify({ code: 'invalid_endpoint', message: 'Invalid or missing endpoint' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build WordPress API URL
    // Always request embedded data for richer responses
    const wpQueryParams = { ...queryParams, _embed: true };
    const queryString = buildQueryString(wpQueryParams);
    const wpApiUrl = `${wpBaseUrl}/wp-json/wp/v2/${endpoint}${queryString ? '?' + queryString : ''}`;

    // Build headers for WordPress request
    const wpHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    console.log(`Proxying request to: ${wpApiUrl}`);

    // Make request to WordPress
    const wpResponse = await fetch(wpApiUrl, {
      method: 'GET',
      headers: wpHeaders,
    });

    if (!wpResponse.ok) {
      const errorText = await wpResponse.text();
      console.error(`WordPress API error: ${wpResponse.status} - ${errorText}`);
      
      return new Response(
        JSON.stringify({ 
          code: 'wordpress_error', 
          message: 'Error fetching content from WordPress',
          status: wpResponse.status 
        }),
        { status: wpResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const wpData = await wpResponse.json();
    
    // Transform and return response
    const transformedData = transformWordPressResponse(wpData);
    
    // Extract pagination from WordPress headers
    const total = parseInt(wpResponse.headers.get('X-WP-Total') || '0', 10);
    const totalPages = parseInt(wpResponse.headers.get('X-WP-TotalPages') || '1', 10);
    const currentPage = parseInt(String(queryParams.page) || '1', 10);
    const perPage = parseInt(String(queryParams.per_page) || '10', 10);

    const response = {
      data: transformedData,
      meta: {
        total,
        pages: totalPages,
        current_page: currentPage,
        per_page: perPage,
      },
    };

    return new Response(
      JSON.stringify(response),
      { 
        status: 200, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300', // 5 minute cache
        } 
      }
    );

  } catch (error) {
    console.error('WordPress proxy error:', error);
    
    return new Response(
      JSON.stringify({ code: 'internal_error', message: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
