export function getTime() {
  const time = new Date()
  return `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`
}