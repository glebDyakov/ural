import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  list: null,
  isLoading: false,
  error: null,
}

const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    setError: (state, value) => {
      state.error = value.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchBrands.pending, (state, _) => {
      state.list = null
      state.error = null
      state.isLoading = true
    })
    builder.addCase(fetchBrands.rejected, (state, payload) => {
      state.error = payload
      state.isLoading = false
    })
    builder.addCase(fetchBrands.fulfilled, (state, action) => {
      state.list = action.payload
      state.isLoading = false
    })
  },
})

export const fetchBrands = createAsyncThunk(
  'brands/fetchBrands',
  async (number, thunkAPI) => {
    
    try {
      const response = await axios.get(`https://api.favorit-parts.ru/hs/hsprice/?key=00000000-0000-0000-0000-000000000001&number=${number}`)
      if (response.data.error) {
        throw new Error(response.data.error)
      }
      if (response.status === 200) {
        return response.data
      } else {
        throw new Error('Something went wrong')
      }
    } catch (error) {
      thunkAPI.dispatch(brandsSlice.actions.setError(error))
    }
  }
)

export default brandsSlice.reducer
