export function getDevotionalsProgressStartDate(today: Date): Date {
  const startDate = new Date(today);
  const daysBack = today.getDay() === 0 ? 7 : today.getDay() + 7;
  startDate.setDate(today.getDate() - daysBack);
  return startDate;
}
