import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { GoodsRepository } from '~/data/goods'

const repository = new GoodsRepository()

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
      const list = await repository.fetchBrands(number)
      if (!list.length) throw new Error('No manufacturers found')
      return list
    } catch (error) {
      thunkAPI.dispatch(brandsSlice.actions.setError(error))
    }
  }
)

export default brandsSlice.reducer
