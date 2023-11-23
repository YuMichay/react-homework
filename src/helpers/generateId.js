export const generateId = () => {
  const id =
    Date.now().toString(36) +
    Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36)
  return id
}
