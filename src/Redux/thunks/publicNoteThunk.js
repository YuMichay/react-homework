import {createAsyncThunk} from '@reduxjs/toolkit'
import {ROUTES, URL} from '../../constants/constants'

export const getPublicNotes = createAsyncThunk(
  ROUTES.PUBLIC_NOTES,
  async ({token}, {rejectWithValue}) => {
    try {
      const request = await fetch(`${URL}notes?type=public`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await request.json()
      return data
    } catch (error) {
      return rejectWithValue({message: error.message})
    }
  }
)
