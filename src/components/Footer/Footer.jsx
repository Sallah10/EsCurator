import { Link } from 'react-router-dom'
import './footer.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link to="/" className="footer-wordmark serif">
            EsCurator
          </Link>
          <p>
            A small, opinionated gallery that learns what you like and explains
            why. Built with React and Django.
          </p>
        </div>

        <div className="footer-col">
          <h2>Explore</h2>
          <Link to="/gallery">Gallery</Link>
          <Link to="/collections">Collections</Link>
          <Link to="/saved">Saved works</Link>
          <Link to="/about">About the project</Link>
        </div>

        <div className="footer-col">
          <h2>The API</h2>
          <a href="/api/health/" target="_blank" rel="noreferrer">
            Health check
          </a>
          <a href="/api/art_works/" target="_blank" rel="noreferrer">
            Artworks feed
          </a>
          <a href="/admin/" target="_blank" rel="noreferrer">
            Django admin
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          &copy; {year} EsCurator. Demo catalogue, public-domain imagery.
        </span>
        <span>Made as a portfolio project</span>
      </div>
    </footer>
  )
}

export default Footer
