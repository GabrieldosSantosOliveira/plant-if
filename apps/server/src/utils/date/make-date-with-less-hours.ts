export const makeDateWithLessHours = (hoursLess: number) => {
  const now = new Date(Date.now());
  return new Date(now.setHours(now.getHours() - hoursLess));
};
