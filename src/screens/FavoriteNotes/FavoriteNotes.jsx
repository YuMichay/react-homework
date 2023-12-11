import {useEffect, useState} from 'react'
import {Note} from '../../components/Note/Note'
import {useSelector} from 'react-redux'

export const FavoriteNotes = () => {
  const favoriteNotesIds = useSelector(state => state.publicNotes.favoriteNotesIds)
  const notes = useSelector(state => state.publicNotes.notes)
  const [isUpdatedFavorite, setIsUpdatedFavorite] = useState()
  const [favoriteNotes, setFavoriteNotes] = useState(
    favoriteNotesIds.map(favoriteNotesId => notes.find(note => note.id === favoriteNotesId))
  )

  useEffect(() => {
    if (isUpdatedFavorite) return
    setFavoriteNotes(
      favoriteNotesIds.map(favoriteNotesId => notes.find(note => note.id === favoriteNotesId))
    )
    setIsUpdatedFavorite(true)
  }, [favoriteNotesIds, isUpdatedFavorite, notes])

  return (
    <>
      {favoriteNotes.length
        ? favoriteNotes.map(note => (
            <Note key={note.id} note={note} setIsUpdatedFavorite={setIsUpdatedFavorite} />
          ))
        : ''}
    </>
  )
}
