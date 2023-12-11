import {createAsyncThunk} from '@reduxjs/toolkit'
import {ROUTES, URL} from '../../constants/constants'

export const authorizeUser = createAsyncThunk(
  `${ROUTES.LOGIN}/authorization`,
  async ({username, password}, {rejectWithValue}) => {
    try {
      const request = await fetch(`${URL}auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      })

      const data = await request.json()
      const token = data.token
      localStorage.setItem('token', token)
      return token
    } catch (error) {
      return rejectWithValue({message: error.message})
    }
  }
)
