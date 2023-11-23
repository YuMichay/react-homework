export const validateTags = tags => {
  const tagRegex = /^([a-zA-Z0-9]+(,\s*[a-zA-Z0-9]+)*)?(,\s*)?$/

  return tagRegex.test(tags)
}
