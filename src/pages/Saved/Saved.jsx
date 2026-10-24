import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ArtworkGrid from '../../components/ArtworkGrid/ArtworkGrid'
import { useInteractions } from '../../api/hooks'
import './saved.css'

const tabs = [
  { id: 'saved', label: 'Saved' },
  { id: 'liked', label: 'Liked' },
]

function Saved() {
  const { data: interactions, isLoading } = useInteractions()
  const [tab, setTab] = useState('saved')

  const items = useMemo(() => {
    if (!Array.isArray(interactions)) return []
    return interactions
      .filter((item) => (tab === 'saved' ? item.bookmarked : item.liked))
      .map((item) => ({
        ...item.artwork,
        is_liked: item.liked,
        is_bookmarked: item.bookmarked,
      }))
  }, [interactions, tab])

  const savedTotal = interactions?.filter((item) => item.bookmarked).length || 0
  const likedTotal = interactions?.filter((item) => item.liked).length || 0

  return (
    <div className="page">
      <header className="page-header">
        <div className="container">
          <span className="eyebrow">Your collection</span>
          <h1>The works you kept.</h1>
          <p>
            Saved and liked works live in this browser. Clear your site data and
            they will disappear - no account, no server-side profile.
          </p>
        </div>
      </header>

      <div className="container small-section">
        <div className="saved-tabs" role="tablist" aria-label="Saved works">
          {tabs.map((item) => {
            const count = item.id === 'saved' ? savedTotal : likedTotal
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={tab === item.id}
                className="saved-tab"
                onClick={() => setTab(item.id)}
              >
                {item.label}
                <span>{count}</span>
              </button>
            )
          })}
        </div>

        {!isLoading && items.length === 0 ? (
          <div className="empty-state saved-empty">
            <h3>{tab === 'saved' ? 'Nothing saved yet' : 'Nothing liked yet'}</h3>
            <p>
              {tab === 'saved'
                ? 'Tap the bookmark on any work and it will appear here.'
                : 'Tap the heart on a work you respond to.'}
            </p>
            <Link to="/gallery" className="btn btn-primary">
              Go to the gallery
            </Link>
          </div>
        ) : (
          <ArtworkGrid artworks={items} loading={isLoading} skeletonCount={4} />
        )}
      </div>
    </div>
  )
}

export default Saved
