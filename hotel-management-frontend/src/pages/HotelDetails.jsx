import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet-async'

export default function HotelDetails() {
  const { id } = useParams()
  const isAdmin = localStorage.getItem('stayfinder-role') === 'admin'
  const hotel = useSelector((state) => state.hotels.items.find((item) => item.id === id))

  if (!hotel) {
    return <div className="empty-state"><h2>Hotel not found</h2><Link to="/" className="button button-primary">Back to hotels</Link></div>
  }

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${hotel.longitude - 0.03}%2C${hotel.latitude - 0.02}%2C${hotel.longitude + 0.03}%2C${hotel.latitude + 0.02}&layer=mapnik&marker=${hotel.latitude}%2C${hotel.longitude}`

  return (
    <>
      <Helmet>
        <title>{hotel.title} | StayFinder</title>
        <meta name="description" content={hotel.description.slice(0, 155)} />
      </Helmet>
      <Link to="/" className="back-link">← Back to hotels</Link>
      <article className="details-layout">
        <div className="details-main">
          <img className="details-image" src={hotel.image} alt={`${hotel.title} hotel`} />
          <div className="details-title-row">
            <div><p className="eyebrow">HOTEL DETAILS</p><h1>{hotel.title}</h1></div>
            <div className="details-price">₹{Number(hotel.price).toLocaleString('en-IN')}<small> / night</small></div>
          </div>
          <section className="details-section">
            <h2>About this hotel</h2>
            <p>{hotel.description}</p>
          </section>
          <section className="details-section">
            <h2>Location</h2>
            <p className="coordinates">Latitude: {hotel.latitude} &nbsp; · &nbsp; Longitude: {hotel.longitude}</p>
            <div className="map-frame">
              <iframe title={`Map showing ${hotel.title}`} src={mapUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <a className="text-link map-link" href={`https://www.openstreetmap.org/?mlat=${hotel.latitude}&mlon=${hotel.longitude}#map=15/${hotel.latitude}/${hotel.longitude}`} target="_blank" rel="noreferrer">Open map in a new tab ↗</a>
          </section>
        </div>
        <aside className="details-sidebar">
          <h3>Listing information</h3>
          <div className="info-row"><span>Price per night</span><strong>₹{Number(hotel.price).toLocaleString('en-IN')}</strong></div>
          <div className="info-row"><span>Latitude</span><strong>{hotel.latitude}</strong></div>
          <div className="info-row"><span>Longitude</span><strong>{hotel.longitude}</strong></div>
          {isAdmin ? <Link className="button button-primary full-button" to={`/admin/hotels/${hotel.id}/edit`}>Edit this hotel</Link> : <p className="viewer-note">You are viewing this hotel as a user. Only administrators can manage listings.</p>}
        </aside>
      </article>
    </>
  )
}