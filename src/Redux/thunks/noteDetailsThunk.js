import {createAsyncThunk} from '@reduxjs/toolkit'
import {ROUTES, URL} from '../../constants/constants'

export const getNoteDetails = createAsyncThunk(
  ROUTES.NOTE_DETAILS,
  async ({id, token}, {rejectWithValue}) => {
    try {
      const request = await fetch(`${URL}notes?id=${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
