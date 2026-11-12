import { createSlice } from '@reduxjs/toolkit'
import { sampleHotels } from '../data/sampleHotels'

const STORAGE_KEY = 'stayfinder-hotels'

function loadHotels() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch (error) {
    console.warn('Could not read saved hotels:', error)
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleHotels))
  return sampleHotels
}

const hotelsSlice = createSlice({
  name: 'hotels',
  initialState: {
    items: loadHotels(),
    notice: '',
  },
  reducers: {
    addHotel(state, action) {
      state.items.unshift({ ...action.payload, id: crypto.randomUUID() })
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
      state.notice = 'Hotel added successfully.'
    },
    updateHotel(state, action) {
      const index = state.items.findIndex((hotel) => hotel.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
        state.notice = 'Hotel updated successfully.'
      }
    },
    deleteHotel(state, action) {
      state.items = state.items.filter((hotel) => hotel.id !== action.payload)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
      state.notice = 'Hotel deleted successfully.'
    },
    clearNotice(state) {
      state.notice = ''
    },
  },
})

export const { addHotel, updateHotel, deleteHotel, clearNotice } = hotelsSlice.actions
export default hotelsSlice.reducer