import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import ArtworkGrid from '../../components/ArtworkGrid/ArtworkGrid'
import CollectionCard from '../../components/CollectionCard/CollectionCard'
import ArtworkCard from '../../components/ArtworkCard/ArtworkCard'
import { useArtworks, useCollections, useRecommendations, useStats } from '../../api/hooks'
import './home.css'

const steps = [
  {
    number: '01',
    title: 'Look slowly',
    copy: 'Browse a small, considered catalogue. Every work has its own page, its own context, and room to breathe.',
  },
  {
    number: '02',
    title: 'Like what stays with you',
    copy: 'Tap the heart or the bookmark. No account, no email, no onboarding flow. Your taste profile is stored in this browser.',
  },
  {
    number: '03',
    title: 'Watch the shelf change',
    copy: 'The "For you" shelf re-ranks as you go. It combines shared tags, what similar visitors liked, and what is quietly popular.',
  },
]

function Home() {
  const { data: stats } = useStats()
  const { data: featured, isLoading: featuredLoading } = useArtworks({
    featured: '1',
    ordering: '-likes',
  })
  const { data: recommendations, isLoading: recLoading } = useRecommendations(4)
  const { data: collections } = useCollections()

  const featuredWorks = featured?.results || []
  const hero = featuredWorks[0]
  const recs = recommendations?.results || []
  const shelves = (collections || []).filter((collection) => collection.featured).slice(0, 3)

  return (
    <div className="page">
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">A curated way to look</span>
            <h1 className="display">
              Art, curated <em>to your taste.</em>
            </h1>
            <p className="lede">
              EsCurator is a small gallery that pays attention. Browse the
              collection, save what moves you, and get recommendations that
              explain themselves instead of hiding behind a black box.
            </p>
            <div className="hero-ctas">
              <Link to="/gallery" className="btn btn-primary">
                Explore the collection <FiArrowRight aria-hidden="true" />
              </Link>
              <Link to="/about" className="btn btn-ghost">
                How it works
              </Link>
            </div>
            <dl className="hero-stats">
              <div>
                <dt>Works</dt>
                <dd>{stats?.artworks ?? '55'}</dd>
              </div>
              <div>
                <dt>Collections</dt>
                <dd>{stats?.collections ?? '5'}</dd>
              </div>
              <div>
                <dt>Styles</dt>
                <dd>{stats?.styles ?? '14'}</dd>
              </div>
            </dl>
          </div>

          <div className="hero-visual">
            <div className="hero-frame">
              {hero?.art_image ? (
                <img src={hero.art_image} alt={hero.art_title} />
              ) : (
                <div className="skeleton hero-frame__skeleton" />
              )}
              <div className="hero-frame__caption">
                <span>{hero?.art_title || 'Curator\u2019s pick'}</span>
                <span>{hero?.style || 'From the collection'}</span>
              </div>
            </div>
            <div className="hero-chip">
              <span className="hero-chip__dot" aria-hidden="true" />
              Recommendations explain why
            </div>
          </div>
        </div>
      </section>

      <section className="section home-rec">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">For you</span>
              <h2 className="section-title">Picked from what you lingered on.</h2>
            </div>
            <Link to="/gallery" className="btn-link">
              Browse everything <FiArrowRight aria-hidden="true" />
            </Link>
          </div>

          {recLoading ? (
            <ArtworkGrid loading skeletonCount={4} />
          ) : (
            <div className="rec-grid">
              {recs.map((artwork) => (
                <div key={artwork.id} className="rec-item">
                  <p className="rec-reason">{artwork.reason}</p>
                  <ArtworkCard artwork={artwork} />
                </div>
              ))}
            </div>
          )}
          {!recLoading && recs.length === 0 && (
            <div className="empty-state">
              <h3>Start anywhere</h3>
              <p>Like a few works and this shelf will fill itself.</p>
              <Link to="/gallery" className="btn btn-primary">
                Find something you like
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="section section-tight home-featured">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">The collection</span>
              <h2 className="section-title">A few works to begin with.</h2>
            </div>
            <Link to="/gallery" className="btn-link">
              See all works <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
          <ArtworkGrid
            artworks={featuredWorks.slice(0, 8)}
            loading={featuredLoading}
            skeletonCount={8}
          />
        </div>
      </section>

      <section className="section home-collections">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Curated shelves</span>
              <h2 className="section-title">Browse by mood, not by menu.</h2>
            </div>
            <Link to="/collections" className="btn-link">
              All collections <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="collections-grid">
            {shelves.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} large />
            ))}
          </div>
        </div>
      </section>

      <section className="section home-how">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">How it works</span>
              <h2 className="section-title">A recommendation engine you can read.</h2>
            </div>
            <p className="how-note">
              No account required. Your signals live in this browser and are
              tied to an anonymous session id.
            </p>
          </div>
          <div className="how-grid">
            {steps.map((step) => (
              <article key={step.number} className="how-card">
                <span className="how-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
