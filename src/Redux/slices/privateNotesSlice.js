import {createSlice} from '@reduxjs/toolkit'
import {mockNotes} from '../../mocks/mockData'

export const privateNotesSlice = createSlice({
  name: 'privateNotes',
  initialState: {
    notes: mockNotes.filter(note => !note.isPublic),
    currentId: '',
  },
  reducers: {
    add: (state, action) => {
      state.notes.push(action.payload)
    },
    edit: (state, action) => {
      const {color, isPublic, owner, tags, text, title, id} = action.payload
      const noteIndex = state.notes.findIndex(note => note.id === id)
      state.notes[noteIndex] = {
        color,
        isPublic,
        owner,
        tags,
        text,
        title,
        id,
      }
    },
    remove: state => {
      const id = state.notes.indexOf(state.notes.find(note => note.id === state.currentId))
      state.notes.splice(id, 1)
    },
    setId: (state, action) => {
      state.currentId = action.payload
    },
  },
})
export const {add, edit, remove, setId} = privateNotesSlice.actions
export default privateNotesSlice.reducer
