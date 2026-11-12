import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet-async'
import HotelForm from '../components/HotelForm'
import { addHotel, updateHotel } from '../redux/hotelsSlice'

export default function HotelFormPage({ mode }) {
  const isEdit = mode === 'edit'
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const hotel = useSelector((state) => state.hotels.items.find((item) => item.id === id))

  useEffect(() => {
    if (isEdit && !hotel) navigate('/admin/dashboard', { replace: true })
  }, [isEdit, hotel, navigate])

  if (isEdit && !hotel) return null

  function handleSubmit(values) {
    if (isEdit) dispatch(updateHotel({ ...values, id }))
    else dispatch(addHotel(values))
    navigate('/admin/dashboard')
  }

  return (
    <>
      <Helmet>
        <title>{isEdit ? 'Edit hotel' : 'Add hotel'} | StayFinder</title>
        <meta name="description" content="Add or update a hotel listing on StayFinder." />
      </Helmet>
      <div className="form-page-heading">
        <Link to="/admin/dashboard" className="back-link">← Back to admin dashboard</Link>
        <p className="eyebrow">{isEdit ? 'UPDATE PROPERTY' : 'NEW PROPERTY'}</p>
        <h1>{isEdit ? 'Edit hotel details' : 'Add a hotel'}</h1>
        <p className="intro-copy">{isEdit ? 'Make changes to your hotel listing.' : 'Add a new place for travellers to discover.'}</p>
      </div>
      <section className="form-panel">
        <HotelForm initialData={hotel} onSubmit={handleSubmit} submitLabel={isEdit ? 'Save changes' : 'Add hotel'} />
      </section>
    </>
  )
}