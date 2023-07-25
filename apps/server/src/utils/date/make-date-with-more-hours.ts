export const makeDateWithMoreHours = (hoursMore: number) => {
  const now = new Date(Date.now())
  return new Date(now.setHours(now.getHours() + hoursMore))
}
