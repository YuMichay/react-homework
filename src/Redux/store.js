import {configureStore} from '@reduxjs/toolkit'
import appReducer from './slices/appSlice'
import userReducer from './slices/userSlice'
import publicNotesReducer from './slices/publicNotesSlice'
import privateNotesReducer from './slices/privateNotesSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    publicNotes: publicNotesReducer,
    privateNotes: privateNotesReducer,
  },
})
