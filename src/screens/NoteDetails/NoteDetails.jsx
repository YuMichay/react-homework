import {useParams} from 'react-router-dom'
import {mockNotes} from '../../mocks/mockData'
import {Typography} from '../../components/Typography/Typography'
import './styles.css'

export const NoteDetails = () => {
  const {id} = useParams()
  const note = mockNotes.find(mockNote => mockNote.id === +id)
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
