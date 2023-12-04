import {createSlice} from '@reduxjs/toolkit'
import {mockNotes} from '../../mocks/mockData'

export const publicNotesSlice = createSlice({
  name: 'publicNotes',
  initialState: {
    notes: mockNotes.filter(note => note.isPublic),
    favoriteNotesIds: [],
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
})
export const {add, remove, clear} = publicNotesSlice.actions
export default publicNotesSlice.reducer
