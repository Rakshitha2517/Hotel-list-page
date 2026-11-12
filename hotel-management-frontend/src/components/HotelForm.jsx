import { 
  useEffect, useState 
} from 'react'

const emptyForm = {
  title: '',
  description: '',
  latitude: '',
  longitude: '',
  price: '',
  image: '',
}

export default function HotelForm({ initialData, onSubmit, submitLabel }) {
  const [form, setForm] = useState(initialData || emptyForm)
  const [errors, setErrors] = useState({})
  const [imageName, setImageName] = useState('')

  useEffect(() => {
    setForm(initialData || emptyForm)
  }, [initialData])

  function updateField(event) {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  function handleImage(event) {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setErrors((previous) => ({ ...previous, image: 'Please choose an image file.' }))
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setErrors((previous) => ({ ...previous, image: 'Image must be smaller than 2 MB.' }))
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setForm((previous) => ({ ...previous, image: reader.result }))
      setImageName(file.name)
      setErrors((previous) => ({ ...previous, image: '' }))
    }
    reader.readAsDataURL(file)
  }

  function validate() {
    const next = {}
    if (!form.title.trim()) next.title = 'Hotel name is required.'
    if (!form.description.trim()) next.description = 'Description is required.'
    if (form.latitude === '' || !Number.isFinite(Number(form.latitude)) || Number(form.latitude) < -90 || Number(form.latitude) > 90) next.latitude = 'Enter latitude between -90 and 90.'
    if (form.longitude === '' || !Number.isFinite(Number(form.longitude)) || Number(form.longitude) < -180 || Number(form.longitude) > 180) next.longitude = 'Enter longitude between -180 and 180.'
    if (form.price === '' || !Number.isFinite(Number(form.price)) || Number(form.price) <= 0) next.price = 'Price must be greater than zero.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!validate()) return
    onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
      price: Number(form.price),
      image: form.image || 'https://placehold.co/800x500?text=Hotel',
    })
  }

  return (
    <form className="hotel-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <div className="field full-width">
          <label htmlFor="image">Hotel image</label>
          <div className="upload-box">
            {form.image ? <img src={form.image} alt="Hotel preview" className="image-preview" /> : <div className="upload-placeholder">▧<span>Choose a hotel photo</span><small>PNG, JPG or WEBP · max 2 MB</small></div>}
            <div className="upload-controls">
              <input id="image" type="file" accept="image/*" onChange={handleImage} />
              <small>{imageName || (initialData?.image ? 'Current image is shown above' : 'Image is optional; a placeholder will be used if empty.')}</small>
              {errors.image && <span className="error-text">{errors.image}</span>}
            </div>
          </div>
        </div>

        <div className="field full-width">
          <label htmlFor="title">Hotel name <span>*</span></label>
          <input id="title" name="title" value={form.title} onChange={updateField} placeholder="e.g. Ocean Pearl Resort" />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div className="field full-width">
          <label htmlFor="description">Description <span>*</span></label>
          <textarea id="description" name="description" rows="4" value={form.description} onChange={updateField} placeholder="Write a short description about the hotel..." />
          {errors.description && <span className="error-text">{errors.description}</span>}
        </div>

        <div className="field">
          <label htmlFor="latitude">Latitude <span>*</span></label>
          <input id="latitude" name="latitude" type="number" step="any" value={form.latitude} onChange={updateField} placeholder="e.g. 11.9345" />
          {errors.latitude && <span className="error-text">{errors.latitude}</span>}
        </div>
        <div className="field">
          <label htmlFor="longitude">Longitude <span>*</span></label>
          <input id="longitude" name="longitude" type="number" step="any" value={form.longitude} onChange={updateField} placeholder="e.g. 79.8355" />
          {errors.longitude && <span className="error-text">{errors.longitude}</span>}
        </div>
        <div className="field">
          <label htmlFor="price">Price per night (₹) <span>*</span></label>
          <input id="price" name="price" type="number" min="1" step="1" value={form.price} onChange={updateField} placeholder="e.g. 2500" />
          {errors.price && <span className="error-text">{errors.price}</span>}
        </div>
      </div>

      <div className="form-footer">
        <p className="required-note">* Required fields</p>
        <button className="button button-primary" type="submit">{submitLabel}</button>
      </div>
    </form>
  )
}