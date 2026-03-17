/**
 * WordPress Headless CMS React Hooks
 * 
 * Provides type-safe hooks for fetching content from WordPress
 * via the edge function proxy.
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type {
  WPCaseStudy,
  WPSolution,
  WPTeamMember,
  WPPartner,
  WPResource,
  WPBlogPost,
  WPCategory,
  WPApiResponse,
  WPPaginationMeta,
  WPQueryParams,
  WPCaseStudyQueryParams,
  WPTeamMemberQueryParams,
  WPResourceQueryParams,
  WPSearchParams,
  WPPage,
  WPAuthor,
  WPTag,
} from '@/types/wordpress';

// ============================================
// Helper Types
// ============================================

interface WPSingleItemResponse<T> {
  data: T | null;
  meta: WPPaginationMeta;
}

// ============================================
// Helper Functions
// ============================================

async function fetchFromWordPress<T>(
  endpoint: string,
  params: Record<string, unknown> = {}
): Promise<WPApiResponse<T>> {
  const { data, error } = await supabase.functions.invoke('wordpress-proxy', {
    body: { endpoint, ...params },
  });

  if (error) {
    throw new Error(error.message || 'Failed to fetch from WordPress');
  }

  return data as WPApiResponse<T>;
}

// Default query options for all WordPress queries
const defaultQueryOptions = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 30 * 60 * 1000, // 30 minutes (formerly cacheTime)
  refetchOnWindowFocus: false,
  retry: 2,
};

// ============================================
// Case Study Hooks
// ============================================

export function useCaseStudies(
  params: WPCaseStudyQueryParams = {},
  options?: Omit<UseQueryOptions<WPApiResponse<WPCaseStudy[]>, Error, WPApiResponse<WPCaseStudy[]>>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['wordpress', 'case-studies', params],
    queryFn: () => fetchFromWordPress<WPCaseStudy[]>('case-study', params as Record<string, unknown>),
    ...defaultQueryOptions,
    ...options,
  });
}

export function useCaseStudy(
  slug: string,
  options?: Omit<UseQueryOptions<WPApiResponse<WPCaseStudy[]>, Error, WPSingleItemResponse<WPCaseStudy>>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['wordpress', 'case-study', slug],
    queryFn: () => fetchFromWordPress<WPCaseStudy[]>('case-study', { slug }),
    enabled: !!slug,
    select: (response): WPSingleItemResponse<WPCaseStudy> => ({
      data: response.data[0] || null,
      meta: response.meta,
    }),
    ...defaultQueryOptions,
    ...options,
  });
}

// ============================================
// Solution Hooks
// ============================================

export function useSolutions(
  params: WPQueryParams = {},
  options?: Omit<UseQueryOptions<WPApiResponse<WPSolution[]>, Error, WPApiResponse<WPSolution[]>>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['wordpress', 'solutions', params],
    queryFn: () => fetchFromWordPress<WPSolution[]>('solution', params as Record<string, unknown>),
    ...defaultQueryOptions,
    ...options,
  });
}

export function useSolution(
  slug: string,
  options?: Omit<UseQueryOptions<WPApiResponse<WPSolution[]>, Error, WPSingleItemResponse<WPSolution>>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['wordpress', 'solution', slug],
    queryFn: () => fetchFromWordPress<WPSolution[]>('solution', { slug }),
    enabled: !!slug,
    select: (response): WPSingleItemResponse<WPSolution> => ({
      data: response.data[0] || null,
      meta: response.meta,
    }),
    ...defaultQueryOptions,
    ...options,
  });
}

// ============================================
// Team Member Hooks
// ============================================

export function useTeamMembers(
  params: WPTeamMemberQueryParams = {},
  options?: Omit<UseQueryOptions<WPApiResponse<WPTeamMember[]>, Error, WPApiResponse<WPTeamMember[]>>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['wordpress', 'team-members', params],
    queryFn: () => fetchFromWordPress<WPTeamMember[]>('team-member', params as Record<string, unknown>),
    ...defaultQueryOptions,
    ...options,
  });
}

export function useTeamMember(
  slug: string,
  options?: Omit<UseQueryOptions<WPApiResponse<WPTeamMember[]>, Error, WPSingleItemResponse<WPTeamMember>>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['wordpress', 'team-member', slug],
    queryFn: () => fetchFromWordPress<WPTeamMember[]>('team-member', { slug }),
    enabled: !!slug,
    select: (response): WPSingleItemResponse<WPTeamMember> => ({
      data: response.data[0] || null,
      meta: response.meta,
    }),
    ...defaultQueryOptions,
    ...options,
  });
}

export function useLeadershipTeam(
  options?: Omit<UseQueryOptions<WPApiResponse<WPTeamMember[]>, Error, WPApiResponse<WPTeamMember[]>>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['wordpress', 'team-members', 'leadership'],
    queryFn: () => fetchFromWordPress<WPTeamMember[]>('team-member', {
      meta_key: 'is_leadership',
      meta_value: '1',
      orderby: 'menu_order',
      order: 'asc',
    }),
    ...defaultQueryOptions,
    ...options,
  });
}

// ============================================
// Partner Hooks
// ============================================

export function usePartners(
  params: WPQueryParams = {},
  options?: Omit<UseQueryOptions<WPApiResponse<WPPartner[]>, Error, WPApiResponse<WPPartner[]>>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['wordpress', 'partners', params],
    queryFn: () => fetchFromWordPress<WPPartner[]>('partner', params as Record<string, unknown>),
    ...defaultQueryOptions,
    ...options,
  });
}

export function usePartner(
  slug: string,
  options?: Omit<UseQueryOptions<WPApiResponse<WPPartner[]>, Error, WPSingleItemResponse<WPPartner>>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['wordpress', 'partner', slug],
    queryFn: () => fetchFromWordPress<WPPartner[]>('partner', { slug }),
    enabled: !!slug,
    select: (response): WPSingleItemResponse<WPPartner> => ({
      data: response.data[0] || null,
      meta: response.meta,
    }),
    ...defaultQueryOptions,
    ...options,
  });
}

// ============================================
// Resource Hooks
// ============================================

export function useResources(
  params: WPResourceQueryParams = {},
  options?: Omit<UseQueryOptions<WPApiResponse<WPResource[]>, Error, WPApiResponse<WPResource[]>>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['wordpress', 'resources', params],
    queryFn: () => fetchFromWordPress<WPResource[]>('resource', params as Record<string, unknown>),
    ...defaultQueryOptions,
    ...options,
  });
}

export function useResource(
  slug: string,
  options?: Omit<UseQueryOptions<WPApiResponse<WPResource[]>, Error, WPSingleItemResponse<WPResource>>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['wordpress', 'resource', slug],
    queryFn: () => fetchFromWordPress<WPResource[]>('resource', { slug }),
    enabled: !!slug,
    select: (response): WPSingleItemResponse<WPResource> => ({
      data: response.data[0] || null,
      meta: response.meta,
    }),
    ...defaultQueryOptions,
    ...options,
  });
}

// ============================================
// Blog Post Hooks
// ============================================

export function useBlogPosts(
  params: WPQueryParams = {},
  options?: Omit<UseQueryOptions<WPApiResponse<WPBlogPost[]>, Error, WPApiResponse<WPBlogPost[]>>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['wordpress', 'blog-posts', params],
    queryFn: () => fetchFromWordPress<WPBlogPost[]>('posts', params as Record<string, unknown>),
    ...defaultQueryOptions,
    ...options,
  });
}

export function useBlogPost(
  slug: string,
  options?: Omit<UseQueryOptions<WPApiResponse<WPBlogPost[]>, Error, WPSingleItemResponse<WPBlogPost>>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['wordpress', 'blog-post', slug],
    queryFn: () => fetchFromWordPress<WPBlogPost[]>('posts', { slug }),
    enabled: !!slug,
    select: (response): WPSingleItemResponse<WPBlogPost> => ({
      data: response.data[0] || null,
      meta: response.meta,
    }),
    ...defaultQueryOptions,
    ...options,
  });
}

export function useFeaturedBlogPosts(
  limit: number = 3,
  options?: Omit<UseQueryOptions<WPApiResponse<WPBlogPost[]>, Error, WPApiResponse<WPBlogPost[]>>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['wordpress', 'blog-posts', 'featured', limit],
    queryFn: () => fetchFromWordPress<WPBlogPost[]>('posts', {
      meta_key: 'featured',
      meta_value: '1',
      per_page: limit,
      orderby: 'date',
      order: 'desc',
    }),
    ...defaultQueryOptions,
    ...options,
  });
}

// ============================================
// Category Hooks
// ============================================

export function useCategories(
  options?: Omit<UseQueryOptions<WPApiResponse<WPCategory[]>, Error, WPApiResponse<WPCategory[]>>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['wordpress', 'categories'],
    queryFn: () => fetchFromWordPress<WPCategory[]>('categories', { per_page: 100 }),
    ...defaultQueryOptions,
    staleTime: 30 * 60 * 1000, // Categories change less frequently
    ...options,
  });
}

// ============================================
// Pages Hooks
// ============================================

export function usePages(
  params: WPQueryParams = {},
  options?: Omit<UseQueryOptions<WPApiResponse<WPPage[]>, Error, WPApiResponse<WPPage[]>>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['wordpress', 'pages', params],
    queryFn: () => fetchFromWordPress<WPPage[]>('pages', params as Record<string, unknown>),
    ...defaultQueryOptions,
    ...options,
  });
}

export function usePage(
  slug: string,
  options?: Omit<UseQueryOptions<WPApiResponse<WPPage[]>, Error, WPSingleItemResponse<WPPage>>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['wordpress', 'page', slug],
    queryFn: () => fetchFromWordPress<WPPage[]>('pages', { slug }),
    enabled: !!slug,
    select: (response): WPSingleItemResponse<WPPage> => ({
      data: response.data[0] || null,
      meta: response.meta,
    }),
    ...defaultQueryOptions,
    ...options,
  });
}

// ============================================
// Authors Hooks
// ============================================

export function useAuthors(
  params: WPQueryParams = {},
  options?: Omit<UseQueryOptions<WPApiResponse<WPAuthor[]>, Error, WPApiResponse<WPAuthor[]>>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['wordpress', 'authors', params],
    queryFn: () => fetchFromWordPress<WPAuthor[]>('users', params as Record<string, unknown>),
    ...defaultQueryOptions,
    ...options,
  });
}

export function useAuthor(
  id: number,
  options?: Omit<UseQueryOptions<WPApiResponse<WPAuthor[]>, Error, WPSingleItemResponse<WPAuthor>>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['wordpress', 'author', id],
    queryFn: () => fetchFromWordPress<WPAuthor[]>(`users/${id}`, {}),
    enabled: !!id,
    select: (response): WPSingleItemResponse<WPAuthor> => ({
      data: Array.isArray(response.data) ? response.data[0] : response.data,
      meta: response.meta,
    }),
    ...defaultQueryOptions,
    ...options,
  });
}

// ============================================
// Tags Hooks
// ============================================

export function useTags(
  options?: Omit<UseQueryOptions<WPApiResponse<WPTag[]>, Error, WPApiResponse<WPTag[]>>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['wordpress', 'tags'],
    queryFn: () => fetchFromWordPress<WPTag[]>('tags', { per_page: 100 }),
    ...defaultQueryOptions,
    staleTime: 30 * 60 * 1000, // Tags change less frequently
    ...options,
  });
}

export function useWordPressSearch(
  params: WPSearchParams,
  options?: Omit<UseQueryOptions<WPApiResponse<unknown[]>, Error, WPApiResponse<unknown[]>>, 'queryKey' | 'queryFn'>
) {
  const searchParams = {
    search: params.search,
    type: params.type || 'post',
    subtype: params.subtype?.join(',') || 'case-study,solution,resource,post',
    per_page: params.per_page || 10,
    page: params.page || 1,
  };

  return useQuery({
    queryKey: ['wordpress', 'search', searchParams],
    queryFn: () => fetchFromWordPress<unknown[]>('search', searchParams),
    enabled: !!params.search && params.search.length >= 2,
    ...defaultQueryOptions,
    staleTime: 2 * 60 * 1000, // Shorter cache for search results
    ...options,
  });
}

// ============================================
// Utility Hooks
// ============================================

/**
 * Prefetch content for faster navigation
 */
export function usePrefetchCaseStudy(slug: string) {
  const queryClient = useQuery({
    queryKey: ['wordpress', 'case-study', slug],
    queryFn: () => fetchFromWordPress<WPCaseStudy[]>('case-study', { slug }),
    enabled: false, // Don't fetch automatically
    ...defaultQueryOptions,
  });

  return {
    prefetch: () => queryClient.refetch(),
  };
}

/**
 * Invalidate WordPress cache
 */
export function useInvalidateWordPressCache() {
  return {
    invalidateAll: async () => {
      // This would typically be called after receiving a webhook
      // indicating content has changed in WordPress
      console.log('WordPress cache invalidation requested');
    },
  };
}
