import brandReducer from './brands/slice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    brands: brandReducer
  }
})
