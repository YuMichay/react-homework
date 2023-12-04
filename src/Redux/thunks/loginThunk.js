import {createAsyncThunk} from '@reduxjs/toolkit'
import {URL} from '../../constants/constants'

export const authorizeUser = createAsyncThunk(
  'user/authorizeUser',
  async ({username, password}, {rejectWithValue}) => {
    try {
      const request = await fetch(`${URL}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      })

      if (!request.ok) {
        const errorData = await request.json()
        return rejectWithValue(errorData)
      }

      const data = await request.json()
      const token = data.token
      localStorage.setItem('token', token)
      return token
    } catch (error) {
      return rejectWithValue({message: error.message})
    }
  }
)
