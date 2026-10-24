import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiArrowDown } from 'react-icons/fi'
import ArtworkGrid from '../../components/ArtworkGrid/ArtworkGrid'
import Filters from '../../components/Filters/Filters'
import { useFacets, useInfiniteArtworks } from '../../api/hooks'
import './gallery.css'

function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams()
  const style = searchParams.get('style') || ''
  const search = searchParams.get('search') || ''
  const sort = searchParams.get('sort') || 'art_title'
  const [searchInput, setSearchInput] = useState(search)

  const { data: facets } = useFacets()

  const params = useMemo(
    () => ({ style, search, ordering: sort }),
    [style, search, sort],
  )

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteArtworks(params)

  const artworks = data?.pages.flatMap((page) => page.results) ?? []
  const total = data?.pages?.[0]?.count ?? 0

  useEffect(() => {
    setSearchInput(search)
  }, [search])

  useEffect(() => {
    if (searchInput === search) return undefined
    const timeout = window.setTimeout(() => {
      const next = new URLSearchParams(searchParams)
      if (searchInput.trim()) next.set('search', searchInput.trim())
      else next.delete('search')
      setSearchParams(next, { replace: true })
    }, 350)
    return () => window.clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput])

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next, { replace: true })
  }

  return (
    <div className="page">
      <header className="page-header">
        <div className="container">
          <span className="eyebrow">The collection</span>
          <h1>Every work, in one place.</h1>
          <p>
            Filter by style, search by title or period, and sort by what people
            are responding to. Everything here is real API data.
          </p>
        </div>
      </header>

      <div className="container">
        <Filters
          facets={facets}
          style={style}
          onStyle={(value) => updateParam('style', value)}
          search={searchInput}
          onSearch={setSearchInput}
          sort={sort}
          onSort={(value) => updateParam('sort', value)}
          resultCount={total}
          loading={isLoading}
        />

        <section className="section-tight gallery-grid-wrap">
          <ArtworkGrid
            artworks={artworks}
            loading={isLoading}
            skeletonCount={8}
            emptyMessage="No works match that combination yet. Try clearing the search."
          />

          {hasNextPage && (
            <div className="gallery-more">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? 'Loading...' : 'Load more works'}
                <FiArrowDown aria-hidden="true" />
              </button>
            </div>
          )}

          {!hasNextPage && artworks.length > 0 && (
            <p className="gallery-end">That is the whole collection.</p>
          )}
        </section>
      </div>
    </div>
  )
}

export default Gallery
