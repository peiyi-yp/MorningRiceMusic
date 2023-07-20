export function debounce(fun, delay = 500) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fun.apply(this, arguments);
    }, delay);
  };
}
