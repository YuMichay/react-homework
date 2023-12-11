export const validatePassword = newPassword => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

  return passwordRegex.test(newPassword)
}

const validateString = (string, length) => {
  if (typeof string !== 'string' || !string || string.length > length || string.length < 2)
    return false

  return true
}

export const validateNote = note => {
  const REQUIRED_NOTE_FIELDS = ['title', 'text', 'color', 'tags', 'isPublic']

  if (!note) return false

  const areFieldsExist = REQUIRED_NOTE_FIELDS.every(field => field in note)

  if (!areFieldsExist) return false

  const {title, text, tags, color} = note
  const areFieldsValid =
    validateString(title, 25) &&
    validateString(text, 250) &&
    Array.isArray(tags) &&
    tags.every(tag => typeof tag === 'string') &&
    validateString(color, 20)

  if (!areFieldsValid) return false

  return true
}
