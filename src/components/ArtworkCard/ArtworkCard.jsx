import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiBookmark, FiHeart } from 'react-icons/fi'
import { useToggleInteraction } from '../../api/hooks'
import { useToast } from '../../context/toastContext'
import './artworkCard.css'

function ArtworkCard({ artwork }) {
  const [liked, setLiked] = useState(Boolean(artwork.is_liked))
  const [saved, setSaved] = useState(Boolean(artwork.is_bookmarked))
  const [likes, setLikes] = useState(artwork.likes || 0)
  const [saves, setSaves] = useState(artwork.bookmarks || 0)
  const toggle = useToggleInteraction()
  const notify = useToast()

  useEffect(() => {
    setLiked(Boolean(artwork.is_liked))
    setSaved(Boolean(artwork.is_bookmarked))
    setLikes(artwork.likes || 0)
    setSaves(artwork.bookmarks || 0)
  }, [artwork])

  const handleToggle = (type) => {
    const isLike = type === 'like'
    const next = isLike ? !liked : !saved
    if (isLike) {
      setLiked(next)
      setLikes((count) => Math.max(0, count + (next ? 1 : -1)))
    } else {
      setSaved(next)
      setSaves((count) => Math.max(0, count + (next ? 1 : -1)))
    }

    toggle.mutate(
      { artworkId: artwork.id, type },
      {
        onSuccess: (data) => {
          const active = isLike ? data.liked : data.bookmarked
          notify(
            isLike
              ? active
                ? 'Added to your likes'
                : 'Removed from your likes'
              : active
                ? 'Saved to your collection'
                : 'Removed from saved',
          )
        },
        onError: () => {
          if (isLike) {
            setLiked(!next)
            setLikes((count) => Math.max(0, count + (next ? -1 : 1)))
          } else {
            setSaved(!next)
            setSaves((count) => Math.max(0, count + (next ? -1 : 1)))
          }
          notify('That did not save. Please try again.')
        },
      },
    )
  }

  return (
    <article className="art-card">
      <div className="art-card__media">
        <Link
          to={`/artwork/${artwork.id}`}
          aria-label={`View ${artwork.art_title}`}
          className="art-card__link"
        >
          {artwork.art_image ? (
            <img src={artwork.art_image} alt={artwork.art_title} loading="lazy" />
          ) : (
            <div className="art-card__placeholder serif">
              <span className="art-card__placeholder-title">{artwork.art_title}</span>
            </div>
          )}
          <span className="art-card__veil" aria-hidden="true" />
        </Link>

        <div className="art-card__actions">
          <button
            type="button"
            className={`icon-button ${liked ? 'is-active' : ''}`}
            aria-pressed={liked}
            aria-label={liked ? `Unlike ${artwork.art_title}` : `Like ${artwork.art_title}`}
            onClick={() => handleToggle('like')}
          >
            <FiHeart aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`icon-button ${saved ? 'is-active' : ''}`}
            aria-pressed={saved}
            aria-label={saved ? `Remove ${artwork.art_title} from saved` : `Save ${artwork.art_title}`}
            onClick={() => handleToggle('bookmark')}
          >
            <FiBookmark aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="art-card__body">
        <div className="art-card__meta">
          {artwork.style && <span>{artwork.style}</span>}
          {artwork.era && <span>{artwork.era}</span>}
        </div>
        <h3>
          <Link to={`/artwork/${artwork.id}`}>{artwork.art_title}</Link>
        </h3>
        <p className="art-card__artist">{artwork.artiste || 'Unattributed'}</p>
        <div className="art-card__stats">
          <span>
            <FiHeart aria-hidden="true" /> {likes}
          </span>
          <span>
            <FiBookmark aria-hidden="true" /> {saves}
          </span>
          {artwork.medium && <span className="art-card__medium">{artwork.medium}</span>}
        </div>
      </div>
    </article>
  )
}

export default ArtworkCard

