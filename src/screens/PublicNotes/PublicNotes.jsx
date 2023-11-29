import './styles.css'
import {useMatch, Outlet} from 'react-router-dom'
import {mockNotes} from '../../mocks/mockData'
import {Note} from '../../components/Note/Note'
import {useLocalization} from '../../hooks/useLocalization'

export const PublicNotes = () => {
  const {localeValues} = useLocalization()
  // TODO: change on requested data
  const publicNotes = mockNotes.filter(note => note.isPublic)
  const isFavoritePage = useMatch('/public-notes/favorite')

  return (
    <div className="notes__wrapper">
      {isFavoritePage ? (
        <Outlet context={localeValues} />
      ) : publicNotes.length ? (
        publicNotes.map(note => (
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
