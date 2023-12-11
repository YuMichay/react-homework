import {configureStore} from '@reduxjs/toolkit'
import appReducer from './slices/appSlice'
import userReducer from './slices/userSlice'
import noteReducer from './slices/noteSlice'
import publicNotesReducer from './slices/publicNotesSlice'
import privateNotesReducer from './slices/privateNotesSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    note: noteReducer,
    publicNotes: publicNotesReducer,
    privateNotes: privateNotesReducer,
  },
})
