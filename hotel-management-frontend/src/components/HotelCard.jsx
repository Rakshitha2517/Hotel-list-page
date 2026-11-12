import { Link } from 'react-router-dom'

export default function HotelCard({ hotel, onDelete, isAdmin = false }) {
  const description = hotel.description.length > 105
    ? `${hotel.description.slice(0, 105)}…`
    : hotel.description

  return (
    <article className="hotel-card">
      <Link to={`/hotels/${hotel.id}`} className="card-image-link" aria-label={`View ${hotel.title}`}>
        <img className="hotel-image" src={hotel.image || 'https://placehold.co/800x500?text=Hotel'} alt={`${hotel.title} hotel`} />
      </Link>
      <div className="card-content">
        <div className="card-heading">
          <Link to={`/hotels/${hotel.id}`} className="card-title">{hotel.title}</Link>
          <span className="price">₹{Number(hotel.price).toLocaleString('en-IN')}<small> / night</small></span>
        </div>
        <p className="card-description">{description}</p>
        <div className="card-actions">
          <Link className="text-link" to={`/hotels/${hotel.id}`}>View details →</Link>
          {isAdmin && <div className="action-buttons">
            <Link className="button button-light button-small" to={`/admin/hotels/${hotel.id}/edit`}>Edit</Link>
            <button className="button button-danger button-small" onClick={() => onDelete(hotel)}>Delete</button>
          </div>}
        </div>
      </div>
    </article>
  )
}