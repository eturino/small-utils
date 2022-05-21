/**
 * Similar to a `forEach`, but waits for the Promise of the first element to resolve before starting to run the next one.
 *
 * @param list list of items to map
 * @param fn async function to run on each item (any result is ignored)
 * @returns a void promise
 */
export function forEachInSequence<T>(list: T[], fn: (x: T) => Promise<unknown>): Promise<void> {
  const initialPromise = Promise.resolve();
  const reducer = (prom: Promise<unknown>, x: T) => {
    return prom.then(() => {
      fn(x);
    });
  };

  return list.reduce(reducer, initialPromise);
}

/**
 * Same as `forEachInSequence`, but returns a list of results.
 *
 * Similar to a `map` but waits for the Promise of the first element to resolve before starting to run the next one.
 *
 * @param list list of items to map
 * @param fn async function to run on each item, and whose returns are added to the result list
 * @returns the result of each fn call, in the same order as the items in the list
 *
 * @see forEachInSequence
 */
export function mapInSequence<T, R>(list: T[], fn: (x: T) => Promise<R>): Promise<R[]> {
  const initialPromise = Promise.resolve([] as R[]);
  const reducer = (prom: Promise<R[]>, x: T) => {
    return prom.then((res) => {
      return fn(x).then((r) => {
        res.push(r);
        return res;
      });
    });
  };

  return list.reduce(reducer, initialPromise);
}
