import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiArrowLeft, FiBookmark, FiHeart, FiShare2 } from 'react-icons/fi'
import ArtworkGrid from '../../components/ArtworkGrid/ArtworkGrid'
import {
  useArtwork,
  useRecordView,
  useSimilarArtworks,
  useToggleInteraction,
} from '../../api/hooks'
import { useToast } from '../../context/toastContext'
import './artworkDetail.css'

function ArtworkDetail() {
  const { id } = useParams()
  const { data: artwork, isLoading, isError } = useArtwork(id)
  const { data: similar, isLoading: similarLoading } = useSimilarArtworks(id)
  const recordView = useRecordView()
  const toggle = useToggleInteraction()
  const notify = useToast()

  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likes, setLikes] = useState(0)
  const [saves, setSaves] = useState(0)
  const viewRecorded = useRef(false)

  useEffect(() => {
    if (!artwork) return
    setLiked(Boolean(artwork.is_liked))
    setSaved(Boolean(artwork.is_bookmarked))
    setLikes(artwork.likes || 0)
    setSaves(artwork.bookmarks || 0)
  }, [artwork])

  useEffect(() => {
    if (!artwork || viewRecorded.current) return
    viewRecorded.current = true
    const key = `escurator.viewed.${artwork.id}`
    try {
      if (window.sessionStorage.getItem(key)) return
      window.sessionStorage.setItem(key, '1')
    } catch {
      // storage can be unavailable; recording a view twice is harmless
    }
    recordView.mutate(artwork.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          if (isLike) setLiked(!next)
          else setSaved(!next)
          notify('That did not save. Please try again.')
        },
      },
    )
  }

  const handleShare = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: artwork.art_title, url })
        return
      }
      await navigator.clipboard.writeText(url)
      notify('Link copied to clipboard')
    } catch {
      notify('Could not share that link')
    }
  }

  if (isError) {
    return (
      <div className="page container small-section">
        <div className="empty-state">
          <h3>Artwork not found</h3>
          <p>It may have been removed from the collection.</p>
          <Link to="/gallery" className="btn btn-primary">
            Back to the gallery
          </Link>
        </div>
      </div>
    )
  }

  if (isLoading || !artwork) {
    return (
      <div className="page container detail-loading">
        <div className="skeleton detail-loading__image" />
        <div className="detail-loading__copy">
          <div className="skeleton detail-loading__line" />
          <div className="skeleton detail-loading__line short" />
          <div className="skeleton detail-loading__block" />
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="container detail-top">
        <Link to="/gallery" className="btn-link">
          <FiArrowLeft aria-hidden="true" /> Back to the gallery
        </Link>
      </div>

      <section className="container detail-grid">
        <div className="detail-media">
          <div className="detail-frame">
            {artwork.art_image ? (
              <img src={artwork.art_image} alt={artwork.art_title} />
            ) : (
              <div className="art-card__placeholder serif">No image available</div>
            )}
          </div>
          <p className="detail-credit">
            Demo catalogue Â· public-domain imagery Â· attribution unavailable
          </p>
        </div>

        <div className="detail-copy">
          <span className="eyebrow">{artwork.style || 'From the collection'}</span>
          <h1 className="serif">{artwork.art_title}</h1>
          <p className="detail-artist">{artwork.artiste || 'Unattributed'}</p>

          <div className="detail-actions">
            <button
              type="button"
              className={`action-button ${liked ? 'is-active' : ''}`}
              aria-pressed={liked}
              onClick={() => handleToggle('like')}
            >
              <FiHeart aria-hidden="true" />
              {liked ? 'Liked' : 'Like'}
              <span>{likes}</span>
            </button>
            <button
              type="button"
              className={`action-button ${saved ? 'is-active' : ''}`}
              aria-pressed={saved}
              onClick={() => handleToggle('bookmark')}
            >
              <FiBookmark aria-hidden="true" />
              {saved ? 'Saved' : 'Save'}
              <span>{saves}</span>
            </button>
            <button type="button" className="action-button" onClick={handleShare}>
              <FiShare2 aria-hidden="true" />
              Share
            </button>
          </div>

          <p className="detail-description">{artwork.art_desc}</p>

          <dl className="detail-meta">
            <div>
              <dt>Period</dt>
              <dd>{artwork.era || 'Not recorded'}</dd>
            </div>
            <div>
              <dt>Medium</dt>
              <dd>{artwork.medium || 'Not recorded'}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{artwork.year || 'Unknown'}</dd>
            </div>
            <div>
              <dt>Views</dt>
              <dd>{artwork.views || 0}</dd>
            </div>
          </dl>

          {artwork.tags?.length > 0 && (
            <div className="detail-tags">
              {artwork.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <div>
            <span className="eyebrow">More like this</span>
            <h2 className="section-title">Close in spirit.</h2>
          </div>
        </div>
        <ArtworkGrid
          artworks={similar || []}
          loading={similarLoading}
          skeletonCount={4}
          emptyMessage="This work is the only one of its kind in the collection."
        />
      </section>
    </div>
  )
}

export default ArtworkDetail

