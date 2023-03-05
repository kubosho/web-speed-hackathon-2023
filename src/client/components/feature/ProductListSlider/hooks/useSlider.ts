import { useEffect, useMemo, useRef, useState } from 'react';

const ITEM_MIN_WIDTH = 250 as const;

export const useSlider = ({ items }: { items: unknown[] }) => {
  const containerElementRef = useRef<HTMLUListElement>(null);
  const [visibleItemCount, setVisibleItemCount] = useState(1);
  const [_slideIndex, setSlideIndex] = useState(0);
  const slideIndex = useMemo(() => Math.min(_slideIndex, items.length - 1), [_slideIndex, items.length]);

  const resizeObserver = useMemo(
    () =>
      new ResizeObserver((entries) => {
        for (const entry of entries) {
          const containerWidth = entry.contentRect.width ?? 0;
          const count = Math.max(Math.floor(containerWidth / ITEM_MIN_WIDTH), 1);
          setVisibleItemCount(count);
        }
      }),
    [],
  );

  useEffect(() => {
    const element = containerElementRef.current;

    if (element === null) {
      return;
    }

    resizeObserver.observe(element);
    return () => resizeObserver.unobserve(element);
  }, [resizeObserver]);

  return {
    containerElementRef,
    setSlideIndex,
    slideIndex,
    visibleItemCount,
  };
};
