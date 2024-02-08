export function fakeAsync<T>(callback: () => T): Promise<T> {
  return new Promise((resolve) => resolve(callback()));
}
