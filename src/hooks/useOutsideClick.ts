import { useEffect, useRef } from 'react';

export const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  handler?: () => void,
  listenCapturing: boolean = true
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler?.();
      }
    }
    document.addEventListener('click', handleClick, listenCapturing);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handler, listenCapturing]);

  return ref;
};
