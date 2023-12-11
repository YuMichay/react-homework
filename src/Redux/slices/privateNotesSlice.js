import {createSlice} from '@reduxjs/toolkit'
import {getPrivateNotes} from '../thunks/privateNotesThunk'
import {deleteNote} from '../thunks/deleteNoteThunk'
import {addNote} from '../thunks/addNoteThunk'
import {updateNote} from '../thunks/updateNoteThunk'

export const privateNotesSlice = createSlice({
  name: 'privateNotes',
  initialState: {
    notes: [],
    currentId: '',
    isLoading: false,
    isUpdated: false,
  },
  reducers: {
    setId: (state, action) => {
      state.currentId = action.payload
    },
    setUpdatedStatus: (state, action) => {
      state.isUpdated = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getPrivateNotes.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getPrivateNotes.fulfilled, (state, action) => {
      state.notes = action.payload
      state.isLoading = false
      state.isUpdated = true
    })
    builder.addCase(deleteNote.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      state.isLoading = false
      state.currentId = ''
      state.notes = state.notes.filter(note => note.id !== action.payload)
      state.isUpdated = false
    })
    builder.addCase(addNote.pending, state => {
      state.isLoading = true
    })
    builder.addCase(addNote.fulfilled, (state, action) => {
      state.isLoading = false
      state.currentId = ''
      state.notes.push(action.payload)
      state.isUpdated = false
    })
    builder.addCase(updateNote.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateNote.fulfilled, (state, action) => {
      state.isLoading = false
      state.currentId = ''
      const updatedNoteIndex = state.notes.findIndex(note => note.id === action.payload.id)
      if (updatedNoteIndex !== -1) state.notes[updatedNoteIndex] = action.payload
      state.isUpdated = false
    })
  },
})
export const {setId, setUpdatedStatus} = privateNotesSlice.actions
export default privateNotesSlice.reducer
