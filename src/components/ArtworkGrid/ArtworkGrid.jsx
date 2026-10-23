import ArtworkCard from '../ArtworkCard/ArtworkCard'
import './artworkGrid.css'

function CardSkeleton() {
  return (
    <div className="grid-skeleton" aria-hidden="true">
      <div className="skeleton grid-skeleton__image" />
      <div className="skeleton grid-skeleton__line" />
      <div className="skeleton grid-skeleton__line short" />
    </div>
  )
}

function ArtworkGrid({ artworks = [], loading = false, skeletonCount = 8, emptyMessage }) {
  if (loading) {
    return (
      <div className="art-grid" aria-busy="true" aria-label="Loading artworks">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (!artworks.length) {
    return (
      <div className="empty-state">
        <h3>Nothing here yet</h3>
        <p>{emptyMessage || 'Try a different filter or search term.'}</p>
      </div>
    )
  }

  return (
    <div className="art-grid">
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork.id} artwork={artwork} />
      ))}
    </div>
  )
}

export default ArtworkGrid
