import {createAsyncThunk} from '@reduxjs/toolkit'
import {ROUTES, URL} from '../../constants/constants'

export const updateNote = createAsyncThunk(
  `${ROUTES.PRIVATE_NOTES}/edit-note`,
  async ({newNote, id, token}, {rejectWithValue}) => {
    try {
      const request = await fetch(`${URL}notes?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newNote),
      })

      if (request.ok) {
        const data = await request.json()
        return {data, id}
      }
    } catch (error) {
      return rejectWithValue({message: error.message})
    }
  }
)
