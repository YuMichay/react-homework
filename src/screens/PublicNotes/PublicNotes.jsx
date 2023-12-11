import './styles.css'
import {useEffect} from 'react'
import {useMatch, Outlet} from 'react-router-dom'
import {Note} from '../../components/Note/Note'
import {useLocalization} from '../../hooks/useLocalization'
import {useSelector, useDispatch} from 'react-redux'
import {ROUTES} from '../../constants/constants'
import {getPublicNotes} from '../../Redux/thunks/publicNoteThunk'
import {LoadingScreen} from '../Loading/Loading'

export const PublicNotes = () => {
  const {localeValues} = useLocalization()
  const isFavoritePage = useMatch(`${ROUTES.PUBLIC_NOTES}/${ROUTES.FAVORITE}`)
  const token = useSelector(state => state.user.token)
  const dispatch = useDispatch()
  const {notes, isLoading} = useSelector(state => state.publicNotes)

  useEffect(() => {
    dispatch(getPublicNotes({token: token}))
  }, [dispatch, token])

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div className="notes__wrapper">
      {isFavoritePage ? (
        <Outlet context={localeValues} />
      ) : notes.length ? (
        notes.map(note => <Note key={note.id} note={note} />)
      ) : (
        ''
      )}
    </div>
  )
}
