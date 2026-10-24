import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { useStats } from '../../api/hooks'
import './about.css'

const signals = [
  {
    title: 'Content similarity',
    weight: '55%',
    copy: 'Works that share style, period, medium or artist with things you liked score higher. It is a tag-overlap score, not a neural network.',
  },
  {
    title: 'Collaborative signal',
    weight: '25%',
    copy: 'If visitors with overlapping likes also engaged with a work, that work gets a boost. Anonymous sessions only - no personal data leaves the browser.',
  },
  {
    title: 'Popularity',
    weight: '20%',
    copy: 'Likes, saves and views act as a gentle tie-breaker. On a cold start, popularity and curator picks do the work.',
  },
]

const stack = [
  ['Frontend', 'React 18 · Vite · React Router · TanStack Query · Axios'],
  ['Backend', 'Django 6 · Django REST Framework · Pillow · WhiteNoise'],
  ['Data', 'SQLite locally · PostgreSQL in production via DATABASE_URL'],
  ['Quality', '19 API and recommender tests · ESLint · production build checked'],
]

function About() {
  const { data: stats } = useStats()

  return (
    <div className="page">
      <header className="page-header about-header">
        <div className="container">
          <span className="eyebrow">About the project</span>
          <h1>
            A final-year project,
            <br />
            rebuilt like a product.
          </h1>
          <p>
            EsCurator started as a university project: a React gallery with a
            Django API and an ambitious idea about recommendations. Years later
            it has been rebuilt end to end - honest data, a working recommender,
            tests, and a UI that is not embarrassed to be shown.
          </p>
        </div>
      </header>

      <section className="section container about-story">
        <div className="about-story__copy">
          <h2 className="section-title">Why rebuild it instead of hiding it?</h2>
          <p>
            The original code had good bones and a lot of scaffolding: an API
            that did not run, a recommendation endpoint that referenced a model
            file that never existed, and a README with the wrong commands. That
            is not a portfolio piece - it is a warning sign.
          </p>
          <p>
            The rebuild keeps the idea and throws away the shortcuts. The
            catalogue is seeded from the original image archive, the API is
            covered by tests, and every recommendation carries a reason you can
            read in the interface.
          </p>
        </div>
        <dl className="about-numbers">
          <div>
            <dt>Works seeded</dt>
            <dd>{stats?.artworks ?? 0}</dd>
          </div>
          <div>
            <dt>Curated shelves</dt>
            <dd>{stats?.collections ?? 0}</dd>
          </div>
          <div>
            <dt>API tests</dt>
            <dd>19</dd>
          </div>
          <div>
            <dt>Runtime model files</dt>
            <dd>0</dd>
          </div>
        </dl>
      </section>

      <section className="section about-signals">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Under the hood</span>
              <h2 className="section-title">An explainable recommender.</h2>
            </div>
            <p className="muted about-signals__note">
              Weights are configurable through environment variables, so the
              balance can be tuned without a redeploy of the logic.
            </p>
          </div>

          <div className="signal-grid">
            {signals.map((signal) => (
              <article key={signal.title} className="signal-card">
                <span className="signal-weight">{signal.weight}</span>
                <h3>{signal.title}</h3>
                <p>{signal.copy}</p>
              </article>
            ))}
          </div>

          <p className="about-cold">
            No signal yet? The shelf falls back to curator picks and popular
            works. Like one piece and the content signal takes over
            immediately.
          </p>
        </div>
      </section>

      <section className="section container about-stack">
        <div className="section-head">
          <div>
            <span className="eyebrow">The build</span>
            <h2 className="section-title">A small stack, used properly.</h2>
          </div>
        </div>
        <dl className="stack-list">
          {stack.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <div className="about-notes">
          <h3>What is deliberately honest</h3>
          <ul>
            <li>
              Artist attribution was not in the source archive, so records say
              &ldquo;Unattributed&rdquo; instead of guessing.
            </li>
            <li>
              Style and period labels are demo metadata, editable in the Django
              admin.
            </li>
            <li>
              Accounts exist in the API (register, login, logout) but the UI
              intentionally works without one.
            </li>
            <li>
              Media files are served by Django in development; production needs
              object storage or a reverse proxy for /media.
            </li>
          </ul>
        </div>
      </section>

      <section className="container about-cta">
        <div>
          <span className="eyebrow">Have a look</span>
          <h2 className="section-title">Start with one work.</h2>
        </div>
        <Link to="/gallery" className="btn btn-primary">
          Enter the gallery <FiArrowRight aria-hidden="true" />
        </Link>
      </section>
    </div>
  )
}

export default About
