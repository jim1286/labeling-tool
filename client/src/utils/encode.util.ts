export function encode(arr: number[]) {
  const encoding: number[] = [];
  let previous: number = arr[0] || 0;
  let count = 1;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== previous) {
      encoding.push(previous, count);
      count = 1;
      previous = arr[i] || 0;
    } else {
      count++;
    }
  }
  encoding.push(previous, count);

  return encoding;
}
