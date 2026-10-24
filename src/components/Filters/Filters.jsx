import { FiSearch, FiX } from 'react-icons/fi'
import './filters.css'

function Filters({ facets, style, onStyle, search, onSearch, sort, onSort, resultCount, loading }) {
  const styles = facets?.styles || []

  return (
    <div className="filters">
      <div className="filters-top">
        <label className="filters-search">
          <FiSearch aria-hidden="true" />
          <span className="sr-only">Search artworks</span>
          <input
            type="search"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search by title, style or period"
          />
          {search && (
            <button type="button" onClick={() => onSearch('')} aria-label="Clear search">
              <FiX aria-hidden="true" />
            </button>
          )}
        </label>

        <div className="filters-sort">
          <label htmlFor="sort">Sort by</label>
          <select id="sort" value={sort} onChange={(event) => onSort(event.target.value)}>
            <option value="art_title">Title (A-Z)</option>
            <option value="-likes">Most liked</option>
            <option value="-bookmarks">Most saved</option>
            <option value="-views">Most viewed</option>
            <option value="-created_at">Newest first</option>
          </select>
        </div>
      </div>

      <div className="filters-styles" role="group" aria-label="Filter by style">
        <button
          type="button"
          className="chip"
          aria-pressed={!style}
          onClick={() => onStyle('')}
        >
          All works
          {facets?.total != null && <span className="chip-count">{facets.total}</span>}
        </button>
        {styles.map((item) => (
          <button
            key={item.style}
            type="button"
            className="chip"
            aria-pressed={style === item.style}
            onClick={() => onStyle(item.style)}
          >
            {item.style}
            <span className="chip-count">{item.count}</span>
          </button>
        ))}
      </div>

      <p className="filters-count" aria-live="polite">
        {loading
          ? 'Looking through the collection...'
          : `${resultCount} ${resultCount === 1 ? 'work' : 'works'}${
              style ? ` in ${style}` : ''
            }${search ? ` for "${search}"` : ''}`}
      </p>
    </div>
  )
}

export default Filters
