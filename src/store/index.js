import { configureStore } from '@reduxjs/toolkit'
import brandReducer from './brands/slice'

export const store = configureStore({
  reducer: {
    brands: brandReducer
  }
})
