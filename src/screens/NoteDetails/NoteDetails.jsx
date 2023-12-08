import './styles.css'
import {useParams} from 'react-router-dom'
import {Typography} from '../../components/Typography/Typography'
import {useSelector} from 'react-redux'

export const NoteDetails = () => {
  const {id} = useParams()
  const notes = useSelector(state => state.privateNotes.notes).concat(
    useSelector(state => state.publicNotes.notes)
  )
  const note = notes.find(note => note.id.toString() === id)
  const tags = note.tags.map(tag => `#${tag} `)

  return (
    <div className="note__details">
      <Typography type={'h2'}>Title: </Typography>
      <Typography type={'p'}>{note.title}</Typography>
      <Typography type={'h2'}>Text: </Typography>
      <Typography type={'p'}>{note.text}</Typography>
      <Typography type={'h2'}>Tags: </Typography>
      <Typography type={'span'}>{tags}</Typography>
      <Typography type={'h2'}>Color: </Typography>
      <Typography type={'p'}>{note.color}</Typography>
    </div>
  )
}
