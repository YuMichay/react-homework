import {createSlice} from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    locale: 'en',
  },
  reducers: {
    change: (state, action) => {
      state.locale = action.payload
    },
  },
})
export const {change} = appSlice.actions
export default appSlice.reducer
