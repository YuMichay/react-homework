import {createAsyncThunk} from '@reduxjs/toolkit'
import {ROUTES, URL} from '../../constants/constants'

export const deleteNote = createAsyncThunk(
  `${ROUTES.PRIVATE_NOTES}/delete-note`,
  async ({id, token}, {rejectWithValue}) => {
    try {
      const request = await fetch(`${URL}notes?id=${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(id),
      })

      if (request.ok) id
    } catch (error) {
      return rejectWithValue({message: error.message})
    }
  }
)
