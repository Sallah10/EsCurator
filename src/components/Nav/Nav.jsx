import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FiBookmark, FiMenu, FiSearch, FiX } from 'react-icons/fi'
import { useInteractions } from '../../api/hooks'
import './nav.css'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/gallery', label: 'Gallery' },
  { to: '/collections', label: 'Collections' },
  { to: '/about', label: 'About' },
]

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const { data: interactions } = useInteractions()

  const savedCount = Array.isArray(interactions)
    ? interactions.filter((item) => item.bookmarked).length
    : 0

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const submitSearch = (event) => {
    event.preventDefault()
    const term = search.trim()
    setMenuOpen(false)
    navigate(term ? `/gallery?search=${encodeURIComponent(term)}` : '/gallery')
  }

  return (
    <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" className="wordmark" aria-label="EsCurator home">
          <span className="wordmark-mark">E</span>
          <span className="wordmark-text">
            ESCURATOR
            <small>art, curated</small>
          </span>
        </Link>

        <nav id="mobile-menu" className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Main">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <form className="nav-search" onSubmit={submitSearch} role="search">
            <FiSearch aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search the collection"
              aria-label="Search the collection"
            />
          </form>
          <Link to="/saved" className="nav-saved" onClick={() => setMenuOpen(false)}>
            <FiBookmark aria-hidden="true" />
            <span>Saved</span>
            {savedCount > 0 && <span className="saved-count">{savedCount}</span>}
          </Link>
        </nav>

        <div className="nav-mobile-actions">
          <Link to="/saved" className="nav-saved nav-saved-mobile" aria-label={`Saved (${savedCount})`}>
            <FiBookmark aria-hidden="true" />
            {savedCount > 0 && <span className="saved-count">{savedCount}</span>}
          </Link>
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Nav

