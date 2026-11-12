import { useMemo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet-async'
import HotelCard from '../components/HotelCard'
import Pagination from '../components/Pagination'
import { clearNotice, deleteHotel } from '../redux/hotelsSlice'

const PAGE_SIZE = 6

export default function HotelList({ view = 'user' }) {
  const isAdmin = view === 'admin'
  const dispatch = useDispatch()
  const { items, notice } = useSelector((state) => state.hotels)
  const [search, setSearch] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [page, setPage] = useState(1)
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (notice) {
      setToast(notice)
      const timer = setTimeout(() => {
        setToast('')
        dispatch(clearNotice())
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notice, dispatch])

  const filteredHotels = useMemo(() => {
    return items.filter((hotel) => {
      const matchesTitle = hotel.title.toLowerCase().includes(search.toLowerCase())
      const matchesMin = minPrice === '' || Number(hotel.price) >= Number(minPrice)
      const matchesMax = maxPrice === '' || Number(hotel.price) <= Number(maxPrice)
      return matchesTitle && matchesMin && matchesMax
    })
  }, [items, search, minPrice, maxPrice])

  const totalPages = Math.max(1, Math.ceil(filteredHotels.length / PAGE_SIZE))
  const visibleHotels = filteredHotels.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleDelete(hotel) {
    const confirmed = window.confirm(`Delete "${hotel.title}"? This action cannot be undone.`)
    if (confirmed) dispatch(deleteHotel(hotel.id))
  }

  function updateFilter(setter, value) {
    setter(value)
    setPage(1)
  }

  return (
    <>
      <Helmet>
        <title>{isAdmin ? 'Admin dashboard' : 'Hotels'} | StayFinder</title>
        <meta name="description" content="Browse hotel listings on StayFinder." />
      </Helmet>

      {toast && <div className="toast" role="status">{toast}</div>}

      <section className="page-intro">
        <div>
          <p className="eyebrow">{isAdmin ? 'ADMINISTRATION' : 'FIND YOUR NEXT STAY'}</p>
          <h1>{isAdmin ? 'Manage hotels' : 'Explore hotels'}</h1>
          <p className="intro-copy">{isAdmin ? 'Add, update and remove hotel listings.' : 'Discover comfortable places to stay, all in one place.'}</p>
        </div>
        <div className="count-badge"><strong>{items.length}</strong><span>properties</span></div>
        {isAdmin && <a href="/admin/hotels/new" className="button button-primary">＋ Add hotel</a>}
      </section>

      <section className="filter-panel" aria-label="Search and filters">
        <div className="field search-field">
          <label htmlFor="search">Search by hotel name</label>
          <div className="input-with-icon"><span>⌕</span><input id="search" value={search} onChange={(e) => updateFilter(setSearch, e.target.value)} placeholder="Search hotels..." /></div>
        </div>
        <div className="field">
          <label htmlFor="minPrice">Minimum price (₹)</label>
          <input id="minPrice" type="number" min="0" value={minPrice} onChange={(e) => updateFilter(setMinPrice, e.target.value)} placeholder="No minimum" />
        </div>
        <div className="field">
          <label htmlFor="maxPrice">Maximum price (₹)</label>
          <input id="maxPrice" type="number" min="0" value={maxPrice} onChange={(e) => updateFilter(setMaxPrice, e.target.value)} placeholder="No maximum" />
        </div>
        <button className="button button-light clear-button" onClick={() => { setSearch(''); setMinPrice(''); setMaxPrice(''); setPage(1) }}>Clear</button>
      </section>

      <div className="results-line">
        <h2>Available stays <span>({filteredHotels.length})</span></h2>
        <span className="muted">Showing {visibleHotels.length} of {filteredHotels.length}</span>
      </div>

      {visibleHotels.length ? (
        <div className="hotel-grid">
          {visibleHotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} isAdmin={isAdmin} onDelete={handleDelete} />)}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">⌕</div>
          <h3>No hotels found</h3>
          <p>Try changing your search or price range.</p>
          <button className="button button-light" onClick={() => { setSearch(''); setMinPrice(''); setMaxPrice(''); setPage(1) }}>Clear filters</button>
        </div>
      )}

      <Pagination currentPage={Math.min(page, totalPages)} totalPages={totalPages} onPageChange={setPage} />
    </>
  )
}