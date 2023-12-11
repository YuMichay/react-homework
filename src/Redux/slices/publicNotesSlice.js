import {createSlice} from '@reduxjs/toolkit'
import {getPublicNotes} from '../thunks/publicNoteThunk'

export const publicNotesSlice = createSlice({
  name: 'publicNotes',
  initialState: {
    notes: [],
    favoriteNotesIds: [],
    isLoading: false,
  },
  reducers: {
    add: (state, action) => {
      state.favoriteNotesIds.push(action.payload)
    },
    remove: (state, action) => {
      state.favoriteNotesIds.splice(action.payload, 1)
    },
    clear: state => {
      state.favoriteNotesIds = []
    },
  },
  extraReducers: builder => {
    builder.addCase(getPublicNotes.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getPublicNotes.fulfilled, (state, action) => {
      state.notes = action.payload
      state.isLoading = false
    })
  },
})
export const {add, remove, clear} = publicNotesSlice.actions
export default publicNotesSlice.reducer
