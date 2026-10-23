import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import './collectionCard.css'

function CollectionCard({ collection, large = false }) {
  return (
    <Link
      to={`/collections/${collection.slug}`}
      className={`collection-card ${large ? 'is-large' : ''}`}
      style={{ '--accent-color': collection.accent || 'var(--accent)' }}
    >
      <div className="collection-card__media">
        {collection.cover ? (
          <img src={collection.cover} alt="" loading="lazy" />
        ) : (
          <div className="collection-card__fallback" />
        )}
        <span className="collection-card__badge">{collection.artwork_count} works</span>
      </div>
      <div className="collection-card__body">
        <div className="collection-card__heading">
          <h3>{collection.name}</h3>
          <FiArrowUpRight aria-hidden="true" />
        </div>
        <p>{collection.description}</p>
        {collection.tags?.length > 0 && (
          <div className="collection-card__tags">
            {collection.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}

export default CollectionCard
