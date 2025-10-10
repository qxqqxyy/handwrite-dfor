/**
 * 手写函数：防抖 debounce
 * @param {Function} fn
 * @param {number} wait
 * @param {boolean} immediate
 * @returns {Function}
 */
export function debounce(fn, wait = 200, immediate = false) {
  let timer = null;
  return function (...args) {
    const ctx = this;
    if (immediate && !timer) {
      fn.apply(ctx, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (!immediate) {
        fn.apply(ctx, args);
      }
      timer = null;
    }, wait);
  };
}

/**
 * 手写函数：节流 throttle
 * @param {Function} fn
 * @param {number} wait
 * @param {{leading?: boolean, trailing?: boolean}} options
 * @returns {Function}
 */
export function throttle(fn, wait = 200, options = {}) {
  const { leading = true, trailing = true } = options;
  let lastCall = 0;
  let timer = null;

  return function (...args) {
    const now = Date.now();
    const ctx = this;

    if (!lastCall && !leading) lastCall = now;
    const remaining = wait - (now - lastCall);

    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      lastCall = now;
      fn.apply(ctx, args);
    } else if (trailing && !timer) {
      timer = setTimeout(() => {
        lastCall = leading ? Date.now() : 0;
        timer = null;
        fn.apply(ctx, args);
      }, remaining);
    }
  };
}

/**
 * 手写函数：深拷贝 deepClone（支持循环引用）
 * @param {any} value
 * @param {WeakMap} hash
 * @returns {any}
 */
export function deepClone(value, hash = new WeakMap()) {
  if (value === null || typeof value !== 'object') return value;
  if (hash.has(value)) return hash.get(value);

  const result = Array.isArray(value)
    ? []
    : Object.create(Object.getPrototypeOf(value));

  hash.set(value, result);
  Reflect.ownKeys(value).forEach((key) => {
    result[key] = deepClone(value[key], hash);
  });
  return result;
}

/**
 * 手写函数：compose（函数组合）
 * @param  {...Function} fns
 * @returns {(x: any) => any}
 */
export const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);