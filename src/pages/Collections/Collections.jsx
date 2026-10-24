import CollectionCard from '../../components/CollectionCard/CollectionCard'
import { useCollections } from '../../api/hooks'
import './collections.css'

function Collections() {
  const { data: collections, isLoading } = useCollections()
  const shelves = collections || []

  return (
    <div className="page">
      <header className="page-header">
        <div className="container">
          <span className="eyebrow">Curated shelves</span>
          <h1>Five ways into the collection.</h1>
          <p>
            Each shelf brings together works by mood, period and medium. Use one
            as a starting point, then follow your own taste.
          </p>
        </div>
      </header>

      <div className="container small-section">
        {isLoading ? (
          <div className="collections-grid">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="collection-skeleton">
                <div className="skeleton collection-skeleton__image" />
                <div className="skeleton collection-skeleton__line" />
              </div>
            ))}
          </div>
        ) : (
          <div className="collections-grid">
            {shelves.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Collections
