import {createBrowserRouter} from 'react-router-dom'
import {Root} from '../screens/Root/Root'
import {LoginScreen} from '../screens/Login/Login'
import ErrorPage from '../components/ErrorPage/ErrorPage'
import {PrivateNotes} from '../screens/PrivateNotes/PrivateNotes'
import {PublicNotes} from '../screens/PublicNotes/PublicNotes'
import {FavoriteNotes} from '../screens/FavoriteNotes/FavoriteNotes'
import {NoteDetails} from '../screens/NoteDetails/NoteDetails'
import {ChangePassword} from '../screens/ChangePassword/ChangePassword'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
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
    element: <LoginScreen />,
    errorElement: <ErrorPage />,
  },
])
