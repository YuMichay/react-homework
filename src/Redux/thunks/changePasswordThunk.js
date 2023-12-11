import {createAsyncThunk} from '@reduxjs/toolkit'
import {ROUTES, URL} from '../../constants/constants'

export const changePassword = createAsyncThunk(
  ROUTES.CHANGE_PASSWORD,
  async ({newPassword, token}, {rejectWithValue}) => {
    try {
      const request = await fetch(`${URL}auth`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({password: newPassword}),
      })

      if (request.ok) {
        const data = await request.json()
        return data
      }
    } catch (error) {
      return rejectWithValue({message: error.message})
    }
  }
)
