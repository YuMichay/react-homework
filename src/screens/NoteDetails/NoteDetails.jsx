import './styles.css'
import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {Typography} from '../../components/Typography/Typography'
import {useDispatch, useSelector} from 'react-redux'
import {getNoteDetails} from '../../Redux/thunks/noteDetailsThunk'

export const NoteDetails = () => {
  const dispatch = useDispatch()
  const {id} = useParams()
  const {token} = useSelector(state => state.user)
  const {note} = useSelector(state => state.note)
  const tags = note.tags.map(tag => `#${tag} `)

  useEffect(() => {
    dispatch(getNoteDetails({id, token}))
  }, [dispatch, id, token])

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
