export default function createDebouncedAction<T>(
  actionCallback: (...args: T[]) => unknown,
  delayTime: number,
) {
  let timeoutId = 0;

  return (...args: T[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => actionCallback(...args), delayTime);
  };
}
