import {createBrowserRouter} from 'react-router-dom'
import {ProtectedRoot} from '../screens/Root/Root'
import {ProtectedLoginScreen} from '../screens/Login/Login'
import ErrorPage from '../components/ErrorPage/ErrorPage'
import {PrivateNotes} from '../screens/PrivateNotes/PrivateNotes'
import {PublicNotes} from '../screens/PublicNotes/PublicNotes'
import {FavoriteNotes} from '../screens/FavoriteNotes/FavoriteNotes'
import {NoteDetails} from '../screens/NoteDetails/NoteDetails'
import {ChangePassword} from '../screens/ChangePassword/ChangePassword'
import {
  CHANGE_PASSWORD,
  FAVORITE,
  LOGIN,
  NOTE_DETAILS,
  PRIVATE_NOTES,
  PUBLIC_NOTES,
} from '../constants/constants'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: PRIVATE_NOTES,
        element: <PrivateNotes />,
      },
      {
        path: PUBLIC_NOTES,
        element: <PublicNotes />,
        children: [
          {
            path: FAVORITE,
            element: <FavoriteNotes />,
          },
        ],
      },
      {
        path: CHANGE_PASSWORD,
        element: <ChangePassword />,
      },
      {
        path: NOTE_DETAILS,
        element: <NoteDetails />,
      },
    ],
  },
  {
    path: LOGIN,
    element: <ProtectedLoginScreen />,
    errorElement: <ErrorPage />,
  },
])
