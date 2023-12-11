import {createAsyncThunk} from '@reduxjs/toolkit'
import {ROUTES, URL} from '../../constants/constants'

export const addNote = createAsyncThunk(
  `${ROUTES.PRIVATE_NOTES}/new-note`,
  async ({newNote, token}, {rejectWithValue}) => {
    try {
      const request = await fetch(`${URL}notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newNote),
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
