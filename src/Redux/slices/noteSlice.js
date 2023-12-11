import {createSlice} from '@reduxjs/toolkit'
import {addNote} from '../thunks/addNoteThunk'
import {getNoteDetails} from '../thunks/noteDetailsThunk'

export const noteSlice = createSlice({
  name: 'note',
  initialState: {
    note: {
      color: '',
      isPublic: false,
      tags: [],
      text: '',
      title: '',
    },
    isLoading: false,
    error: '',
  },
  reducers: {
    add: (state, action) => {
      const {color, isPublic, tags, text, title} = action.payload
      state.note = {
        color: color,
        isPublic: isPublic,
        tags: tags,
        text: text,
        title: title,
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addNote.pending, state => {
        state.isLoading = true
        state.error = ''
      })
      .addCase(addNote.fulfilled, state => {
        state.isLoading = false
        state.error = ''
      })
      .addCase(addNote.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(getNoteDetails.pending, state => {
        state.isLoading = true
        state.error = ''
      })
      .addCase(getNoteDetails.fulfilled, state => {
        state.isLoading = false
        state.error = ''
      })
  },
})
export const {add} = noteSlice.actions
export default noteSlice.reducer
