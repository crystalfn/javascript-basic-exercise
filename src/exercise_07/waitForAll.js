export default function waitForAll(...promises) {
  // This function returns a promise which will be triggered when all the `promises` are completed.
  //
  // If all the `promises` are resolved, then the returned promise will be resolved. Otherwise,
  // if one of the `promises` is rejected, then the returned promise will be rejected.
  //
  // Your target:
  //
  // * Please implement this function and pass all the tests in wait_for_all_spec.js.
  // * Please do NOT modify the signature of the function.

  let isAllElementArePromise = false;
  isAllElementArePromise = promises.every(item => Object.prototype.toString.call(item) === '[object Promise]');
  if (!isAllElementArePromise) {
    throw new Error('Not all elements are promises.');
  }

  let promisesCompleted = 0;
  let isError = false;
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then(() => {
        promisesCompleted += 1;
        if (promisesCompleted === promises.length) {
          if (isError) {
            reject();
          } else {
            resolve();
          }
        }
      })
        .catch(() => {
          promisesCompleted += 1;
          if (promisesCompleted === promises.length) {
            reject();
          } else {
            isError = true;
          }
        });
    });
  });
}
