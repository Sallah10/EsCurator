import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api, { fetchJson } from './client'
import { getSessionId } from '../lib/session'

export function useArtworks(params = {}) {
  return useQuery({
    queryKey: ['artworks', params],
    queryFn: () => fetchJson('/art_works/', params),
    placeholderData: (previous) => previous,
  })
}

export function useInfiniteArtworks(params = {}) {
  return useInfiniteQuery({
    queryKey: ['artworks', 'infinite', params],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchJson('/art_works/', { ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage?.next) return undefined
      try {
        return Number(new URL(lastPage.next).searchParams.get('page'))
      } catch {
        return undefined
      }
    },
  })
}

export function useArtwork(id) {
  return useQuery({
    queryKey: ['artwork', id],
    queryFn: () => fetchJson(`/art_works/${id}/`),
    enabled: Boolean(id),
  })
}

export function useSimilarArtworks(id) {
  return useQuery({
    queryKey: ['artwork', id, 'similar'],
    queryFn: () => fetchJson(`/art_works/${id}/similar/`),
    enabled: Boolean(id),
  })
}

export function useCollections() {
  return useQuery({
    queryKey: ['collections'],
    queryFn: () => fetchJson('/collections/'),
    staleTime: 60_000,
  })
}

export function useCollection(slug) {
  return useQuery({
    queryKey: ['collection', slug],
    queryFn: () => fetchJson(`/collections/${slug}/`),
    enabled: Boolean(slug),
  })
}

export function useFacets() {
  return useQuery({
    queryKey: ['facets'],
    queryFn: () => fetchJson('/facets/'),
    staleTime: 60_000,
  })
}

export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: () => fetchJson('/stats/'),
    staleTime: 60_000,
  })
}

export function useRecommendations(limit = 8) {
  return useQuery({
    queryKey: ['recommendations', limit],
    queryFn: () =>
      api.post('/recommendations/', { limit }).then((response) => response.data),
    staleTime: 15_000,
  })
}

export function useTasteProfile() {
  return useQuery({
    queryKey: ['taste'],
    queryFn: () => fetchJson('/taste/'),
  })
}

export function useInteractions() {
  return useQuery({
    queryKey: ['interactions'],
    queryFn: () =>
      api
        .get('/interactions/', { params: { session_id: getSessionId() } })
        .then((response) => response.data),
  })
}

export function useToggleInteraction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ artworkId, type }) =>
      api.post('/interactions/', { artwork: artworkId, type }).then((response) => response.data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['artworks'] })
      queryClient.invalidateQueries({ queryKey: ['artwork', variables.artworkId] })
      queryClient.invalidateQueries({ queryKey: ['recommendations'] })
      queryClient.invalidateQueries({ queryKey: ['interactions'] })
      queryClient.invalidateQueries({ queryKey: ['taste'] })
    },
  })
}

export function useRecordView() {
  return useMutation({
    mutationFn: (artworkId) =>
      api.post('/interactions/', { artwork: artworkId, type: 'view' }).then((response) => response.data),
  })
}
