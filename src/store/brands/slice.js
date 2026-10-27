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
    builder.addCase(fetchGoods.pending, (state, _) => {
      state.list = null
      state.error = null
      state.isLoading = true
    })
    builder.addCase(fetchGoods.rejected, (state, payload) => {
      state.error = payload
      state.isLoading = false
    })
    builder.addCase(fetchGoods.fulfilled, (state, action) => {
      state.list = action.payload
      state.isLoading = false
    })
  },
})

export const fetchGoods = createAsyncThunk(
  'brands/fetchGoods',
  async (params, thunkAPI) => {
    try {
      const list = await repository.fetchGoods(params)
      if (!list.length) throw new Error('No manufacturers found')
      return list
    } catch (error) {
      thunkAPI.dispatch(brandsSlice.actions.setError(error))
    }
  }
)

export default brandsSlice.reducer
