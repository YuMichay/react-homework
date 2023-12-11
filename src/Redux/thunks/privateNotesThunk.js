import {createAsyncThunk} from '@reduxjs/toolkit'
import {ROUTES, URL} from '../../constants/constants'

export const getPrivateNotes = createAsyncThunk(
  ROUTES.PRIVATE_NOTES,
  async ({token}, {rejectWithValue}) => {
    try {
      const request = await fetch(`${URL}notes?type=personal`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      const data = await request.json()
      return data
    } catch (error) {
      return rejectWithValue({message: error.message})
    }
  }
)
