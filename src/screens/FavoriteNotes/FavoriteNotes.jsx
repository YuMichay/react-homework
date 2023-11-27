import {useEffect, useState} from 'react'
import {Note} from '../../components/Note/Note'
import {mockNotes} from '../../mocks/mockData'
import {state} from '../../state/state'

export const FavoriteNotes = () => {
  const [isUpdatedFavorite, setIsUpdatedFavorite] = useState()
  const [favoriteNotes, setFavoriteNotes] = useState(
    state.favoriteNotesIds.map(favoriteNotesId =>
      mockNotes.find(mockNote => mockNote.id === favoriteNotesId)
    )
  )

  useEffect(() => {
    if (isUpdatedFavorite) return
    setFavoriteNotes(
      state.favoriteNotesIds.map(favoriteNotesId =>
        mockNotes.find(mockNote => mockNote.id === favoriteNotesId)
      )
    )
    setIsUpdatedFavorite(true)
  }, [isUpdatedFavorite])

  return (
    <>
      {favoriteNotes.length
        ? favoriteNotes.map(note => (
            <Note
              key={note.id}
              color={note.color}
              isPublic={note.isPublic}
              owner={note.owner}
              tags={note.tags}
              text={note.text}
              title={note.title}
              id={note.id}
              setIsUpdatedFavorite={setIsUpdatedFavorite}
            />
          ))
        : ''}
    </>
  )
}
