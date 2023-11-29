import {createBrowserRouter} from 'react-router-dom'
import {ProtectedRoot} from '../screens/Root/Root'
import {ProtectedLoginScreen} from '../screens/Login/Login'
import ErrorPage from '../components/ErrorPage/ErrorPage'
import {PrivateNotes} from '../screens/PrivateNotes/PrivateNotes'
import {PublicNotes} from '../screens/PublicNotes/PublicNotes'
import {FavoriteNotes} from '../screens/FavoriteNotes/FavoriteNotes'
import {NoteDetails} from '../screens/NoteDetails/NoteDetails'
import {ChangePassword} from '../screens/ChangePassword/ChangePassword'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/private-notes',
        element: <PrivateNotes />,
      },
      {
        path: '/public-notes',
        element: <PublicNotes />,
        children: [
          {
            path: 'favorite',
            element: <FavoriteNotes />,
          },
        ],
      },
      {
        path: '/password',
        element: <ChangePassword />,
      },
      {
        path: '/notes/:id',
        element: <NoteDetails />,
      },
    ],
  },
  {
    path: '/login',
    element: <ProtectedLoginScreen />,
    errorElement: <ErrorPage />,
  },
])
