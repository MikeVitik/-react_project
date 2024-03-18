export function getTimeFractions(date: Date) {
  const h = date.getUTCHours();
  const m = date.getUTCMinutes();
  const s = date.getUTCSeconds();
  return { h, m, s };
}
export function formatTime(time: Date) {
  const { h, m, s } = getTimeFractions(time);
  const sec = s ? `${s}сек` : "";
  if (h) {
    return `${h} ч ${m} мин` + sec;
  } else {
    return `${m} мин` + sec;
  }
}
