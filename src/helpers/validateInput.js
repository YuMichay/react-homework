export const validateTags = tags => {
  const tagRegex = /^([a-zA-Z0-9]+(,\s*[a-zA-Z0-9]+)*)?(,\s*)?$/

  return tagRegex.test(tags)
}

export const validatePassword = newPassword => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{16}$/

  return passwordRegex.test(newPassword)
}
