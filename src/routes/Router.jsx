import {createBrowserRouter} from 'react-router-dom'
import {ProtectedRoot} from '../screens/Root/Root'
import {ProtectedLoginScreen} from '../screens/Login/Login'
import ErrorPage from '../components/ErrorPage/ErrorPage'
import {PrivateNotes} from '../screens/PrivateNotes/PrivateNotes'
import {PublicNotes} from '../screens/PublicNotes/PublicNotes'
import {FavoriteNotes} from '../screens/FavoriteNotes/FavoriteNotes'
import {NoteDetails} from '../screens/NoteDetails/NoteDetails'
import {ChangePassword} from '../screens/ChangePassword/ChangePassword'
import {ROUTES} from '../constants/constants'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.PRIVATE_NOTES,
        element: <PrivateNotes />,
      },
      {
        path: ROUTES.PUBLIC_NOTES,
        element: <PublicNotes />,
        children: [
          {
            path: ROUTES.FAVORITE,
            element: <FavoriteNotes />,
          },
        ],
      },
      {
        path: ROUTES.CHANGE_PASSWORD,
        element: <ChangePassword />,
      },
      {
        path: ROUTES.NOTE_DETAILS,
        element: <NoteDetails />,
      },
    ],
  },
  {
    path: ROUTES.LOGIN,
    element: <ProtectedLoginScreen />,
    errorElement: <ErrorPage />,
  },
])
