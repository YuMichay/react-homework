import {createSlice} from '@reduxjs/toolkit'
import {authorizeUser} from '../thunks/loginThunk'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    password: '',
    isAuthorized: false,
    isLoading: '',
    error: '',
    token: '',
  },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    authorize: (state, action) => {
      state.isAuthorized = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(authorizeUser.pending, state => {
        state.isLoading = true
        state.error = ''
      })
      .addCase(authorizeUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthorized = true
        state.error = ''
        state.token = action.payload
      })
      .addCase(authorizeUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.isAuthorized = false
      })
  },
})
export const {setUser, setPassword, setError, authorize} = userSlice.actions
export default userSlice.reducer
