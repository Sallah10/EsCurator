import { Route, Routes } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Home from './pages/Home/Home'
import Gallery from './pages/Gallery/Gallery'
import Collections from './pages/Collections/Collections'
import CollectionDetail from './pages/Collections/CollectionDetail'
import ArtworkDetail from './pages/ArtworkDetail/ArtworkDetail'
import Saved from './pages/Saved/Saved'
import About from './pages/About/About'
import NotFound from './pages/NotFound/NotFound'

function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollToTop />
      <Nav />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:slug" element={<CollectionDetail />} />
          <Route path="/artwork/:id" element={<ArtworkDetail />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
