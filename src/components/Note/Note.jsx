import './styles.css'
import {useState} from 'react'
import {Typography} from '../Typography/Typography'
import privateNote from '../../assets/lock.svg'
import heartIcon from '../../assets/heart.svg'
import heartFilledIcon from '../../assets/heart-filled.svg'
import {Button} from '../Button/Button'
import {SYMB_AMOUNT} from '../../constants/constants'
import {DeleteNoteModal} from '../Modals/Delete/DeleteModal'
import {CreateNoteModal} from '../Modals/Create/CreateModal'

export const Note = ({color, isPublic, owner, tags, text, title, id, localeValues}) => {
  // set background note's color
  const noteStyle = {
    backgroundColor: color,
  }

  //set style for public note
  const publicNoteStyle = {
    marginBottom: '3.25rem',
  }

  // TAGS: create a string of tags
  const tagsString = tags.map(tag => `#${tag}`).join(' ')

  // TEXT FIELD: show certain amount of symbols
  const [isHidenText, setIsHidenText] = useState(text.length > SYMB_AMOUNT)
  const textShown =
    text
      .split('')
      .slice(0, SYMB_AMOUNT - 1)
      .join('') + '...'

  // change text state and size of the note after "more" click
  const handleToggleText = () => {
    if (text.length < SYMB_AMOUNT) return
    setIsHidenText(!isHidenText)
  }

  // DELETE MODAL: handle click on delete button
  const [isShownDeleteModal, setIsShownDeleteModal] = useState(false)
  const handleDeleteNote = () => {
    setIsShownDeleteModal(!isShownDeleteModal)
  }

  // handle edit click
  const [isShownCreateModal, setIsShownCreateModal] = useState(false)
  const handleEditNote = () => {
    setIsShownCreateModal(!isShownCreateModal)
  }

  // PUBLIC NOTE: add/delete favorite note
  const [isFavorite, setIsFavorite] = useState(false)
  const handleToggleFavorites = () => {
    const value = !isFavorite
    setIsFavorite(value)
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
              onClick={handleToggleFavorites}></img>
          )}
          {!isPublic && <img src={privateNote} alt="lock"></img>}
        </div>
      </div>

      <div style={isPublic ? publicNoteStyle : null}>
        <Typography type={'p'}>
          {isHidenText ? textShown : text}
          <Button
            buttonClass={'more'}
            type={'button'}
            onClick={handleToggleText}
            text={localeValues.readMore}
          />
        </Typography>
        <Typography type={'span'}>{tagsString}</Typography>
      </div>

      {!isPublic && (
        <div className="note__buttons">
          <Button buttonClass={'delete'} type={'button'} onClick={handleDeleteNote} />
          <Button buttonClass={'edit'} type={'button'} onClick={handleEditNote} />
        </div>
      )}
      <Typography type={'p'}>{'by ' + owner}</Typography>
      {isShownDeleteModal && (
        <DeleteNoteModal setModalState={setIsShownDeleteModal} localeValues={localeValues} />
      )}
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
          localeValues={localeValues}
        />
      )}
    </div>
  )
}
