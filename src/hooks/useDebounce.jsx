import { useRef, useMemo, useLayoutEffect } from "react";

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const useDebounce = (cb, delay) => {
  const cbRef = useRef(cb);
  useLayoutEffect(() => {
    cbRef.current = cb;
  });
  return useMemo(
    () => debounce((...args) => cbRef.current(...args), delay),
    [delay]
  );
};

export default useDebounce;
