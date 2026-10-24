import { Link, useParams } from 'react-router-dom'
import { FiArrowDown, FiArrowLeft } from 'react-icons/fi'
import ArtworkGrid from '../../components/ArtworkGrid/ArtworkGrid'
import { useCollection, useInfiniteArtworks } from '../../api/hooks'
import './collections.css'

function CollectionDetail() {
  const { slug } = useParams()
  const { data: collection, isLoading: collectionLoading, isError } = useCollection(slug)
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteArtworks({ collection: slug, ordering: '-likes' })

  const artworks = data?.pages.flatMap((page) => page.results) ?? []
  const total = data?.pages?.[0]?.count ?? collection?.artwork_count ?? 0

  if (isError) {
    return (
      <div className="page container small-section">
        <div className="empty-state">
          <h3>Collection not found</h3>
          <p>That shelf may have been renamed or removed.</p>
          <Link to="/collections" className="btn btn-primary">
            Back to collections
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <header className="collection-hero">
        <div className="container">
          <Link to="/collections" className="btn-link collection-back">
            <FiArrowLeft aria-hidden="true" /> All collections
          </Link>
          <div className="collection-hero__inner">
            <div>
              <span className="eyebrow">{total} works</span>
              <h1>{collectionLoading ? 'Loading shelf...' : collection?.name}</h1>
              <p>{collection?.description}</p>
              {collection?.tags?.length > 0 && (
                <div className="collection-hero__tags">
                  {collection.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {collection?.cover && (
              <div className="collection-hero__cover">
                <img src={collection.cover} alt="" />
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="container small-section">
        <ArtworkGrid artworks={artworks} loading={isLoading} skeletonCount={8} />

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
      </div>
    </div>
  )
}

export default CollectionDetail
