import { Link } from 'react-router-dom'
import './notFound.css'

function NotFound() {
  return (
    <div className="page container not-found">
      <span className="eyebrow">404</span>
      <h1 className="display">
        This wall is <em>empty.</em>
      </h1>
      <p className="lede">
        The page you were looking for is not in the collection. The gallery is
        still open, though.
      </p>
      <div className="not-found__actions">
        <Link to="/" className="btn btn-primary">
          Back home
        </Link>
        <Link to="/gallery" className="btn btn-ghost">
          Browse the gallery
        </Link>
      </div>
    </div>
  )
}

export default NotFound
