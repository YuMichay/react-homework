import './styles.css'
import {useMatch, Outlet} from 'react-router-dom'
import {Note} from '../../components/Note/Note'
import {useLocalization} from '../../hooks/useLocalization'
import {useSelector} from 'react-redux'
import {ROUTES} from '../../constants/constants'

export const PublicNotes = () => {
  const {localeValues} = useLocalization()
  const {notes} = useSelector(state => state.publicNotes)
  const isFavoritePage = useMatch(`${ROUTES.PUBLIC_NOTES}/${ROUTES.FAVORITE}`)

  return (
    <div className="notes__wrapper">
      {isFavoritePage ? (
        <Outlet context={localeValues} />
      ) : notes.length ? (
        notes.map(note => (
          <Note
            key={note.id}
            color={note.color}
            isPublic={note.isPublic}
            owner={note.owner}
            tags={note.tags}
            text={note.text}
            title={note.title}
            id={note.id}
          />
        ))
      ) : (
        ''
      )}
    </div>
  )
}
