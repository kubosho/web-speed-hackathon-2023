import { useCallback, useEffect, useRef, useState } from 'react';

const ITEM_MIN_WIDTH = 250 as const;

export const useSlider = ({ items }: { items: unknown[] }) => {
  const containerElementRef = useRef<HTMLUListElement>(null);
  const [visibleItemCount, setVisibleItemCount] = useState(1);
  const [_slideIndex, setSlideIndex] = useState(0);
  const slideIndex = Math.min(Math.max(0, _slideIndex), items.length - 1);

  const updateVisibleItemCount = useCallback(() => {
    const containerWidth = containerElementRef.current?.getBoundingClientRect().width ?? 0;
    const count = Math.max(Math.floor(containerWidth / ITEM_MIN_WIDTH), 1);
    setVisibleItemCount(count);
  }, []);

  useEffect(() => {
    updateVisibleItemCount();
  }, [updateVisibleItemCount]);

  useEffect(() => {
    window.addEventListener('resize', updateVisibleItemCount);
    return () => window.removeEventListener('resize', updateVisibleItemCount);
  }, [updateVisibleItemCount]);

  return {
    containerElementRef,
    setSlideIndex,
    slideIndex,
    visibleItemCount,
  };
};
