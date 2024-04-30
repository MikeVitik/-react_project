export function normalizeDay(currentDate: number) {
  return (currentDate + 6) % 7;
}
