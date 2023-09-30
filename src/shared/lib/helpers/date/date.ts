export function formateDate(d: Date | string) {
  const date = typeof d === 'string' ? new Date(d) : d;

  return `${date.getFullYear()}/${`00${date.getMonth() + 1}`.slice(
    -2
  )}/${`00${date.getDate()}`.slice(-2)} ${`00${date.getHours()}`.slice(
    -2
  )}:${`00${date.getMinutes()}`.slice(-2)}:${`00${date.getSeconds()}`.slice(-2)}`;
}
