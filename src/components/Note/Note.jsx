import './styles.css'
import {useState} from 'react'
import {useNavigate, useOutletContext} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import privateNote from '../../assets/lock.svg'
import heartIcon from '../../assets/heart.svg'
import heartFilledIcon from '../../assets/heart-filled.svg'
import {SYMB_AMOUNT} from '../../constants/constants'
import {Typography} from '../Typography/Typography'
import {Button} from '../Button/Button'
import {DeleteNoteModal} from '../Modals/DeleteModal/DeleteModal'
import {CreateNoteModal} from '../Modals/CreateModal/CreateModal'
import {add, remove} from '../../Redux/slices/publicNotesSlice'
import {setId} from '../../Redux/slices/privateNotesSlice'

export const Note = ({
  color,
  isPublic,
  owner,
  tags,
  text,
  title,
  id,
  setIsUpdatedFavorite = null,
}) => {
  const favoriteNotes = useSelector(state => state.publicNotes.favoriteNotesIds)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  // get locale values for elements with text
  const localeValues = useOutletContext()

  // set background note's color
  const noteStyle = {
    backgroundColor: color,
  }

  //set style for public note
  const publicNoteStyle = {
    marginBottom: '3.25rem',
  }

  // TAGS: show certain amount of symbols
  const tagsShown =
    tags.length > 3
      ? tags
          .map(tag => `#${tag} `)
          .filter((_, index) => index < 3)
          .join(' ') + '...'
      : tags.map(tag => `#${tag} `)

  // TEXT FIELD: show certain amount of symbols
  const textShown =
    text.length < SYMB_AMOUNT
      ? text
      : text
          .split('')
          .slice(0, SYMB_AMOUNT - 1)
          .join('') + '...'

  // NOTE DETAILS MODAL: change text and tags state and size of the note after "more" click
  const handleToggleNote = () => {
    navigate(`/notes/${id}`)
  }

  // DELETE MODAL: handle click on delete button
  const [isShownDeleteModal, setIsShownDeleteModal] = useState(false)
  const handleDeleteNote = () => {
    dispatch(setId(id))
    setIsShownDeleteModal(!isShownDeleteModal)
  }

  // handle edit click
  const [isShownCreateModal, setIsShownCreateModal] = useState(false)
  const handleEditNote = () => {
    dispatch(setId(id))
    setIsShownCreateModal(!isShownCreateModal)
  }

  // FAVORITE NOTES: ids
  const [isFavorite, setIsFavorite] = useState(favoriteNotes.indexOf(id) !== -1)
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    if (setIsUpdatedFavorite) setIsUpdatedFavorite(false)
    isFavorite ? dispatch(remove(favoriteNotes.indexOf(id))) : dispatch(add(id))
  }

  return (
    <div className="notes__note" style={noteStyle}>
      <div className="notes__title">
        <Typography type={'h4'}>{title}</Typography>

        <div>
          {isPublic && (
            <img
              src={isFavorite ? heartFilledIcon : heartIcon}
              alt="heart"
              className="heart-icon"
              onClick={handleToggleFavorite}></img>
          )}
          {!isPublic && <img src={privateNote} alt="lock"></img>}
        </div>
      </div>

      <div style={isPublic ? publicNoteStyle : null}>
        <Typography type={'p'}>{textShown}</Typography>
        <Typography type={'span'}>{tagsShown}</Typography>
      </div>

      <Button
        buttonClass={'more'}
        type={'button'}
        onClick={handleToggleNote}
        text={localeValues.readMore}
      />

      {!isPublic && (
        <div className="note__buttons">
          <Button buttonClass={'delete'} type={'button'} onClick={handleDeleteNote} />
          <Button buttonClass={'edit'} type={'button'} onClick={handleEditNote} />
        </div>
      )}
      <Typography type={'p'}>{'by ' + owner}</Typography>
      {isShownDeleteModal && <DeleteNoteModal setModalState={setIsShownDeleteModal} />}
      {isShownCreateModal && (
        <CreateNoteModal
          values={{
            color: color,
            isPublic: isPublic,
            owner: owner,
            tags: tags,
            text: text,
            title: title,
            id: id,
          }}
          setModalState={setIsShownCreateModal}
        />
      )}
    </div>
  )
}
